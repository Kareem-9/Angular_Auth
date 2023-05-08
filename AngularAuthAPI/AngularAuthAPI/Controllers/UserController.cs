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
    using AngularAuthAPI.Models.Dto;
    using System.Security.Cryptography;

    //using System.Web.Http;

    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _authContext;

        public UserController(AppDbContext appDbContext)
        {
            _authContext = appDbContext;
        }


        [Authorize]
        [HttpGet]
        public async Task<ActionResult> GetAllUsers()
        {
            var userDetails = await _authContext.Users.ToListAsync();

            if (userDetails != null)
            {
                return Ok(userDetails);
            }
            else
            {
                return Unauthorized(new { Message = "User is Unathorized" });
            }
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
            //Cross check for existing user or not!
            if(!PasswordHasher.VerifyPassword(userobj.Password, user.Password))
            {
                return BadRequest(new { Message = "Password is Incorrect" });
            }
            if (userobj.TokenExpire == 0)
                return BadRequest(new { Message = "token expiry time is Null object" });

            //create the token store inside user obj
            user.Token = CreateJWT(user);
            var newAccessToken = user.Token;
            var newRefreshToken = CreateRefreshToken();
            user.RefreshToken = newRefreshToken;
            //user.RefreshTokenExpiryTime = DateTime.Now.AddDays(1);
            await _authContext.SaveChangesAsync(); //Refreshtoken save in db
            //if (Token == null)
            //{
            //    return BadRequest(new
            //    {
            //        Message = "Invalid Token"
            //    });
            //}
            return Ok(new TokenApiDto
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken
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
            //userObj.Token = "";  
            //Add in db
            await _authContext.Users.AddAsync(userObj);
            await _authContext.SaveChangesAsync();
            return Ok(new 
            {
                Message = "User is Registered Successfully !"
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
            var identity = new ClaimsIdentity(new Claim[]        //Payload data: name & role
            {
                new Claim(ClaimTypes.Role,user.Role),
                //new Claim(ClaimTypes.Name,$"{user.FirstName} {user.LastName}"),
                new Claim(ClaimTypes.Name,$"{user.UserName}")
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key),SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                //Expires = DateTime.Now.AddDays(1),
                Expires = DateTime.Now.AddSeconds(user.TokenExpire),
                SigningCredentials = credentials,
            };

            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }

        private string CreateRefreshToken()
        {
            var randomNumber = new byte[32];
            using (var rng = System.Security.Cryptography.RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
                var refreshToken = Convert.ToBase64String(randomNumber);
                var tokenInUser = _authContext.Users.Any(a => a.RefreshToken == refreshToken);
                if (tokenInUser)
                {
                    return CreateRefreshToken();
                }
                return refreshToken;

            }

        }

        private ClaimsPrincipal GetPrincipalFromExpiredToken(string token)
        {
            var key = Encoding.ASCII.GetBytes("veryverysceret.....");
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false, //Validate the audience and issuer depending on your requirement
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true, // It's an compulsory it should match the key, otherwise its bad token
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateLifetime = false //We don't care about the token's expiration date based on require it change. 
            };
            var tokenHandler = new JwtSecurityTokenHandler();
            SecurityToken securityToken;
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out securityToken);
            var jwtSecurityToken = securityToken as JwtSecurityToken;
            if (jwtSecurityToken == null || !jwtSecurityToken.Header.Alg.Equals(SecurityAlgorithms.HmacSha256, StringComparison.InvariantCultureIgnoreCase)) { }
                throw new SecurityTokenException("Invalid token");
            return principal;
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh(TokenApiDto tokenApiDto)
        {
            if (tokenApiDto is null)
                return BadRequest("Invalid Client Request");
            string accessToken = tokenApiDto.AccessToken;
            string refreshToken = tokenApiDto.RefreshToken;
            var principal = GetPrincipalFromExpiredToken(accessToken);
            var username = principal.Identity.Name;
            var user = await _authContext.Users.FirstOrDefaultAsync(u => u.UserName == username);
            if (user is null || user.RefreshToken != refreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
                return BadRequest("Invalid Request");
            var newAccessToken = CreateJWT(user);
            if (newAccessToken is null)
                return BadRequest(new { Message = "token is null" });
            var newRefreshToken = CreateRefreshToken();
            user.RefreshToken = newRefreshToken;
            //await _authContext.SaveChangesAsync();
            return Ok(new TokenApiDto()
            {
                AccessToken = newAccessToken,
                RefreshToken = newRefreshToken
            });

        }
    }
}
