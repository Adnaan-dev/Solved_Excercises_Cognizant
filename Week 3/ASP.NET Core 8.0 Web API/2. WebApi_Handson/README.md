# Exercise 2 — Web API with Swagger

> Project: `WebApiSwagger` · Target framework: **.NET 8** · Adds **Swashbuckle.AspNetCore**

This builds on Exercise 1 by adding interactive API documentation with Swagger
(OpenAPI), then testing the endpoints from both Swagger UI and Postman. It also
introduces the `Route` attribute rename and `ProducesResponseType`.

---

## 1. Installing Swagger

```bash
dotnet add package Swashbuckle.AspNetCore
```

The exercise sheet gives the classic `Startup.cs` snippet using `new Info { ... }`.
On .NET 8 with Swashbuckle 6.x those types were renamed, so the equivalent code
in [`Program.cs`](./Program.cs) is:

```csharp
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo      // was: new Info
    {
        Title = "Swagger Demo",
        Version = "v1",
        Description = "TBD",
        Contact = new OpenApiContact { Name = "John Doe", Email = "john@xyzmail.com", Url = new Uri("https://www.example.com") },
        License = new OpenApiLicense { Name = "License Terms", Url = new Uri("https://www.example.com") }
    });
});
```

and in the pipeline:

```csharp
app.UseSwagger();
app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Swagger Demo"));
```

> The only real change from the sheet: `Info`→`OpenApiInfo`, `Contact`→
> `OpenApiContact`, `License`→`OpenApiLicense`, and `Url`/`TermsOfService` are
> now `Uri` objects instead of strings.

## Run it & view Swagger

```bash
cd "2. WebApi_Handson"
dotnet run
```

Browse to `https://localhost:7081/swagger`. You will see:

- The **Title, Version and Contact** ("Swagger Demo", v1, John Doe) at the top.
- The **Values** and **Emp** controllers listed, grouped by HTTP verb.
- Click **GET** (the no-parameter one) → **Try it out** → **Execute**. The
  response body and `200` status appear inline.

## 2. Testing with Postman

1. Open Postman → **New** → **HTTP Request**.
2. Choose the verb **GET** from the dropdown next to the URL bar.
3. URL: `https://localhost:7081/Emp` (the Employee controller — see below).
4. (Optional) **Headers** tab → add `Authorization` when needed in later
   exercises. **Body** → raw → JSON for POST/PUT.
5. **Send**. The list of employees appears in the **Body** pane, and the
   **Status** (e.g. `200 OK`) shows on the right of the response pane.
6. Save the request into a **Collection** so you can build up a reusable set of
   calls; each open request gets its own tab in the centre pane.

## 3. The `Route` and `ActionName` attributes

- **Route rename:** the `EmployeeController` uses `[Route("Emp")]` instead of the
  default `[Route("api/[controller]")]`. So the resource is reached at `/Emp`,
  not `/api/employee`. This shows how a controller's external name can be made
  friendlier/shorter independent of the class name.
- **ActionName:** when you need two methods answering the *same* verb (e.g. two
  different `GET`s), `[ActionName("…")]` (or distinct route templates) gives each
  a unique name so routing can tell them apart. In this project the two `GET`s on
  `ValuesController` are disambiguated by their route templates (`""` vs
  `"{id}"`), which is the attribute-routing way of doing the same thing.

## What's in this project
| File | Purpose |
|---|---|
| `Program.cs` | Swagger registration + pipeline |
| `Controllers/ValuesController.cs` | Carried over from Ex.1, now with `ProducesResponseType` |
| `Controllers/EmployeeController.cs` | `[Route("Emp")]`, GET list with `ProducesResponseType(200)` |
| `Models/Employee.cs` | Minimal employee for the listing |
