using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pawsitive.ViewModels
{
    public class ClientUpdateReqBody
    {
        public string firstName { get; set; }
        public string lastName { get; set; }

        // Address attributes
        public string country;
        public string city;
        public string street;
        public string province;
        public string postalCode;

        public string phoneNumber { get; set; }
        public string email { get; set; }
        public string aboutMe { get; set; }
    }
}
