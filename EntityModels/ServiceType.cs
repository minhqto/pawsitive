using System;
using System.Collections.Generic;

namespace pawsitive.EntityModels
{
    public class ServiceType
    {
        public int Id { get; set; }

        public char ServiceTypeName { get; set; }

        public ICollection<User> Users { get; set; }
    }
}