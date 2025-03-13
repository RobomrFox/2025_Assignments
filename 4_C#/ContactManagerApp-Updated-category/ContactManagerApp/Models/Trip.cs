using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ContactManagerApp.Models
{
    public class Trip
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }

        [BsonElement("Destination")]
        public string Destination { get; set; }

        [BsonElement("StartDate")]
        public DateTime StartDate { get; set; }

        [BsonElement("EndDate")]
        public DateTime EndDate { get; set; }

        public string? Accommodation { get; set; }
        public string? AccommodationPhone { get; set; }
        public string? AccommodationEmail { get; set; }

        public string? ThingToDo1 { get; set; }
        public string? ThingToDo2 { get; set; }
        public string? ThingToDo3 { get; set; }
    }
}