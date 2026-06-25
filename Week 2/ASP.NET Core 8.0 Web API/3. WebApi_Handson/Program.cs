// ---------------------------------------------------------------------------
// Exercise 3 - Web API with a custom model class and custom filters.
// ---------------------------------------------------------------------------

using Microsoft.OpenApi.Models;
using WebApiCustomModel.Filters;

var builder = WebApplication.CreateBuilder(args);

// Register controllers and add the CustomExceptionFilter GLOBALLY so it catches
// exceptions from any action (it has a constructor dependency on
// IWebHostEnvironment, so we register it by type and let DI build it).
builder.Services.AddControllers(options =>
{
    options.Filters.Add<CustomExceptionFilter>();
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Employee Web API",
        Version = "v1",
        Description = "Custom model + custom filters demo"
    });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Employee Web API"));

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
