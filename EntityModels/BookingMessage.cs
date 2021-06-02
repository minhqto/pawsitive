using System;

namespace pawsitive.EntityModels
{
    public class BookingMessage
    {
        public int Id { get; set; }

        public Booking Booking { get; set; }

        public User User { get; set; }

        public char Message { get; set; }

        public DateTime BookingMessageTime { get; set; }
    }
}