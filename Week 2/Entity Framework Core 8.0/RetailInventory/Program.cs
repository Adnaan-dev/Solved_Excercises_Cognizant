using Microsoft.EntityFrameworkCore;
using RetailInventory.Data;
using RetailInventory.Models;

// Use the invariant rupee symbol regardless of machine locale.
const string Rs = "\u20B9"; // ₹

Console.WriteLine("=== RetailInventory (EF Core 8.0) ===\n");

// Ensure the database/tables exist. In a real workflow you would instead run
// the EF Core CLI migrations from Lab 3:
//     dotnet ef migrations add InitialCreate
//     dotnet ef database update
// EnsureCreated() is used here so the demo runs end-to-end even before any
// migration is applied. (Do not mix EnsureCreated with migrations in prod.)
using (var setup = new AppDbContext())
{
    await setup.Database.EnsureCreatedAsync();
}

// ---------------------------------------------------------------------------
// LAB 4: Inserting Initial Data
// ---------------------------------------------------------------------------
await SeedDataAsync();

// ---------------------------------------------------------------------------
// LAB 5: Retrieving Data
// ---------------------------------------------------------------------------
await RetrieveDataAsync();

// ---------------------------------------------------------------------------
// LAB 6: Updating and Deleting Records
// ---------------------------------------------------------------------------
await UpdateAndDeleteAsync();

// ---------------------------------------------------------------------------
// LAB 7: Querying with LINQ
// ---------------------------------------------------------------------------
await LinqQueriesAsync();

Console.WriteLine("\n=== Done ===");


// ===========================================================================
// LAB 4: Inserting Initial Data into the Database
// Uses AddRangeAsync + SaveChangesAsync.
// ===========================================================================
async Task SeedDataAsync()
{
    Console.WriteLine("[Lab 4] Inserting initial data...");
    using var context = new AppDbContext();

    // Idempotent: only seed when the table is empty so re-runs don't duplicate.
    if (await context.Categories.AnyAsync())
    {
        Console.WriteLine("  Data already present - skipping seed.\n");
        return;
    }

    var electronics = new Category { Name = "Electronics" };
    var groceries = new Category { Name = "Groceries" };
    await context.Categories.AddRangeAsync(electronics, groceries);

    var product1 = new Product { Name = "Laptop", Price = 75000, Category = electronics };
    var product2 = new Product { Name = "Rice Bag", Price = 1200, Category = groceries };
    await context.Products.AddRangeAsync(product1, product2);

    // A few extra rows so the Lab 7 filter/sort queries are meaningful.
    await context.Products.AddRangeAsync(
        new Product { Name = "Smartphone", Price = 55000, Category = electronics },
        new Product { Name = "Cooking Oil", Price = 250, Category = groceries });

    await context.SaveChangesAsync();
    Console.WriteLine("  Inserted 2 categories and 4 products.\n");
}


// ===========================================================================
// LAB 5: Retrieving Data from the Database
// Uses ToListAsync, FindAsync, and FirstOrDefaultAsync.
// ===========================================================================
async Task RetrieveDataAsync()
{
    Console.WriteLine("[Lab 5] Retrieving data...");
    using var context = new AppDbContext();

    // 1. Retrieve all products.
    var products = await context.Products.ToListAsync();
    Console.WriteLine("  All products:");
    foreach (var p in products)
        Console.WriteLine($"    {p.Name} - {Rs}{p.Price}");

    // 2. Find by primary key.
    var byId = await context.Products.FindAsync(1);
    Console.WriteLine($"  FindAsync(1): {byId?.Name}");

    // 3. FirstOrDefault with a condition.
    var expensive = await context.Products.FirstOrDefaultAsync(p => p.Price > 50000);
    Console.WriteLine($"  First product over {Rs}50000: {expensive?.Name}\n");
}


// ===========================================================================
// LAB 6: Updating and Deleting Records
// ===========================================================================
async Task UpdateAndDeleteAsync()
{
    Console.WriteLine("[Lab 6] Updating and deleting...");
    using var context = new AppDbContext();

    // 1. Update a product's price.
    var laptop = await context.Products.FirstOrDefaultAsync(p => p.Name == "Laptop");
    if (laptop != null)
    {
        laptop.Price = 70000;
        await context.SaveChangesAsync();
        Console.WriteLine($"  Updated Laptop price to {Rs}{laptop.Price}.");
    }

    // 2. Delete a discontinued product.
    var toDelete = await context.Products.FirstOrDefaultAsync(p => p.Name == "Rice Bag");
    if (toDelete != null)
    {
        context.Products.Remove(toDelete);
        await context.SaveChangesAsync();
        Console.WriteLine("  Deleted 'Rice Bag'.\n");
    }
}


// ===========================================================================
// LAB 7: Writing Queries with LINQ
// Uses Where, OrderByDescending, and Select projection into a DTO.
// ===========================================================================
async Task LinqQueriesAsync()
{
    Console.WriteLine("[Lab 7] LINQ queries...");
    using var context = new AppDbContext();

    // 1. Filter and sort.
    var filtered = await context.Products
        .Where(p => p.Price > 1000)
        .OrderByDescending(p => p.Price)
        .ToListAsync();

    Console.WriteLine($"  Products over {Rs}1000 (desc):");
    foreach (var p in filtered)
        Console.WriteLine($"    {p.Name} - {Rs}{p.Price}");

    // 2. Project into a DTO (anonymous type with just Name + Price).
    var productDTOs = await context.Products
        .Select(p => new { p.Name, p.Price })
        .ToListAsync();

    Console.WriteLine("  Projected DTOs (Name, Price):");
    foreach (var dto in productDTOs)
        Console.WriteLine($"    {dto.Name}: {Rs}{dto.Price}");
}
