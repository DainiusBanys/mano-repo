using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using System.Text.Json;
using SimpleOrderProcessor.Messages; // Don't forget this!

namespace SimpleOrderProcessor.OrderProcessor
{
    public class Worker : BackgroundService
    {
        private readonly ILogger<Worker> _logger;
        private readonly IConfiguration _configuration;
        private IConnection _connection;
        private IModel _channel;
        private readonly string _queueName;
        private readonly string _exchangeName = "order_exchange"; // Match the publisher
        private readonly string _routingKey; // Get from config

        public Worker(ILogger<Worker> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
            _queueName = _configuration["OrderProcessor:QueueName"];
            _routingKey = _configuration["OrderProcessor:RoutingKey"];
        }

        private void InitializeRabbitMQ()
        {
            try
            {
                var factory = new ConnectionFactory() { HostName = _configuration["RabbitMQ:HostName"] };
                _connection = factory.CreateConnection();
                _channel = _connection.CreateModel();

                // Declare a durable topic exchange (same as publisher)
                _channel.ExchangeDeclare(exchange: _exchangeName, type: ExchangeType.Topic, durable: true);

                // Declare a durable queue
                _channel.QueueDeclare(queue: _queueName,
                                     durable: true,    // Messages persist across broker restarts
                                     exclusive: false,
                                     autoDelete: false,
                                     arguments: null);

                // Bind the queue to the exchange with the routing key
                _channel.QueueBind(queue: _queueName,
                                   exchange: _exchangeName,
                                   routingKey: _routingKey);

                _logger.LogInformation($" [*] Waiting for messages on queue '{_queueName}' with routing key '{_routingKey}'.");
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Could not connect to RabbitMQ. Retrying in 5 seconds.");
                Thread.Sleep(5000); // Wait and retry
                InitializeRabbitMQ(); // Recursive call to retry connection
            }
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            stoppingToken.ThrowIfCancellationRequested();

            InitializeRabbitMQ(); // Establish connection and declare topology

            var consumer = new EventingBasicConsumer(_channel);
            consumer.Received += (model, ea) =>
            {
                var body = ea.Body.ToArray();
                var message = Encoding.UTF8.GetString(body);

                try
                {
                    var order = JsonSerializer.Deserialize<OrderPlacedMessage>(message);
                    _logger.LogInformation($" [x] OrderProcessor received and processing OrderId: {order.OrderId} for Customer: {order.CustomerEmail}");
                    // Simulate processing time
                    Task.Delay(1000).Wait();
                    _logger.LogInformation($" [x] OrderProcessor finished processing OrderId: {order.OrderId}");

                    // Acknowledge the message to RabbitMQ
                    _channel.BasicAck(deliveryTag: ea.DeliveryTag, multiple: false);
                }
                catch (JsonException ex)
                {
                    _logger.LogError(ex, $"Failed to deserialize message: {message}");
                    // Negative acknowledge: reject message, don't re-queue (move to DLQ if configured)
                    _channel.BasicNack(deliveryTag: ea.DeliveryTag, multiple: false, requeue: false);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, $"Error processing message: {message}");
                    // Negative acknowledge: reject message, re-queue if temporary error, or move to DLQ
                    _channel.BasicNack(deliveryTag: ea.DeliveryTag, multiple: false, requeue: true); // Requeue for retry
                }
            };

            // Start consuming messages
            _channel.BasicConsume(queue: _queueName, autoAck: false, consumer: consumer); // autoAck: false for explicit acks

            return Task.CompletedTask;
        }

        public override void Dispose()
        {
            _channel?.Close();
            _connection?.Close();
            base.Dispose();
        }
    }
}
