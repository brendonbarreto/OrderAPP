using System;
using System.Linq;

namespace OrderApp.Framework
{
	public class ObjectTransferUtils
	{
		/// <summary>
		/// Tool to copy property values to DTO class
		/// </summary>
		/// <typeparam name="TIn">The type to be converted</typeparam>
		/// <typeparam name="TOut">The destination type</typeparam>
		/// <param name="from">The instance to be converted</param>
		/// <returns></returns>
		public static TOut Copy<TIn, TOut>(TIn from) where TOut : class, new() where TIn : class, new()
		{
			TOut copy = new TOut();

			var inProps = typeof(TIn).GetProperties();
			var outProps = typeof(TOut).GetProperties();

			foreach (var outProp in outProps)
			{
				var inProp = inProps.FirstOrDefault(prop => prop.Name == outProp.Name);
				if (inProp != null)
				{
					outProp.SetValue(copy, inProp.GetValue(from));
				}
			}

			return copy;
		}
	}
}
