using System;
using System.Collections.Generic;

namespace ShoppingCart.WebAPI.DataModels
{
    public partial class ScReviews
    {
        public int ItemReviewId { get; set; }
        public int OrderId { get; set; }
        public int Rating { get; set; }
        public string Notes { get; set; }

        public virtual ScOrders Order { get; set; }
    }
}
