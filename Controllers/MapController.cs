using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using pawsitive.Data;
using pawsitive.EntityModels;
using pawsitive.ViewModels;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using pawsitive.maps.MapService;

namespace pawsitive.Controllers
{ 
    //this controller will be for managing requests to the google maps API
    [Route("api/[controller]")]
    [ApiController]
    public class MapController : ControllerBase
    {
        private MapService mapService;
        public MapController()
        {
            mapService = new MapService();
        }

        [HttpGet]
        [Route("map")]
        public async Task<IActionResult> GetMap()
        {
            var result = mapService.getDefaultMap();
            if(result.Contains("API key is invalid"))
            {
                return StatusCode(StatusCodes.Status500InternalServerError,
                    new AuthResponse
                    {
                        Status = "Error",
                        Message = "Error retrieving maps from Google Maps API"
                    });

            }
            return Ok(new AuthResponse { Status = "Success", Message = result });
        }
    }
}
