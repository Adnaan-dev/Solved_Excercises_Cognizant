-- ============================================================
-- Exercise: Return Data from a Stored Procedure
-- Employee Management System
-- Goal: Create a stored procedure that returns the total number of
--       employees in a department.
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
-- Step 1 & 2: Define the stored procedure with a DepartmentID parameter
--             and count the employees in that department.
-- Step 3: Save (create) the procedure by executing this batch.
-- ============================================================
GO
CREATE PROCEDURE dbo.sp_GetEmployeeCountByDepartment
    @DepartmentID INT
AS
BEGIN
    SET NOCOUNT ON;

    SELECT COUNT(*) AS TotalEmployees
    FROM Employees
    WHERE DepartmentID = @DepartmentID;
END;
GO

-- ============================================================
-- Test the stored procedure
-- ============================================================
EXEC dbo.sp_GetEmployeeCountByDepartment @DepartmentID = 1;
-- Expected result: TotalEmployees = 1 (only John Doe is in HR)

EXEC dbo.sp_GetEmployeeCountByDepartment @DepartmentID = 3;
-- Expected result: TotalEmployees = 1 (only Michael Johnson is in IT)
