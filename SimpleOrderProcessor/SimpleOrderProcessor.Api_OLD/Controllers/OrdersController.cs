using Microsoft.AspNetCore.Mvc;
using SimpleOrderProcessor.Api.Services;
using SimpleOrderProcessor.Messages; // Don't forget this!

namespace SimpleOrderProcessor.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrdersController : ControllerBase
    {
        private readonly RabbitMQPublisher _rabbitMQPublisher;
        private readonly ILogger<OrdersController> _logger;

        public OrdersController(RabbitMQPublisher rabbitMQPublisher, ILogger<OrdersController> logger)
        {
            _rabbitMQPublisher = rabbitMQPublisher;
            _logger = logger;
        }

        [HttpPost]
        public IActionResult PlaceOrder([FromBody] OrderPlacedMessage order)
        {
            if (order == null || order.Items == null || !order.Items.Any())
            {
                return BadRequest("Order data is invalid.");
            }

            // Assign a new OrderId if not provided (simulating new order creation)
            if (order.OrderId == Guid.Empty)
            {
                order.OrderId = Guid.NewGuid();
            }
            order.OrderDate = DateTime.UtcNow; // Ensure consistent timestamp

            _logger.LogInformation($"Received order {order.OrderId} from {order.CustomerEmail}. Publishing to RabbitMQ...");
            _rabbitMQPublisher.PublishMessage(order);

            return Ok(new { Message = "Order placed successfully and sent to processing queue.", OrderId = order.OrderId });
        }
    }
}