using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ShoppingCart.WebAPI.Helpers
{
    public class APIUserHelper: ControllerBase
    {
        public static int GetUserId(IPrincipal user)
        {
            ClaimsIdentity cp = (ClaimsIdentity)user.Identity;
            IEnumerable<Claim> claims = cp.Claims;
            return int.Parse(claims.FirstOrDefault(x => x.Type == "UserId").Value);
        }
    }
}
