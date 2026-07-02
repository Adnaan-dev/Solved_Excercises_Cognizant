// ---------------------------------------------------------------------------
// Exercise 1 - First Web API using .NET Core (here: .NET 8)
//
// In the classic .NET Core 2.x/3.x template the bootstrapping code lived in
// two files: Program.cs (host) and Startup.cs (ConfigureServices + Configure).
// .NET 6+ merged both into this single "minimal hosting" Program.cs.
//
//   builder.Services.Add...()   ==  the old Startup.ConfigureServices()
//   app.Use...() / app.Map...() ==  the old Startup.Configure()
// ---------------------------------------------------------------------------

var builder = WebApplication.CreateBuilder(args);

// --- Service registration (a.k.a. ConfigureServices) ----------------------
// AddControllers() wires up everything an attribute-routed Web API needs:
// model binding, the [ApiController] conventions, JSON formatters, etc.
// This is the dependency-injection container being populated.
builder.Services.AddControllers();

var app = builder.Build();

// --- HTTP request pipeline (a.k.a. Configure) ------------------------------
// Redirect plain HTTP calls to HTTPS so the API behaves like a real endpoint.
app.UseHttpsRedirection();

// Authorization middleware. We have no policies yet, but it is good practice
// to keep it in the pipeline (it becomes important from Exercise 5 onwards).
app.UseAuthorization();

// Map the attribute-routed controllers (ValuesController) into the pipeline.
app.MapControllers();

app.Run();
