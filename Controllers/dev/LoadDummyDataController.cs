using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using pawsitive.Data;

namespace pawsitive.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class LoadDummyDataController : ControllerBase
    {
        DataManager dataManager;

        public LoadDummyDataController(DataContext context)
        {
            dataManager = new DataManager(context);
        }

        [HttpGet]
        [Route("serviceType")]
        public string Get()
        {
            if (dataManager.loadServiceTypeData())
            {
                return "Data load successful!";
            }
            else
            {
                return "Data load failed!";
            }
        }
    }
}
