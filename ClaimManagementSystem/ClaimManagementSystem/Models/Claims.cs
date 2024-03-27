using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace ClaimManagementSystem.Models
{
    public class Claims
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public long ClaimId { get; set; } = 0;
        [Required]
        [MinLength(3),MaxLength(20)]
        public string FirstName { get; set; } = null!;
        //[Required]
        public string? MiddleName { get; set; } = null;
        [Required]
        [MinLength(3), MaxLength(20)]
        public string LastName { get; set; } = null!;
        [Required]
        public int Age { get; set; }
        [Required]
        public string Gender { get; set; } = null!;
        public string Dob { get; set; } = string.Empty;
        [Required]
        public long ServiceId { get; set; } = 0!;
        [Required]
        public double ClaimAmount { get; set; }
        [Required]
        [EmailAddress]
        public string EmailId { get; set; } = null!;
        [Required]
        public long TemplateId { get; set; } = 0!;
        [Required]
        public long HospitalId { get; set; } = 0!;
        [Required]
        public string City { get; set; } = null!;
        [Required]
        public string State { get; set; } = null!;
        [Required]
        [MaxLength(100)]
        public string Address { get; set; } = null!;
        public string CreatedBy { get; set; } = String.Empty;
        public string CreatedOn { get; set; }  = String.Empty;
        public string UpdatedBy { get; set; } = String.Empty;
        public string UpdatedOn { get; set; } =  String.Empty;
    }
}
