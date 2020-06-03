
using System;
using System.Collections.Generic;

namespace ShoppingCart.WebAPI.Models
{
    public class DashboardModel
    {
        public int PendingCount { get; set; }
        public int CompletedCount { get; set; }
        public int CartCount { get; set; }
        public ICollection<ItemsModel> OfferItems { get; set; }
    }

    public class ItemsModel
    {
        public int ItemId { get; set; }
        public int ItemCategoryId { get; set; }
        public string CategoryName { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public decimal? OfferPrice { get; set; }
        public int DisplayOrder { get; set; }
        public bool IsInOffer { get; set; }
        public DateTime? OfferValidFrom { get; set; }
        public DateTime? OfferValidTo { get; set; }
        public string ItemPic { get; set; }
        public double Rating { get; set; }

        public ICollection<ReviewModel> ItemReviews { get; set; }
    }

    public class OrdersModel
    {
        public int OrderId { get; set; }
        public int InvoiceId { get; set; }
        public int ItemId { get; set; }
        public string ItemName { get; set; }
        public string ItemPic { get; set; }
        public int rating { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
        public int OrderStatusId { get; set; }
        public int CreatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Notes { get; set; }
        public DateTime ExpDeliveryDate { get; set; }
        public DateTime DeliveredDate { get; set; }
    }

    public class InvoiceModel
    {
        public int InvoiceId { get; set; }
        public int AddressId { get; set; }
        public string Address { get; set; }
        public int OrderStatusId { get; set; }
        public double Price { get; set; }

        public ICollection<OrdersModel> Orders { get; set; }
    }

    public class ReviewModel
    {
        public int ReviewId { get; set; }
        public int OrderId { get; set; }
        public int Rating { get; set; }
        public string Notes { get; set; }
        public string ReviewByName { get; set; }
    }

    public class CartModel
    {
        public int UserCartId { get; set; }
        public int UserId { get; set; }
        public int Quantity { get; set; }
        public int ItemId { get; set; }
        public ItemsModel Item { get; set; }

    }

    public class ItemCategoriesModel
    {
        public int ItemCategoryId { get; set; }
        public string CategoryName { get; set; }
        public bool IsActive { get; set; }
        public int DisplayOrder { get; set; }
    }

}
