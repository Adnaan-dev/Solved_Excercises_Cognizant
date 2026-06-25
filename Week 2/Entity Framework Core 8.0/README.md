# Entity Framework Core 8.0 — Retail Inventory (W2)

A single .NET 8 console application (`RetailInventory`) that works through all
seven EF Core 8.0 guided hands-on labs: ORM concepts, the `DbContext`, CLI
migrations, and full CRUD + LINQ against a SQL Server database.

```
Entity Framework Core 8.0 - W2/
└── RetailInventory/
    ├── RetailInventory.csproj      # net8.0 + EF Core 8.0.6 packages (Lab 1 )
    ├── appsettings.json            # SQL Server connection string (Lab 2 )
    ├── Models/
    │   ├── Category.cs             # Category entity (Lab 2 )
    │   └── Product.cs              # Product entity  (Lab 2 )
    ├── Data/
    │   ├── AppDbContext.cs         # DbContext + SQL Server config (Lab 2)
    │   └── AppDbContextFactory.cs  # design-time factory for EF CLI (Lab 3)
    └── Program.cs                  # Labs 4–7: insert, read, update/delete, LINQ
```

---

## Lab 1 — Understanding ORM with a Retail Inventory System

**1. What is ORM?**
Object-Relational Mapping is a technique that maps **C# classes to database
tables** and **object properties to columns**. Instead of writing raw SQL, you
work with strongly-typed objects (`Product`, `Category`) and the ORM translates
your LINQ/`SaveChanges` calls into SQL `SELECT`/`INSERT`/`UPDATE`/`DELETE`.

*Benefits*
- **Productivity** — no hand-written SQL or manual `DataReader` mapping.
- **Maintainability** — schema changes flow from C# models via migrations.
- **Abstraction** — the same code can target SQL Server, PostgreSQL, SQLite, etc.
- **Safety** — parameterised queries by default, reducing SQL-injection risk.

**2. EF Core vs EF Framework (EF6)**

| | EF Core 8 | EF6 (EF Framework) |
|---|---|---|
| Platform | Cross-platform (.NET 8) | Windows-only (.NET Framework) |
| Weight | Lightweight, modular | Heavier, monolithic |
| Features | LINQ, async, compiled queries, JSON columns | Mature but less flexible |
| Status | Actively evolving | Maintenance mode |

**3. EF Core 8.0 features**
- **JSON column mapping** — map owned/complex types to a single JSON column.
- **Compiled models** — faster startup for large models.
- **Interceptors** and **improved bulk operations** (`ExecuteUpdate` / `ExecuteDelete`).

**4 & 5. Create the app and install packages** (already done in this repo):

```bash
dotnet new console -n RetailInventory
cd RetailInventory
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Design
```

---

## Lab 2 — Database Context
- `Models/Category.cs` and `Models/Product.cs` define the entities.
- `Data/AppDbContext.cs` exposes `DbSet<Product>` / `DbSet<Category>` and
  configures the SQL Server provider in `OnConfiguring`. The connection string
  is read from **`appsettings.json`** rather than hard-coded.

## Lab 3 — EF Core CLI migrations

```bash
# one-time, if the CLI is not installed
dotnet tool install --global dotnet-ef

# from inside the RetailInventory folder
dotnet ef migrations add InitialCreate   # generates the Migrations/ folder
dotnet ef database update                # creates the DB + Products/Categories tables
```

`AppDbContextFactory` (an `IDesignTimeDbContextFactory`) lets the CLI build the
context at design time. Verify the `Products` and `Categories` tables in SSMS or
Azure Data Studio.

> The app also calls `EnsureCreatedAsync()` at startup so it runs end-to-end even
> before a migration is applied. In a real project pick **one** approach —
> migrations *or* `EnsureCreated` — not both.

## Labs 4–7 — implemented in `Program.cs`
- **Lab 4 — Insert:** `AddRangeAsync` + `SaveChangesAsync` (idempotent seed).
- **Lab 5 — Retrieve:** `ToListAsync`, `FindAsync`, `FirstOrDefaultAsync`.
- **Lab 6 — Update/Delete:** change a tracked entity then `Remove` + save.
- **Lab 7 — LINQ:** `Where` + `OrderByDescending`, and `Select` into a DTO.

---

## How to run

Requires the **.NET 8 SDK** and a reachable **SQL Server** instance (the default
connection string targets `(localdb)\MSSQLLocalDB`).

```bash
cd "Entity Framework Core 8.0 - W2/RetailInventory"

# optional: create the schema via migrations (Lab 3)
dotnet ef migrations add InitialCreate
dotnet ef database update

# run the labs 4–7 demo
dotnet run
```

Adjust `appsettings.json → ConnectionStrings:DefaultConnection` to point at your
own SQL Server if you are not using LocalDB.

### Expected output (approximate)

```
=== RetailInventory (EF Core 8.0) ===

[Lab 4] Inserting initial data...
  Inserted 2 categories and 4 products.

[Lab 5] Retrieving data...
  All products:
    Laptop - ₹75000
    Smartphone - ₹55000
    Rice Bag - ₹1200
    Cooking Oil - ₹250
  FindAsync(1): Laptop
  First product over ₹50000: Laptop

[Lab 6] Updating and deleting...
  Updated Laptop price to ₹70000.
  Deleted 'Rice Bag'.

[Lab 7] LINQ queries...
  Products over ₹1000 (desc):
    Laptop - ₹70000
    Smartphone - ₹55000
  Projected DTOs (Name, Price):
    Laptop: ₹70000
    Smartphone: ₹55000
    Cooking Oil: ₹250

=== Done ===
```

> **Note:** This project was authored on a machine without the .NET SDK, so it
> has not been compiled/run here. The code targets net8.0 / EF Core 8.0.6 and
> follows the lab specifications; run `dotnet build` / `dotnet run` locally to
> execute it.
