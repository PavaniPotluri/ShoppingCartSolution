using System;
using System.Collections.Generic;

namespace ShoppingCart.WebAPI.DataModels
{
    public partial class NfUser
    {
        public NfUser()
        {
            ScAddress = new HashSet<ScAddress>();
            ScUserCart = new HashSet<ScUserCart>();
        }

        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string MiddleName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PasswordHash { get; set; }
        public string SecurityStamp { get; set; }
        public bool? IsActive { get; set; }
        public bool IsAdmin { get; set; }

        public virtual ICollection<ScAddress> ScAddress { get; set; }
        public virtual ICollection<ScUserCart> ScUserCart { get; set; }
    }
}
