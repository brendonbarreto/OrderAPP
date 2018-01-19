using System;
using System.Collections.Generic;
using System.Text;

namespace OrderApp.Models.DTOs
{
	interface IEntityDTO<DTOType>
	{
		DTOType ToDTO();
	}
}
