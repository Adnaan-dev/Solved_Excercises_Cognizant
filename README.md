<div align="center">

# 🎓 Solved Exercises — Cognizant Training

### A curated collection of hands-on exercises across **SQL**, **Java**, and **C#/.NET**

_Database engineering · Design patterns · Algorithms · Unit testing & mocking_

![SQL Server](https://img.shields.io/badge/SQL-T--SQL-CC2927?logo=microsoftsqlserver&logoColor=white)
![Java](https://img.shields.io/badge/Java-17-007396?logo=openjdk&logoColor=white)
![Maven](https://img.shields.io/badge/Build-Maven-C71A36?logo=apachemaven&logoColor=white)
![JUnit5](https://img.shields.io/badge/Tests-JUnit%205-25A162?logo=junit5&logoColor=white)
![.NET](https://img.shields.io/badge/.NET-Framework%204.8-512BD4?logo=dotnet&logoColor=white)
![NUnit](https://img.shields.io/badge/Tests-NUnit%20%2B%20Moq-004880)
![Tests](https://img.shields.io/badge/Java%20Tests-22%20passing-brightgreen)

</div>

---

## 📖 Overview

This repository contains all **12 completed exercises** of Week 1 Cognizant DeepSkilling, grouped into three technology
tracks. Every exercise includes a self-contained, runnable solution and inline
documentation explaining the concepts behind it. The Java solutions are backed by
an automated **JUnit 5** test suite (22 tests, all passing), the C# solutions use
**NUnit + Moq**, and the SQL solutions are written in **T-SQL (Microsoft SQL Server)**.

| Track | Exercises | Tooling |
|-------|:---------:|---------|
| 🗄️ **SQL** | 6 | T-SQL · SSMS |
| ☕ **Java** | 4 | Java 17 · Maven · JUnit 5 |
| 🟣 **C# / .NET** | 2 | .NET Framework 4.8 · NUnit · Moq |

---

## 🗂️ Repository Structure

```
Solved_Excercises_Cognizant/
│
├── 🗄️  SQL Exercise - Index/                  # Non-clustered, clustered & composite indexes
├── 🗄️  Create a Stored Procedure/             # Retrieve + insert stored procedures
├── 🗄️  Return Data from a Stored Procedure/   # Count employees by department
├── 🗄️  Execute a Stored Procedure/            # Invoke a procedure with parameters
├── 🗄️  Return Data from a Scalar Function/    # Annual salary scalar function
├── 🗄️  Ranking and Window Functions/          # ROW_NUMBER, RANK, DENSE_RANK, PARTITION BY
│
├── ☕  E-commerce Platform Search Function/    # Linear vs binary search  (Maven · JUnit)
├── ☕  Financial Forecasting/                  # Recursion & memoization  (Maven · JUnit)
├── ☕  Implementing the Factory Method Pattern/# Creational design pattern (Maven · JUnit)
├── ☕  Implementing the Singleton Pattern/     # Creational design pattern (Maven · JUnit)
│
├── 🟣  1. NUnit-Handson/                       # Unit testing fundamentals (NUnit)
├── 🟣  1. Moq-Handson/                         # Mocking & dependency injection (Moq)
│
└── .gitignore
```

> Each Java/C# folder follows the standard `src/main` + `src/test` layout and ships
> with its own build file (`pom.xml` or `.sln`/`.csproj`) and a local `README.md`.

---

## 🗄️ SQL Track

> **Dialect:** T-SQL (Microsoft SQL Server). Run the `.sql` files in **SQL Server
> Management Studio (SSMS)** or Azure Data Studio. Each script is self-contained —
> it creates its own schema and sample data before the exercise.

### 1. SQL Exercise — Index
**Goal:** Improve query performance with indexes and compare execution before/after.

| Sub-exercise | Concept | What the solution does |
|---|---|---|
| Non-clustered index | `CREATE NONCLUSTERED INDEX` | Indexes `Products.ProductName`; turns a table scan into an index seek |
| Clustered index | `CREATE CLUSTERED INDEX` | Re-clusters `Orders` on `OrderDate` — correctly drops the FK + clustered PK, recreates the PK as **nonclustered**, then restores the FK |
| Composite index | multi-column index | Indexes `Orders(CustomerID, OrderDate)` so a two-predicate query seeks in one operation |

`SET STATISTICS TIME/IO ON` is used throughout so the scan-vs-seek improvement is measurable.
📄 [`SQL_Exercise_Index.sql`](./SQL%20Exercise%20-%20Index/SQL_Exercise_Index.sql)

### 2. Create a Stored Procedure
**Goal:** Build procedures to **retrieve** and **insert** employee data.
Implements `sp_GetEmployeesByDepartment` (parameterised, joined to `Departments`) and
`sp_InsertEmployee`, with usage examples.
📄 [`employee_management_procedures.sql`](./Create%20a%20Stored%20Procedure/employee_management_procedures.sql)

### 3. Return Data from a Stored Procedure
**Goal:** Return the total number of employees in a department.
`sp_GetEmployeeCountByDepartment @DepartmentID` returns a `COUNT(*)` result set.
📄 [`Return_Data_Stored_Procedure.sql`](./Return%20Data%20from%20a%20Stored%20Procedure/Return_Data_Stored_Procedure.sql)

### 4. Execute a Stored Procedure
**Goal:** Execute a procedure and review the results.
Defines `sp_GetEmployeesByDepartment` and demonstrates **named** and **positional**
execution syntax.
📄 [`Execute_Stored_Procedure.sql`](./Execute%20a%20Stored%20Procedure/Execute_Stored_Procedure.sql)

### 5. Return Data from a Scalar Function
**Goal:** Return the annual salary for a specific employee.
`fn_CalculateAnnualSalary(@EmployeeID)` returns `Salary * 12` (e.g. employee 1 → **60000.00**),
shown both standalone and joined with employee details.
📄 [`Return_Data_Scalar_Function.sql`](./Return%20Data%20from%20a%20Scalar%20Function/Return_Data_Scalar_Function.sql)

### 6. Ranking and Window Functions
**Goal:** Rank rows within groups using window functions.
Demonstrates `ROW_NUMBER()`, `RANK()`, and `DENSE_RANK()` with `OVER (PARTITION BY …)`,
and solves *"top 3 most expensive products per category"* via a CTE — with a side-by-side
comparison of how each function treats ties.
📄 [`ranking_window_functions.sql`](./Ranking%20and%20Window%20Functions/ranking_window_functions.sql)

---

## ☕ Java Track

> **Build & test:** Java 17 + Maven. Each folder is an independent Maven project.
> From inside any Java folder run `mvn test`.

| Exercise | Focus | Key Concepts | Tests |
|---|---|---|:---:|
| **E-commerce Platform Search Function** | Algorithms | Linear `O(n)` vs Binary `O(log n)` search, case-insensitive matching, comparison counting | ✅ 6 |
| **Financial Forecasting** | Recursion | Recursive future-value, variable growth rates, **memoization** vs naïve trend | ✅ 5 |
| **Implementing the Factory Method Pattern** | Design Pattern | Abstract factory method, concrete factories (Word/PDF/Excel), provider with enum + error handling | ✅ 7 |
| **Implementing the Singleton Pattern** | Design Pattern | Eager, Lazy (synchronized) & **Bill Pugh** singletons, thread-safety verification | ✅ 4 |

<div align="center"><strong>Total: 22 JUnit 5 tests — all passing ✅</strong></div>

Each project keeps its runnable demo (`*Demo` / `*Application`) **and** a proper
assertion-based JUnit test class, so reviewers can see both the behaviour and its verification.

---

## 🟣 C# / .NET Track

> **Framework:** .NET Framework 4.8. Open the `.sln` in **Visual Studio** and run via
> Test Explorer, or use `dotnet test` (Windows + .NET Framework targeting pack).

### 1. NUnit Hands-on
**Goal:** Write your first unit tests for a calculator's addition operation.
- `CalcLibrary` — the unit under test (`SimpleCalculator`).
- `CalculatorTests` — uses `[TestFixture]`, `[SetUp]`, `[TearDown]`, parameterised
  `[TestCase]`, `[Ignore]`, and `Assert.That(actual, Is.EqualTo(expected))`.
- Covers unit vs functional testing, testing types, and loosely-coupled/testable design.

📁 [`1. NUnit-Handson`](./1.%20NUnit-Handson/) · [details](./1.%20NUnit-Handson/README.md)

### 2. Moq Hands-on
**Goal:** Make untestable mail-server code testable using **dependency injection + mocking**.
- `CustomerCommLib` — `IMailSender` abstraction, real `MailSender` (SMTP, not testable),
  and `CustomerComm` which receives `IMailSender` via **constructor injection**.
- `CustomerComm.Tests` — mocks `IMailSender` with **Moq** (`It.IsAny<string>()` → `true`),
  using `[TestFixture]`, `[OneTimeSetUp]`, `[TestCase]`, then asserts the result is `true`.
- Covers mocking/isolation, stub vs fake vs mock, DI, and the TDD advantage.

📁 [`1. Moq-Handson`](./1.%20Moq-Handson/) · [details](./1.%20Moq-Handson/README.md)

---

## 🚀 How to Run

<details>
<summary><strong>🗄️ SQL exercises</strong></summary>

1. Open the `.sql` file in **SSMS** or **Azure Data Studio**.
2. Connect to a SQL Server instance.
3. Execute the whole script (it creates schema + sample data, then runs the exercise).
4. For the Index exercise, enable **Include Actual Execution Plan** (`Ctrl+M`) to see scan → seek.

</details>

<details>
<summary><strong>☕ Java exercises (Maven)</strong></summary>

```bash
# From inside any Java exercise folder:
mvn test          # compile + run the JUnit 5 test suite
mvn -q test       # quieter output
```
Requires **JDK 17+** and **Maven 3.9+**.

</details>

<details>
<summary><strong>🟣 C# / .NET exercises</strong></summary>

```bash
# Visual Studio: open the .sln, build, run Test Explorer.
# Or via CLI on Windows (with the .NET SDK + .NET Framework 4.8 targeting pack):
dotnet test "1. NUnit-Handson/NUnitHandson.sln"
dotnet test "1. Moq-Handson/MoqHandson.sln"
```

</details>

---

## ✅ Verification Status

| Track | Verified | Method |
|-------|----------|--------|
| Java | ✅ All 22 tests pass | `mvn test` executed locally (JDK 17, Maven 3.9) |
| SQL | ✅ Reviewed | T-SQL inspected for correctness; run in SSMS to execute |
| C#/.NET | ⚙️ Inspected | Standard NUnit/Moq on net48; build in Visual Studio to run |

---

## 🛠️ Tech Stack

`T-SQL` · `Microsoft SQL Server` · `Java 17` · `Maven` · `JUnit 5` ·
`C#` · `.NET Framework 4.8` · `NUnit` · `Moq`

---

<div align="center">

_Built as part of Cognizant training — each exercise is self-contained, documented, and runnable._

⭐ _Explore any folder's local `README.md` for a deeper dive into that exercise._

</div>
