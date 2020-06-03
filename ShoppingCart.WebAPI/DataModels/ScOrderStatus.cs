using System;
using System.Collections.Generic;

namespace ShoppingCart.WebAPI.DataModels
{
    public partial class ScOrderStatus
    {
        public ScOrderStatus()
        {
            ScInvoice = new HashSet<ScInvoice>();
            ScOrders = new HashSet<ScOrders>();
        }

        public int OrderStatusId { get; set; }
        public string Description { get; set; }
        public int DisplayOrder { get; set; }

        public virtual ICollection<ScInvoice> ScInvoice { get; set; }
        public virtual ICollection<ScOrders> ScOrders { get; set; }
    }
}
