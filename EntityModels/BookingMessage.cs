using System;
using System.Collections.Generic;

namespace pawsitive.EntityModels
{
    public class BookingMessage
    {

        public BookingMessage() {

            Time = DateTime.Now;

        }
        
        public int Id { get; set; }

        public Booking Booking { get; set; }
        public int BookingId { get; set; }

        public User User { get; set; }
        //public string UserId { get; set; }

        public string Message { get; set; }
        public DateTime Time { get; set; }
    }
}