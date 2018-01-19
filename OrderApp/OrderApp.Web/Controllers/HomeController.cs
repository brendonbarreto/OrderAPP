using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OrderApp.DataAccess;
using OrderApp.Framework;
using OrderApp.Models.DTOs;
using OrderApp.Models.Entities;

namespace OrderApp.Web.Controllers
{
	public class HomeController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}

		[HttpGet("edit")]
		public IActionResult Edit(int orderId)
		{
			if (orderId > 0)
			{
				using (var db = new OrderDbContext())
				{
					var order = db.Orders.FirstOrDefault(m => m.ID == orderId);
					if (order != null)
					{
						var dto = order.ToDTO();
						return View("Index", dto);
					}
					else
					{
						return OrderNotFound();
					}
				}
			}
			else
			{
				return OrderNotFound();
			}
		}

		public IActionResult OrderNotFound()
		{
			TempData["ErrorMessage"] = Resources.StringResources.OrderNotFound;
			return RedirectToAction("New");
		}

		[HttpGet("new")]
		public IActionResult New()
		{
			return View("Index");
		}

		[Route("error/404")]
		public IActionResult Error404()
		{
			return PartialView("Error");
		}

		[HttpGet]
		public IActionResult RenderTemplate(string viewName)
		{
			return PartialView(viewName);
		}

		[HttpPost]
		public JsonResult Save([FromBody]OrderDTO order)
		{
			try
			{
				var model = order.ToModel();
				using (OrderDbContext db = new OrderDbContext())
				{
					if (model.ID == 0)
					{
						db.Orders.Add(model);
					}
					else
					{
						var entityOrder = db.Orders.Find(model.ID);
						db.Entry(entityOrder).CurrentValues.SetValues(model);

						foreach (var item in model.OrderItems)
						{
							if (item.ID == 0)
							{
								db.OrderItems.Add(item);
							}
							else
							{
								var entityItem = db.OrderItems.Find(item.ID);
								db.Entry(entityItem).CurrentValues.SetValues(item);
							}
						}
					}

					db.SaveChanges();
				}

				var result = new JsonStatusResult(true);
				result.Data = model.ID;
				return Json(result);
			}
			catch
			{

				return Json(new JsonStatusResult(false, Resources.StringResources.SaveException));
			}

		}
	}
}
