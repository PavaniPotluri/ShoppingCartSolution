using System;
using System.Collections.Generic;

namespace ShoppingCart.WebAPI.DataModels
{
    public partial class ScItemCategories
    {
        public ScItemCategories()
        {
            ScItems = new HashSet<ScItems>();
        }

        public int ItemCategoryId { get; set; }
        public string Description { get; set; }
        public bool IsActive { get; set; }
        public int DisplayOrder { get; set; }

        public virtual ICollection<ScItems> ScItems { get; set; }
    }
}
