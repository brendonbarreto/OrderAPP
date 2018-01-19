using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using OrderApp.Models.DTOs;

namespace OrderApp.Tests
{
	[TestClass]
	public class ProductTests
	{
		[TestMethod]
		public void Profitability_min_value()
		{
			var prod = new ProductDTO() { UnitValue = 100 };
			Assert.AreEqual(90, prod.MinValue);
		}
	}
}
