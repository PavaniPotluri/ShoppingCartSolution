using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ShoppingCart.WebAPI.Models;
using ShoppingCart.WebAPI.DataModels;

namespace ShoppingCart.WebAPI.Services
{
    public interface IDashboardService
    {
        DashboardModel GetDashboardItems(int userId);
    }
    public class DashboardService: IDashboardService
    {
        private readonly ShoppingCartDBContext dbContext;

        public DashboardService(ShoppingCartDBContext context)
        {
            dbContext = context;
        }

        public DashboardModel GetDashboardItems(int userId)
        {
            var items = (from orders in dbContext.ScOrders.AsEnumerable()
                         join invoice in dbContext.ScInvoice on orders.InvoiceId equals invoice.InvoiceId
                         join Address in dbContext.ScAddress on invoice.AddressId equals Address.AddressId
                         where Address.UserId == userId
                         select new OrdersModel() {
                             OrderId = orders.OrderId,
                             OrderStatusId = orders.OrderStatusId
                         }).ToList();

            int pendingcount = items != null ? items.Select(x => x.OrderStatusId != 3).Count() : 0;
            int completedcount = items != null ? items.Select(x => x.OrderStatusId == 3).Count() : 0;
            int cartCount = (from UserCart in dbContext.ScUserCart where UserCart.UserId == userId select UserCart.UserCartId).Count();

            DateTime today = DateTime.Parse(DateTime.Now.ToShortDateString());

            var itemsModel = (from ScItems in dbContext.ScItems.AsEnumerable()
                              join ScItemCategories in dbContext.ScItemCategories on ScItems.ItemCategoryId equals ScItemCategories.ItemCategoryId
                              where ScItems.IsInOffer == true 
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
                                  OfferPrice=ScItems.OfferPrice
                                 // Rating = (int)Math.Ceiling((from Reviews in dbContext.ScReviews
                                                              //join Orders in dbContext.ScOrders on Reviews.OrderId equals Orders.OrderId
                                                              //where Orders.ItemId == ScItems.ItemId
                                                             // select Reviews.Rating).Average()),
                              }).ToList();
            DashboardModel dbModel = new DashboardModel();
            dbModel.PendingCount = pendingcount;
            dbModel.CompletedCount = completedcount;
            dbModel.CartCount = cartCount;
            dbModel.OfferItems = itemsModel;

            return dbModel;
        }

    }
}
