using OrderApp.Models.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace OrderApp.Models.Entities
{
	public class Customer : IEntityDTO<CustomerDTO>
	{
		public Customer()
		{

		}

		public Customer(string name) => Name = name;

		public int ID { get; set; }

		public string Name { get; set; }

		public virtual ICollection<Order> Orders { get; set; }

		public CustomerDTO ToDTO()
		{
			var dto = new CustomerDTO
			{
				ID = ID,
				Name = Name
			};

			return dto;
		}
	}
}
