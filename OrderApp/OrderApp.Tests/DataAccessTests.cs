using System;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using OrderApp.DataAccess;
using OrderApp.Models.Entities;
using System.Linq;

namespace OrderApp.Tests
{
	[TestClass]
	public class DataAccessTests
	{

		[TestMethod]
		public void Try_connect()
		{
			using (var db = new OrderDbContext())
			{
				Assert.IsTrue(db.Database.Exists());
			}
		}

		[TestMethod]
		public void Get_default_customers()
		{
			var customers = new List<Customer>()
			{
				new Customer("Darth Vader"){ ID = 1 },
				new Customer("Obi-Wan Kenobi"){ ID = 2 },
				new Customer("Luke Skywalker"){ ID = 3 },
				new Customer("Imperador Palpatine"){ ID = 4 },
				new Customer("Han Solo"){ ID = 5 },
			};

			using (var db = new OrderDbContext())
			{
				foreach (var customer in customers)
				{
					var dbCustomer = db.Customers.FirstOrDefault(m => m.ID == customer.ID 
						&& m.Name == customer.Name);
					if (dbCustomer is null)
					{
						Assert.Fail();
					}
				}
			}
		}

		[TestMethod]
		public void Get_default_products()
		{
			var products = new List<Product>()
			{
				new Product("Millenium Falcon", 550000){ ID = 1 },
				new Product("X-Wing", 60000, 2){ ID = 2 },
				new Product("Super Star Destroyer", 4570000){ ID = 3 },
				new Product("TIE Fighter", 75000, 2){ ID = 4 },
				new Product("Lightsaber", 6000, 5){ ID = 5 },
				new Product("DLT-19 Heavy Blaster Rifle", 5800){ ID = 6 },
				new Product("DL-44 Heavy Blaster Pistol", 1500, 10){ ID = 7 }
			};

			using (var db = new OrderDbContext())
			{
				foreach (var product in products)
				{
					var dbProduct = db.Products.FirstOrDefault(m => m.ID == product.ID 
						&& m.Name == product.Name
						&& m.UnitValue == product.UnitValue
						&& m.Multiple == product.Multiple);
					if (dbProduct is null)
					{
						Assert.Fail();
					}
				}
			}
		}
	}
}
