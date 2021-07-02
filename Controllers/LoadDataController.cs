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
    public class LoadDataController : ControllerBase
    {
        DataManager dm;

        public LoadDataController(DataManager dataManager)
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
