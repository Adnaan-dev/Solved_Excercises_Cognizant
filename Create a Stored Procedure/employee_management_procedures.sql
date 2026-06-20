-- ============================================================================
-- Employee Management System - Exercise 1: Create a Stored Procedure
-- Goal: Create stored procedures to retrieve and insert employee data.
-- Dialect: T-SQL (Microsoft SQL Server)
-- ============================================================================

-- ----------------------------------------------------------------------------
-- Database Schema
-- ----------------------------------------------------------------------------
CREATE TABLE Departments (
    DepartmentID   INT PRIMARY KEY,
    DepartmentName VARCHAR(100)
);

CREATE TABLE Employees (
    EmployeeID   INT PRIMARY KEY IDENTITY(1,1),
    FirstName    VARCHAR(50),
    LastName     VARCHAR(50),
    DepartmentID INT FOREIGN KEY REFERENCES Departments(DepartmentID),
    Salary       DECIMAL(10, 2),
    JoinDate     DATE
);
GO

-- ----------------------------------------------------------------------------
-- Sample Data
-- ----------------------------------------------------------------------------
INSERT INTO Departments (DepartmentID, DepartmentName) VALUES
    (1, 'HR'),
    (2, 'Finance'),
    (3, 'IT'),
    (4, 'Marketing');

-- EmployeeID is IDENTITY, so we insert the remaining columns only.
INSERT INTO Employees (FirstName, LastName, DepartmentID, Salary, JoinDate) VALUES
    ('John',    'Doe',     1, 5000.00, '2020-01-15'),
    ('Jane',    'Smith',   2, 6000.00, '2019-03-22'),
    ('Michael', 'Johnson', 3, 7000.00, '2018-07-30'),
    ('Emily',   'Davis',   4, 5500.00, '2021-11-05');
GO

-- ----------------------------------------------------------------------------
-- Step 1 & 2: Stored procedure to retrieve employee details by department.
-- Parameter: @DepartmentID
-- ----------------------------------------------------------------------------
CREATE PROCEDURE sp_GetEmployeesByDepartment
    @DepartmentID INT
AS
BEGIN
    SET NOCOUNT ON;   -- suppress "rows affected" messages

    SELECT
        e.EmployeeID,
        e.FirstName,
        e.LastName,
        d.DepartmentName,
        e.Salary,
        e.JoinDate
    FROM Employees e
    INNER JOIN Departments d ON e.DepartmentID = d.DepartmentID
    WHERE e.DepartmentID = @DepartmentID
    ORDER BY e.LastName, e.FirstName;
END;
GO

-- ----------------------------------------------------------------------------
-- Step 3: Stored procedure to insert a new employee (as specified).
-- ----------------------------------------------------------------------------
CREATE PROCEDURE sp_InsertEmployee
    @FirstName    VARCHAR(50),
    @LastName     VARCHAR(50),
    @DepartmentID INT,
    @Salary       DECIMAL(10, 2),
    @JoinDate     DATE
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO Employees (FirstName, LastName, DepartmentID, Salary, JoinDate)
    VALUES (@FirstName, @LastName, @DepartmentID, @Salary, @JoinDate);
END;
GO

-- ----------------------------------------------------------------------------
-- Usage examples
-- ----------------------------------------------------------------------------

-- Retrieve all employees in the IT department (DepartmentID = 3):
EXEC sp_GetEmployeesByDepartment @DepartmentID = 3;

-- Insert a new employee into Finance (DepartmentID = 2):
EXEC sp_InsertEmployee
    @FirstName    = 'Sarah',
    @LastName     = 'Connor',
    @DepartmentID = 2,
    @Salary       = 6200.00,
    @JoinDate     = '2023-04-10';

-- Verify the insert by listing Finance employees:
EXEC sp_GetEmployeesByDepartment @DepartmentID = 2;
GO
