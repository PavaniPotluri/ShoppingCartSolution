using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ShoppingCart.WebAPI.DataModels
{
    public partial class ShoppingCartDBContext : DbContext
    {
       

        public ShoppingCartDBContext(DbContextOptions<ShoppingCartDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<NfUser> NfUser { get; set; }
        public virtual DbSet<ScAddress> ScAddress { get; set; }
        public virtual DbSet<ScInvoice> ScInvoice { get; set; }
        public virtual DbSet<ScItemCategories> ScItemCategories { get; set; }
        public virtual DbSet<ScItems> ScItems { get; set; }
        public virtual DbSet<ScOrderStatus> ScOrderStatus { get; set; }
        public virtual DbSet<ScOrders> ScOrders { get; set; }
        public virtual DbSet<ScReviews> ScReviews { get; set; }
        public virtual DbSet<ScUserCart> ScUserCart { get; set; }

      
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<NfUser>(entity =>
            {
                entity.HasKey(e => e.UserId);

                entity.ToTable("NF_User");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(256)
                    .IsUnicode(false);

                entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(256)
                    .IsUnicode(false);

                entity.Property(e => e.IsActive)
                    .IsRequired()
                    .HasDefaultValueSql("((1))");

                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(256)
                    .IsUnicode(false);

                entity.Property(e => e.MiddleName)
                    .HasMaxLength(256)
                    .IsUnicode(false);

                entity.Property(e => e.Password)
                    .IsRequired()
                    .HasMaxLength(256)
                    .IsUnicode(false);

                entity.Property(e => e.PasswordHash)
                    .IsRequired()
                    .HasMaxLength(256)
                    .IsUnicode(false);

                entity.Property(e => e.SecurityStamp)
                    .IsRequired()
                    .HasMaxLength(256)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<ScAddress>(entity =>
            {
                entity.HasKey(e => e.AddressId);

                entity.ToTable("SC_Address");

                entity.Property(e => e.AddressLine1)
                    .IsRequired()
                    .HasMaxLength(256)
                    .IsUnicode(false);

                entity.Property(e => e.AddressLine2)
                    .HasMaxLength(256)
                    .IsUnicode(false);

                entity.Property(e => e.City)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.LabelName)
                    .IsRequired()
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Pincode)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.State)
                    .IsRequired()
                    .HasMaxLength(256)
                    .IsUnicode(false);

                entity.HasOne(d => d.User)
                    .WithMany(p => p.ScAddress)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SC_Address_NF_User");
            });

            modelBuilder.Entity<ScInvoice>(entity =>
            {
                entity.HasKey(e => e.InvoiceId);

                entity.ToTable("SC_Invoice");

                entity.Property(e => e.InvoiceNumber)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.Property(e => e.Notes)
                    .HasMaxLength(512)
                    .IsUnicode(false);

                entity.Property(e => e.Price).HasColumnType("money");

                entity.HasOne(d => d.Address)
                    .WithMany(p => p.ScInvoice)
                    .HasForeignKey(d => d.AddressId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SC_Invoice_SC_Address");

                entity.HasOne(d => d.OrderStatus)
                    .WithMany(p => p.ScInvoice)
                    .HasForeignKey(d => d.OrderStatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SC_Invoice_SC_OrderStatus");
            });

            modelBuilder.Entity<ScItemCategories>(entity =>
            {
                entity.HasKey(e => e.ItemCategoryId);

                entity.ToTable("SC_ItemCategories");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(256)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<ScItems>(entity =>
            {
                entity.HasKey(e => e.ItemId);

                entity.ToTable("SC_Items");

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(256)
                    .IsUnicode(false);

                entity.Property(e => e.ItemPic)
                    .HasMaxLength(256)
                    .IsUnicode(false);

                entity.Property(e => e.OfferPrice).HasColumnType("money");

                entity.Property(e => e.OfferValidFrom).HasColumnType("datetime");

                entity.Property(e => e.OfferValidTo).HasColumnType("datetime");

                entity.Property(e => e.Price).HasColumnType("money");

                entity.HasOne(d => d.ItemCategory)
                    .WithMany(p => p.ScItems)
                    .HasForeignKey(d => d.ItemCategoryId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SC_Items_SC_ItemCategories");
            });

            modelBuilder.Entity<ScOrderStatus>(entity =>
            {
                entity.HasKey(e => e.OrderStatusId);

                entity.ToTable("SC_OrderStatus");

                entity.Property(e => e.OrderStatusId).ValueGeneratedNever();

                entity.Property(e => e.Description)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<ScOrders>(entity =>
            {
                entity.HasKey(e => e.OrderId);

                entity.ToTable("SC_Orders");

                entity.Property(e => e.CreatedDate).HasColumnType("datetime");

                entity.Property(e => e.DeliveredDate).HasColumnType("datetime");

                entity.Property(e => e.ExpDeliveryDate).HasColumnType("datetime");

                entity.Property(e => e.Notes)
                    .HasMaxLength(512)
                    .IsUnicode(false);

                entity.Property(e => e.Price).HasColumnType("money");

                entity.HasOne(d => d.Invoice)
                    .WithMany(p => p.ScOrders)
                    .HasForeignKey(d => d.InvoiceId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SC_Orders_SC_Invoice");

                entity.HasOne(d => d.Item)
                    .WithMany(p => p.ScOrders)
                    .HasForeignKey(d => d.ItemId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SC_Orders_SC_Items");

                entity.HasOne(d => d.OrderStatus)
                    .WithMany(p => p.ScOrders)
                    .HasForeignKey(d => d.OrderStatusId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SC_Orders_SC_OrderStatus");
            });

            modelBuilder.Entity<ScReviews>(entity =>
            {
                entity.HasKey(e => e.ItemReviewId);

                entity.ToTable("SC_Reviews");

                entity.Property(e => e.Notes)
                    .HasMaxLength(512)
                    .IsUnicode(false);

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.ScReviews)
                    .HasForeignKey(d => d.OrderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SC_Reviews_SC_Orders");
            });

            modelBuilder.Entity<ScUserCart>(entity =>
            {
                entity.HasKey(e => e.UserCartId);

                entity.ToTable("SC_UserCart");

                entity.HasOne(d => d.Item)
                    .WithMany(p => p.ScUserCart)
                    .HasForeignKey(d => d.ItemId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SC_UserCart_SC_Items");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.ScUserCart)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_SC_UserCart_NF_User");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
