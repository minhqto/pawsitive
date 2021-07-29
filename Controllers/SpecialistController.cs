using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using pawsitive.Data;
using pawsitive.EntityModels;
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



        [HttpPost]
        [Route("specialistDetail/{specialistId}/addservice")]
        public IActionResult AddService([FromRoute] string specialistId, [FromBody] ServiceVM req)
        {
            try
            {
                dm.addServiceToSpecialist(specialistId, req);

                return Ok(new
                {
                    message = "The Service added successfully",
                });

            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = e.Message });
            }

        }

        [HttpDelete]
        [Route("specialistDetail/{specialistId}/deleteservices")]
        public IActionResult DeleteServices([FromRoute] string specialistId, [FromBody] ServiceVM req)
        {
            try
            {
                dm.deleteServicesFromSpecialist(specialistId, req);

                return Ok(new
                {
                    message = "The Services deleted successfully",
                });

            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { error = e.Message });
            }

        [HttpGet]
        [Route("allSpecialists")]
        public IEnumerable<User> Get()
        {
            var allSpecialists = dm.getAllSpecialists();

            return allSpecialists;

        }

    }
}
