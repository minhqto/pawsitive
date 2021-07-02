using System;

namespace pawsitive.EntityModels
{
    public class Dog
    {

        public Dog()
        {
            BirthDate = DateTime.Now;
        }

        public int Id { get; set; }

        public ClientProfile ClientProfile { get; set; }
        public int ClientProfileId { get; set; }

        public string DogBreed { get; set; }

        public string DogSex { get; set; }

        public string DogName { get; set; }

        public int DogWeight { get; set; }

        public DateTime BirthDate { get; set; }

        public bool HasBiteHistory { get; set; }

        public bool IsVaccinated { get; set; }

        public string AboutDog { get; set; }

        public string ImageUrl { get; set; }
    }
}