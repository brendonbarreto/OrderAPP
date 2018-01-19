using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OrderApp.DataAccess;
using OrderApp.Models.DTOs;

namespace OrderApp.Web.Controllers.API
{
	[Produces("application/json")]
	[Route("api/customer")]
	public class CustomerAPIController : Controller
	{

		[HttpGet("[action]")]
		public IEnumerable<CustomerDTO> GetAll()
		{
			using (OrderDbContext db = new OrderDbContext())
			{
				var customers = db.Customers.ToList().Select(customer => customer.ToDTO());
				return customers;
			}
		}

		[HttpGet("[action]")]
		public IActionResult Get(int id)
		{
			using (OrderDbContext db = new OrderDbContext())
			{
				var customer = db.Customers.FirstOrDefault(cst => cst.ID == id);
				if (customer == null)
				{
					return StatusCode(404, string.Format(Resources.StringResources.CustomerWithIDNotFound, id));
					
				}

				return Json(customer.ToDTO());

			}
		}
	}
}