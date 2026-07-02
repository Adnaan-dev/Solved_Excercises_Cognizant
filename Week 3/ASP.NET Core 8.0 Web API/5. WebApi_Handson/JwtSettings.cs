namespace WebApiJwt;

// The issuer, audience and signing key MUST match between the place that
// CREATES the token (AuthController.GenerateJSONWebToken) and the place that
// VALIDATES it (the AddJwtBearer setup in Program.cs). Keeping them here in one
// spot guarantees they stay in sync.
public static class JwtSettings
{
    public const string Issuer = "mySystem";
    public const string Audience = "myUsers";

    // The exercise uses the literal "mysuperdupersecret". On modern
    // Microsoft.IdentityModel libraries HMAC-SHA256 requires a key of at least
    // 256 bits (32 bytes); the original 18-character string is too short and
    // throws "IDX10720" at runtime. We therefore use a longer secret that keeps
    // the same spirit. (In real apps this belongs in a secret store, never in
    // source control.)
    public const string Key = "mysuperdupersecret_key_must_be_at_least_32_bytes!";
}
