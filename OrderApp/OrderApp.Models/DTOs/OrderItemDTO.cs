using System;
using System.Collections.Generic;
using System.Text;

namespace OrderApp.Models.DTOs
{
	public class OrderItemDTO
	{
		public long ID { get; set; }

		public int ProductID { get; set; }

		public long OrderID { get; set; }

		public int Amount { get; set; }

		public decimal UnitValue { get; set; }

		public ProductDTO Product { get; set; }

		public int Index { get; set; }

		public bool Removed { get; set; }
	}
}
