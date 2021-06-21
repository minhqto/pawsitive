using pawsitive.EntityModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace pawsitive.ViewModels
{
    public class RegisterSpecialistVM
    {
        public RegisterSpecialistVM()
        {
            ServiceTypes = new List<string>();
        }

        public string Email { get; set; }

        public string Password { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        // Address Entity
        public string StreetAddress { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }

        public string PhoneNumber { get; set; }

        // optional
        public string BusinessName { get; set; }

        //default value is False
        public bool ProvideHomeVisitService { get; set; }

        //Only if 'ProvideHomeVisitService' is True
        public int? Radius { get; set; }

        //Business hour (optional)
        //public string Availability { get; set; }

        public string AboutMe { get; set; }
        
        public IEnumerable<string> ServiceTypes { get; set; }

        // TODO - will work on this later
        //[DataType(DataType.Upload)]
        //public string ProfileImageUpload { get; set; }
    }
}
