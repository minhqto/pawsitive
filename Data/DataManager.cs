using Microsoft.EntityFrameworkCore;
using pawsitive.EntityModels;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;


namespace pawsitive.Data
{
    public class DataManager
    {
        DataContext dtx;
        UserManager<User> _userManager;
        private readonly RoleManager<IdentityRole> roleManager;


        public DataManager(DataContext dataContext, UserManager<User> userManager, RoleManager<IdentityRole> roleManage)
        {
            dtx = dataContext;
            _userManager = userManager;
            roleManager = roleManage;

        }

        public bool loadServiceTypeData()
        {
            try
            {
                if (dtx.ServiceType.Count() == 0)
                {
                    dtx.ServiceType.Add(new ServiceType { ServiceTypeName = "Dog Training" });
                    dtx.ServiceType.Add(new ServiceType { ServiceTypeName = "Pet Food" });
                    dtx.ServiceType.Add(new ServiceType { ServiceTypeName = "Behavioural Therapy" });
                    dtx.ServiceType.Add(new ServiceType { ServiceTypeName = "Pet Grooming" });
                }
                dtx.SaveChanges();
                return true;

            }catch(DbUpdateException e)
            {
                System.Diagnostics.Debug.WriteLine(e.ToString());
                return false;
            }
        }

        public bool loadServicesData()
        {
            try
            {
                if(dtx.Service.Count() == 0)
                {
                    var dogTraining = dtx.ServiceType.SingleOrDefault(s => s.ServiceTypeName == "Dog Training");
                    var petFood = dtx.ServiceType.SingleOrDefault(s => s.ServiceTypeName == "Pet Food");
                    var behaviouralTherapy = dtx.ServiceType.SingleOrDefault(s => s.ServiceTypeName == "Behavioural Therapy");
                    var petGrooming = dtx.ServiceType.SingleOrDefault(s => s.ServiceTypeName == "Pet Grooming");

                    dtx.Service.Add(new Service { Price = 20.00, ServiceDescription = "Train the pups", ServiceName = dogTraining.ServiceTypeName, ServiceType = dogTraining });
                    dtx.Service.Add(new Service { Price = 10.00, ServiceDescription = "Feed the pups", ServiceName = petFood.ServiceTypeName, ServiceType = petFood });
                    dtx.Service.Add(new Service { Price = 50.00, ServiceDescription = "Trauma? No problem!", ServiceName = behaviouralTherapy.ServiceTypeName, ServiceType = behaviouralTherapy });
                    dtx.Service.Add(new Service { Price = 20.00, ServiceDescription = "Groom the pups", ServiceName = petGrooming.ServiceTypeName, ServiceType = petGrooming });
                }
                dtx.SaveChanges();
                return true;

            }catch(DbUpdateException e)
            {
                System.Diagnostics.Debug.WriteLine(e.ToString());
                return false;
            }
        }

        public bool loadAddressesData()
        {
            try
            {
                if(dtx.Address.Count() == 0)
                {
                    dtx.Address.Add(new Address { StreetAddress = "1 Main St", City = "Toronto", Province = "Ontario", PostalCode = "A1A 1A1", Country = "Canada" });
                    dtx.Address.Add(new Address { StreetAddress = "10 Second St", City = "Montreal", Province = "Quebec", PostalCode = "Z1Z 1Z1", Country = "Canada" });
                }
                dtx.SaveChanges();
                return true;
            }catch(DbUpdateException e)
            {
                System.Diagnostics.Debug.WriteLine(e.ToString());
                return false;
            }
        }

        public async Task<bool> loadSpecialistData()
        {
            try
            {
                var addressOne = dtx.Address.SingleOrDefault(a => a.StreetAddress == "1 Main St");
                var addressTwo = dtx.Address.SingleOrDefault(a => a.StreetAddress == "10 Second St");
                IdentityResult resultOne;
                IdentityResult resultTwo;
                bool isSuccess = false;

                if (_userManager.Users.Count() == 0)
                {
                    var userOne = new User
                    {
                        Address = addressOne,
                        AddressId = addressOne.Id,
                        FirstName = "Minh",
                        LastName = "To",
                        PhoneNumber = "1112223333"
                    };

                    var userTwo = new User
                    {
                        Address = addressTwo,
                        AddressId = addressTwo.Id,
                        FirstName = "John",
                        LastName = "Smith",
                        PhoneNumber = "2223334444"
                    };

                    var userOneProfile = new SpecialistProfile()
                    {
                        Specialist = userOne,
                        BusinessName = "Furry Buds",
                        ProvideHomeVisitService = true,
                        Radius = 10,
                        AboutMe = "I'm a cool fella",
                        Availability = "Monday to Friday, 9-5pm EST"
                    };

                    var userTwoProfile = new SpecialistProfile()
                    {
                        Specialist = userTwo,
                        BusinessName = "Perfect Recall",
                        ProvideHomeVisitService = false,
                        AboutMe = "I like dogs!",
                        Availability = "Monday to Friday, 9-5pm EST"
                    };

                    userOneProfile.ServiceTypes.Add(dtx.ServiceType.SingleOrDefault(s => s.ServiceTypeName == "Dog Training"));
                    userOneProfile.ServiceTypes.Add(dtx.ServiceType.SingleOrDefault(s => s.ServiceTypeName == "Pet Grooming"));

                    userTwoProfile.ServiceTypes.Add(dtx.ServiceType.SingleOrDefault(s => s.ServiceTypeName == "Dog Training"));
                    userTwoProfile.ServiceTypes.Add(dtx.ServiceType.SingleOrDefault(s => s.ServiceTypeName == "Pet Grooming"));

                    resultOne = await _userManager.CreateAsync(userOne , "12345678");
                    resultTwo = await _userManager.CreateAsync(userTwo, "12345678");



                    if (resultOne.Succeeded && resultTwo.Succeeded)
                    {
                        if (!await roleManager.RoleExistsAsync(UserRoles.Specialist))
                            await roleManager.CreateAsync(new IdentityRole(UserRoles.Specialist));

                        // Add Specialist role to current user
                        if (await roleManager.RoleExistsAsync(UserRoles.Specialist))
                        {
                            await _userManager.AddToRoleAsync(userOne, UserRoles.Specialist);
                            await _userManager.AddToRoleAsync(userTwo, UserRoles.Specialist);
                            isSuccess = true;
                        }
                    }
                }
                
                return isSuccess;
            }
            catch (DbUpdateException e)
            {
                System.Diagnostics.Debug.WriteLine(e.ToString());
                return false;
            }
        }

        internal class AuthResponse
        {
            public string Status { get; set; }
            public string Message { get; set; }
        }
    }
}
