using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ClaimManagementSystem.Models
{
    public class AuthService
    {
        public string SecretKey { get; set; }
        public int TokenDuration { get; set; }

        private readonly IConfiguration config;


        public AuthService(IConfiguration _config)
        {
            config = _config;
            this.SecretKey = config.GetSection("JwtConfig").GetSection("Key").Value;
            this.TokenDuration=Int32.Parse(config.GetSection("JwtConfig").GetSection("Duration").Value);
        }

        public string GenerateToken(string id,string name,string email,string password,string role)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.SecretKey));

            var signature = new SigningCredentials(key,SecurityAlgorithms.HmacSha256);

            var payload = new[]
            {
                new Claim("id",id),
                new Claim("name",name), 
                new Claim("email",email),
                new Claim("password",password),
                new Claim("role",role)
                
            };

            var jwtToken = new JwtSecurityToken(
                issuer: "localhost",
                audience : "localhost",
                claims: payload,
                expires: DateTime.Now.AddDays(TokenDuration),
                signingCredentials: signature
                );

            return new JwtSecurityTokenHandler().WriteToken(jwtToken);
            
        }

    }
}
