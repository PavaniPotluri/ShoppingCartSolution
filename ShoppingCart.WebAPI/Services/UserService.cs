using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Internal;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using ShoppingCart.WebAPI.Models;
using ShoppingCart.WebAPI.Helpers;
using ShoppingCart.WebAPI.DataModels;

namespace ShoppingCart.WebAPI.Services
{
    public interface IUserService
    {
        User Authenticate(string username, string password);
    }

    public class UserService : IUserService
    {
        private ShoppingCartDBContext dbContext;
        private readonly AppSettings _appSettings;
        public UserService(ShoppingCartDBContext context, IOptions<AppSettings> appSettings)
        {
            dbContext = context;
            _appSettings = appSettings.Value;
        }
        private List<User> GetUsers(string username)
        {
            var users = (from NfUser in dbContext.NfUser
                         where NfUser.Email == username
                         select new User()
                         {
                             Id = NfUser.UserId,
                             FirstName = NfUser.FirstName,
                             LastName = NfUser.LastName,
                             Username = NfUser.FirstName + " " + NfUser.LastName,
                             Email = NfUser.Email,
                             Password = NfUser.Password,
                             IsAdmin = NfUser.IsAdmin
                         }).ToList();
            return users;
        }

        public User Authenticate(string username, string password)
        {
            var users = GetUsers(username);

            var user = users.SingleOrDefault(x => x.Email == username && x.Password == password);

            // return null if user not found
            if (user == null)
                return null;

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim("UserId", user.Id.ToString()),
                    new Claim("UserName", (user.FirstName+" " +user.LastName).ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            return user;
        }


    }
}