using System;
using System.Collections.Generic;
using System.Text;

namespace OrderApp.Models.DTOs
{
	public class ProductDTO
	{
		public int ID { get; set; }

		public string Name { get; set; }
		
		public decimal UnitValue { get; set; }

		public short? Multiple { get; set; }

		public decimal MinValue => UnitValue * (decimal)0.9;
	}
}
