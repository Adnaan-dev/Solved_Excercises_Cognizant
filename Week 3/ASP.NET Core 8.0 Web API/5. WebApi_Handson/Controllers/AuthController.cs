using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace WebApiJwt.Controllers;

// AuthController issues JWTs. [AllowAnonymous] because you obviously cannot be
// authenticated yet when you are asking for your token.
[ApiController]
[Route("api/[controller]")]
[AllowAnonymous]
public class AuthController : ControllerBase
{
    // GET api/auth
    // Hands back a freshly minted JWT. For the exercise we hard-code userId 1
    // and the 'Admin' role into the claims.
    [HttpGet]
    [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
    public IActionResult Get()
    {
        var token = GenerateJSONWebToken(1, "Admin");
        return Ok(new { token });
    }

    // Builds a signed JWT containing the user's id and role as claims.
    private string GenerateJSONWebToken(int userId, string userRole)
    {
        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JwtSettings.Key));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Role, userRole),   // drives [Authorize(Roles=...)]
            new Claim("UserId", userId.ToString())
        };

        var token = new JwtSecurityToken(
            issuer: JwtSettings.Issuer,
            audience: JwtSettings.Audience,
            claims: claims,
            // Exercise step 3: token is valid for 2 minutes. After that, calls
            // protected endpoints return 401 because ValidateLifetime = true.
            expires: DateTime.Now.AddMinutes(2),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
