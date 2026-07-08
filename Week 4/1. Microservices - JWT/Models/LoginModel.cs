using System.ComponentModel.DataAnnotations;

namespace MicroservicesJwt.Models;

// The payload posted to POST /api/auth/login. This is the exact shape the
// exercise's AuthController.Login([FromBody] LoginModel model) expects.
public class LoginModel
{
    [Required]
    public string Username { get; set; } = string.Empty;

    [Required]
    public string Password { get; set; } = string.Empty;
}
