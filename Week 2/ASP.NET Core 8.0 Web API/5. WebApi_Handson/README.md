# Exercise 5 — JSON Web Token (JWT) authentication + CORS

> Project: `WebApiJwt` · Target framework: **.NET 8**
> Packages: `Microsoft.AspNetCore.Authentication.JwtBearer`, `System.IdentityModel.Tokens.Jwt`

This exercise replaces the hand-rolled `CustomAuthFilter` from Exercise 3 with
real **JWT bearer authentication**, adds **role-based authorization**, and
enables **CORS** for a local browser app.

---

## What is CORS and why enable it?

A browser enforces the **same-origin policy**: a page served from
`http://localhost:3000` is not allowed to call an API on `https://localhost:7084`
unless the API explicitly opts in via **CORS** (Cross-Origin Resource Sharing)
response headers. In `Program.cs` we register a named policy and apply it with
`app.UseCors(...)`:

```csharp
builder.Services.AddCors(o => o.AddPolicy("LocalAppPolicy", p =>
    p.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod()));
...
app.UseCors("LocalAppPolicy");
```

> In ASP.NET Core 8 the CORS services are built in, so there is no separate
> "Cors NuGet package" to install as the old sheet suggests.

## JWT setup (Program.cs)

`AddAuthentication(...).AddJwtBearer(...)` is configured exactly as in the sheet,
with `TokenValidationParameters` validating issuer, audience, lifetime and the
signing key. `app.UseAuthentication()` (before `UseAuthorization()`) plugs it
into the pipeline.

> **Signing-key note:** the sheet uses `"mysuperdupersecret"`. Modern
> `Microsoft.IdentityModel` requires an HMAC-SHA256 key of **≥ 256 bits
> (32 bytes)**, and that 18-character string is too short — it throws `IDX10720`
> at runtime. [`JwtSettings.cs`](./JwtSettings.cs) therefore uses a longer secret
> (same idea, valid length). The issuer (`mySystem`), audience (`myUsers`) and
> key are kept in that one shared class so the **creating** side
> (`AuthController`) and the **validating** side (`Program.cs`) always match.

## AuthController — generating the token

[`Controllers/AuthController.cs`](./Controllers/AuthController.cs) is marked
`[AllowAnonymous]` and exposes `GET /api/auth`, which calls the private
`GenerateJSONWebToken(userId, userRole)` with `1` / `"Admin"`. The role is put
into the token as a `ClaimTypes.Role` claim, which is what
`[Authorize(Roles=...)]` checks. The `expires` is set to **2 minutes**
(exercise step 3).

## EmployeeController — protecting the resource

```csharp
[Authorize(Roles = "POC,Admin")]
public class EmployeeController : ControllerBase { ... }
```

- No token / bad token → **401 Unauthorized**
- Valid token but role not in the list → **403 Forbidden**

## Walkthrough (Postman)

1. **Get a token:** `GET https://localhost:7084/api/auth` → copy the `token`.
2. **Call protected endpoint without it:** `GET /api/employee` → **401
   Unauthorized** (see the *Status* in the response **Headers** section).
3. **Add the token:** in Postman go to the **Authorization** tab → type
   **Bearer Token** → paste the token (or add header
   `Authorization: Bearer <token>`). Send → **200 OK** with the employee list.
4. **Tamper with the token:** change a character and resend → **401
   Unauthorized**.
5. **Expiry (step 3):** wait **2 minutes** after generating, then resend → **401
   Unauthorized** because `ValidateLifetime = true`.

### Role testing (step 4)
- Temporarily change the attribute to `[Authorize(Roles = "POC")]`. The `Admin`
  token now yields **401/403** (our token has only `Admin`).
- Change it back to `[Authorize(Roles = "POC,Admin")]`. The `Admin` token is
  accepted → **200 OK**.

> Tip: Swagger also works — click **Authorize**, paste the token, and the GET
> on `/api/employee` will then succeed.
