# Exercise 1 — First Web API using .NET Core

> Project: `FirstWebApi` · Target framework: **.NET 8** · Template: **ASP.NET Core Web API**

This is the starting point of the series. The goal is to scaffold a Web API with
Read/Write actions, look at the generated `ValuesController`, run it, and confirm
the `GET` action returns data as expected.

---

## How I created it

With the .NET SDK installed this is the exact command the IDE runs behind the
"API template, with controllers" option:

```bash
dotnet new webapi --use-controllers -n FirstWebApi
```

I then renamed the generated controller to `ValuesController` and gave it the
classic Read/Write actions so the action-verb mapping is obvious.

> **Note on the template:** the modern .NET 8 API template ships a sample
> `WeatherForecast` minimal endpoint and bundles Swagger. I deliberately kept
> this first exercise *plain* (no Swagger) so the Web API fundamentals stand on
> their own — Swagger is added in **Exercise 2**.

## How to run

```bash
cd "1. WebApi_Handson"
dotnet run
```

The browser opens at `https://localhost:7080/api/values` and you should see:

```json
["value1","value2"]
```

That confirms the `GET` action method works. You can also test the other verbs
with `curl`:

```bash
curl https://localhost:7080/api/values            # GET all      -> 200
curl https://localhost:7080/api/values/0          # GET one       -> 200
curl -X POST https://localhost:7080/api/values -H "Content-Type: application/json" -d "\"value3\""   # -> 201
curl -X PUT  https://localhost:7080/api/values/0 -H "Content-Type: application/json" -d "\"changed\"" # -> 204
curl -X DELETE https://localhost:7080/api/values/0 # -> 204
```

---

## The concepts behind this exercise

### RESTful web service, Web API & Microservice
- **REST (Representational State Transfer)** is an architectural style, not a
  protocol. A *resource* (e.g. an employee) is identified by a URL, and you act
  on it using the standard HTTP verbs. The server transfers a *representation*
  of that resource's state (commonly JSON).
- **Stateless:** each request carries everything the server needs. The server
  keeps no client session between calls, which is what makes REST scale
  horizontally.
- **Messages:** communication happens through HTTP request/response messages
  (headers + body). REST is **not restricted to XML** — JSON is the usual
  representation, but it can be XML, plain text, etc.
- **Microservice:** an architectural style where an application is composed of
  small, independently deployable services, each owning one business capability
  and talking over lightweight protocols (usually HTTP/REST or messaging). A
  Web API is frequently the entry point of a microservice.

### Web Service vs Web API
| Web Service (classic SOAP/WCF) | Web API |
|---|---|
| Typically SOAP + XML only | Any format — JSON, XML, plain text |
| Needs WSDL, heavier protocol | Lightweight HTTP, verb-based |
| Transport often SOAP over HTTP | Plain HTTP |
| Built for interoperable RPC | Built for REST/HTTP resources |

### HttpRequest & HttpResponse
- **HttpRequest** — what the client sends: the verb (GET/POST/…), the URL, the
  headers (e.g. `Authorization`, `Content-Type`), and an optional body.
- **HttpResponse** — what the server returns: a **status code**, response
  headers, and an optional body (the representation).

### Action Verbs (declared as attributes)
| Verb | Attribute | Purpose |
|---|---|---|
| GET | `[HttpGet]` | Read a resource |
| POST | `[HttpPost]` | Create a resource |
| PUT | `[HttpPut]` | Update/replace a resource |
| DELETE | `[HttpDelete]` | Remove a resource |

See these on the action methods in [`Controllers/ValuesController.cs`](./Controllers/ValuesController.cs).

### HttpStatusCodes (returned through ActionResult types)
| Code | Helper | Meaning |
|---|---|---|
| 200 | `Ok()` | Success |
| 400 | `BadRequest()` | Client sent something invalid |
| 401 | `Unauthorized()` | Not authenticated |
| 500 | `StatusCode(500)` | Unhandled server error |

The `ActionResult<T>` return type lets a single method return either the data
*or* one of these status results.

### Structure of a Web API
- A **controller** groups related actions. In ASP.NET Core it inherits from
  `ControllerBase` (the modern equivalent of Web API 2's `ApiController`).
- `[ApiController]` opts the controller into the Web API conventions.
- `[Route("api/[controller]")]` defines the URL; `[controller]` is replaced by
  the class name minus the "Controller" suffix.
- Each **action method** is decorated with the verb attribute it answers to.

### Configuration files of a Web API
- **`Program.cs`** — in .NET 8 this single file does the work that `Program.cs`
  *and* `Startup.cs` used to split: it builds the DI container
  (`builder.Services.Add…`, the old `ConfigureServices`) and the HTTP pipeline
  (`app.Use…`, the old `Configure`).
- **`appsettings.json`** — application configuration (logging, connection
  strings, custom settings), with environment overrides like
  `appsettings.Development.json`.
- **`Properties/launchSettings.json`** — *local dev only* settings: which URLs
  and ports to listen on, the environment name, whether to open a browser.
- **.NET Framework 4.5 note:** the old templates used `Route.config` /
  `WebApiConfig.cs` (under `App_Start`) to register routes via
  `config.MapHttpRoute(...)`. In ASP.NET Core that whole concept is replaced by
  **attribute routing** (`[Route]`/`[HttpGet("…")]`) plus `MapControllers()`.
