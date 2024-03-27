//using Microsoft.AspNetCore.DataProtection.KeyManagement;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace ClaimManagementSystem.Models
{
    public class Admin
    {

        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public string Name { get; set; } = String.Empty;
        [Required]
        [EmailAddress]
        public string Email { get; set; } = String.Empty;
        [Required]
        public string Password { get; set; } = String.Empty;

        public string Token { get; set; } = string.Empty;
        public DateTime Expiry { get; set; } 
        
        //[Required]
        public string Role { get; set; } = String.Empty;

        //[Required]
        public string CreatedBy { get; set; } = String.Empty;
        //[Required]
        public string CreatedOn { get; set; } = string.Empty;
        //[Required]
        public string UpdatedBy { get; set; } = String.Empty;
        
        public string UpdatedOn { get; set; }= string.Empty;



    }
}
