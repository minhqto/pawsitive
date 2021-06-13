using Microsoft.EntityFrameworkCore;
using pawsitive.EntityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pawsitive.Data
{
    public class DataManager
    {
        DataContext dtx;

        public DataManager(DataContext dataContext)
        {
            dtx = dataContext;
        }

        public void loadServicesData()
        {
            
        }
    }
}
