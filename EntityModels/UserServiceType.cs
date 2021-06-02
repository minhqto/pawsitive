using System;

namespace pawsitive.EntityModels
{
    public class UserServiceType
    {
        public int Id { get; set; }

        public User User { get; set; }

        public ServiceType ServiceType { get; set; }
    }
}