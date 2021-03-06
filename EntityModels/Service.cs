using System;

namespace pawsitive.EntityModels
{
    public class Service
    {
        public int Id { get; set; }

        public SpecialistProfile Specialist { get; set; }
        public int SpecialistId { get; set; }

        public ServiceType ServiceType { get; set; }
        public int ServiceTypeId { get; set; }

        public string ServiceName { get; set; }

        //public string ServiceDescription { get; set; }

        public double Price { get; set; }
    }
}