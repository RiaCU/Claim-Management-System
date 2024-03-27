using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;

namespace ClaimManagementSystem.Models
{
    public class Template
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public long TemplateId { get; set; } = 0;
        [Required]
        public long ServiceId { get; set; } =  0!;
        [Required]
        public double AmmountAllocated { get; set; }
        
        public string CreatedBy { get; set; } = String.Empty;

        public string CreatedOn { get; set; } = String.Empty;
        
        public string UpdatedBy { get; set; } = String.Empty;

        public string UpdatedOn { get; set; } = String.Empty;
    }
}
