using OrderApp.Framework;
using OrderApp.Models.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace OrderApp.Models.DTOs
{
	public class OrderDTO
	{
		public long ID { get; set; }

		public int CustomerID { get; set; }

		public CustomerDTO Customer { get; set; }

		public List<OrderItemDTO> Items { get; set; }

		public Order ToModel()
		{
			var model = ObjectTransferUtils.Copy<OrderDTO, Order>(this);
			if (Items != null && Items.Any())
			{
				model.OrderItems = new List<OrderItem>();
				Items.ForEach(item =>
				{
					model.OrderItems.Add(ObjectTransferUtils.Copy<OrderItemDTO, OrderItem>(item));
				});
			}

			return model;
		}
	}
}
