-- ============================================================
-- Exercise: Execute a Stored Procedure
-- Employee Management System
-- Goal: Execute a stored procedure to retrieve employee details for a
--       specific department.
-- ============================================================

-- ------------------------------------------------------------
-- Database Schema
-- ------------------------------------------------------------
CREATE TABLE Departments (
    DepartmentID INT PRIMARY KEY,
    DepartmentName VARCHAR(100)
);

CREATE TABLE Employees (
    EmployeeID INT PRIMARY KEY,
    FirstName VARCHAR(50),
    LastName VARCHAR(50),
    DepartmentID INT FOREIGN KEY REFERENCES Departments(DepartmentID),
    Salary DECIMAL(10, 2),
    JoinDate DATE
);

-- ------------------------------------------------------------
-- Sample Data
-- ------------------------------------------------------------
INSERT INTO Departments (DepartmentID, DepartmentName) VALUES
(1, 'HR'),
(2, 'Finance'),
(3, 'IT'),
(4, 'Marketing');

INSERT INTO Employees (EmployeeID, FirstName, LastName, DepartmentID, Salary, JoinDate) VALUES
(1, 'John',    'Doe',     1, 5000.00, '2020-01-15'),
(2, 'Jane',    'Smith',   2, 6000.00, '2019-03-22'),
(3, 'Michael', 'Johnson', 3, 7000.00, '2018-07-30'),
(4, 'Emily',   'Davis',   4, 5500.00, '2021-11-05');

-- ============================================================
-- Step 0: Create the stored procedure that returns employee details
--         for a given DepartmentID. (Needed so it can be executed.)
-- ============================================================
GO
CREATE PROCEDURE dbo.sp_GetEmployeesByDepartment
    @DepartmentID INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT
        e.EmployeeID,
        e.FirstName,
        e.LastName,
        d.DepartmentName,
        e.Salary,
        e.JoinDate
    FROM Employees e
    INNER JOIN Departments d ON e.DepartmentID = d.DepartmentID
    WHERE e.DepartmentID = @DepartmentID;
END;
GO

-- ============================================================
-- Step 1 & 2: Execute the stored procedure with a DepartmentID parameter
--             and review the results.
-- ============================================================

-- Using a named parameter
EXEC dbo.sp_GetEmployeesByDepartment @DepartmentID = 3;
-- Expected: Michael Johnson | IT | 7000.00 | 2018-07-30

-- Shorthand (positional) execution
EXEC dbo.sp_GetEmployeesByDepartment 1;
-- Expected: John Doe | HR | 5000.00 | 2020-01-15
