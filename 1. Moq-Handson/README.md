# Moq Hands-on — Write Testable Code with Moq

This solution shows how **Dependency Injection (DI)** + **Moq** let you unit
test a class whose real dependency talks to an external SMTP mail server —
**without ever sending an email**.

## Solution layout

```
1. Moq-Handson/
├── MoqHandson.sln
├── CustomerCommLib/                 <- code under test
│   ├── CustomerCommLib.csproj
│   ├── IMailSender.cs
│   ├── MailSender.cs                <- real impl (hits SMTP, NOT unit-testable)
│   └── CustomerComm.cs              <- depends on IMailSender (testable)
└── CustomerComm.Tests/              <- NUnit + Moq test project
    ├── CustomerComm.Tests.csproj
    └── CustomerCommTests.cs
```

## Key concepts

### Mocking, isolation & test doubles
- **Mocking** = replacing a real dependency with a controllable fake so the
  unit under test runs in **isolation**.
- **Test doubles** is the umbrella term:
  - **Stub** – returns canned data; no verification.
  - **Fake** – a lightweight working implementation (e.g. in-memory DB).
  - **Mock** – a programmable double that can also **verify** how it was
    called (which methods, how many times, with what args).
- **Why mock?** Speed, determinism, no side effects (no real emails / DB / file
  writes), and the ability to simulate hard-to-reproduce conditions.

### Dependency Injection (DI)
`CustomerComm` does **not** create its own `MailSender`. Instead the dependency
is **injected through its constructor** as the `IMailSender` abstraction
(*Constructor Injection*). This loose coupling is what makes it testable — in
tests we inject a Moq mock instead of the real SMTP-bound implementation.
(Method Injection — passing the dependency into a specific method — is the
other common form.)

### TDD advantage
Designing for mockability forces small, single-responsibility units with clear
seams, which is exactly what makes Test-Driven Development fast and reliable.

## How to run

```bash
dotnet test "MoqHandson.sln"
```
