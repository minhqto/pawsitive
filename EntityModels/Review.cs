using System;

namespace pawsitive.EntityModels
{
    public class Review
    {
        public int Id { get; set; }

        public User Client { get; set; }
        //public string ClientId { get; set; }

        public User Specialist { get; set; }
        //public string SpecialistId { get; set; }

        public Booking Booking { get; set; }
        public int BookingId { get; set; }

        public int Rating { get; set; }

        public string ReviewText { get; set; }
    }
}