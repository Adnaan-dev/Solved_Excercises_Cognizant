-- ============================================================
-- Exercise: Return Data from a Scalar Function
-- Employee Management System
-- Goal: Return the annual salary for a specific employee using
--       fn_CalculateAnnualSalary.
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
    Salary DECIMAL(10, 2),       -- Monthly salary
    JoinDate DATE
);

-- ------------------------------------------------------------
-- Sample Data
-- ------------------------------------------------------------
INSERT INTO Departments (DepartmentID, DepartmentName) VALUES
(1, 'HR'),
(2, 'Finance'),
(3, 'IT');

INSERT INTO Employees (EmployeeID, FirstName, LastName, DepartmentID, Salary, JoinDate) VALUES
(1, 'John', 'Doe',     1, 5000.00, '2020-01-15'),
(2, 'Jane', 'Smith',   2, 6000.00, '2019-03-22'),
(3, 'Bob',  'Johnson', 3, 5500.00, '2021-07-01');

-- ============================================================
-- Step 0: Create the scalar function fn_CalculateAnnualSalary
-- A scalar function returns a single value. Here it returns the annual
-- salary (monthly Salary * 12) for a given EmployeeID.
-- ============================================================
GO
CREATE FUNCTION dbo.fn_CalculateAnnualSalary (@EmployeeID INT)
RETURNS DECIMAL(12, 2)
AS
BEGIN
    DECLARE @AnnualSalary DECIMAL(12, 2);

    SELECT @AnnualSalary = Salary * 12
    FROM Employees
    WHERE EmployeeID = @EmployeeID;

    RETURN @AnnualSalary;
END;
GO

-- ============================================================
-- Step 1: Execute the function for EmployeeID = 1
-- A scalar function is called inside a SELECT (schema-qualified).
-- ============================================================
SELECT dbo.fn_CalculateAnnualSalary(1) AS AnnualSalary;
-- Expected result: 60000.00  (5000.00 monthly * 12)

-- ============================================================
-- Step 2: Verify the result alongside employee details
-- ============================================================
SELECT
    EmployeeID,
    FirstName,
    LastName,
    Salary AS MonthlySalary,
    dbo.fn_CalculateAnnualSalary(EmployeeID) AS AnnualSalary
FROM Employees
WHERE EmployeeID = 1;
-- Expected: John Doe | MonthlySalary 5000.00 | AnnualSalary 60000.00
