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
            ServiceTypes = new List<ServiceTypeVM>();
        }


        [DataType(DataType.Upload)]
        public string ProfileImageUpload { get; set; }


        public UserVM Specialist { get; set; }
        //public string SpecialistId { get; set; }

        // Address Entity
        public AddressVM address { get; set; }

        // optional
        public string BusinessName { get; set; }

        //default value is False
        public bool ProvideHomeVisitService { get; set; }

        //Only if 'ProvideHomeVisitService' is True
        public float Radius { get; set; }

        //Business hour (optional)
        public string Availability { get; set; }

        public string AboutMe { get; set; }

        public IEnumerable<ServiceTypeVM> ServiceTypes { get; set; }
    }
}
