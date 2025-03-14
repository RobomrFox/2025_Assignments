using ContactManagerApp.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllersWithViews();
builder.Services.AddSession(); // Add session middleware

// MongoDB setup
builder.Services.AddSingleton<MongoDbContext>(sp => 
{
    
    var connectionString = builder.Configuration.GetConnectionString("MongoDb");
    var databaseName = builder.Configuration["MongoDb:DatabaseName"];
    return new MongoDbContext(connectionString, databaseName);
});

var app = builder.Build();

// Enable session middleware
app.UseSession();

// Existing pipeline setup
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Trip}/{action=Index}/{id?}");

app.Run();