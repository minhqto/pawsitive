using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pawsitive.ViewModels
{
    public class UserVM
    {
        // In IdentityUser: Email, PhoneNumber

        public string Email { get; set; }


        public SpecialistProfileVM SpecialistProfile { get; set; }
        public int? SpecialistProfileId { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }

        public AddressVM Address { get; set; }
        public int? AddressId { get; set; }


        public string ProfileImageContentType { get; set; }
        public byte[] ProfileImage { get; set; }



    }
}
