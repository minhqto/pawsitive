using System;
using System.Collections.Generic;

namespace pawsitive.EntityModels
{
    public class ServiceType
    {
        public ServiceType()
        {
            Users = new HashSet<User>();
        }

        public int Id { get; set; }

        public String ServiceTypeName { get; set; }

        public ICollection<User> Users { get; set; }
    }
}