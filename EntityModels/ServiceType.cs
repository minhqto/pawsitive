using System;
using System.Collections.Generic;

namespace pawsitive.EntityModels
{
    public class ServiceType
    {
        public ServiceType()
        {
            SpecialistProfiles = new HashSet<SpecialistProfile>();
        }

        public int Id { get; set; }

        public String ServiceTypeName { get; set; }

        public ICollection<SpecialistProfile> SpecialistProfiles { get; set; }
    }
}