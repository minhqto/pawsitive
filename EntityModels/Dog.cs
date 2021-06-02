using System;

namespace pawsitive.EntityModels
{
    public class Dog
    {
        public int Id { get; set; }

        public User User { get; set; }

        public char DogBreed { get; set; }

        public char DogName { get; set; }

        public int DogWeight { get; set; }

        public int DogAge { get; set; }

        public bool HasBiteHistory { get; set; }

        public bool IsVaccinated { get; set; }
    }
}