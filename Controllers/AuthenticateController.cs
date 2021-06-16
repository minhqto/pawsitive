using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using pawsitive.EntityModels;
using pawsitive.ViewModels;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace pawsitive.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly UserManager<User> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration _configuration;

        public AuthenticateController(UserManager<User> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration)
        {
            this.userManager = userManager;
            this.roleManager = roleManager;
            _configuration = configuration;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginVM model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);
            if (user != null && await userManager.CheckPasswordAsync(user, model.Password))
            {
                var userRoles = await userManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    // Jihyun, 6/9, we will use Email as UserName
                    new Claim("email", user.Email),
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim("role", userRole));
                }

                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                var token = new JwtSecurityToken(
                    issuer: _configuration["JWT:ValidIssuer"],
                    audience: _configuration["JWT:ValidAudience"],
                    expires: model.RememberMe ? DateTime.Now.AddYears(30) : DateTime.Now.AddHours(3),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                    );

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo
                });
            }
            return StatusCode(StatusCodes.Status401Unauthorized, new AuthResponse { Status = "Error", Message = "Incorrect Email or password. Please try again." });
        }

        [HttpPost]
        [Route("register-client")]
        public async Task<IActionResult> RegisterClient([FromBody] RegisterClientVM model)
        {
            var userExists = await userManager.FindByEmailAsync(model.Email);
            if (userExists != null)
                return StatusCode(StatusCodes.Status409Conflict, new AuthResponse { Status = "Error", Message = "User already exists!" });

            User user = new User()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                //TODO(Jihyun) - didn't decide yet to have names or not. If we do, need to change the page design
                //FirstName = model.FirstName,
                //LastName = model.LastName,
            };

            var result = await userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new AuthResponse
                    {
                        Status = "Error",
                        Message = result.Errors.Count() > 0 ? result.Errors.FirstOrDefault().Description : "User creation failed! Please check user details and try again."
                    });

            // Create Client role if it doesn't exist in the database yet
            if (!await roleManager.RoleExistsAsync(UserRoles.Client))
                await roleManager.CreateAsync(new IdentityRole(UserRoles.Client));

            // Add Client role to current user
            if (await roleManager.RoleExistsAsync(UserRoles.Client))
            {
                await userManager.AddToRoleAsync(user, UserRoles.Client);
            }

            return Ok(new AuthResponse { Status = "Success", Message = "User created successfully!" });
        }

        [HttpPost]
        [Route("register-specialist")]
        public async Task<IActionResult> RegisterSpecialist([FromBody] RegisterSpecialistVM model)
        {

            var userExists = await userManager.FindByEmailAsync(model.Email);
            if (userExists != null)
                return StatusCode(StatusCodes.Status409Conflict, new AuthResponse { Status = "Error", Message = "User already exists!" });

            Address address = new Address()
            {
                StreetAddress = model.StreetAddress,
                City = model.City,
                Province = model.Province,
                PostalCode = model.PostalCode,
            };

            User user = new User()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                FirstName = model.FirstName,
                LastName = model.LastName,
                PhoneNumber = model.PhoneNumber,
                Address = address,
            };

            var serviceTypes = new List<ServiceType>();
            foreach (var type in model.ServiceTypes)
            {
                serviceTypes.Add(type);
            }
            
            SpecialistProfile specialist = new SpecialistProfile()
            {
                Specialist = user,
                BusinessName = model.BusinessName,
                ProvideHomeVisitService = model.ProvideHomeVisitService,
                Radius = model.Radius,
                Availability = model.Availability,
                AboutMe = model.AboutMe,
                ServiceTypes = serviceTypes,
            };

            user.SpecialistProfile = specialist;

            var result = await userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new AuthResponse
                    {
                        Status = "Error",
                        Message = result.Errors.Count() > 0 ? result.Errors.FirstOrDefault().Description : "User creation failed! Please check user details and try again."
                    });

            // Create Specialist role if it doesn't exist in the database yet
            if (!await roleManager.RoleExistsAsync(UserRoles.Specialist))
                await roleManager.CreateAsync(new IdentityRole(UserRoles.Specialist));

            // Add Specialist role to current user
            if (await roleManager.RoleExistsAsync(UserRoles.Specialist))
            {
                await userManager.AddToRoleAsync(user, UserRoles.Specialist);
            }

            return Ok(new AuthResponse { Status = "Success", Message = "User created successfully!" });
        }

        // Check if the email for sign-up already exists or not
        [HttpPost]
        [Route("checkEmail")]
        public async Task<IActionResult> checkEmail(string email)
        {
            var user = await userManager.FindByEmailAsync(email);
            if (user == null )
            {
                return Ok();
            }
            return StatusCode(StatusCodes.Status401Unauthorized, new AuthResponse { Status = "Error", Message = "The email already exists" });
        }

    }

    

    internal class AuthResponse
    {
        public string Status { get; set; }
        public string Message { get; set; }
    }
}
