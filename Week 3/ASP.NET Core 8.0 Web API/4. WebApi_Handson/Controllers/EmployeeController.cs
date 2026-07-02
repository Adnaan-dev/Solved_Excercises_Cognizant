using Microsoft.AspNetCore.Mvc;
using WebApiCrud.Models;

namespace WebApiCrud.Controllers;

// Exercise 4 - CRUD, with the focus on the PUT (update) action and its
// validation rules.
[ApiController]
[Route("api/[controller]")]
public class EmployeeController : ControllerBase
{
    // STATIC so that updates/deletes survive between requests (a single
    // in-memory "database" shared by all calls during the app's lifetime).
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
        },
        new Employee
        {
            Id = 3, Name = "Chen", Salary = 72000, Permanent = true,
            Department = new Department { Id = 10, Name = "Engineering" },
            Skills = new List<Skill> { new() { Id = 3, Name = "Azure" } },
            DateOfBirth = new DateTime(1992, 1, 20)
        }
    };

    // GET api/employee
    [HttpGet]
    [ProducesResponseType(typeof(List<Employee>), StatusCodes.Status200OK)]
    public ActionResult<List<Employee>> Get() => Ok(Employees);

    // POST api/employee  (create)
    [HttpPost]
    [ProducesResponseType(typeof(Employee), StatusCodes.Status201Created)]
    public ActionResult<Employee> Post([FromBody] Employee employee)
    {
        Employees.Add(employee);
        return CreatedAtAction(nameof(Get), new { id = employee.Id }, employee);
    }

    // -----------------------------------------------------------------
    // PUT api/employee/{id}   (update)  --- the heart of this exercise
    // -----------------------------------------------------------------
    // Rules from the exercise:
    //   * id <= 0                          -> BadRequest "Invalid employee id"
    //   * id > 0 but not in the list       -> BadRequest "Invalid employee id"
    //   * valid id                         -> update from the [FromBody] data,
    //                                         then return the updated employee.
    [HttpPut("{id:int}")]
    [ProducesResponseType(typeof(Employee), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public ActionResult<Employee> Put(int id, [FromBody] Employee input)
    {
        // Rule 1: non-positive id.
        if (id <= 0)
            return BadRequest("Invalid employee id");

        // Rule 2: id not present in the hard-coded list.
        var existing = Employees.FirstOrDefault(e => e.Id == id);
        if (existing is null)
            return BadRequest("Invalid employee id");

        // Rule 3: valid -> apply the incoming JSON to the stored record.
        existing.Name = input.Name;
        existing.Salary = input.Salary;
        existing.Permanent = input.Permanent;
        existing.Department = input.Department;
        existing.Skills = input.Skills;
        existing.DateOfBirth = input.DateOfBirth;

        // Filter the list for the input id and return that as the output.
        var updated = Employees.First(e => e.Id == id);
        return Ok(updated);
    }

    // DELETE api/employee/{id}  (delete)
    [HttpDelete("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public ActionResult<Employee> Delete(int id)
    {
        if (id <= 0)
            return BadRequest("Invalid employee id");

        var existing = Employees.FirstOrDefault(e => e.Id == id);
        if (existing is null)
            return BadRequest("Invalid employee id");

        Employees.Remove(existing);
        return Ok(existing);
    }
}
