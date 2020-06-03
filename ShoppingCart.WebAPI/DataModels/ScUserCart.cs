using System;
using System.Collections.Generic;

namespace ShoppingCart.WebAPI.DataModels
{
    public partial class ScUserCart
    {
        public int UserCartId { get; set; }
        public int UserId { get; set; }
        public int ItemId { get; set; }
        public int Quantity { get; set; }

        public virtual ScItems Item { get; set; }
        public virtual NfUser User { get; set; }
    }
}
