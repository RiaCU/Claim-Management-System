using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System.ComponentModel.DataAnnotations;

namespace ClaimManagementSystem.Models
{
    public class Hospital
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        public long HospitalId { get; set; } = 0;
        [Required]
        public string HospitalName { get; set; } = null!;
    }
}
