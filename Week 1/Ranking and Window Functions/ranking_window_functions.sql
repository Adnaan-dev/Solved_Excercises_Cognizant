-- ============================================================================
-- SQL Exercise - Advanced Concepts: Ranking & Window Functions
-- Goal: ROW_NUMBER(), RANK(), DENSE_RANK(), OVER(), PARTITION BY
-- Scenario: Find the top 3 most expensive products in each category.
-- Dialect: Standard SQL (tested patterns work in SQL Server, PostgreSQL,
--          MySQL 8+, SQLite 3.25+, Oracle).
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Setup: sample Products table
-- ----------------------------------------------------------------------------
CREATE TABLE Products (
    ProductID    INT PRIMARY KEY,
    ProductName  VARCHAR(100),
    Category     VARCHAR(50),
    Price        DECIMAL(10, 2)
);

INSERT INTO Products (ProductID, ProductName, Category, Price) VALUES
    (1,  'Laptop Pro',      'Electronics', 1500.00),
    (2,  'Smartphone X',    'Electronics', 1200.00),
    (3,  'Tablet Air',      'Electronics', 1200.00),  -- tie with Smartphone X
    (4,  'Wireless Buds',   'Electronics',  200.00),
    (5,  'HD Monitor',      'Electronics',  300.00),
    (6,  'Office Chair',    'Furniture',     450.00),
    (7,  'Standing Desk',   'Furniture',     650.00),
    (8,  'Bookshelf',       'Furniture',     250.00),
    (9,  'Filing Cabinet',  'Furniture',     250.00),  -- tie with Bookshelf
    (10, 'Coffee Beans',    'Grocery',        25.00),
    (11, 'Olive Oil',       'Grocery',        18.00),
    (12, 'Green Tea',       'Grocery',        12.00);

-- ----------------------------------------------------------------------------
-- Step 1 & 3: ROW_NUMBER() with PARTITION BY Category ORDER BY Price DESC
-- Assigns a UNIQUE sequential number within each category. Ties are broken
-- arbitrarily (here, by ProductID as a tie-breaker for determinism).
-- ----------------------------------------------------------------------------
SELECT
    ProductName,
    Category,
    Price,
    ROW_NUMBER() OVER (PARTITION BY Category ORDER BY Price DESC, ProductID) AS RowNum
FROM Products
ORDER BY Category, RowNum;

-- ----------------------------------------------------------------------------
-- Step 2 & 3: Compare ROW_NUMBER vs RANK vs DENSE_RANK on the same window.
-- This makes the difference in tie-handling obvious side by side.
--   ROW_NUMBER : 1,2,3,4...        (always unique, no gaps)
--   RANK       : ties share a rank, then SKIP numbers (1,2,2,4)
--   DENSE_RANK : ties share a rank, NO gaps           (1,2,2,3)
-- ----------------------------------------------------------------------------
SELECT
    ProductName,
    Category,
    Price,
    ROW_NUMBER() OVER (PARTITION BY Category ORDER BY Price DESC) AS RowNumber,
    RANK()       OVER (PARTITION BY Category ORDER BY Price DESC) AS RankValue,
    DENSE_RANK() OVER (PARTITION BY Category ORDER BY Price DESC) AS DenseRankValue
FROM Products
ORDER BY Category, Price DESC;

-- ----------------------------------------------------------------------------
-- Goal query: Top 3 most expensive products in EACH category.
-- A window function cannot be used directly in WHERE, so we wrap it in a CTE
-- and filter on the computed rank.
--
-- Using ROW_NUMBER => returns EXACTLY 3 rows per category (ties broken).
-- ----------------------------------------------------------------------------
WITH RankedProducts AS (
    SELECT
        ProductName,
        Category,
        Price,
        ROW_NUMBER() OVER (PARTITION BY Category ORDER BY Price DESC, ProductID) AS rn
    FROM Products
)
SELECT ProductName, Category, Price
FROM RankedProducts
WHERE rn <= 3
ORDER BY Category, Price DESC;

-- ----------------------------------------------------------------------------
-- Alternative "Top 3" using DENSE_RANK => INCLUDES tied products, so a
-- category may return more than 3 rows if several share the 3rd-place price.
-- Choose this when "top 3 price levels" matters more than "exactly 3 rows".
-- ----------------------------------------------------------------------------
WITH RankedProducts AS (
    SELECT
        ProductName,
        Category,
        Price,
        DENSE_RANK() OVER (PARTITION BY Category ORDER BY Price DESC) AS dr
    FROM Products
)
SELECT ProductName, Category, Price, dr AS PriceRank
FROM RankedProducts
WHERE dr <= 3
ORDER BY Category, Price DESC;
