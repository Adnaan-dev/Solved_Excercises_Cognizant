namespace RetailInventory.Models;

/// <summary>
/// Lab 2 - Step 1: Category model.
/// ORM (Lab 1) maps this C# class to a "Categories" table.
/// Each property becomes a column; the Products navigation property
/// becomes a one-to-many relationship (a Category has many Products).
/// </summary>
public class Category
{
    // Primary key. EF Core convention: a property named "Id" (or "CategoryId")
    // is treated as the PK and configured as IDENTITY in SQL Server.
    public int Id { get; set; }

    // Required by convention in .NET 8 (non-nullable reference type).
    public string Name { get; set; } = string.Empty;

    // Navigation property: one Category -> many Products.
    public List<Product> Products { get; set; } = new();
}
