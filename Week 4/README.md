# Week 4 · Microservices — JWT Authentication

A single **.NET 8** ASP.NET Core Web API microservice (`Microservices.Jwt`) that
implements **JWT bearer authentication** end to end.

## Contents

- **`AuthController`** — `POST /api/auth/login` validates credentials against in-memory
  seeded users and issues a signed JWT.
- **`SecureController`** — endpoints protected with `[Authorize]`, plus a role-gated
  `GET /api/secure/admin` using `[Authorize(Roles = "Admin")]`.
- **`Program.cs`** — .NET 8 minimal hosting model wires up JWT validation
  (issuer/audience/lifetime), reading the signing key from the `"Jwt"` section of
  `appsettings.json`.

Seeded users: `admin` / `password123` (Admin) and `alice` / `alice@123` (User).
Tokens expire after `Jwt:DurationInMinutes` (60). Swagger UI opens at
`https://localhost:7090/swagger`.

📁 See [`1. Microservices - JWT/`](./1.%20Microservices%20-%20JWT/) for the project and
its local `README.md` with the full walkthrough (login, protected calls, role checks,
tamper/expiry, and a `curl` quick test).

## How to run

```bash
# From the project folder (requires the .NET 8 SDK):
dotnet run        # Swagger at https://localhost:7090/swagger
```
