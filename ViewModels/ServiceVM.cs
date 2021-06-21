using pawsitive.EntityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pawsitive.ViewModels
{
    public class ServiceVM
    {

        public SpecialistProfile Specialist { get; set; }
        //public string SpecialistId { get; set; }

        public ServiceType ServiceType { get; set; }
        public int ServiceTypeId { get; set; }

        public string ServiceName { get; set; }

        // Will remove this item for now for simplicity
        //public string ServiceDescription { get; set; }

        public double Price { get; set; }

    }
}
