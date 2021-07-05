using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pawsitive.ViewModels
{
    public class AddDogReqBody
    {
        public AddDogReqBody()
        {
            birthDate = DateTime.Now;
        }

        public string dogName { get; set; }
        public string dogSex { get; set; }
        public string dogBreed { get; set; }
        public int dogWeight { get; set; }
        public DateTime birthDate { get; set; }
        public bool hasBiteHistory { get; set; }
        public bool isVaccinated { get; set; }
        public string aboutDog { get; set; }
        public string imageUrl { get; set; }
    }
}
