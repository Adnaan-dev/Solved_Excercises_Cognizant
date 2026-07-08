# Week 4 · Exercise 1 — Implement JWT Authentication in an ASP.NET Core Web API Microservice

> Project: `Microservices.Jwt` · Target framework: **.NET 8**
> Package: `Microsoft.AspNetCore.Authentication.JwtBearer` (+ `System.IdentityModel.Tokens.Jwt`)

## Scenario

A microservice needs secure login. This exercise implements **JWT (JSON Web
Token) bearer authentication**: a login endpoint validates credentials and
issues a signed token, and a protected endpoint accepts only requests that carry
a valid token.

The four steps from the sheet:

1. Create an ASP.NET Core Web API project.
2. Add a `User` model and a login endpoint.
3. Generate a JWT token on successful login.
4. Secure an endpoint with `[Authorize]`.

---

## How it maps to the code

| Step | Where |
|------|-------|
| Project + package | [`Microservices.Jwt.csproj`](./Microservices.Jwt.csproj) |
| `User` model + login `LoginModel` | [`Models/User.cs`](./Models/User.cs), [`Models/LoginModel.cs`](./Models/LoginModel.cs) |
| Login endpoint + token generation | [`Controllers/AuthController.cs`](./Controllers/AuthController.cs) |
| JWT validation wired into the pipeline | [`Program.cs`](./Program.cs) |
| Protected endpoint(s) with `[Authorize]` | [`Controllers/SecureController.cs`](./Controllers/SecureController.cs) |
| Signing settings | [`appsettings.json`](./appsettings.json) → `"Jwt"` section |

### Notes / deviations from the raw sheet
- **Config over hard-coding.** The sheet hard-codes the key/issuer/audience
  inside `GenerateJwtToken`. Here both the **signing** side (`AuthController`)
  and the **validating** side (`Program.cs`) read the `"Jwt"` section of
  `appsettings.json`, so the values can never drift apart.
- **Signing-key length.** The sheet's `"ThisIsASecretKeyForJwtToken"` is only 27
  bytes. Modern `Microsoft.IdentityModel` requires an HMAC-SHA256 key of **≥ 256
  bits (32 bytes)** or it throws `IDX10720` at runtime, so the key in
  `appsettings.json` is padded to a valid length. In production this secret
  belongs in a secret store / environment variable, never in source control.
- `Program.cs` uses the **.NET 8 minimal hosting model** (no `Startup.cs`), which
  is the modern equivalent of the sheet's snippet.

---

## Run it

```bash
cd "Week 4/1. Microservices - JWT"
dotnet run
```

Swagger UI opens at `https://localhost:7090/swagger` (or `http://localhost:5090/swagger`).

### Seeded users (in-memory)

| Username | Password      | Role  |
|----------|---------------|-------|
| `admin`  | `password123` | Admin |
| `alice`  | `alice@123`   | User  |

---

## Walkthrough

1. **Log in to get a token**
   ```http
   POST https://localhost:7090/api/auth/login
   Content-Type: application/json

   { "username": "admin", "password": "password123" }
   ```
   → `200 OK` with `{ "token": "<jwt>" }`. Wrong credentials → `401 Unauthorized`.

2. **Call the protected endpoint without a token**
   ```http
   GET https://localhost:7090/api/secure
   ```
   → `401 Unauthorized`.

3. **Call it with the token**
   Add header `Authorization: Bearer <jwt>` (in Swagger click **Authorize** and
   paste the token). → `200 OK` with a greeting and your role.

4. **Role-based check (`[Authorize(Roles = "Admin")]`)**
   - `GET /api/secure/admin` with the **admin** token → `200 OK`.
   - Log in as `alice` (role `User`) and call `/api/secure/admin` → `403 Forbidden`.

5. **Tamper / expiry** — change a character in the token → `401`; the token also
   expires after `Jwt:DurationInMinutes` (60) because `ValidateLifetime = true`.

---

## curl quick test

```bash
# 1) get a token
TOKEN=$(curl -sk -X POST https://localhost:7090/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"password123"}' | jq -r .token)

# 2) call the protected endpoint
curl -sk https://localhost:7090/api/secure -H "Authorization: Bearer $TOKEN"
```
