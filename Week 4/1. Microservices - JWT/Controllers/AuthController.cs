using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MicroservicesJwt.Models;
using MicroservicesJwt.Services;

namespace MicroservicesJwt.Controllers;

// Step 2 & 3: the login endpoint that mints a JWT.
//
// [AllowAnonymous] because you cannot present a token yet when you are asking
// for one. The sheet hard-codes the issuer/audience/key inside the controller;
// here we read them from IConfiguration ("Jwt" section of appsettings.json) so
// the signing values cannot drift from the ones the validator in Program.cs
// uses.
[ApiController]
[Route("api/[controller]")]
[AllowAnonymous]
public class AuthController : ControllerBase
{
    private readonly IConfiguration _config;

    public AuthController(IConfiguration config) => _config = config;

    // POST api/auth/login
    // Body: { "username": "admin", "password": "password123" }
    [HttpPost("login")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public IActionResult Login([FromBody] LoginModel model)
    {
        var user = IsValidUser(model);
        if (user is not null)
        {
            var token = GenerateJwtToken(user);
            return Ok(new { Token = token });
        }

        // Bad credentials -> 401 (exactly as the exercise's Unauthorized()).
        return Unauthorized();
    }

    // Validates the posted credentials against the in-memory user store.
    // Returns the User (so we can put its role/id in the token) or null.
    private static User? IsValidUser(LoginModel model) =>
        UserStore.Validate(model.Username, model.Password);

    // Step 3: build and sign the JWT. The claims carry the identity (Name) plus
    // the role and id so protected endpoints can use [Authorize]/[Authorize(Roles=...)].
    private string GenerateJwtToken(User user)
    {
        var jwt = _config.GetSection("Jwt");

        var claims = new[]
        {
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Role, user.Role),
            new Claim("UserId", user.Id.ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwt["Key"]!));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: jwt["Issuer"],
            audience: jwt["Audience"],
            claims: claims,
            expires: DateTime.Now.AddMinutes(int.Parse(jwt["DurationInMinutes"]!)),
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
