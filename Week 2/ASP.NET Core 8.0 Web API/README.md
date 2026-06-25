# ASP.NET Core 8.0 Web API — Hands-on Exercises

A set of six hands-on exercises building up a Web API from scratch on **.NET 8**,
finishing with a Kafka-based chat application. Each exercise is a **self-contained,
runnable project** in its own folder.

> **Framework note:** the original exercise sheets were written for the older
> .NET Core era (`Startup.cs`, `new Info {}`, `WebApiCompatShim`). These solutions
> use **.NET 8** with the modern **minimal hosting model** (everything in
> `Program.cs`). Wherever the API has changed, the README in that folder explains
> the old-vs-new mapping.

| # | Folder | Project | Topic | HTTPS port |
|---|--------|---------|-------|:----------:|
| 1 | `1. WebApi_Handson` | `FirstWebApi` | First Web API — ValuesController, action verbs, status codes, config files | 7080 |
| 2 | `2. WebApi_Handson` | `WebApiSwagger` | Swagger/OpenAPI, `ProducesResponseType`, `[Route("Emp")]`, Postman | 7081 |
| 3 | `3. WebApi_Handson` | `WebApiCustomModel` | Custom `Employee` model, `[FromBody]`, custom auth filter + exception filter | 7082 |
| 4 | `4. WebApi_Handson` | `WebApiCrud` | CRUD — PUT update with id validation, returns updated entity | 7083 |
| 5 | `5. WebApi_Handson` | `WebApiJwt` | JWT bearer auth, role-based `[Authorize]`, CORS, token expiry | 7084 |
| 6 | `6. WebApi_Handson` | `KafkaChat` | Apache Kafka chat console (producer + consumer) | n/a |

## Prerequisites

- **.NET 8 SDK** — <https://dotnet.microsoft.com/download/dotnet/8.0>
- For exercise 6 only: **Apache Kafka** + **Zookeeper** (and a JDK) running
  locally — see that folder's README.

## Running any exercise

```bash
cd "<n>. WebApi_Handson"
dotnet run
```

Exercises 2–5 open the **Swagger UI** at `https://localhost:<port>/swagger`.
Exercise 1 opens the raw `GET` endpoint. Exercise 6 is a console app
(`dotnet run -- chat <name>`).

> NuGet will restore packages on first `dotnet run`/`dotnet build`. The projects
> reference Swashbuckle.AspNetCore 6.6.2, Microsoft.AspNetCore.Authentication.JwtBearer
> 8.0.6, and Confluent.Kafka 2.5.3.

## How the exercises build on each other

1. **Ex 1** establishes the controller + action-verb fundamentals.
2. **Ex 2** documents them with Swagger and introduces the Employee resource.
3. **Ex 3** adds a real domain model and two custom filters (auth + exception).
4. **Ex 4** turns the Employee resource into a full CRUD API (focus on PUT).
5. **Ex 5** replaces the hand-rolled auth filter with proper JWT + roles + CORS.
6. **Ex 6** steps outside HTTP entirely to stream chat messages over Kafka.

Each folder has its own `README.md` with the concept notes, the exact code
changes, and step-by-step Swagger/Postman testing instructions.
