using OrderApp.Models.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace OrderApp.Models.Entities
{
	public class OrderItem
	{
		public OrderItem()
		{

		}

		public long ID { get; set; }

		public int ProductID { get; set; }

		public virtual Product Product { get; set; }

		public long OrderID { get; set; }

		public virtual Order Order { get; set; }

		public int Amount { get; set; }

		public decimal UnitValue { get; set; }

		public bool Removed { get; set; }

		public OrderItemDTO ToDTO()
		{
			var dto = new OrderItemDTO();
			dto.ID = ID;
			dto.ProductID = ProductID;
			dto.Product = Product.ToDTO();
			dto.Amount = Amount;
			dto.UnitValue = UnitValue;
			dto.Removed = Removed;
			dto.OrderID = OrderID;
			return dto;
		}

	}
}
