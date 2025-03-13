using Microsoft.AspNetCore.Mvc;

namespace ContactManagerApp.Controllers
{
    public class HomeController : Controller
    {
        // Default action for the HomeController
        public IActionResult Index()
        {
            return View();
        }
    }
}