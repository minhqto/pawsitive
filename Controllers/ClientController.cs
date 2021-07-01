using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
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

        public ClientController(DataManager dataManager)
        {
            dm = dataManager;
        }

        [HttpGet]
        public async Task<string> Get()
        {
            bool result = await dm.seedData();

            return result ? "Seed data successfully" : "Seed data unsuccessfully";
        }
    }
}
