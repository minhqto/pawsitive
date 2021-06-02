using System;

namespace pawsitive.EntityModels
{
    public class Address
    {
        public int Id { get; set; }

        public User User { get; set; }
        //public string UserId { get; set; }

        public string StreetAddress { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public string PostalCode { get; set; }
        public string Country { get; set; }
    }
}