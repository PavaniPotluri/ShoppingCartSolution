using System;
using System.Collections.Generic;

namespace ShoppingCart.WebAPI.DataModels
{
    public partial class ScAddress
    {
        public ScAddress()
        {
            ScInvoice = new HashSet<ScInvoice>();
        }

        public int AddressId { get; set; }
        public int UserId { get; set; }
        public string LabelName { get; set; }
        public string AddressLine1 { get; set; }
        public string AddressLine2 { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Pincode { get; set; }

        public virtual NfUser User { get; set; }
        public virtual ICollection<ScInvoice> ScInvoice { get; set; }
    }
}
