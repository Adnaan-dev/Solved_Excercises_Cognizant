using Microsoft.AspNetCore.Mvc;

namespace WebApiSwagger.Controllers;

// Same Values controller as Exercise 1. With Swagger turned on it now shows up
// automatically in the Swagger UI, grouped by its HTTP verbs.
[ApiController]
[Route("api/[controller]")]
public class ValuesController : ControllerBase
{
    private static readonly List<string> Values = new() { "value1", "value2" };

    // GET api/values
    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public ActionResult<IEnumerable<string>> Get() => Ok(Values);

    // GET api/values/1
    [HttpGet("{id:int}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public ActionResult<string> Get(int id)
    {
        if (id < 0 || id >= Values.Count) return NotFound();
        return Ok(Values[id]);
    }

    // POST api/values
    [HttpPost]
    public ActionResult<string> Post([FromBody] string value)
    {
        Values.Add(value);
        return CreatedAtAction(nameof(Get), new { id = Values.Count - 1 }, value);
    }

    // PUT api/values/1
    [HttpPut("{id:int}")]
    public IActionResult Put(int id, [FromBody] string value)
    {
        if (id < 0 || id >= Values.Count) return NotFound();
        Values[id] = value;
        return NoContent();
    }

    // DELETE api/values/1
    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id)
    {
        if (id < 0 || id >= Values.Count) return NotFound();
        Values.RemoveAt(id);
        return NoContent();
    }
}
