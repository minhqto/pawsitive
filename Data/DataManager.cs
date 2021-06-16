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

        public bool loadServiceTypeData()
        {
            try
            {
                if (dtx.ServiceType.Count() == 0)
                {
                    dtx.ServiceType.Add(new ServiceType { ServiceTypeName = "Dog Training" });
                    dtx.ServiceType.Add(new ServiceType { ServiceTypeName = "Pet Food" });
                    dtx.ServiceType.Add(new ServiceType { ServiceTypeName = "Behavioural Therapy" });
                    dtx.ServiceType.Add(new ServiceType { ServiceTypeName = "Pet Grooming" });
                }
                dtx.SaveChanges();
                return true;

            }catch(DbUpdateException e)
            {
                System.Diagnostics.Debug.WriteLine(e.ToString());
                return false;
            }
        }

        public bool loadServicesData()
        {
            try
            {
                if(dtx.Service.Count() == 0)
                {
                    var dogTraining = dtx.ServiceType.SingleOrDefault(s => s.ServiceTypeName == "Dog Training");
                    var petFood = dtx.ServiceType.SingleOrDefault(s => s.ServiceTypeName == "Pet Food");
                    var behaviouralTherapy = dtx.ServiceType.SingleOrDefault(s => s.ServiceTypeName == "Behavioural Therapy");
                    var petGrooming = dtx.ServiceType.SingleOrDefault(s => s.ServiceTypeName == "Pet Grooming");

                    dtx.Service.Add(new Service { Price = 20.00, ServiceDescription = "Train the pups", ServiceName = dogTraining.ServiceTypeName, ServiceType = dogTraining });
                    dtx.Service.Add(new Service { Price = 10.00, ServiceDescription = "Feed the pups", ServiceName = petFood.ServiceTypeName, ServiceType = petFood });
                    dtx.Service.Add(new Service { Price = 50.00, ServiceDescription = "Trauma? No problem!", ServiceName = behaviouralTherapy.ServiceTypeName, ServiceType = behaviouralTherapy });
                    dtx.Service.Add(new Service { Price = 20.00, ServiceDescription = "Groom the pups", ServiceName = petGrooming.ServiceTypeName, ServiceType = petGrooming });
                }
                dtx.SaveChanges();
                return true;
            }catch(DbUpdateException e)
            {
                System.Diagnostics.Debug.WriteLine(e.ToString());
                return false;
            }
        }
    }
}
