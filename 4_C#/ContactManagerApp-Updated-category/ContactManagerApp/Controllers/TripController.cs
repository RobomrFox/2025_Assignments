using Microsoft.AspNetCore.Mvc;
using ContactManagerApp.Models;
using MongoDB.Driver;

namespace ContactManagerApp.Controllers
{
    public class TripController : Controller
    {
        private readonly IMongoCollection<Trip> _trips;

        public TripController(MongoDbContext context)
        {
            _trips = context.Trips;
        }

        // Display the trip log
        public IActionResult Index()
        {
            var trips = _trips.Find(trip => true).ToList();
            return View(trips);
        }

        // Step 1: Add destination and dates
        [HttpGet]
        public IActionResult AddStep1()
        {
            ViewData["Subhead"] = "Add Trip Destination and Dates";
            return View();
        }

        [HttpPost]
        public IActionResult AddStep1(Trip trip)
        {
            Console.WriteLine("AddStep1 action executed."); // Debug message

            if (ModelState.IsValid)
            {
                // Save the trip data temporarily in TempData
                TempData["Trip"] = System.Text.Json.JsonSerializer.Serialize(trip);

                // Redirect to Step 2 if Accommodation is provided, otherwise Step 3
                return !string.IsNullOrEmpty(trip.Accommodation) 
                    ? RedirectToAction("AddStep2") 
                    : RedirectToAction("AddStep3");
            }

            // If validation fails, redisplay the form
            return View(trip);
        }



        // Step 2: Add accommodation details
        [HttpGet]
        public IActionResult AddStep2()
        {
            if (TempData["Trip"] == null)
            {
                Console.WriteLine("TempData is null in AddStep2.");
                return RedirectToAction("AddStep1");
            }

            var trip = System.Text.Json.JsonSerializer.Deserialize<Trip>(TempData["Trip"].ToString());
            TempData.Keep("Trip");
            ViewData["Subhead"] = $"Add Info for {trip.Accommodation}";
            return View();
        }


        [HttpPost]
        public IActionResult AddStep2(Trip tripData)
        {
            var trip = System.Text.Json.JsonSerializer.Deserialize<Trip>(TempData["Trip"].ToString());
            trip.AccommodationPhone = tripData.AccommodationPhone;
            trip.AccommodationEmail = tripData.AccommodationEmail;
            TempData["Trip"] = System.Text.Json.JsonSerializer.Serialize(trip);
            return RedirectToAction("AddStep3");
        }

        // Step 3: Add things to do
        [HttpGet]
        public IActionResult AddStep3()
        {
            var trip = System.Text.Json.JsonSerializer.Deserialize<Trip>(TempData["Trip"].ToString());
            ViewData["Subhead"] = $"Add Things To Do in {trip.Destination}";
            return View();
        }

        [HttpPost]
        public IActionResult AddStep3(Trip tripData)
        {
            if (TempData["Trip"] != null)
            {
                try
                {
                    // Deserialize the trip data from TempData
                    var trip = System.Text.Json.JsonSerializer.Deserialize<Trip>(TempData["Trip"].ToString());
                    trip.ThingToDo1 = tripData.ThingToDo1;
                    trip.ThingToDo2 = tripData.ThingToDo2;
                    trip.ThingToDo3 = tripData.ThingToDo3;

                    // Save the trip to MongoDB
                    _trips.InsertOne(trip);

                    // Clear TempData and redirect to the trip log
                    TempData.Clear();
                    TempData["Message"] = $"Trip to {trip.Destination} added.";
                    return RedirectToAction("Index");
                }
                catch (Exception ex)
                {
                    TempData["Error"] = $"Failed to save trip: {ex.Message}";
                    return RedirectToAction("AddStep3");
                }
            }

            TempData["Error"] = "Failed to save trip. Please try again.";
            return RedirectToAction("AddStep3");
        }




        // Cancel the form
        public IActionResult Cancel()
        {
            TempData.Clear();
            return RedirectToAction("Index");
        }
        
        
        public IActionResult TestMongoConnection()
        {
            try
            {
                // Check if the Trips collection is accessible
                var count = _trips.CountDocuments(trip => true);
                return Content($"MongoDB connection is working. Trips count: {count}");
            }
            catch (Exception ex)
            {
                return Content($"MongoDB connection failed: {ex.Message}");
            }
        }

    }
}
