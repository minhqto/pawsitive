using System;

namespace pawsitive.EntityModels
{
    public class Review
    {
        public int Id { get; set; }

        public User User { get; set; }

        public SpecialistProfile SpecialistProfile { get; set; }

        public Booking Booking { get; set; }

        public int Rating { get; set; }

        public char ReviewText { get; set; }
    }
}