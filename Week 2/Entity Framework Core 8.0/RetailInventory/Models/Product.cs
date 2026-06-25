namespace RetailInventory.Models;

/// <summary>
/// Lab 2 - Step 1: Product model.
/// Maps to a "Products" table. CategoryId is the foreign key column and
/// Category is the navigation property back to the owning Category.
/// </summary>
public class Product
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;

    // decimal maps to SQL Server decimal(18,2) by default for money values.
    public decimal Price { get; set; }

    // Foreign key column.
    public int CategoryId { get; set; }

    // Navigation property: many Products -> one Category.
    public Category? Category { get; set; }
}
