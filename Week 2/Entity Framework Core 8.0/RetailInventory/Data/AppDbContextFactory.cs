using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace RetailInventory.Data;

/// <summary>
/// Lab 3 support: design-time factory used by the EF Core CLI
/// (`dotnet ef migrations add ...` / `dotnet ef database update`).
/// The tools call this to build a DbContext without running Program.cs.
/// </summary>
public class AppDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
{
    public AppDbContext CreateDbContext(string[] args)
    {
        // The parameterless AppDbContext already reads appsettings.json
        // in OnConfiguring, so no extra configuration is needed here.
        return new AppDbContext();
    }
}
