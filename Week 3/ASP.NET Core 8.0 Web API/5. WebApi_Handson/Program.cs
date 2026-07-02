// ---------------------------------------------------------------------------
// Exercise 5 - JWT authentication + CORS.
//
// The exercise sheet shows the classic Startup.cs code; this is the .NET 8
// minimal-hosting equivalent. The issuer/audience/key all come from the shared
// JwtSettings class so the token-creating and token-validating sides match.
// ---------------------------------------------------------------------------

using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using WebApiJwt;

var builder = WebApplication.CreateBuilder(args);

// ----- CORS ---------------------------------------------------------------
// CORS (Cross-Origin Resource Sharing) lets a browser app served from another
// origin (e.g. http://localhost:3000) call this API. Without it the browser
// blocks the cross-origin request. Here we allow a sample local SPA origin.
const string CorsPolicy = "LocalAppPolicy";
builder.Services.AddCors(options =>
{
    options.AddPolicy(CorsPolicy, policy =>
        policy.WithOrigins("http://localhost:3000", "https://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

// ----- JWT authentication -------------------------------------------------
var symmetricSecurityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtSettings.Key));

builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, x =>
{
    x.TokenValidationParameters = new TokenValidationParameters
    {
        // what to validate
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,           // makes the 2-minute expiry enforce 401
        ValidateIssuerSigningKey = true,
        // values to validate against
        ValidIssuer = JwtSettings.Issuer,
        ValidAudience = JwtSettings.Audience,
        IssuerSigningKey = symmetricSecurityKey
    };
});

builder.Services.AddAuthorization();
builder.Services.AddControllers();

// ----- Swagger with a Bearer auth box -------------------------------------
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "JWT Secured Web API", Version = "v1" });

    // Adds the "Authorize" button in Swagger so you can paste the Bearer token.
    var scheme = new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Paste the JWT obtained from GET /api/auth (no 'Bearer ' prefix needed).",
        Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
    };
    c.AddSecurityDefinition("Bearer", scheme);
    c.AddSecurityRequirement(new OpenApiSecurityRequirement { [scheme] = Array.Empty<string>() });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "JWT Secured Web API"));

app.UseHttpsRedirection();

app.UseCors(CorsPolicy);

// Order matters: authentication (who are you?) before authorization (are you
// allowed?).
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
