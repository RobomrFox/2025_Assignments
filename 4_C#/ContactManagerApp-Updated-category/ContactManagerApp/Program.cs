using ContactManagerApp.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

// Add MongoDB dependency injection
builder.Services.AddSingleton<MongoDbContext>(sp =>
{
    var connectionString = builder.Configuration.GetConnectionString("MongoDb");
    var databaseName = builder.Configuration["MongoDb:DatabaseName"];
    return new MongoDbContext(connectionString, databaseName);
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
}
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Trip}/{action=Index}/{id?}");

app.Run();