using OrderApp.Models.DTOs;
using System;
using System.Collections.Generic;
using System.Text;

namespace OrderApp.Models.Entities
{
	public class Product : IEntityDTO<ProductDTO>
	{
		public Product()
		{
				
		}

		public Product(string name, decimal unitValue, short? multiple = null)
		{
			Name = name;
			UnitValue = unitValue;
			Multiple = multiple;
		}

		public int ID { get; set; }

		public string Name { get; set; }

		//Decimal para evitar qualquer problema de cálculo, como acontece com os pontos flutuantes
		public decimal UnitValue { get; set; }
		
		public short? Multiple { get; set; }

		public ProductDTO ToDTO()
		{
			return Framework.ObjectTransferUtils.Copy<Product, ProductDTO>(this);
		}
	}
}
