using pawsitive.EntityModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace pawsitive.ViewModels
{
    public class SpecialistProfileVM
    {
        public SpecialistProfileVM()
        {
            ServiceTypes = new List<ServiceType>();
            Services = new List<Service>();
        }

        public int Id { get; set; }

        public User Specialist { get; set; }
        //public string SpecialistId { get; set; }

        public string BusinessName { get; set; }

        public bool ProvideHomeVisitService { get; set; }

        public int? Radius { get; set; }

        //Business hour
        public string Availability { get; set; }

        public string AboutMe { get; set; }

        // Whether the specialist was approved or not
        public bool Status { get; set; }

        public IEnumerable<ServiceType> ServiceTypes { get; set; }

        public IEnumerable<Service> Services { get; set; }
    }
}
