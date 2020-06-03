using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ShoppingCart.WebAPI.Models;
using ShoppingCart.WebAPI.DataModels;

namespace ShoppingCart.WebAPI.Services
{
    public interface IItemsService
    {
        ICollection<ItemsModel> GetItems();
        ItemsModel GetSingle(int id);
        int AddItem(ItemsModel model);
        int UpdateItem(ItemsModel model,int id);
        int DeleteItem(int id);
        ICollection<ItemCategoriesModel> GetCategories();
    }
    public class ItemsService :IItemsService
    {
        ShoppingCartDBContext dbContext;
        public ItemsService(ShoppingCartDBContext context)
        {
            dbContext = context;
        }

        public ICollection<ItemsModel> GetItems()
        {
            var itemsModel = (from ScItems in dbContext.ScItems.AsEnumerable()
                              join ScItemCategories in dbContext.ScItemCategories on ScItems.ItemCategoryId equals ScItemCategories.ItemCategoryId
                              orderby ScItems.DisplayOrder
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
                                  OfferPrice = ScItems.OfferPrice,
                                  DisplayOrder = ScItems.DisplayOrder
                                  //Rating = (from Reviews in dbContext.ScReviews.AsEnumerable()
                                  //                            join Orders in dbContext.ScOrders on Reviews.OrderId equals Orders.OrderId
                                  //                            where Orders.ItemId == ScItems.ItemId
                                  //                            select Reviews.Rating).Average(),


                              }).ToList();
            return itemsModel;
        }

        public ItemsModel GetSingle(int id)
        {
            var itemsModel = (from ScItems in dbContext.ScItems.AsEnumerable()
                              join ScItemCategories in dbContext.ScItemCategories on ScItems.ItemCategoryId equals ScItemCategories.ItemCategoryId
                              where ScItems.ItemId == id
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
                                  OfferPrice = ScItems.OfferPrice,
                                  DisplayOrder = ScItems.DisplayOrder,
                                  //Rating = (int)Math.Ceiling((from Reviews in dbContext.ScReviews
                                  //                            join Orders in dbContext.ScOrders on Reviews.OrderId equals Orders.OrderId

                                  //                            where Orders.ItemId == ScItems.ItemId
                                  //                            select Reviews.Rating).Average()),
                                  ItemReviews =(from Reviews in dbContext.ScReviews
                                               join Orders in dbContext.ScOrders on Reviews.OrderId equals Orders.OrderId
                                               join User in dbContext.NfUser on Orders.CreatedBy equals User.UserId
                                               where Orders.ItemId == ScItems.ItemId
                                               select new ReviewModel()
                                               {
                                                   ReviewId = Reviews.ItemReviewId,
                                                   Rating = Reviews.Rating,
                                                   Notes = Reviews.Notes,
                                                   ReviewByName = User.FirstName+" "+User.LastName
                                               }).ToList()


                              }).FirstOrDefault();
            return itemsModel;
        }
        public int AddItem(ItemsModel model)
        {
            try
            {
                var list = (from Items in dbContext.ScItems
                            where Items.Description == model.Description && Items.ItemCategoryId == model.ItemCategoryId
                            select Items).Count();
                if (list == 0)
                {
                    ScItems newItem = new ScItems();

                    newItem.ItemCategoryId = model.ItemCategoryId;
                    newItem.Description = model.Description;
                    newItem.Price = model.Price;
                    newItem.DisplayOrder = model.DisplayOrder;
                    newItem.IsInOffer = model.IsInOffer;
                    newItem.OfferValidFrom = model.OfferValidFrom;
                    newItem.OfferValidTo = model.OfferValidTo;
                    newItem.OfferPrice = model.OfferPrice;

                    dbContext.Add(newItem);
                    dbContext.SaveChanges();
                    model.ItemId = newItem.ItemId;

                    return newItem.ItemId;
                }
                else
                    return -1;
            }
            catch(Exception ex)
            {
                return 0;
            }
        }

        public int UpdateItem(ItemsModel model, int id)
        {
            try
            {
                var list = (from Items in dbContext.ScItems
                            where Items.Description == model.Description && Items.ItemCategoryId == model.ItemCategoryId && Items.ItemId != id
                            select Items).Count();
                if (list == 0)
                {

                    ScItems item = new ScItems();

                    item.ItemId = model.ItemId;
                    item.ItemCategoryId = model.ItemCategoryId;
                    item.Description = model.Description;
                    item.Price = model.Price;
                    item.DisplayOrder = model.DisplayOrder;
                    item.IsInOffer = model.IsInOffer;
                    item.OfferValidFrom = model.OfferValidFrom;
                    item.OfferValidTo = model.OfferValidTo;
                    item.OfferPrice = model.OfferPrice;

                    dbContext.Entry(item).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                    dbContext.SaveChanges();
                    return 1;
                }
                else
                    return -1;
            }
            catch (Exception ex)
            {
                return 0;
            }
        }

        public int DeleteItem(int id)
        {
            try
            {
                ScItems item = dbContext.ScItems.Find(id);
                if (item != null)
                {
                    dbContext.ScItems.Remove(item);
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
        public ICollection<ItemCategoriesModel> GetCategories()
        {
            var categories = (from category in dbContext.ScItemCategories
                              orderby category.DisplayOrder
                              select new ItemCategoriesModel()
                              {
                                  ItemCategoryId = category.ItemCategoryId,
                                  CategoryName = category.Description,
                                  IsActive = category.IsActive,
                                  DisplayOrder = category.DisplayOrder
                              }).ToList();
            return categories;
        }
    }
}
