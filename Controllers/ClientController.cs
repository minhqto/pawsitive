using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using pawsitive.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pawsitive.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClientController : ControllerBase
    {
        DataManager dm;
        public ClientController(DataContext dx)
        {
            dm = new DataManager(dx);
        }

        [HttpGet]
        public string Get()
        {
            return "Success";
        }
    }
}
