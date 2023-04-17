namespace AngularAuthAPI.Controllers
{
    using DapperApiSolution.ApplicationService.Dtos;
    using DapperApiSolution.ApplicationService.IServices;
    using Microsoft.AspNetCore.Mvc;

    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : Controller
    {
        private readonly IEmployeeService _employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAll()
        {
            var result = await _employeeService.GetAll();
            if (result == null)
            {
                return NotFound();
            }
            else { return Ok(result); }

        }

        [HttpGet("getById/{Id}")]
        public async Task<IActionResult> GetById([FromRoute] int Id)
        {
            if (Id < 0)
            {
                return NotFound("enter valid Id");
            }
            var result = await _employeeService.GetById(Id);
            if (result == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(result);
            }
        }

        [HttpPost("add")]
        public async Task<IActionResult> Create([FromBody] EmployeeDto employeeDto)
        {
            var result = await _employeeService.Create(employeeDto);
            if (result != 0)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest("failed to create details");
            }
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update([FromBody] EmployeeDto employeeDto)
        {
            var result = await _employeeService.Update(employeeDto);
            if (result != 0)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest("failed to update details");
            }
        }

        [HttpDelete("delete/{Id}")]
        public async Task<IActionResult> Delete([FromRoute] int Id)
        {
            if (Id < 0)
            {
                return NotFound("enter valid Id");
            }
            var result = await _employeeService.Delete(Id);
            if (result == 1)
            {
                return Ok("Record deleted");
            }
            else
            {
                return BadRequest("failed to delete details");
            }
        }
    }

}
