using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ShoppingCart.WebAPI.Models;
using ShoppingCart.WebAPI.DataModels;

namespace ShoppingCart.WebAPI.Services
{
    public interface ICartService
    {
        ICollection<CartModel> GetUserCartItems(int userId);
        CartModel GetSingle(int id);
        int AddToCart(CartModel model);
        int ModifyCartItem(CartModel model, int id);
        int DeleteCartItem(int id);
    }
    public class CartServices : ICartService
    {
        private readonly ShoppingCartDBContext dbContext;

        public CartServices(ShoppingCartDBContext context)
        {
            dbContext = context;
        }

        public ICollection<CartModel> GetUserCartItems(int userId)
        {
            var items = (from UserCart in dbContext.ScUserCart
                         where UserCart.UserId == userId
                         select new CartModel()
                         {
                             UserCartId = UserCart.UserCartId,
                             Quantity = UserCart.Quantity,
                             Item = (from ScItems in dbContext.ScItems
                                     join ScItemCategories in dbContext.ScItemCategories on ScItems.ItemCategoryId equals ScItemCategories.ItemCategoryId
                                     where ScItems.ItemId == UserCart.ItemId
                                     select new ItemsModel()
                                     {
                                         ItemId = ScItems.ItemId,
                                         ItemCategoryId = ScItems.ItemCategoryId,
                                         CategoryName = ScItemCategories.Description,
                                         Description = ScItems.Description,
                                         OfferValidFrom = ScItems.OfferValidFrom,
                                         OfferValidTo = ScItems.OfferValidTo,
                                         ItemPic = ScItems.ItemPic,
                                         Price= ScItems.Price,
                                         OfferPrice= ScItems.OfferPrice
                                     }).FirstOrDefault()
                         }).ToList();
            return items;
        }
        public CartModel GetSingle(int id)
        {
            var items = (from UserCart in dbContext.ScUserCart
                         where UserCart.UserCartId == id
                         select new CartModel()
                         {
                             UserCartId = UserCart.UserCartId,
                             Quantity = UserCart.Quantity,
                             Item = (from ScItems in dbContext.ScItems
                                     join ScItemCategories in dbContext.ScItemCategories on ScItems.ItemCategoryId equals ScItemCategories.ItemCategoryId
                                     where ScItems.ItemId == UserCart.ItemId
                                     select new ItemsModel()
                                     {
                                         ItemId = ScItems.ItemId,
                                         ItemCategoryId = ScItems.ItemCategoryId,
                                         CategoryName = ScItemCategories.Description,
                                         Description = ScItems.Description,
                                         OfferValidFrom = ScItems.OfferValidFrom,
                                         OfferValidTo = ScItems.OfferValidTo,
                                         ItemPic = ScItems.ItemPic,
                                         Price = ScItems.Price,
                                         OfferPrice = ScItems.OfferPrice
                                     }).FirstOrDefault()
                         }).FirstOrDefault();
            return items;
        }

        public int AddToCart(CartModel model)
        {
            try
            {
                var item = (from cart in dbContext.ScUserCart
                            where cart.UserId == model.UserId && cart.ItemId == model.ItemId
                            select cart).FirstOrDefault();
                if (item != null)
                {
                    ScUserCart userCart = dbContext.ScUserCart.Find(item.UserCartId);

                    userCart.UserCartId = userCart.UserCartId;
                    userCart.UserId = model.UserId;
                    userCart.ItemId = model.ItemId;
                    userCart.Quantity = item.Quantity+ model.Quantity;

                    dbContext.Entry(userCart).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    dbContext.SaveChanges();
                   
                    model.UserCartId = userCart.UserCartId;

                }
                else
                {
                    ScUserCart newCart = new ScUserCart();
                    newCart.UserId = model.UserId;
                    newCart.ItemId = model.ItemId;
                    newCart.Quantity = model.Quantity;
                    dbContext.Add(newCart);
                    dbContext.SaveChanges();
                    model.UserCartId = newCart.UserCartId;
                }
                return model.UserCartId;
            }
            catch (Exception ex)
            {
                return 0;

            }
        }
        public int ModifyCartItem(CartModel model, int id)
        {
            try
            {
                ScUserCart cart = new ScUserCart();
                cart.UserCartId = id;
                cart.UserId = model.UserId;
                cart.ItemId = model.ItemId;
                cart.Quantity = model.Quantity;

                dbContext.Entry(cart).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                dbContext.SaveChanges();
                return 1;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }
        public int DeleteCartItem(int id)
        {
            try
            {
                ScUserCart kid = dbContext.ScUserCart.Find(id);
                if (kid != null)
                {
                    dbContext.ScUserCart.Remove(kid);
                    dbContext.SaveChanges();
                    return 1;
                }
                else
                    return 0;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }
    }
}
