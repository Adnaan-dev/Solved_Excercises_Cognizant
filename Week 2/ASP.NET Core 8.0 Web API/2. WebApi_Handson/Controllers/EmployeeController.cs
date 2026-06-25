using Microsoft.AspNetCore.Mvc;
using WebApiSwagger.Models;

namespace WebApiSwagger.Controllers;

// Step 3 of the exercise asks us to change the controller name in the Route
// attribute to 'Emp'. Normally [Route("api/[controller]")] would expose this at
// /api/employee; by hard-coding "Emp" the resource is reached at /Emp instead.
// That is what we then verify through Postman.
[ApiController]
[Route("Emp")]                 // <-- renamed from the default [controller]
public class EmployeeController : ControllerBase
{
    private static readonly List<Employee> Employees = new()
    {
        new Employee { Id = 1, Name = "Alice", Salary = 50000 },
        new Employee { Id = 2, Name = "Bob",   Salary = 60000 },
        new Employee { Id = 3, Name = "Chen",  Salary = 72000 }
    };

    // GET /Emp
    // ProducesResponseType tells Swagger the success shape/status explicitly,
    // so the documentation shows "200 -> Employee[]".
    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<Employee>), StatusCodes.Status200OK)]
    public ActionResult<IEnumerable<Employee>> Get()
    {
        return Ok(Employees);
    }
}
