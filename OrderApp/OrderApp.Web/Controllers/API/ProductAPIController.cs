using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OrderApp.DataAccess;
using OrderApp.Models.DTOs;

namespace OrderApp.Web.Controllers.API
{
	[Produces("application/json")]
	[Route("api/Product")]
	public class ProductAPIController : Controller
	{
		[HttpGet("[action]")]
		public IEnumerable<ProductDTO> GetAll()
		{
			using (OrderDbContext db = new OrderDbContext())
			{
				var products = db.Products.ToList().Select(prod => prod.ToDTO());
				return products;
			}
		}
	}
}