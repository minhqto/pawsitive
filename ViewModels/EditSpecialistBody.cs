using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pawsitive.ViewModels
{
    public class EditSpecialistBody
    {
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string businessName { get; set; }
        public string phoneNumber { get; set; }
        public string email { get; set; }
        public string imageUrl { get; set; }
        public string city { get; set; }
        public string streetAddress { get; set; }
        public string province { get; set; }
        public string postalCode { get; set; }
        public string aboutMe { get; set; }
        public bool provideHomeVisitService { get; set; }
        public int? radius { get; set; }
    }
}
