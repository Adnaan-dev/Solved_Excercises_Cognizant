# Exercise 4 — Web API CRUD operation

> Project: `WebApiCrud` · Target framework: **.NET 8**

This exercise focuses on the **PUT (update)** action and its validation, with
POST (create) and DELETE rounding out the CRUD set. The data is a hard-coded,
`static` in-memory list so changes persist for the lifetime of the running app.

---

## The PUT action and its rules

The update is reached at `PUT /api/employee/{id}` and takes the new values from
the request body via `[FromBody]`. See
[`Controllers/EmployeeController.cs`](./Controllers/EmployeeController.cs):

```csharp
[HttpPut("{id:int}")]
public ActionResult<Employee> Put(int id, [FromBody] Employee input)
{
    if (id <= 0)                                   // rule 1
        return BadRequest("Invalid employee id");

    var existing = Employees.FirstOrDefault(e => e.Id == id);
    if (existing is null)                          // rule 2
        return BadRequest("Invalid employee id");

    // rule 3 - apply the body and return the updated record
    existing.Name = input.Name;
    existing.Salary = input.Salary;
    existing.Permanent = input.Permanent;
    existing.Department = input.Department;
    existing.Skills = input.Skills;
    existing.DateOfBirth = input.DateOfBirth;

    return Ok(Employees.First(e => e.Id == id));
}
```

| Condition | Result |
|---|---|
| `id <= 0` | `400 BadRequest` — **"Invalid employee id"** |
| `id > 0` but not in the list | `400 BadRequest` — **"Invalid employee id"** |
| valid `id` | `200 OK` — the updated `Employee` object |

The method returns the employee through `ActionResult<Employee>`, so Swagger
documents both the `200` (returning `Employee`) and `400` outcomes.

## Testing

```bash
cd "4. WebApi_Handson"
dotnet run
# browse https://localhost:7083/swagger
```

Seeded ids are **1, 2, 3**.

**Valid update (Swagger / Postman):** `PUT /api/employee/2` with body
```json
{
  "id": 2,
  "name": "Bob Updated",
  "salary": 65000,
  "permanent": true,
  "department": { "id": 20, "name": "Finance" },
  "skills": [ { "id": 2, "name": "Power BI" } ],
  "dateOfBirth": "1988-11-02T00:00:00"
}
```
→ `200 OK` with the updated employee.

**Invalid id:** `PUT /api/employee/0` or `PUT /api/employee/99` → `400` with
`"Invalid employee id"`.

In **Postman**: choose the **PUT** verb, set the URL, go to **Body → raw → JSON**,
paste the object, and **Send**. Check the **Status** on the response pane.

| Verb | Route | Purpose |
|---|---|---|
| GET | `/api/employee` | list all |
| POST | `/api/employee` | create |
| PUT | `/api/employee/{id}` | update (validated) |
| DELETE | `/api/employee/{id}` | delete (validated) |
