using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApiCustomModel.Filters;
using WebApiCustomModel.Models;

namespace WebApiCustomModel.Controllers;

// EmployeeController returning a list of a custom entity (Employee).
//
// [CustomAuthFilter] is applied at the controller level, so EVERY request must
// carry an 'Authorization: Bearer ...' header or it is rejected with 400.
// (In Exercise 5 we swap this hand-rolled filter for real JWT [Authorize].)
[ApiController]
[Route("api/[controller]")]
[CustomAuthFilter]
public class EmployeeController : ControllerBase
{
    // The hard-coded "data store" for the exercise. Built in the constructor.
    private readonly List<Employee> _employees;

    public EmployeeController()
    {
        _employees = GetStandardEmployeeList();
    }

    // ----- READ -----------------------------------------------------------

    // GET api/employee
    // Returns the standard list. ProducesResponseType documents the 200 shape
    // for Swagger. [AllowAnonymous] is shown here to illustrate the attribute
    // (it has no effect against our custom filter, only against [Authorize]).
    [HttpGet]
    [AllowAnonymous]
    [ProducesResponseType(typeof(List<Employee>), StatusCodes.Status200OK)]
    public ActionResult<List<Employee>> GetStandard()
    {
        return Ok(GetStandardEmployeeList());
    }

    // GET api/employee/throw
    // Deliberately throws so we can see CustomExceptionFilter catch it, log it
    // to a file, and return a clean 500. Documented with ProducesResponseType
    // 500 so Swagger shows the error contract.
    [HttpGet("throw")]
    [ProducesResponseType(StatusCodes.Status500InternalServerError)]
    public ActionResult<Employee> ThrowDemo()
    {
        throw new InvalidOperationException("Deliberate exception to test CustomExceptionFilter");
    }

    // ----- WRITE ----------------------------------------------------------

    // POST api/employee
    // [FromBody] binds the JSON request body to the Employee model - this is
    // how we read a whole object from the request rather than query strings.
    [HttpPost]
    [ProducesResponseType(typeof(Employee), StatusCodes.Status201Created)]
    public ActionResult<Employee> Post([FromBody] Employee employee)
    {
        _employees.Add(employee);
        return CreatedAtAction(nameof(GetStandard), new { id = employee.Id }, employee);
    }

    // ----- private helper -------------------------------------------------

    // Builds and returns a standard list of employees.
    private List<Employee> GetStandardEmployeeList()
    {
        return new List<Employee>
        {
            new Employee
            {
                Id = 1,
                Name = "Alice",
                Salary = 50000,
                Permanent = true,
                Department = new Department { Id = 10, Name = "Engineering" },
                Skills = new List<Skill>
                {
                    new Skill { Id = 1, Name = "C#" },
                    new Skill { Id = 2, Name = "ASP.NET Core" }
                },
                DateOfBirth = new DateTime(1990, 5, 14)
            },
            new Employee
            {
                Id = 2,
                Name = "Bob",
                Salary = 60000,
                Permanent = false,
                Department = new Department { Id = 20, Name = "Finance" },
                Skills = new List<Skill>
                {
                    new Skill { Id = 3, Name = "Excel" }
                },
                DateOfBirth = new DateTime(1988, 11, 2)
            }
        };
    }
}
