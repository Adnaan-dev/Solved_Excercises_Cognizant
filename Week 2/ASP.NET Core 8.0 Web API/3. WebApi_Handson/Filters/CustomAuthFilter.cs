using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace WebApiCustomModel.Filters;

// Custom action filter for a very small "authorization" check.
//
// It intercepts every incoming request to the decorated controller/action and:
//   1. Verifies an 'Authorization' header is present.
//   2. Verifies that header value contains the word 'Bearer'.
//
// The exercise sheet (written for the old WebApiCompatShim) says to "throw a
// BadRequestResult". In ASP.NET Core the idiomatic way to short-circuit a
// request from inside a filter is to SET context.Result - the framework then
// returns it without ever invoking the action. (WebApiCompatShim does not exist
// on .NET 8, and it isn't needed here.)
public class CustomAuthFilter : ActionFilterAttribute
{
    public override void OnActionExecuting(ActionExecutingContext context)
    {
        var headers = context.HttpContext.Request.Headers;

        // 1. Is the Authorization header there at all?
        if (!headers.ContainsKey("Authorization"))
        {
            context.Result = new BadRequestObjectResult("Invalid request - No Auth token");
            return;
        }

        // 2. Does it carry a Bearer token?
        var authValue = headers["Authorization"].ToString();
        if (!authValue.Contains("Bearer", StringComparison.OrdinalIgnoreCase))
        {
            context.Result = new BadRequestObjectResult(
                "Invalid request - Token present but Bearer unavailable");
            return;
        }

        // All good - let the request continue to the action method.
        base.OnActionExecuting(context);
    }
}
