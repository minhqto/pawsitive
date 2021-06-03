using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pawsitive.EntityModels
{
    public class User : IdentityUser
    {
        public User()
        {
            ServiceTypes = new List<ServiceType>();
        }

        public SpecialistProfile SpecialistProfile { get; set; }
        public int? SpecialistProfileId { get; set; }

        public Address Address { get; set; }
        public int? AddressId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public ICollection<ServiceType> ServiceTypes { get; set; }
    }
}
