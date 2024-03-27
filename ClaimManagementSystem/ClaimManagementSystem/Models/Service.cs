using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;

namespace ClaimManagementSystem.Models
{
    public class Service
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public long ServiceId { get; set; } = 0;
        [Required]
        public string ServiceName { get; set; } = null!;

        public long? CatagoryId { get; set; }
       
        public string CreatedBy { get; set; } = String.Empty;

        public string CreatedOn { get; set; } = String.Empty;
        
        public string UpdatedBy { get; set; } = String.Empty;

        public string UpdatedOn { get; set; } = String.Empty;
    }
}
