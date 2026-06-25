-- ============================================================
-- SQL Exercise - Index
-- Database: Customers / Products / Orders / OrderDetails
-- ============================================================

-- ------------------------------------------------------------
-- Database Schema
-- ------------------------------------------------------------
CREATE TABLE Customers (
    CustomerID INT PRIMARY KEY,
    Name VARCHAR(100),
    Region VARCHAR(50)
);

CREATE TABLE Products (
    ProductID INT PRIMARY KEY,
    ProductName VARCHAR(100),
    Category VARCHAR(50),
    Price DECIMAL(10, 2)
);

CREATE TABLE Orders (
    OrderID INT,
    CustomerID INT,
    OrderDate DATE,
    -- Named constraints so Exercise 2 can deterministically drop/recreate them.
    CONSTRAINT PK_Orders PRIMARY KEY (OrderID),
    CONSTRAINT FK_Orders_Customers FOREIGN KEY (CustomerID)
        REFERENCES Customers(CustomerID)
);

CREATE TABLE OrderDetails (
    OrderDetailID INT PRIMARY KEY,
    OrderID INT,
    ProductID INT,
    Quantity INT,
    CONSTRAINT FK_OrderDetails_Orders FOREIGN KEY (OrderID)
        REFERENCES Orders(OrderID),
    CONSTRAINT FK_OrderDetails_Products FOREIGN KEY (ProductID)
        REFERENCES Products(ProductID)
);

-- ------------------------------------------------------------
-- Sample Data
-- ------------------------------------------------------------
INSERT INTO Customers (CustomerID, Name, Region) VALUES
(1, 'Alice', 'North'),
(2, 'Bob', 'South'),
(3, 'Charlie', 'East'),
(4, 'David', 'West');

INSERT INTO Products (ProductID, ProductName, Category, Price) VALUES
(1, 'Laptop', 'Electronics', 1200.00),
(2, 'Smartphone', 'Electronics', 800.00),
(3, 'Tablet', 'Electronics', 600.00),
(4, 'Headphones', 'Accessories', 150.00);

INSERT INTO Orders (OrderID, CustomerID, OrderDate) VALUES
(1, 1, '2023-01-15'),
(2, 2, '2023-02-20'),
(3, 3, '2023-03-25'),
(4, 4, '2023-04-30');

INSERT INTO OrderDetails (OrderDetailID, OrderID, ProductID, Quantity) VALUES
(1, 1, 1, 1),
(2, 2, 2, 2),
(3, 3, 3, 1),
(4, 4, 4, 3);

-- ============================================================
-- Exercise 1: Creating a Non-Clustered Index
-- Goal: Create a non-clustered index on the ProductName column in the
--       Products table and compare query execution time before and after.
-- ============================================================

-- Step 1: Query to fetch product details BEFORE index creation
-- Turn on statistics/execution plan to observe the cost.
SET STATISTICS TIME ON;
SET STATISTICS IO ON;

SELECT * FROM Products WHERE ProductName = 'Laptop';
-- Without an index, SQL Server performs a TABLE/CLUSTERED INDEX SCAN,
-- reading every row to find matches on ProductName.

-- Step 2: Create a non-clustered index on ProductName
CREATE NONCLUSTERED INDEX IX_Products_ProductName
    ON Products (ProductName);

-- Step 3: Query to fetch product details AFTER index creation
SELECT * FROM Products WHERE ProductName = 'Laptop';
-- With the index, SQL Server can perform an INDEX SEEK on ProductName,
-- jumping directly to matching rows (then a key lookup for SELECT *),
-- which reduces logical reads and execution time on larger tables.

SET STATISTICS TIME OFF;
SET STATISTICS IO OFF;

-- ============================================================
-- Exercise 2: Creating a Clustered Index
-- Goal: Create a clustered index on the OrderDate column in the Orders
--       table and compare query execution time before and after.
-- NOTE: A table can have only ONE clustered index. Orders already has a
--       clustered index from its PRIMARY KEY (OrderID). To add a clustered
--       index on OrderDate we first drop the PK's clustered index and
--       recreate the PK as NONCLUSTERED.
-- ============================================================

-- Step 1: Query to fetch orders BEFORE index creation
SET STATISTICS TIME ON;
SET STATISTICS IO ON;

SELECT * FROM Orders WHERE OrderDate = '2023-01-15';
-- The default PK on OrderID is clustered, so filtering by OrderDate
-- requires a CLUSTERED INDEX SCAN (no useful order on OrderDate).

-- Step 2: Create a clustered index on OrderDate
-- A table can hold only ONE clustered index, and OrderID's PRIMARY KEY is
-- clustered by default. Also, OrderDetails has a FOREIGN KEY referencing
-- Orders(OrderID), and you cannot drop a PK that is referenced by an FK.
-- So the full, runnable sequence is:
--   (a) drop the referencing FK in OrderDetails,
--   (b) drop the clustered PK on Orders,
--   (c) recreate the PK as NONCLUSTERED (OrderID stays unique),
--   (d) create the clustered index on OrderDate,
--   (e) restore the FK in OrderDetails.

-- (a)
ALTER TABLE OrderDetails DROP CONSTRAINT FK_OrderDetails_Orders;

-- (b)
ALTER TABLE Orders DROP CONSTRAINT PK_Orders;

-- (c)
ALTER TABLE Orders
    ADD CONSTRAINT PK_Orders PRIMARY KEY NONCLUSTERED (OrderID);

-- (d)
CREATE CLUSTERED INDEX IX_Orders_OrderDate
    ON Orders (OrderDate);

-- (e)
ALTER TABLE OrderDetails
    ADD CONSTRAINT FK_OrderDetails_Orders FOREIGN KEY (OrderID)
        REFERENCES Orders(OrderID);

-- Step 3: Query to fetch orders AFTER index creation
SELECT * FROM Orders WHERE OrderDate = '2023-01-15';
-- Now OrderDate drives the physical row order, so the query uses a
-- CLUSTERED INDEX SEEK and returns matching rows directly.

SET STATISTICS TIME OFF;
SET STATISTICS IO OFF;

-- ============================================================
-- Exercise 3: Creating a Composite Index
-- Goal: Create a composite index on CustomerID and OrderDate columns in
--       the Orders table and compare query execution time before/after.
-- ============================================================

-- Step 1: Query to fetch orders BEFORE index creation
SET STATISTICS TIME ON;
SET STATISTICS IO ON;

SELECT * FROM Orders WHERE CustomerID = 1 AND OrderDate = '2023-01-15';
-- Without a covering composite index, SQL Server must scan/seek and then
-- evaluate both predicates, doing more work than necessary.

-- Step 2: Create a composite index on CustomerID and OrderDate
-- Column order matters: list the most selective / most-filtered column
-- (or the equality column) first. CustomerID leads, then OrderDate.
CREATE NONCLUSTERED INDEX IX_Orders_CustomerID_OrderDate
    ON Orders (CustomerID, OrderDate);

-- Step 3: Query to fetch orders AFTER index creation
SELECT * FROM Orders WHERE CustomerID = 1 AND OrderDate = '2023-01-15';
-- The composite index lets SQL Server SEEK on (CustomerID, OrderDate)
-- in a single operation, minimizing logical reads and execution time.

SET STATISTICS TIME OFF;
SET STATISTICS IO OFF;

-- ============================================================
-- Tip: To actually SEE the difference, in SSMS enable
--   "Include Actual Execution Plan" (Ctrl+M) before running each query,
--   and compare the Scan vs Seek operators and the elapsed time printed
--   by SET STATISTICS TIME ON.
-- ============================================================
