using System;

namespace pawsitive.EntityModels
{
    public class SpecialistProfile
    {
        public int Id { get; set; }

        public User Specialist { get; set; }
        //public string SpecialistId { get; set; }

        public string Description { get; set; }

        public bool Status { get; set; }

        public float Radius { get; set; }

        public string Availability { get; set; }
    }
}