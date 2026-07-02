// ---------------------------------------------------------------------------
// Exercise 2 - Web API with Swagger
//
// The exercise sheet shows the classic Startup.cs code:
//   services.AddSwaggerGen(c => c.SwaggerDoc("v1", new Info { ... }));
//   app.UseSwagger(); app.UseSwaggerUI(c => c.SwaggerEndpoint(...));
//
// That used Swashbuckle's old "Info/Contact/License" types. On .NET 8 with
// Swashbuckle 6.x those types are renamed to OpenApiInfo/OpenApiContact/
// OpenApiLicense (from Microsoft.OpenApi.Models). The code below is the modern
// equivalent of the snippet in the exercise.
// ---------------------------------------------------------------------------

using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// ----- ConfigureServices -----
builder.Services.AddControllers();

// ApiExplorer discovers the endpoints so SwaggerGen can document them.
builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Swagger Demo",
        Version = "v1",
        Description = "TBD",
        TermsOfService = new Uri("https://www.example.com/terms"),
        Contact = new OpenApiContact
        {
            Name = "John Doe",
            Email = "john@xyzmail.com",
            Url = new Uri("https://www.example.com")
        },
        License = new OpenApiLicense
        {
            Name = "License Terms",
            Url = new Uri("https://www.example.com")
        }
    });
});

var app = builder.Build();

// ----- Configure (HTTP pipeline) -----
// Expose the generated swagger.json and the interactive Swagger UI.
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    // Point the UI at the generated JSON document.
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Swagger Demo");
});

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
