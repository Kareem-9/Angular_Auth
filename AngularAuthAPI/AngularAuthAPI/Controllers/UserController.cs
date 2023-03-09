namespace AngularAuthAPI.Controllers
{
    using AngularAuthAPI.Context;
    using AngularAuthAPI.Helpers;
    using AngularAuthAPI.Models;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using System.Reflection.Metadata.Ecma335;
    using System.Text;
    using System.Text.RegularExpressions;
    using System.IdentityModel.Tokens.Jwt;
    using System;
    using System.Security.Claims;
    using Microsoft.IdentityModel.Tokens;
    using Microsoft.AspNetCore.Authorization;

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
                .FirstOrDefaultAsync(x => x.UserName == userobj.UserName);
            if(user == null)
                return NotFound(new {Message = "User Not Found!"});

            if(!PasswordHasher.VerifyPassword(userobj.Password, user.Password))
            {
                return BadRequest(new { Message = "Password is Incorrect" });
            }

            user.Token = CreateJWT(user);

            return Ok(new
            {
                Token = user.Token,
                Message = "Login Success!"
            });
       }
        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] User userObj)
        {
            if(userObj == null)
                return BadRequest();

            //Check Username
            if (await CheckUserNameExistAsync(userObj.UserName))
                return BadRequest(new { Message = "Username Already Exist!" });

            //Check Email
            if (await CheckEmailExistAsync(userObj.Email))
                return BadRequest(new { Message = "Email Already Exist!" });

            //Check password Strength
             var pass = CheckPasswordStrength(userObj.Password);
            if(!string.IsNullOrEmpty(pass))
                return BadRequest(new {Message = pass.ToString()});


            userObj.Password = PasswordHasher.HashPassword(userObj.Password);
            userObj.Role = "user";
            userObj.Token = "";  
            //Add in db
            await _authContext.Users.AddAsync(userObj);
            await _authContext.SaveChangesAsync();
            return Ok(new 
            {
                Message = "User is Registered!"
            });

        }

        private Task<bool> CheckUserNameExistAsync(string userName)
            => _authContext.Users.AnyAsync(x => x.UserName == userName);
        
        private Task<bool> CheckEmailExistAsync(string email)
            => _authContext.Users.AnyAsync(y => y.Email == email);

        private string CheckPasswordStrength(string password)
        {
            StringBuilder sb = new StringBuilder();
            if (password.Length < 6)
                sb.Append("Minimum password length should be 6" + Environment.NewLine);
            if (!(Regex.IsMatch(password, "[a-z]") && Regex.IsMatch(password, "[A-Z]") && Regex.IsMatch(password, "[0-9]")))
                sb.Append("Password should be Alphanumeric" + Environment.NewLine);
            if (!Regex.IsMatch(password, "[<,>,?,/,!,@,#,$,%,^,&,*,(,),_,-,+,=,~,`,]"))
                sb.Append("Password should contain special character" + Environment.NewLine);
            return sb.ToString();
        }   

        // Reference JWT.IO
        private String CreateJWT(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("veryverysceret.....");
            var identity = new ClaimsIdentity(new Claim[]        //Payload data name & role
            {
                new Claim(ClaimTypes.Role,user.Role),
                new Claim(ClaimTypes.Name,$"{user.FirstName} {user.LastName}")
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key),SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = credentials,
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<User>> GetAllUsers()
        {
            return Ok(await _authContext.Users.ToListAsync());
        }
    }
}
