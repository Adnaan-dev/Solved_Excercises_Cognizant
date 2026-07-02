# Exercise 3 — Web API with a custom model class & custom filters

> Project: `WebApiCustomModel` · Target framework: **.NET 8**

Three things come together here:
1. An action method that returns a list of a **custom entity** (`Employee`).
2. A **custom authorization** action filter.
3. A **custom exception** filter that logs to a file.

---

## 1. Custom model + the GET action

The model classes live in [`Models/`](./Models): `Employee` (exactly the
structure given in the exercise), plus `Department` and `Skill` that it
references.

The `EmployeeController` builds its data in the **constructor** by calling the
private helper `GetStandardEmployeeList()`, and the parameter-less `GET` returns
that `List<Employee>`:

```csharp
[HttpGet]
[AllowAnonymous]
[ProducesResponseType(typeof(List<Employee>), StatusCodes.Status200OK)]
public ActionResult<List<Employee>> GetStandard() => Ok(GetStandardEmployeeList());
```

- `[ProducesResponseType(..., 200)]` makes Swagger show the success contract
  (status 200 returning an `Employee[]`).
- `[AllowAnonymous]` is included to demonstrate the attribute. It tells the
  authentication/authorization middleware to skip this action — note it only
  affects the real `[Authorize]` pipeline (Exercise 5), not our hand-rolled
  `CustomAuthFilter`.

### `[FromBody]`
The `POST` uses `[FromBody] Employee employee`, which binds the **JSON request
body** to the model — as opposed to reading values from the query string. That
is how a client sends a whole object to the API.

## 2. CustomAuthFilter (authorization action filter)

[`Filters/CustomAuthFilter.cs`](./Filters/CustomAuthFilter.cs) inherits
`ActionFilterAttribute` and overrides `OnActionExecuting` to intercept the
request **before** the action runs:

- No `Authorization` header → `400` with **"Invalid request - No Auth token"**.
- Header present but no `Bearer` → `400` with
  **"Invalid request - Token present but Bearer unavailable"**.

It is applied at the controller level with `[CustomAuthFilter]`.

> **WebApiCompatShim note:** the exercise mentions installing
> `Microsoft.AspNetCore.Mvc.WebApiCompatShim` and *throwing* a
> `BadRequestResult`. That shim was a .NET Core 2.x migration aid and **does not
> exist on .NET 8**. The idiomatic modern approach is to **set**
> `context.Result = new BadRequestObjectResult(message)`, which short-circuits
> the pipeline and returns the 400 immediately. No extra package is needed.

To test in Postman: a GET to `/api/employee` with **no** `Authorization` header
returns the first message; add header `Authorization: token123` (no "Bearer")
to get the second; add `Authorization: Bearer token123` to pass.

## 3. CustomExceptionFilter (exception filter → file)

[`Filters/CustomExceptionFilter.cs`](./Filters/CustomExceptionFilter.cs)
implements `IExceptionFilter`. In `OnException` it:
1. reads the exception from the `ExceptionContext`,
2. appends the details to `Logs/exceptions.log` under the app's content root,
3. sets `context.Result` to a clean **500** body and marks it handled.

It is registered **globally** in `Program.cs`:

```csharp
builder.Services.AddControllers(o => o.Filters.Add<CustomExceptionFilter>());
```

The `GET /api/employee/throw` action deliberately throws, and is documented with
`[ProducesResponseType(500)]`. Trigger it from Swagger (remember to send an
`Authorization: Bearer ...` header because of the controller-level auth filter)
and you will get a 500 response **and** a new entry in `Logs/exceptions.log`.

## Run it

```bash
cd "3. WebApi_Handson"
dotnet run
# browse https://localhost:7082/swagger
```

| Endpoint | Notes |
|---|---|
| `GET /api/employee` | returns the standard employee list (200) |
| `GET /api/employee/throw` | throws → caught by filter → 500 + logged |
| `POST /api/employee` | `[FromBody]` Employee → 201 |

All endpoints require an `Authorization: Bearer <anything>` header because of
`CustomAuthFilter`.
