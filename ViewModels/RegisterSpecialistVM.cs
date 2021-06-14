using pawsitive.EntityModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace pawsitive.ViewModels
{
    public class RegisterSpecialistVM
    {
        public RegisterSpecialistVM()
        {
            ServiceTypes = new List<ServiceType>();
        }


        [EmailAddress]
        [Required(ErrorMessage = "Email is required")]
        public string Email { get; set; }

        [DataType(DataType.Password)]
        [Required(ErrorMessage = "Password is required")]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        public string Password { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "Confirm password")]
        [Compare("Password", ErrorMessage = "The password and confirmation password do not match.")]
        public string ConfirmPassword { get; set; }

        [Required(ErrorMessage = "First Name is required")]
        public string FirstName { get; set; }
        [Required(ErrorMessage = "Last Name is required")]
        public string LastName { get; set; }

        [DataType(DataType.Upload)]
        public string ProfileImageUpload { get; set; }


        // Address Entity
        public string StreetAddress { get; set; }
        public string City { get; set; }
        public string Province { get; set; }
        public string PostalCode { get; set; }
        //public string Country { get; set; }


        // optional
        public string BusinessName { get; set; }

        //default value is False
        public bool ProvideHomeVisitService { get; set; }

        //Only if 'ProvideHomeVisitService' is True
        public float Radius { get; set; }

        //Business hour (optional)
        public string Availability { get; set; }

        [Required(ErrorMessage = "Please tell us about you")]
        public string AboutMe { get; set; }
        

        public IEnumerable<ServiceType> ServiceTypes { get; set; }


    }
}
