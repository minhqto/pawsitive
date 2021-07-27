using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using pawsitive.Data;
using pawsitive.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pawsitive.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SpecialistController : ControllerBase
    {
        DataManager dm;

        public SpecialistController(DataManager dataManager)
        {
            dm = dataManager;
        }

        [HttpGet]
        [Route("specialistDetail/{specialistId}")]
        public SpecialistDetailVM Get([FromRoute] string specialistId)
        {
            var specialistDetail = dm.getSpecialistDetail(specialistId);

            return specialistDetail;
        }


    }
}
