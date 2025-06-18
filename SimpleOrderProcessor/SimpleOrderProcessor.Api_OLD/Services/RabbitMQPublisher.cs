using RabbitMQ.Client; // Ensure this namespace is included

namespace SimpleOrderProcessor.Api.Services
{
    public class RabbitMQPublisher
    {
        private readonly IConnection _connection;
        private readonly RabbitMQ.Client.IModel _channel; // Fully qualify the IModel type
        private readonly string _exchangeName = "order_exchange"; // Our main exchange
        private readonly string _routingKey = "order.placed";   // Specific routing key

        public RabbitMQPublisher(IConfiguration configuration)
        {
            var factory = new ConnectionFactory() { HostName = configuration["RabbitMQ:HostName"] };
            _connection = factory.CreateConnection();
            _channel = _connection.CreateModel();

            // Declare a durable topic exchange
            _channel.ExchangeDeclare(exchange: _exchangeName, type: ExchangeType.Topic, durable: true);
        }

        public void PublishMessage<T>(T message)
        {
            var jsonString = JsonSerializer.Serialize(message);
            var body = Encoding.UTF8.GetBytes(jsonString);

            // Publish the message to the exchange with the routing key
            _channel.BasicPublish(
                exchange: _exchangeName,
                routingKey: _routingKey,
                basicProperties: null, // No specific message properties for now
                body: body);

            Console.WriteLine($" [x] Sent '{_routingKey}':'{jsonString}'");
        }

        public void Dispose()
        {
            _channel?.Close();
            _connection?.Close();
        }
    }
}