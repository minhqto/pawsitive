using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pawsitive.EntityModels
{
    public class User : IdentityUser
    {

        // In IdentityUser: Email, PhoneNumber

        public SpecialistProfile SpecialistProfile { get; set; }
        public int? SpecialistProfileId { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }

        public Address Address { get; set; }
        public int? AddressId { get; set; }


        public string ProfileImageContentType { get; set; }
        public byte[] ProfileImage { get; set; }

    }
}
