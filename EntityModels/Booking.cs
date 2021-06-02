using System;
using System.Collections.Generic;

namespace pawsitive.EntityModels
{
    public class Booking
    {
        public int Id { get; set; }

        public Service Service { get; set; }
        public int ServiceId { get; set; }

        public User Client { get; set; }
        //public string ClientId { get; set; }

        public User Specialist { get; set; }
        //public string SpecialistId { get; set; }

        public BookingStatus BookingStatus { get; set; }
        public int BookingStatusId { get; set; }

        public DateTime BookingDate { get; set; }

        public ICollection<BookingMessage> BookingMessages { get; set; }
    }
}