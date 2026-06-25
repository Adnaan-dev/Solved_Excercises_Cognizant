namespace WebApiSwagger.Models;

// A lightweight employee for this exercise. The full model (with Department and
// Skills) is introduced in Exercise 3 - here we only need something to list so
// we can test the GET method from Swagger and Postman.
public class Employee
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public int Salary { get; set; }
}
