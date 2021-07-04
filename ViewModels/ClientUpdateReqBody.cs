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
        public string country { get; set; }
        public string city { get; set; }
        public string street { get; set; }
        public string province { get; set; }
        public string postalCode { get; set; }

        public string phoneNumber { get; set; }
        public string email { get; set; }
        public string aboutMe { get; set; }
        public string imageUrl { get; set; }
    }
}
