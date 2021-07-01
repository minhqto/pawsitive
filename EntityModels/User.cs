using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pawsitive.EntityModels
{
    public class User : IdentityUser
    {
        // Properties for user with Specialist role
        public SpecialistProfile SpecialistProfile { get; set; }
        public int? SpecialistProfileId { get; set; }

        // Properties for user with Client role
        public ClientProfile ClientProfile { get; set; }
        public int? ClientProfileId { get; set; }

        // General properties shared by both role
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public Address Address { get; set; }
        public int? AddressId { get; set; }
        public string ImageUrl { get; set; }

        // In IdentityUser: Email, PhoneNumber

        // TODO - will work on this later
        //public string ProfileImageContentType { get; set; }
        //public byte[] ProfileImage { get; set; }

    }
}
