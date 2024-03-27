using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;

namespace ClaimManagementSystem.Models
{
    public class Catagory
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public long CatagoryId { get; set; } = 0;
        [Required]
        public string CatagoryName { get; set; } = null!;
        
        public string CreatedBy { get; set; } = String.Empty;

        public string CreatedOn { get; set; } = String.Empty;
        
        public string UpdatedBy { get; set; } = String.Empty;

        public string UpdatedOn { get; set; } = String.Empty;
    }
}
