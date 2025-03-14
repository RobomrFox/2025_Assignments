using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;

namespace ContactManagerApp.Models
{
    public class Trip
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; } // Make nullable with ?

        [BsonElement("Destination")]
        [Required(ErrorMessage = "Destination is required")]
        public string Destination { get; set; }

        [BsonElement("StartDate")]
        [Required(ErrorMessage = "Start date is required")]
        public DateTime StartDate { get; set; }

        [BsonElement("EndDate")]
        [Required(ErrorMessage = "End date is required")]
        public DateTime EndDate { get; set; }

        public string? Accommodation { get; set; }
        public string? AccommodationPhone { get; set; }
        public string? AccommodationEmail { get; set; }

        public string? ThingToDo1 { get; set; }
        public string? ThingToDo2 { get; set; }
        public string? ThingToDo3 { get; set; }
    }
}