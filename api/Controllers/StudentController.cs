using api.Data;
using api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace api.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly StudentDbContext _studentDbContext;

        public StudentController(StudentDbContext studentDbContext)
        {
            _studentDbContext = studentDbContext;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllStudents()
        {
            var students = await _studentDbContext.Students.ToListAsync();
            return Ok(students);
        }

        [HttpPost]
        public async Task<IActionResult> AddStudent([FromBody] Student studentRequest)
        {
            await _studentDbContext.AddAsync(studentRequest);
            await _studentDbContext.SaveChangesAsync();
            return Ok(studentRequest);
        }

        [HttpGet]
        [Route("{id:int}")]// :int
        public async Task<IActionResult> GetStudent([FromRoute] int id) //int
        {
            var student = await _studentDbContext.Students.FirstOrDefaultAsync(x => x.Id == id);
            if (student == null)
            {
                return NotFound();
            }
            return Ok(student);
        }
        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateStudent([FromRoute] int id, Student updateStudentRequest)
        {
            var student = await _studentDbContext.Students.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }

            student.Name = updateStudentRequest.Name;
            student.Email = updateStudentRequest.Email;
            student.Phone = updateStudentRequest.Phone;
            student.Department = updateStudentRequest.Department;

            await _studentDbContext.SaveChangesAsync();
            return Ok(student);
        }
        [HttpDelete]
        [Route("{id:int}")] //G
        public async Task<IActionResult> DeleteStudent([FromRoute] int id) //G
        {
            var student = await _studentDbContext.Students.FindAsync(id);

            if (student == null)
            {
                return NotFound();
            }

            _studentDbContext.Students.Remove(student);
            await _studentDbContext.SaveChangesAsync();

            return Ok(student);
        }
    }
}
