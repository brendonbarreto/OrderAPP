using System;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using OrderApp.Models.Entities;
using System.Linq;

namespace OrderApp.Tests
{
	[TestClass]
	public class OrderTests
	{
		[TestMethod]
		public void Order_to_dto()
		{
			var order = new Order()
			{
				ID = 1,
				CustomerID = 2,
				Customer = new Customer()
				{
					ID = 2,
					Name = "Leia"
				},
				OrderItems = new List<OrderItem>()
				{
					new OrderItem()
					{
						ID = 3,
						Amount = 500,
						OrderID = 1,
						ProductID = 4,
						Product = new Product()
						{
							ID = 5,
							Multiple = 200,
							Name = "Ski Speeder",
							UnitValue = 30
						},
						Removed = false,
						UnitValue = 200
					}
				}
			};

			var dto = order.ToDTO();

			Assert.AreEqual(1, dto.ID);
			Assert.AreEqual(2, dto.CustomerID);
			Assert.AreEqual(2, dto.Customer.ID);
			Assert.AreEqual("Leia", dto.Customer.Name);

			var item = dto.Items.First();
			Assert.AreEqual(3, item.ID);
			Assert.AreEqual(500, item.Amount);
			Assert.AreEqual(1, item.OrderID);
			Assert.AreEqual(4, item.ProductID);
			Assert.AreEqual(false, item.Removed);
			Assert.AreEqual(200, item.UnitValue);

			var prod = item.Product;
			Assert.AreEqual(5, prod.ID);
			Assert.AreEqual((short?)200, prod.Multiple);
			Assert.AreEqual("Ski Speeder", prod.Name);
			Assert.AreEqual(30, prod.UnitValue);

		}
	}
}
