using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pawsitive.ViewModels
{
    public class ServiceTypeVM
    {
        public ServiceTypeVM()
        {
            Users = new List<UserVM>();
        }

        public int Id { get; set; }

        public char ServiceTypeName { get; set; }

        public IEnumerable<UserVM> Users { get; set; }
    }
}
