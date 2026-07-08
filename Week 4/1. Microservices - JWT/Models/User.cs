namespace MicroservicesJwt.Models;

// Step 2 of the exercise: a User model. This represents an account known to the
// microservice. In a real system these would live in a database with a HASHED
// password (never plain text) — here it is kept in memory for the exercise.
public class User
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string Role { get; set; } = "User";
}
