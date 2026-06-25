using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using RetailInventory.Models;

namespace RetailInventory.Data;

/// <summary>
/// Lab 2 - Step 2: The EF Core DbContext.
/// A DbContext represents a session with the database. Each DbSet&lt;T&gt;
/// maps to a table and is the entry point for LINQ queries and CRUD.
/// </summary>
public class AppDbContext : DbContext
{
    // DbSet<Product> -> Products table (Lab 2 - Step 2).
    public DbSet<Product> Products => Set<Product>();

    // DbSet<Category> -> Categories table.
    public DbSet<Category> Categories => Set<Category>();

    // Parameterless ctor used by the app (Lab 4 uses `new AppDbContext()`).
    public AppDbContext() { }

    // Accepts options so the same context can be reused with DI / tests.
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    /// <summary>
    /// Lab 2 - Step 2 &amp; Step 3: configure the SQL Server provider.
    /// The connection string is read from appsettings.json instead of being
    /// hard-coded, so it can be changed without recompiling.
    /// </summary>
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        // If options were already provided (e.g. via DI/tests), don't override.
        if (optionsBuilder.IsConfigured)
            return;

        var configuration = new ConfigurationBuilder()
            .SetBasePath(AppContext.BaseDirectory)
            .AddJsonFile("appsettings.json", optional: true)
            .Build();

        var connectionString = configuration.GetConnectionString("DefaultConnection")
            // Sensible local default if appsettings.json is missing.
            ?? "Server=(localdb)\\MSSQLLocalDB;Database=RetailInventoryDb;Trusted_Connection=True;TrustServerCertificate=True;";

        optionsBuilder.UseSqlServer(connectionString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Be explicit about money precision to avoid silent truncation warnings.
        modelBuilder.Entity<Product>()
            .Property(p => p.Price)
            .HasPrecision(18, 2);

        base.OnModelCreating(modelBuilder);
    }
}
