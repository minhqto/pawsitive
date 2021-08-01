using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using pawsitive.EntityModels;
using pawsitive.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pawsitive.Data
{
    public class DataManager
    {
        DataContext dtx;
        private readonly UserManager<User> userManager;
        private readonly RoleManager<IdentityRole> roleManager;

        public DataManager(DataContext dataContext, UserManager<User> userManager, RoleManager<IdentityRole> roleManager)
        {
            dtx = dataContext;
            this.userManager = userManager;
            this.roleManager = roleManager;
        }

        /**
         * Create 3 clients and 3 specialists with full profiles
         */
        public async Task<bool> seedData()
        {
            DateTime baseDate = new DateTime(2015, 2, 15);
            List<Address> addresses = new List<Address>()
            {
                // addresses belong to clients
                new Address{ City="Toronto", Country="Canada", Province="ON", PostalCode="M4L 1V3", StreetAddress="500 Kingston Rd"},
                new Address{ City="Toronto", Country="Canada", Province="ON", PostalCode="M5M 1W4", StreetAddress="315 St Germain Ave"},
                new Address{ City="Toronto", Country="Canada", Province="ON", PostalCode="M4E 3K7", StreetAddress="234 Willow Ave"},
                // addresses belong to specialists
                new Address{ City="Toronto", Country="Canada", Province="ON", PostalCode="M4C 2G5", StreetAddress="26 Goodwood Park Cres East"},
                new Address{ City="Toronto", Country="Canada", Province="ON", PostalCode="M4V 2Z2", StreetAddress="48 St Clair Ave W"},
                new Address{ City="Toronto", Country="Canada", Province="ON", PostalCode="M4L 1H8", StreetAddress="1974 Queen St E"},
            };

            List<string> serviceTypesString = new List<string>()
            {
                "Training", "Grooming", "Therapist", "Pet Food"
            };

            // Convert the list of service type (string) into service type (entity model)
            var serviceTypes = new List<ServiceType>();
            foreach (var type in serviceTypesString)
            {
                var serviceType = dtx.ServiceType.SingleOrDefault(s => s.ServiceTypeName.Equals(type));

                if (serviceType != null)
                {
                    serviceTypes.Add(serviceType);
                }
                else
                {
                    var newServiceType = new ServiceType()
                    {
                        ServiceTypeName = type
                    };
                    dtx.Add(newServiceType);
                    dtx.SaveChanges();

                    serviceTypes.Add(newServiceType);
                }
            }

            List<Dog> dogs = new List<Dog>()
            {
                new Dog{AboutDog="Beautiful dog", BirthDate=baseDate, DogBreed="Breed A", DogName="Bolt", DogSex="Male", DogWeight=10, HasBiteHistory=false, ImageUrl="https://images.dog.ceo/breeds/puggle/IMG_122350.jpg", IsVaccinated=true},
                new Dog{AboutDog="Ugly dog", BirthDate=baseDate, DogBreed="Breed B", DogName="Poke", DogSex="Female", DogWeight=10, HasBiteHistory=false, ImageUrl="https://images.dog.ceo/breeds/brabancon/n02112706_1394.jpg", IsVaccinated=true},
                new Dog{AboutDog="Funny dog", BirthDate=baseDate, DogBreed="Breed C", DogName="Lex", DogSex="Male", DogWeight=10, HasBiteHistory=false, ImageUrl="https://images.dog.ceo/breeds/african/n02116738_634.jpg", IsVaccinated=true},
            };

            List<SpecialistProfile> specialistProfiles = new List<SpecialistProfile>()
            {
                new SpecialistProfile{AboutMe="Best specialist", Availability="Everyday from 9am to 5pm", BusinessName="Spec1", ProvideHomeVisitService=false, Radius=20, ServiceTypes=serviceTypes, Status=true},
                new SpecialistProfile{AboutMe="Good specialist", Availability="Everyday from 9am to 5pm", BusinessName="Spec2", ProvideHomeVisitService=false, Radius=20, ServiceTypes=serviceTypes, Status=true},
                new SpecialistProfile{AboutMe="Okay specialist", Availability="Everyday from 9am to 5pm", BusinessName="Spec3", ProvideHomeVisitService=false, Radius=20, ServiceTypes=serviceTypes, Status=true},
            };

            List<ClientProfile> clientProfiles = new List<ClientProfile>()
            {
                new ClientProfile{AboutMe="I love dogs", Dogs=new List<Dog> { dogs.ElementAt(0)} },
                new ClientProfile{AboutMe="I like dogs", Dogs=new List<Dog> { dogs.ElementAt(1)} },
                new ClientProfile{AboutMe="I hate dogs", Dogs=new List<Dog> { dogs.ElementAt(2)} },
            };

            List<User> users = new List<User>()
            {
                // users with client role
                new User{ SecurityStamp=Guid.NewGuid().ToString(), UserName="client1@example.com", Email="client1@example.com", FirstName="C1FName", LastName ="C1LName", Address=addresses.ElementAt(0), ClientProfile=clientProfiles.ElementAt(0), ImageUrl="https://via.placeholder.com/150"},
                new User{ SecurityStamp=Guid.NewGuid().ToString(), UserName="client2@example.com", Email="client2@example.com", FirstName="C2FName", LastName ="C2LName", Address=addresses.ElementAt(1), ClientProfile=clientProfiles.ElementAt(1), ImageUrl="https://via.placeholder.com/150"},
                new User{ SecurityStamp=Guid.NewGuid().ToString(), UserName="client3@example.com", Email="client3@example.com", FirstName="C3FName", LastName ="C3LName", Address=addresses.ElementAt(2), ClientProfile=clientProfiles.ElementAt(2), ImageUrl="https://via.placeholder.com/150"},

                // users with specialist role
                new User{ SecurityStamp=Guid.NewGuid().ToString(), UserName="specialist1@example.com", Email="specialist1@example.com", FirstName="S1FName", LastName ="S1LName", Address=addresses.ElementAt(3), SpecialistProfile=specialistProfiles.ElementAt(0), ImageUrl="https://via.placeholder.com/150"},
                new User{ SecurityStamp=Guid.NewGuid().ToString(), UserName="specialist2@example.com", Email="specialist2@example.com", FirstName="S2FName", LastName ="S2LName", Address=addresses.ElementAt(4), SpecialistProfile=specialistProfiles.ElementAt(1), ImageUrl="https://via.placeholder.com/150"},
                new User{ SecurityStamp=Guid.NewGuid().ToString(), UserName="specialist3@example.com", Email="specialist3@example.com", FirstName="S3FName", LastName ="S3LName", Address = addresses.ElementAt(5), SpecialistProfile = specialistProfiles.ElementAt(2), ImageUrl = "https://via.placeholder.com/150"},
            };

            string defaultPassword = "Password123!";

            // Create Client role if it doesn't exist in the database yet
            if (!await roleManager.RoleExistsAsync(UserRoles.Client))
                await roleManager.CreateAsync(new IdentityRole(UserRoles.Client));

            // Create Specialist role if it doesn't exist in the database yet
            if (!await roleManager.RoleExistsAsync(UserRoles.Specialist))
                await roleManager.CreateAsync(new IdentityRole(UserRoles.Specialist));

            // add users
            for (int i = 0; i < users.Count; i++)
            {
                User curUser = users.ElementAt(i);
                var tmp = await userManager.FindByEmailAsync(curUser.Email);
                if (tmp != null)
                {
                    await userManager.DeleteAsync(tmp);

                    // Delete dependent records that refer to this user as foreign key (ClientProfile, SpecialistProfile)
                    // There is a better way to make dependent records be deleted automatically by configuring OnCascadeDelete but we haven't figured out yet.

                    if (tmp.SpecialistProfileId != null)
                    {
                        var specialistProfile = dtx.SpecialistProfile.Find(tmp.SpecialistProfileId);
                        dtx.SpecialistProfile.Remove(specialistProfile);
                    }


                    if (tmp.ClientProfileId != null)
                    {
                        var clientProfile = dtx.ClientProfile.Find(tmp.ClientProfileId);
                        dtx.ClientProfile.Remove(clientProfile);
                    }
                }

                var result = await userManager.CreateAsync(curUser, defaultPassword);
                if (!result.Succeeded) return false;
                if (i < 3)
                {
                    await userManager.AddToRoleAsync(curUser, UserRoles.Client);
                }
                else
                {
                    await userManager.AddToRoleAsync(curUser, UserRoles.Specialist);
                }

            }

            return true;
        }


        /**
         * Get client information by user id
         */
        public ClientDetailVM getClientDetail(string clientId)
        {
            var clientDetail = new ClientDetailVM();

            try
            {
                // var user = userManager.Users.Include("Address").Include("ClientProfile").SingleOrDefault(u => u.Id.Equals(clientId));
                var clientProfile = dtx.ClientProfile.Include("Dogs").Include("Client.Address").SingleOrDefault(cp => cp.Client.Id.Equals(clientId));

                clientDetail.clientProfile = clientProfile;
                return clientDetail;
            }
            catch (Exception)
            {
                throw;
            }
        }

        // Update client by user id
        public async Task<User> updateClientInfo(string clientId, ClientUpdateReqBody req)
        {
            try
            {
                var user = userManager.Users.Include("Address").Include("ClientProfile").SingleOrDefault(u => u.Id.Equals(clientId));

                if (user == null) return null;

                // Update user information with new information from request body
                user.FirstName = req.firstName;
                user.LastName = req.lastName;

                user.Address.Country = req.country;
                user.Address.City = req.city;
                user.Address.StreetAddress = req.street;
                user.Address.Province = req.province;
                user.Address.PostalCode = req.postalCode;

                user.PhoneNumber = req.phoneNumber;
                user.Email = req.email;
                user.ClientProfile.AboutMe = req.aboutMe;

                user.ImageUrl = req.imageUrl;

                await userManager.UpdateAsync(user);

                return user;
            }
            catch (Exception)
            {
                throw;
            }
        }

        // Add dog to client with clientId
        public void addDogToClient(string clientId, AddDogReqBody req)
        {
            var clientProfile = dtx.ClientProfile.Include("Dogs").SingleOrDefault(cp => cp.Client.Id.Equals(clientId));

            var newDog = new Dog()
            {
                DogName = req.dogName,
                DogBreed = req.dogBreed,
                DogSex = req.dogSex,
                DogWeight = req.dogWeight,
                AboutDog = req.aboutDog,
                ImageUrl = req.imageUrl,
                BirthDate = req.birthDate,
                HasBiteHistory = req.hasBiteHistory,
                IsVaccinated = req.isVaccinated,
            };

            try
            {
                clientProfile.Dogs.Add(newDog);

                dtx.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }

        }

        // Add dog to client with clientId
        public Dog editDog(EditDogReqBody req)
        {
            var dog = dtx.Dog.SingleOrDefault(d => d.Id.Equals(req.dogId));

            if (dog != null)
            {
                dog.DogName = req.dogName;
                dog.DogBreed = req.dogBreed;
                dog.DogSex = req.dogSex;
                dog.DogWeight = req.dogWeight;
                dog.AboutDog = req.aboutDog;
                dog.ImageUrl = req.imageUrl;
                dog.BirthDate = req.birthDate;
                dog.HasBiteHistory = req.hasBiteHistory;
                dog.IsVaccinated = req.isVaccinated;

                dtx.SaveChanges();

                return dog;
            }

            return null;

        }


        // Get a specialist detail by id
        public SpecialistDetailVM getSpecialistDetail(string specialistId)

        {
            var specialistDetail = new SpecialistDetailVM();

            try
            {

                // var user = userManager.Users.Include("Address").Include("ClientProfile").SingleOrDefault(u => u.Id.Equals(clientId));
                var specProfile = dtx.SpecialistProfile.Include("ServiceTypes").Include("Specialist.Address").Include("Services").SingleOrDefault(cp => cp.Specialist.Id.Equals(specialistId));

                specialistDetail.specialistProfile = specProfile;

                return specialistDetail;
            }
            catch (Exception)
            {
                throw;
            }
        }


        // Add a new service to a Specialist with specialistId
        public void addServiceToSpecialist(string specialistId, ServiceVM req)
        {
            var specialistProfile = dtx.SpecialistProfile.Include("Services").SingleOrDefault(cp => cp.Specialist.Id.Equals(specialistId));
            var serviceType = dtx.ServiceType.SingleOrDefault(st => st.ServiceTypeName.Equals(req.ServiceType));


            var newService = new Service()
            {
                ServiceType = serviceType,
                //ServiceTypeId = req.ServiceTypeId,
                ServiceName = req.ServiceName,
                Price = req.Price,

            };

            try
            {
                specialistProfile.Services.Add(newService);

                dtx.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }

        // Delete the selected services from the Specialist with specialistId
        // TODO - need to fix
        public void deleteServicesFromSpecialist(string specialistId, ServiceVM req)
        {
            var specialistProfile = dtx.SpecialistProfile.Include("Services").SingleOrDefault(cp => cp.Specialist.Id.Equals(specialistId));
            var serviceType = dtx.ServiceType.SingleOrDefault(st => st.ServiceTypeName.Equals(req.ServiceType));

            var newService = new Service()
            {
                ServiceType = serviceType,
                //ServiceTypeId = req.ServiceTypeId,
                ServiceName = req.ServiceName,
                Price = req.Price,
            };

            try
            {
                specialistProfile.Services.Remove(newService);

                dtx.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }



        public IEnumerable<User> getAllSpecialists()
        {
            var allSpecialists = userManager.Users.Where(u => u.SpecialistProfileId != null).Include("Address").Include("SpecialistProfile");

            return allSpecialists;
        }

        public async Task<User> updateSpecialist(string specialistId, EditSpecialistBody reqBody)
        {
            var user = userManager.Users.Include("Address").Include("SpecialistProfile").SingleOrDefault(u => u.Id.Equals(specialistId));
            if (user == null) return null;

            // Update user information with new information from request body
            user.FirstName = reqBody.firstName;
            user.LastName = reqBody.lastName;

            user.Address.City = reqBody.city;
            user.Address.StreetAddress = reqBody.streetAddress;
            user.Address.Province = reqBody.province;
            user.Address.PostalCode = reqBody.postalCode;

            user.PhoneNumber = reqBody.phoneNumber;
            user.Email = reqBody.email;
            user.SpecialistProfile.AboutMe = reqBody.aboutMe;

            user.ImageUrl = reqBody.imageUrl;
            user.SpecialistProfile.BusinessName = reqBody.businessName;

            await userManager.UpdateAsync(user);
            return user;
        }
    }
}