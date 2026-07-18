# Week 3 · ASP.NET Core 8.0 Web API

This week contains a six-part **ASP.NET Core 8.0 Web API** hands-on series built from
scratch on **.NET 8** (modern minimal hosting model), ending in a Kafka chat app.

## Contents

| # | Project | Topic |
|:-:|---------|-------|
| 1 | `FirstWebApi` | Controllers, action verbs, status codes, config files |
| 2 | `WebApiSwagger` | Swagger/OpenAPI, `ProducesResponseType`, `[Route("Emp")]` |
| 3 | `WebApiCustomModel` | Custom `Employee` model, `[FromBody]`, custom auth + exception filters |
| 4 | `WebApiCrud` | Full CRUD — PUT update with id validation |
| 5 | `WebApiJwt` | JWT bearer auth, role-based `[Authorize]`, CORS, token expiry |
| 6 | `KafkaChat` | Apache Kafka chat console (producer + consumer) |

📁 See [`ASP.NET Core 8.0 Web API/`](./ASP.NET%20Core%208.0%20Web%20API/) for the projects.
Each folder has its own `README.md` with concept notes and Swagger/Postman testing steps.

## How to run

```bash
# From any hands-on folder (requires the .NET 8 SDK):
dotnet run        # Swagger UI at https://localhost:<port>/swagger (ex. 2–5)
```

Exercise 6 (`KafkaChat`) needs a local **Kafka** broker.
