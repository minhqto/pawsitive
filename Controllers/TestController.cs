using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using pawsitive.Data;
using pawsitive.EntityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pawsitive.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        DataManager dm;

        public TestController(DataManager dataManager)
        {
            dm = dataManager;
        }

        [HttpPost]
        [Route("AddNewProduct")]
        public String AddNewProduct()
        {
            dm.ProductAddNew();
            return "Added a new product";
        }

        [HttpGet]
        [Route("GetAllProducts")]
        public IEnumerable<Product> GetAllProducts()
        {
            return dm.ProductGetAll();
        }

        [HttpGet]
        [Route("GetOneProduct/{id}")]
        public Product GetOneProduct(int id)
        {
            return dm.ProductGetOne(id);
        }
    }
}
