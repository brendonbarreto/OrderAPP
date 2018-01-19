using OrderApp.Models.Entities;
using System;
using System.Data.Entity;

namespace OrderApp.DataAccess
{
	public class OrderDbContext : DbContext
	{
		public OrderDbContext() : base(@"Server=localhost;Database=OrdersDB;Trusted_Connection=True;")
		{
			Database.SetInitializer(new OrderDbInitializer());
			Configuration.ProxyCreationEnabled = true;
			Configuration.AutoDetectChangesEnabled = true;
			Configuration.LazyLoadingEnabled = true;
		}

		public DbSet<Customer> Customers { get; set; }

		public DbSet<Order> Orders { get; set; }

		public DbSet<OrderItem> OrderItems { get; set; }

		public DbSet<Product> Products { get; set; }
	}
}
