<div align="center">

# 🎓 Solved Exercises — Cognizant Training

### Hands-on exercises across **SQL**, **Java**, and **C# / .NET**

_Database engineering · Design patterns · Algorithms · Unit testing & mocking · EF Core · ASP.NET Core Web API_

![SQL Server](https://img.shields.io/badge/SQL-T--SQL-CC2927?logo=microsoftsqlserver&logoColor=white)
![Java](https://img.shields.io/badge/Java-17-007396?logo=openjdk&logoColor=white)
![Maven](https://img.shields.io/badge/Build-Maven-C71A36?logo=apachemaven&logoColor=white)
![JUnit5](https://img.shields.io/badge/Tests-JUnit%205-25A162?logo=junit5&logoColor=white)
![.NET](https://img.shields.io/badge/.NET-8.0%20%2F%20Framework%204.8-512BD4?logo=dotnet&logoColor=white)
![EF Core](https://img.shields.io/badge/EF%20Core-8.0-512BD4)
![NUnit](https://img.shields.io/badge/Tests-NUnit%20%2B%20Moq-004880)
![Java Tests](https://img.shields.io/badge/Java%20Tests-22%20passing-brightgreen)

</div>

---

## 📖 Overview

This repository collects the completed **Cognizant DeepSkilling** exercises, organised
into three weekly tracks. Every exercise is a **self-contained, runnable solution** with
inline documentation explaining the concept behind it.

- **Week 1** — SQL fundamentals (T-SQL), core Java (algorithms, recursion, design
  patterns) backed by a **JUnit 5** suite, and C# unit-testing basics with **NUnit + Moq**.
- **Week 2** — **Entity Framework Core 8.0** (a full ORM + CRUD + LINQ console app) and a
  six-part **ASP.NET Core 8.0 Web API** hands-on series ending in a Kafka chat app.
- **Week 3** — a further **ASP.NET Core 8.0 Web API** set.

| Week | Track | Content | Tooling |
|:---:|-------|---------|---------|
| 1 | 🗄️ SQL | 6 exercises | T-SQL · SSMS |
| 1 | ☕ Java | 4 Maven projects (22 JUnit 5 tests) | Java 17 · Maven · JUnit 5 |
| 1 | 🟣 C# | 2 hands-on (NUnit, Moq) | .NET Framework 4.8 · NUnit · Moq |
| 2 | 🟣 EF Core | 1 console app (7 labs) | .NET 8 · EF Core 8 · SQL Server |
| 2 | 🟣 Web API | 6 hands-on projects | .NET 8 · Swagger · JWT · Kafka |
| 3 | 🟣 Web API | 6 hands-on projects | .NET 8 · Swagger · JWT · Kafka |



---

## 🗂️ Repository Structure

```
Solved_Excercises_Cognizant/
│
├── Week 1/
│   ├── 🗄️ SQL Exercise - Index/                   # Non-clustered, clustered & composite indexes
│   ├── 🗄️ Create a Stored Procedure/              # Retrieve + insert stored procedures
│   ├── 🗄️ Return Data from a Stored Procedure/    # Count employees by department
│   ├── 🗄️ Execute a Stored Procedure/             # Invoke a procedure with parameters
│   ├── 🗄️ Return Data from a Scalar Function/     # Annual salary scalar function
│   ├── 🗄️ Ranking and Window Functions/           # ROW_NUMBER, RANK, DENSE_RANK, PARTITION BY
│   │
│   ├── ☕ E-commerce Platform Search Function/     # Linear vs binary search  (Maven · JUnit)
│   ├── ☕ Financial Forecasting/                   # Recursion & memoization  (Maven · JUnit)
│   ├── ☕ Implementing the Factory Method Pattern/ # Creational design pattern (Maven · JUnit)
│   ├── ☕ Implementing the Singleton Pattern/      # Creational design pattern (Maven · JUnit)
│   │
│   ├── 🟣 1. NUnit-Handson/                        # Unit testing fundamentals (NUnit)
│   └── 🟣 1. Moq-Handson/                          # Mocking & dependency injection (Moq)
│
├── Week 2/
│   ├── 🟣 Entity Framework Core 8.0/               # RetailInventory console app (7 EF Core labs)
│   └── 🟣 ASP.NET Core 8.0 Web API/                # 6 Web API hands-on (Swagger, filters, JWT, Kafka)
│
├── Week 3/
│   └── 🟣 ASP.NET Core 8.0 Web API/                # 6 Web API hands-on (currently mirrors Week 2)
│
├── .github/
└── .gitignore
```

> Each Java/C# folder follows the standard layout and ships with its own build file
> (`pom.xml`, `.sln` or `.csproj`) and a local `README.md` with a deeper walkthrough.

---

## 🗄️ Week 1 · SQL Track

> **Dialect:** T-SQL (Microsoft SQL Server). Run the `.sql` files in **SQL Server
> Management Studio (SSMS)** or Azure Data Studio. Each script is self-contained — it
> creates its own schema and sample data before the exercise.

| # | Exercise | Concepts |
|:-:|----------|----------|
| 1 | **SQL Exercise — Index** | Non-clustered, clustered (drops FK + clustered PK, recreates PK as nonclustered, restores FK) and composite indexes; scan → seek comparison with `SET STATISTICS TIME/IO` |
| 2 | **Create a Stored Procedure** | `sp_GetEmployeesByDepartment` (parameterised, joined) + `sp_InsertEmployee` |
| 3 | **Return Data from a Stored Procedure** | `sp_GetEmployeeCountByDepartment` returns a `COUNT(*)` result set |
| 4 | **Execute a Stored Procedure** | Named vs positional execution syntax |
| 5 | **Return Data from a Scalar Function** | `fn_CalculateAnnualSalary` → `Salary * 12` (employee 1 → 60000.00) |
| 6 | **Ranking and Window Functions** | `ROW_NUMBER()`, `RANK()`, `DENSE_RANK()` with `OVER (PARTITION BY …)`; "top 3 per category" via a CTE |

---

## ☕ Week 1 · Java Track

> **Build & test:** Java 17 + Maven. Each folder is an independent Maven project.
> From inside any Java folder run `mvn test`.

| Exercise | Focus | Key Concepts | Tests |
|----------|-------|--------------|:-----:|
| **E-commerce Platform Search Function** | Algorithms | Linear `O(n)` vs Binary `O(log n)` search, case-insensitive matching, comparison counting | ✅ 6 |
| **Financial Forecasting** | Recursion | Recursive future-value, variable growth rates, **memoization** vs naïve trend | ✅ 5 |
| **Implementing the Factory Method Pattern** | Design Pattern | Abstract factory method, concrete factories (Word/PDF/Excel), provider with enum + error handling | ✅ 7 |
| **Implementing the Singleton Pattern** | Design Pattern | Eager, Lazy (synchronized) & **Bill Pugh** singletons, thread-safety verification | ✅ 4 |

<div align="center"><strong>Total: 22 JUnit 5 tests — all passing ✅</strong></div>

---

## 🟣 Week 1 · C# / .NET Track

> **Framework:** .NET Framework 4.8. Open the `.sln` in **Visual Studio** and run via
> Test Explorer, or use `dotnet test` (with the .NET SDK + .NET Framework 4.8 targeting pack).

- **1. NUnit Hands-on** — first unit tests for `SimpleCalculator`. Demonstrates
  `[TestFixture]`, `[SetUp]`/`[TearDown]`, parameterised `[TestCase]`, `[Ignore]`, and
  `Assert.That(actual, Is.EqualTo(expected))`.
- **1. Moq Hands-on** — making untestable SMTP mail code testable via
  **dependency injection + mocking**: an `IMailSender` abstraction, constructor
  injection into `CustomerComm`, and a **Moq** mock (`It.IsAny<string>()`) in the tests.

---

## 🟣 Week 2 · Entity Framework Core 8.0

A single .NET 8 console app (`RetailInventory`) covering seven guided EF Core labs:

1. **ORM concepts** and EF Core vs EF6.
2. **Models + `DbContext`** (`Product`, `Category`; SQL Server provider via `appsettings.json`).
3. **CLI migrations** (`dotnet ef migrations add` / `database update`) with a design-time factory.
4. **Insert** — `AddRangeAsync` + `SaveChangesAsync` (idempotent seed).
5. **Retrieve** — `ToListAsync`, `FindAsync`, `FirstOrDefaultAsync`.
6. **Update / Delete** — modify a tracked entity, then `Remove`.
7. **LINQ** — `Where` + `OrderByDescending`, and `Select` projection into a DTO.

📁 `Week 2/Entity Framework Core 8.0/` · see its local `README.md` for the full lab notes.

---

## 🟣 Week 2 & 3 · ASP.NET Core 8.0 Web API

Six hands-on projects that build a Web API from scratch on **.NET 8** (modern minimal
hosting model), each self-contained and runnable:

| # | Project | Topic |
|:-:|---------|-------|
| 1 | `FirstWebApi` | Controllers, action verbs, status codes, config files |
| 2 | `WebApiSwagger` | Swagger/OpenAPI, `ProducesResponseType`, `[Route("Emp")]` |
| 3 | `WebApiCustomModel` | Custom `Employee` model, `[FromBody]`, custom auth + exception filters |
| 4 | `WebApiCrud` | Full CRUD — PUT update with id validation |
| 5 | `WebApiJwt` | JWT bearer auth, role-based `[Authorize]`, CORS, token expiry |
| 6 | `KafkaChat` | Apache Kafka chat console (producer + consumer) |

📁 `Week 2/ASP.NET Core 8.0 Web API/` (Week 3 currently holds an identical copy — see the
repository note above). Each folder has its own `README.md` with concept notes and
Swagger/Postman testing steps.

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
# Week 1 (net48): open the .sln in Visual Studio, or on Windows with the SDK:
dotnet test "Week 1/1. NUnit-Handson/NUnitHandson.sln"
dotnet test "Week 1/1. Moq-Handson/MoqHandson.sln"

# Week 2 EF Core (net8.0):
cd "Week 2/Entity Framework Core 8.0/RetailInventory"
dotnet ef database update   # optional: create the schema (needs SQL Server / LocalDB)
dotnet run

# Web API (net8.0): from any handson folder
cd "Week 2/ASP.NET Core 8.0 Web API/1. WebApi_Handson"
dotnet run                  # Swagger UI at https://localhost:<port>/swagger (ex. 2–5)
```
Requires the **.NET 8 SDK**. EF Core needs a reachable **SQL Server** (default:
`(localdb)\MSSQLLocalDB`); Web API exercise 6 needs a local **Kafka** broker.

</details>

---

## ✅ Verification Status

| Track | Status | Method |
|-------|--------|--------|
| Java (Week 1) | ✅ 22/22 tests pass | `mvn test` run locally (JDK 17, Maven 3.9): 6 + 5 + 7 + 4, all BUILD SUCCESS |
| SQL (Week 1) | ✅ Reviewed | T-SQL inspected for correctness; run in SSMS to execute |
| C# (Week 1, net48) | ⚙️ Inspected | NUnit/Moq reviewed; build in Visual Studio / with the .NET SDK to run |
| EF Core (Week 2, net8.0) | ⚙️ Inspected | Code reviewed against the labs; run locally with the .NET 8 SDK + SQL Server |
| Web API (Week 2/3, net8.0) | ⚙️ Inspected | Code reviewed; run locally with the .NET 8 SDK |

> The .NET projects were reviewed by reading only — the environment used here has the
> .NET **runtime** but no **SDK**, so `dotnet build`/`test` could not be executed. Build
> them locally with the .NET 8 SDK (and the .NET Framework 4.8 targeting pack for Week 1).

---

## 🛠️ Tech Stack

`T-SQL` · `Microsoft SQL Server` · `Java 17` · `Maven` · `JUnit 5` ·
`C#` · `.NET Framework 4.8` · `.NET 8` · `NUnit` · `Moq` · `EF Core 8` ·
`ASP.NET Core` · `Swagger / Swashbuckle` · `JWT` · `Confluent.Kafka`

---

<div align="center">

_Built by Adnan as part of Cognizant training — each exercise is self-contained, documented, and runnable._

⭐ _Explore any folder's local `README.md` for a deeper dive into that exercise._

</div>
