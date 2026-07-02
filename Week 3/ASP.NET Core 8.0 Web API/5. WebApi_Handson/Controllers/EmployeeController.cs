using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApiJwt.Models;

namespace WebApiJwt.Controllers;

// The CustomAuthFilter from Exercise 3 is GONE. Instead we use the real,
// framework-provided [Authorize] attribute backed by JWT bearer authentication.
//
// Without a valid token -> 401 Unauthorized.
// With a token but the wrong role -> 403 Forbidden.
//
// Exercise step 4:
//   * [Authorize(Roles = "POC")]        -> our 'Admin' token is rejected
//   * [Authorize(Roles = "POC,Admin")]  -> our 'Admin' token is accepted (200)
[ApiController]
[Route("api/[controller]")]
[Authorize(Roles = "POC,Admin")]
public class EmployeeController : ControllerBase
{
    private static readonly List<Employee> Employees = new()
    {
        new Employee
        {
            Id = 1, Name = "Alice", Salary = 50000, Permanent = true,
            Department = new Department { Id = 10, Name = "Engineering" },
            Skills = new List<Skill> { new() { Id = 1, Name = "C#" } },
            DateOfBirth = new DateTime(1990, 5, 14)
        },
        new Employee
        {
            Id = 2, Name = "Bob", Salary = 60000, Permanent = false,
            Department = new Department { Id = 20, Name = "Finance" },
            Skills = new List<Skill> { new() { Id = 2, Name = "Excel" } },
            DateOfBirth = new DateTime(1988, 11, 2)
        }
    };

    // GET api/employee  -- requires a valid Bearer token with role POC or Admin.
    [HttpGet]
    [ProducesResponseType(typeof(List<Employee>), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    public ActionResult<List<Employee>> Get() => Ok(Employees);
}
