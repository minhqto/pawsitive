using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
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
    public class ClientController : ControllerBase
    {
        DataManager dm;

        public ClientController(DataManager dataManager)
        {
            dm = dataManager;
        }

        // Get client information of client with id = clientId
        [HttpGet]
        [Route("clientDetail/{clientId}")]
        public ClientDetailVM Get([FromRoute] string clientId)
        {
            var clientDetail = dm.getClientDetail(clientId);

            return clientDetail;
        }

        // Update client information of client with id = clientId
        [HttpPut]
        [Route("clientDetail/{clientId}")]
        public async Task<IActionResult> UpdateClientDetail([FromRoute] string clientId, [FromBody] ClientUpdateReqBody req)
        {
            var updatedUser = await dm.updateClientInfo(clientId, req);

            if(updatedUser != null)
            {
                return Ok(new { 
                    message = "User updated successfully",
                    updatedUser = updatedUser
                });
            }

            return StatusCode(StatusCodes.Status400BadRequest, new { error = "Could not find any user with id: " + clientId});
        }

        // Add a new dog to a client with id = clientId
        [HttpPost]
        [Route("clientDetail/{clientId}/addDog")]
        public IActionResult AddDog([FromRoute] string clientId, [FromBody] AddDogReqBody req)
        {
            try
            {
                dm.addDogToClient(clientId, req);

                return Ok(new
                {
                    message = "Dog added successfully",
                });

            }
            catch (Exception e)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, new { error = e.Message });
            }
        }

        // Edit dog information based on dog id in the req body
        [HttpPut]
        [Route("clientDetail/editDog")]
        public IActionResult EditDog([FromBody] EditDogReqBody req)
        {
            try
            {
                var updatedDog = dm.editDog(req);

                return Ok(new
                {
                    message = "Dog updated successfully",
                    dog = updatedDog
                });

            }
            catch (Exception e)
            {

                return StatusCode(StatusCodes.Status500InternalServerError, new { error = e.Message });
            }
        }
    }
}
