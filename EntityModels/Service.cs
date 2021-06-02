using System;

namespace pawsitive.EntityModels
{
    public class Service
    {
        public int Id { get; set; }

        public User User { get; set; }

        public ServiceType ServiceType { get; set; }

        public char ServiceName { get; set; }

        public char ServiceDescription { get; set; }

        public double Price { get; set; }
    }
}