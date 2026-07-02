using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace WebApiCustomModel.Filters;

// Catches any unhandled exception thrown by an action, logs it to a file, and
// turns it into a clean 500 response (instead of leaking a stack trace).
//
// IExceptionFilter has a single method, OnException. We:
//   1. read the exception from the context,
//   2. append its details to a log file on disk,
//   3. set context.Result so the client gets a tidy 500 ("ExceptionResult").
public class CustomExceptionFilter : IExceptionFilter
{
    private readonly IWebHostEnvironment _env;

    public CustomExceptionFilter(IWebHostEnvironment env)
    {
        _env = env;
    }

    public void OnException(ExceptionContext context)
    {
        var exception = context.Exception;

        // Build a readable log entry.
        var logLine =
            $"{DateTime.Now:yyyy-MM-dd HH:mm:ss} | " +
            $"{context.HttpContext.Request.Method} {context.HttpContext.Request.Path} | " +
            $"{exception.GetType().Name}: {exception.Message}{Environment.NewLine}" +
            $"{exception.StackTrace}{Environment.NewLine}" +
            new string('-', 80) + Environment.NewLine;

        // Write it to <ContentRoot>/Logs/exceptions.log.
        try
        {
            var logDir = Path.Combine(_env.ContentRootPath, "Logs");
            Directory.CreateDirectory(logDir);
            File.AppendAllText(Path.Combine(logDir, "exceptions.log"), logLine);
        }
        catch
        {
            // Never let logging failure mask the original error.
        }

        // Return a controlled 500 response and mark the exception as handled.
        context.Result = new ObjectResult(new
        {
            error = "An unexpected error occurred. The incident has been logged.",
            detail = exception.Message
        })
        {
            StatusCode = StatusCodes.Status500InternalServerError
        };

        context.ExceptionHandled = true;
    }
}
