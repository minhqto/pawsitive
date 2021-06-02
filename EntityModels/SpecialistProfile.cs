using System;

namespace pawsitive.EntityModels
{
    public class SpecialistProfile
    {
        public int Id { get; set; }

        public User User { get; set; }

        public char Description { get; set; }

        public bool Status { get; set; }

        public float Radius { get; set; }

        public char Availability { get; set; }
    }
}