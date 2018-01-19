using Microsoft.VisualStudio.TestTools.UnitTesting;
using OrderApp.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderApp.Tests
{
	[TestClass]
	public class CustomerTests
	{
		[TestMethod]
		public void Customer_to_dto()
		{
			var customer = new Customer()
			{
				ID = 1,
				Name = "Yoda"
			};

			var dto = customer.ToDTO();
			Assert.AreEqual(1, dto.ID);
			Assert.AreEqual("Yoda", dto.Name);
		}
	}
}
