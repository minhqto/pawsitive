using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pawsitive.EntityModels
{
    public class ClientProfile
    {
        public ClientProfile()
        {
            Dogs = new HashSet<Dog>();
        }

        public int Id { get; set; }
        public User Client { get; set; }
        public string AboutMe { get; set; }
        public ICollection<Dog> Dogs { get; set; }
    }
}
