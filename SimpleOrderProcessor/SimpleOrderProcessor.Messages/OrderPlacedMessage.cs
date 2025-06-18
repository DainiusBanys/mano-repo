using System.Collections.Generic;
using System;

namespace SimpleOrderProcessor.Messages
{
    public class OrderPlacedMessage
    {
        public Guid OrderId { get; set; }
        public string CustomerEmail { get; set; }
        public DateTime OrderDate { get; set; }
        public List<OrderItem> Items { get; set; } = new List<OrderItem>();
        public decimal TotalAmount { get; set; }
    }

    public class OrderItem
    {
        public string ProductId { get; set; }
        public string ProductName { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}