using System;
using System.Collections.Generic;

namespace pawsitive.EntityModels
{
    public class SpecialistProfile
    {
        public SpecialistProfile()
        {
            ServiceTypes = new HashSet<ServiceType>();
            Services = new HashSet<Service>();
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

        public ICollection<ServiceType> ServiceTypes { get; set; }

        public ICollection<Service> Services { get; set; }

    }
}