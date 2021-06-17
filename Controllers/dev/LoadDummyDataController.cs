using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using pawsitive.Data;
using pawsitive.EntityModels;
using Microsoft.AspNetCore.Identity;

namespace pawsitive.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class LoadDummyDataController : ControllerBase
    {
        DataManager dataManager;

        public LoadDummyDataController(DataContext context, UserManager<User> userManager, RoleManager<IdentityRole> roleManage)
        {
            dataManager = new DataManager(context, userManager, roleManage);
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
