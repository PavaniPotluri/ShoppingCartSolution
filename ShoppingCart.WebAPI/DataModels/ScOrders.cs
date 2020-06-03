using System;
using System.Collections.Generic;

namespace ShoppingCart.WebAPI.DataModels
{
    public partial class ScOrders
    {
        public ScOrders()
        {
            ScReviews = new HashSet<ScReviews>();
        }

        public int OrderId { get; set; }
        public int InvoiceId { get; set; }
        public int ItemId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
        public int OrderStatusId { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Notes { get; set; }
        public DateTime? ExpDeliveryDate { get; set; }
        public DateTime? DeliveredDate { get; set; }

        public virtual ScInvoice Invoice { get; set; }
        public virtual ScItems Item { get; set; }
        public virtual ScOrderStatus OrderStatus { get; set; }
        public virtual ICollection<ScReviews> ScReviews { get; set; }
    }
}
