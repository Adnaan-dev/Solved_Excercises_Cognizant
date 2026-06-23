# NUnit Hands-on

This solution demonstrates **unit testing** with **NUnit** by testing a simple
calculator's addition operation.

## Solution layout

```
1. NUnit-Handson/
├── NUnitHandson.sln
├── CalcLibrary/                 <- class under test
│   ├── CalcLibrary.csproj
│   └── SimpleCalculator.cs
└── CalculatorTests/             <- NUnit test project
    ├── CalculatorTests.csproj
    └── CalculatorTests.cs
```

## Concepts covered

### Unit testing vs. Functional testing
- **Unit testing** validates the *smallest testable unit* of code (a single
  method/class) in **isolation**, mocking out any external dependencies
  (database, file system, network, etc.). It is fast and pinpoints exactly
  where a defect lives.
- **Functional testing** validates a complete *feature/flow* end-to-end against
  the requirements, using the real dependencies. It is slower and answers
  "does the feature work?" rather than "does this method work?".

### Types of testing
- **Unit testing** – individual methods/classes in isolation.
- **Functional testing** – features against business requirements.
- **Automated testing** – tests executed by tools/CI without manual steps.
- **Performance testing** – throughput, latency, load and stress behaviour.

### Benefits of automated testing
- Fast, repeatable, consistent feedback.
- Catches regressions early (every commit/build).
- Acts as living documentation of expected behaviour.
- Enables safe refactoring and continuous integration/delivery.

### Loosely coupled & testable design
Code is **testable** when it does **not depend on a concrete class for its
data/collaborators**. Instead it depends on **abstractions (interfaces)** that
can be substituted with test doubles. This is *loose coupling* and is the
foundation of unit testing.

### NUnit attributes used
- `[TestFixture]` – marks a class that contains tests.
- `[SetUp]` – runs **before each** test (initialize state).
- `[TearDown]` – runs **after each** test (cleanup).
- `[Test]` – marks a test method.
- `[TestCase(...)]` – supplies inputs and expected result, enabling
  **parameterised** tests so one method covers many input combinations.
- `[Ignore("reason")]` – temporarily skips a test (with a documented reason).

### Why parameterised tests?
A single `[TestCase]`-driven method can validate many input/expected pairs,
reducing duplicated test code and clearly documenting the scenarios covered.

## How to run

The test project targets **.NET Framework 4.8 (net48)**, matching the exercise's
".NET Framework" requirement.

- In **Visual Studio**: open `NUnitHandson.sln`, build, then run via Test Explorer.
- From the CLI (Windows, with .NET SDK + .NET Framework targeting pack):

```bash
dotnet test "NUnitHandson.sln"
```
