using OrderApp.Models.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;

namespace OrderApp.Models.Entities
{
	public class Order
	{
		public Order()
		{

		}

		public long ID { get; set; }

		public int CustomerID { get; set; }

		public virtual Customer Customer { get; set; }

		public virtual ICollection<OrderItem> OrderItems { get; set; }

		public OrderDTO ToDTO()
		{
			var dto = new OrderDTO();
			dto.ID = ID;
			dto.CustomerID = CustomerID;
			dto.Customer = Customer.ToDTO();

			if (OrderItems != null && OrderItems.Any())
			{
				dto.Items = new List<OrderItemDTO>();
				foreach (var item in OrderItems)
				{
					var itemDTO = item.ToDTO();
					itemDTO.Index = dto.Items.Count + 1;
					dto.Items.Add(itemDTO);

				}
			}

			return dto;

		}
	}
}
