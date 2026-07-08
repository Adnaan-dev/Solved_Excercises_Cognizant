using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace MicroservicesJwt.Controllers;

// Step 4: a secured resource.
//
// [Authorize] at the class level means EVERY action here needs a valid JWT:
//   * no token / bad / expired token  -> 401 Unauthorized
//   * valid token but wrong role      -> 403 Forbidden (see AdminOnly below)
[ApiController]
[Route("api/[controller]")]
[Authorize]
public class SecureController : ControllerBase
{
    // GET api/secure
    // Any authenticated user reaches this. We echo back who they are, read from
    // the token's claims that the JWT middleware populated on User.Identity.
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public IActionResult Get()
    {
        var username = User.Identity?.Name;
        var role = User.FindFirstValue(ClaimTypes.Role);

        return Ok(new
        {
            Message = $"Hello {username}, you have accessed a protected endpoint.",
            Role = role
        });
    }

    // GET api/secure/admin
    // Same authentication, but additionally requires the "Admin" role. A "User"
    // token reaches here with 403 Forbidden.
    [HttpGet("admin")]
    [Authorize(Roles = "Admin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public IActionResult AdminOnly() =>
        Ok(new { Message = "Hello Admin — this endpoint is restricted to the Admin role." });
}
