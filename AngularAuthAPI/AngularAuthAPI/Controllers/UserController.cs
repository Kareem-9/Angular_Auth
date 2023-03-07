namespace AngularAuthAPI.Controllers
{
    using AngularAuthAPI.Context;
    using AngularAuthAPI.Models;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;

    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _authContext;

        public UserController(AppDbContext appDbContext)
        {
            _authContext = appDbContext;
        }

       [HttpPost("authenticate")]
       public async Task<IActionResult> Authenticate([FromBody] User userobj)
       {
            if (userobj == null)
                return BadRequest();
            //User is not null check the Db first
            var user = await _authContext.Users
                .FirstOrDefaultAsync(x => x.UserName == userobj.UserName && x.Password == userobj.Password);
            if(user == null)
                return NotFound(new {Message = "User Not Found!"});

            return Ok(new
            {
                Message = "Login Success!"
            });
       }
        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] User userObj)
        {
            if(userObj == null)
                return BadRequest();

            //Add in db
            await _authContext.Users.AddAsync(userObj);
            await _authContext.SaveChangesAsync();
            return Ok(new 
            {
                Message = "User is Registered!"
            });

        }

    }
}
