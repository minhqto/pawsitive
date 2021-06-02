using System;

namespace pawsitive.EntityModels
{
    public class Booking
    {
        public int Id { get; set; }

        public Service Service { get; set; }

        public User User { get; set; }

        public SpecialistProfile SpecialistProfile { get; set; }

        public BookingStatus BookingStatus { get; set; }

        public DateTime BookingDate { get; set; }

        //public ICollection<Service> Services { get; set; }
    }
}