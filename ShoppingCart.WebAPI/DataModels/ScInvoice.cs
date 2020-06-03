using System;
using System.Collections.Generic;

namespace ShoppingCart.WebAPI.DataModels
{
    public partial class ScInvoice
    {
        public ScInvoice()
        {
            ScOrders = new HashSet<ScOrders>();
        }

        public int InvoiceId { get; set; }
        public int AddressId { get; set; }
        public decimal Price { get; set; }
        public int OrderStatusId { get; set; }
        public string Notes { get; set; }
        public string InvoiceNumber { get; set; }

        public virtual ScAddress Address { get; set; }
        public virtual ScOrderStatus OrderStatus { get; set; }
        public virtual ICollection<ScOrders> ScOrders { get; set; }
    }
}
