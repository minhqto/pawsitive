using pawsitive.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pawsitive.Data
{
    public class DataManager
    {
        DataContext dtx;

        public DataManager()
        {
            dtx = new DataContext();
        }

        public void ProductAddNew()
        {
            Product newProduct = new Product()
            {
                Name = "Test Product",
                Price = 1.10M
            };

            dtx.Products.Add(newProduct);
            dtx.SaveChanges();

            return;
        }

        public IEnumerable<Product> ProductGetAll()
        {
            var products = dtx.Products;

            return products;
        }

        public Product ProductGetOne(int id)
        {
            var product = dtx.Products.Find(id);

            return product;
        }
    }
}
