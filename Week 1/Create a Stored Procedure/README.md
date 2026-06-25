# Employee Management System - Create a Stored Procedure

**Goal:** Create stored procedures for an Employee Management System — one to
retrieve employee details by department, and one to insert new employees.

**Dialect:** T-SQL (Microsoft SQL Server).

## Files
- `employee_management_procedures.sql` — schema, sample data, and both stored
  procedures with usage examples.

## What the script does

1. **Schema** — creates `Departments` and `Employees` tables. `EmployeeID` uses
   `IDENTITY(1,1)` so SQL Server auto-generates the primary key on insert.
2. **Sample data** — inserts the 4 departments and 4 employees from the brief.
3. **`sp_GetEmployeesByDepartment`** (Steps 1 & 2) — takes a `@DepartmentID`
   parameter and returns the matching employees joined to their department name.
4. **`sp_InsertEmployee`** (Step 3) — inserts a new employee from the five
   provided parameters.

## Stored Procedures

### `sp_GetEmployeesByDepartment @DepartmentID INT`
Returns `EmployeeID, FirstName, LastName, DepartmentName, Salary, JoinDate` for
all employees in the given department, ordered by name. It joins `Employees` to
`Departments` so the human-readable department name is included.

```sql
EXEC sp_GetEmployeesByDepartment @DepartmentID = 3;   -- IT department
```

### `sp_InsertEmployee @FirstName, @LastName, @DepartmentID, @Salary, @JoinDate`
Inserts a new employee. `EmployeeID` is generated automatically.

```sql
EXEC sp_InsertEmployee
    @FirstName = 'Sarah', @LastName = 'Connor',
    @DepartmentID = 2, @Salary = 6200.00, @JoinDate = '2023-04-10';
```

## Notes
- `SET NOCOUNT ON;` suppresses the "rows affected" messages, which is good
  practice inside stored procedures.
- Parameters are typed, so SQL Server validates input and the queries are
  parameterized (protecting against SQL injection).
- `GO` is a batch separator used by SQL Server tools (SSMS / Azure Data Studio /
  sqlcmd); `CREATE PROCEDURE` must be the first statement in its batch.

## How to Run
Open `employee_management_procedures.sql` in SQL Server Management Studio,
Azure Data Studio, or run it with `sqlcmd`, and execute it top to bottom against
a SQL Server database. The schema and sample data are created first, then the
procedures, then the usage examples demonstrate them.
