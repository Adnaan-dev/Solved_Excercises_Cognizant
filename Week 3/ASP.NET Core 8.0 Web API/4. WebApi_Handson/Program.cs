// ---------------------------------------------------------------------------
// Exercise 4 - Web API CRUD operations (create / update / delete).
// ---------------------------------------------------------------------------

using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Employee CRUD Web API",
        Version = "v1",
        Description = "Create, update and delete employees"
    });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Employee CRUD Web API"));

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
