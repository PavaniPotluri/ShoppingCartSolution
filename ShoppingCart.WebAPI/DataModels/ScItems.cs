using System;
using System.Collections.Generic;

namespace ShoppingCart.WebAPI.DataModels
{
    public partial class ScItems
    {
        public ScItems()
        {
            ScOrders = new HashSet<ScOrders>();
            ScUserCart = new HashSet<ScUserCart>();
        }

        public int ItemId { get; set; }
        public int ItemCategoryId { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int DisplayOrder { get; set; }
        public bool IsInOffer { get; set; }
        public DateTime? OfferValidFrom { get; set; }
        public DateTime? OfferValidTo { get; set; }
        public string ItemPic { get; set; }
        public decimal? OfferPrice { get; set; }

        public virtual ScItemCategories ItemCategory { get; set; }
        public virtual ICollection<ScOrders> ScOrders { get; set; }
        public virtual ICollection<ScUserCart> ScUserCart { get; set; }
    }
}
