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
        }


        [DataType(DataType.Upload)]
        public string ProfileImageUpload { get; set; }


        public User Specialist { get; set; }
        //public string SpecialistId { get; set; }

        // Address Entity
        public Address address { get; set; }

        // optional
        public string BusinessName { get; set; }

        //default value is False
        public bool ProvideHomeVisitService { get; set; }

        //Only if 'ProvideHomeVisitService' is True
        public float Radius { get; set; }

        //Business hour (optional)
        public string Availability { get; set; }

        public string AboutMe { get; set; }

        public IEnumerable<ServiceType> ServiceTypes { get; set; }
    }
}
