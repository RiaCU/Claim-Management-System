using ClaimManagementSystem.Models;
using ClaimManagementSystem.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using static Org.BouncyCastle.Math.EC.ECCurve;

namespace ClaimManagementSystem.Controllers
{
    [Route("api/[controller]/v1")]
    [ApiController]
    public class AdminController : ControllerBase
    {

        private readonly IAdminService _adminService;
        private readonly IEmailService _emailService;
        private readonly IConfiguration config;

        public AdminController(IAdminService adminService, IEmailService emailService, IConfiguration _config)
        {
            _adminService = adminService;
            _emailService = emailService;
            config = _config;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<Admin>> Create([FromBody] Admin admin)
        {
            try
            {
                var result = await _adminService.Create(admin);
                return result;
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        /*[AllowAnonymous]
        [HttpPost("getByGmail")]
        public async Task<ActionResult<Admin>> getByemail(string email)
        {
            try
            {
                var result = await _adminService.GetByGmail(email);
                if(result == null)
                    return NotFound(new
                    {
                        StatusCode = 404,
                        Message = "Email doesn't exist!"
                    });
                return result;
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }*/

        [AllowAnonymous]
        [HttpPost("login")]
        //[Route("login")]
        public async Task<ActionResult> Login([FromBody] Admin admin)
        {
            try
            {
                var result = await _adminService.Login(admin);

                if (result == null)
                    return NotFound($"{admin.Email} and Password is invalid");
                else
                    return Ok(new AuthService(config).GenerateToken(
                        result.Id,
                        result.Name,
                        result.Email,
                        result.Password,
                        result.Role
                       ));
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("sendLink")]
        public async Task<ActionResult> sendMail(string email)
        {
            try
            {
                var result = await _adminService.GetByGmail(email);
                if (result == null)
                    return NotFound(new
                    {
                        statusCode=404,
                        Message = "Email Doesn't Exists!"
                    });

                else 
                { 

                    var tokenBytes = RandomNumberGenerator.GetBytes(64);
                    var emailToken = Convert.ToBase64String(tokenBytes);
                    var expiry = DateTime.Now.AddMinutes(5);
                    string from = config.GetSection("EmailSettings").GetSection("From").Value;
                    var emailModel = new EmailModel(email, "Reset Password", EmailBody.EmailStringBody(email, emailToken));
                    _emailService.SendEmail(emailModel);
                    _adminService.UpdateToken(email,emailToken,expiry);
                    return Ok(new
                    {
                        StatusCode = 200,
                        Message = "Email Sent!"
                    });
                }
            }
            catch(Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("resetPassword")]
        public async Task<ActionResult> update(ResetPassword resetPassword)
        {
            var tokenCode = resetPassword.EmailToken;
            try
            {
                Admin temp = await _adminService.GetByGmail(resetPassword.Email);
                if (temp == null)
                {
                    return NotFound(new
                    {
                        StatusCode = 404,
                        Message = "Email not exist!"
                    });
                }
                //return Ok(resetPassword);
                
                //DateTime expiry = DateTime.Now.AddMinutes(5);
                if(tokenCode != temp.Token || temp.Expiry > DateTime.Now)
                {
                    return BadRequest(new
                    {
                        StatusCode = 400,
                        Message = "Invalid Reset Link!"
                    });
                }
                _adminService.Update(resetPassword.Email, resetPassword.Password);
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Password Reset Sucessfully"
                });



            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }


        }


    }
}
