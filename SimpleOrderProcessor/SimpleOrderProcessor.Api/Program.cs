using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models; // Ensure this is present for Swagger
using SimpleOrderProcessor.Api.Services; // For RabbitMQPublisher

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// These are services that your application components (like controllers) will use.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "SimpleOrderProcessor.Api", Version = "v1" });
});

// Register our RabbitMQ Publisher as a Singleton
// A singleton means only one instance of RabbitMQPublisher will be created and reused.
builder.Services.AddSingleton<RabbitMQPublisher>();

var app = builder.Build(); // <-- CRUCIAL: 'app' is declared and built here!

// Configure the HTTP request pipeline.
// These are middleware components that process incoming HTTP requests.
if (app.Environment.IsDevelopment())
{
    // Enable Swagger UI only in development environment
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "SimpleOrderProcessor.Api v1");
    });
}

// Redirect HTTP requests to HTTPS for security
app.UseHttpsRedirection();

// Enable authorization middleware (if you had authentication/authorization logic)
app.UseAuthorization();

// Map incoming requests to controller actions
app.MapControllers();

// Starts the web application
app.Run();