using System;

namespace pawsitive.EntityModels
{
    public class Address
    {
        public int Id { get; set; }

        public User User { get; set; }

        public char StreetAddress { get; set; }

        public char City { get; set; }

        public char Province { get; set; }

        public char PostalCode { get; set; }

        public char Country { get; set; }
    }
}