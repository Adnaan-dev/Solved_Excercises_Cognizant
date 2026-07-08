using MicroservicesJwt.Models;

namespace MicroservicesJwt.Services;

// A tiny in-memory "user database" so the login endpoint has something to
// validate credentials against. In a real microservice this would be a call to
// a data store, and passwords would be salted + hashed.
public static class UserStore
{
    private static readonly List<User> Users = new()
    {
        new User { Id = 1, Username = "admin", Password = "password123", Role = "Admin" },
        new User { Id = 2, Username = "alice", Password = "alice@123",   Role = "User"  }
    };

    // Returns the matching user (used to build role/id claims) or null when the
    // credentials do not match — which the controller turns into a 401.
    public static User? Validate(string username, string password) =>
        Users.FirstOrDefault(u =>
            u.Username.Equals(username, StringComparison.OrdinalIgnoreCase) &&
            u.Password == password);
}
