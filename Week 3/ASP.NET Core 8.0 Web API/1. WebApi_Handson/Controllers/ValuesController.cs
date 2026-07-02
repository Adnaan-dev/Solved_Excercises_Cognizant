using Microsoft.AspNetCore.Mvc;

namespace FirstWebApi.Controllers;

// The Web API template generates this controller for us when we pick the
// "API" template with Read/Write actions. It is the Web API equivalent of the
// old ASP.NET Web API 2 "ValuesController : ApiController".
//
// In ASP.NET Core we inherit from ControllerBase (not Controller) because a
// Web API does not need View support. The [ApiController] attribute switches
// on the API conventions: automatic model-state validation, binding-source
// inference, attribute routing requirement, and ProblemDetails error bodies.
[ApiController]
[Route("api/[controller]")]      // -> /api/values
public class ValuesController : ControllerBase
{
    // A tiny in-memory list standing in for a data store, so the Read and
    // Write action verbs actually have something to operate on.
    private static readonly List<string> Values = new() { "value1", "value2" };

    // ----- READ actions --------------------------------------------------

    // GET api/values
    // Action verb: HttpGet. Returns 200 OK with the whole collection.
    [HttpGet]
    public ActionResult<IEnumerable<string>> Get()
    {
        return Ok(Values);
    }

    // GET api/values/1
    // Same verb, but the {id} route token makes it a different action.
    [HttpGet("{id:int}")]
    public ActionResult<string> Get(int id)
    {
        if (id < 0 || id >= Values.Count)
            return NotFound();           // 404 - nothing at that index

        return Ok(Values[id]);           // 200 OK
    }

    // ----- WRITE actions -------------------------------------------------

    // POST api/values     body: "some text"
    // Action verb: HttpPost - creates a new resource.
    [HttpPost]
    public ActionResult<string> Post([FromBody] string value)
    {
        Values.Add(value);
        var newId = Values.Count - 1;
        // 201 Created + a Location header pointing at the new item.
        return CreatedAtAction(nameof(Get), new { id = newId }, value);
    }

    // PUT api/values/1    body: "updated text"
    // Action verb: HttpPut - replaces an existing resource.
    [HttpPut("{id:int}")]
    public IActionResult Put(int id, [FromBody] string value)
    {
        if (id < 0 || id >= Values.Count)
            return NotFound();

        Values[id] = value;
        return NoContent();              // 204 - success, nothing to return
    }

    // DELETE api/values/1
    // Action verb: HttpDelete - removes a resource.
    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id)
    {
        if (id < 0 || id >= Values.Count)
            return NotFound();

        Values.RemoveAt(id);
        return NoContent();
    }
}
