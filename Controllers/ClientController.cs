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

        [HttpGet]
        [Route("clientDetail/{clientId}")]
        public ClientDetailVM Get([FromRoute] string clientId)
        {
            var clientDetail = dm.getClientDetail(clientId);

            return clientDetail;
        }

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


    }
}
