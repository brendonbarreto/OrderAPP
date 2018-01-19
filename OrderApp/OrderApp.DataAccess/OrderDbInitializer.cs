using OrderApp.Models.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace OrderApp.DataAccess
{
	public class OrderDbInitializer : System.Data.Entity.DropCreateDatabaseIfModelChanges<OrderDbContext>
	{

		protected override void Seed(OrderDbContext context)
		{
			context.Customers.Add(new Customer("Darth Vader"));
			context.Customers.Add(new Customer("Obi-Wan Kenobi"));
			context.Customers.Add(new Customer("Luke Skywalker"));
			context.Customers.Add(new Customer("Imperador Palpatine"));
			context.Customers.Add(new Customer("Han Solo"));

			context.Products.Add(new Product("Millenium Falcon", 550000));
			context.Products.Add(new Product("X-Wing", 60000, 2));
			context.Products.Add(new Product("Super Star Destroyer", 4570000));
			context.Products.Add(new Product("TIE Fighter", 75000, 2));
			context.Products.Add(new Product("Lightsaber", 6000, 5));
			context.Products.Add(new Product("DLT-19 Heavy Blaster Rifle", 5800));
			context.Products.Add(new Product("DL-44 Heavy Blaster Pistol", 1500, 10));
			context.SaveChanges();
			
		}
	}
}
