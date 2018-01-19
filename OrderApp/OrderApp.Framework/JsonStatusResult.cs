using System;
using System.Collections.Generic;
using System.Text;

namespace OrderApp.Framework
{
	public class JsonStatusResult
	{
		public JsonStatusResult()
		{

		}

		public JsonStatusResult(bool status)
		{
			Status = status;
		}

		public JsonStatusResult(bool status, string message)
		{
			Status = status;
			Message = message;
		}
		/// <summary>
		/// If the request succeeds
		/// </summary>
		public bool Status { get; set; }

		public string Message { get; set; }

		public object Data { get; set; }
	}
}
