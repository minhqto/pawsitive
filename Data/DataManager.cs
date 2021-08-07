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
                "Training", "Grooming", "Therapy", "Pet Food"
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
                new Dog{AboutDog="A wonderful guard dog.", BirthDate=baseDate, DogBreed="German Sheppard", DogName="Bolt", DogSex="Male", DogWeight=60, HasBiteHistory=false, ImageUrl="https://images.dog.ceo/breeds/germanshepherd/n02106662_14247.jpg", IsVaccinated=true},
                new Dog{AboutDog="Herds everything and is crazy!", BirthDate=baseDate, DogBreed="Australian Cattle Dog", DogName="Klaus", DogSex="Male", DogWeight=35, HasBiteHistory=false, ImageUrl="https://images.dog.ceo/breeds/cattledog-australian/IMG_4421.jpg", IsVaccinated=true},
                new Dog{AboutDog="Such a chill dog.", BirthDate=baseDate, DogBreed="Doberman", DogName="Misty", DogSex="Female", DogWeight=50, HasBiteHistory=false, ImageUrl="https://images.dog.ceo/breeds/doberman/n02107142_7459.jpg", IsVaccinated=true},
            };

            List<SpecialistProfile> specialistProfiles = new List<SpecialistProfile>()
            {
                new SpecialistProfile{AboutMe="I offer the best grooming services in the GTA, and I also have my own line of dog food.", Availability="Everyday from 9am to 5pm", BusinessName="Paws and Treats", ProvideHomeVisitService=false, Radius=20, ServiceTypes=serviceTypes, Status=true},
                new SpecialistProfile{AboutMe="I do group play sessions, protection services and have my own line of dog treats!", Availability="Everyday from 9am to 5pm", BusinessName="K9 Strength", ProvideHomeVisitService=false, Radius=20, ServiceTypes=serviceTypes, Status=true},
                new SpecialistProfile{AboutMe="I specialize in positive reinforcement training for young and adult dogs!", Availability="Everyday from 9am to 5pm", BusinessName="Kikopup", ProvideHomeVisitService=false, Radius=20, ServiceTypes=serviceTypes, Status=true},
            };

            List<ClientProfile> clientProfiles = new List<ClientProfile>()
            {
                new ClientProfile{AboutMe="I love dogs.", Dogs=new List<Dog> { dogs.ElementAt(0)} },
                new ClientProfile{AboutMe="I love dogs more.", Dogs=new List<Dog> { dogs.ElementAt(1)} },
                new ClientProfile{AboutMe="I love dogs the most!", Dogs=new List<Dog> { dogs.ElementAt(2)} },
            };

            List<User> users = new List<User>()
            {
                // users with client role
                new User{ SecurityStamp=Guid.NewGuid().ToString(), UserName="client1@example.com", Email="client1@example.com", FirstName="Suni", LastName ="Lee", Address=addresses.ElementAt(0), ClientProfile=clientProfiles.ElementAt(0), ImageUrl="https://media-cldnry.s-nbcnews.com/image/upload/t_fit-760w,f_auto,q_auto:best/newscms/2021_30/3495031/210729-sunisa-lee-beam-ew-1235p.jpg"},
                new User{ SecurityStamp=Guid.NewGuid().ToString(), UserName="client2@example.com", Email="client2@example.com", FirstName="Andre", LastName ="De Grasse", Address=addresses.ElementAt(1), ClientProfile=clientProfiles.ElementAt(1), ImageUrl="https://olympic.ca/wp-content/uploads/2016/08/hbao_andredegrasse_competition.jpg"},
                new User{ SecurityStamp=Guid.NewGuid().ToString(), UserName="client3@example.com", Email="client3@example.com", FirstName="Lin", LastName ="Dan", Address=addresses.ElementAt(2), ClientProfile=clientProfiles.ElementAt(2), ImageUrl="https://static.straitstimes.com.sg/s3fs-public/articles/2020/07/04/nz_lindan_040756.jpg"},

                // users with specialist role
                new User{ SecurityStamp=Guid.NewGuid().ToString(), UserName="specialist1@example.com", Email="specialist1@example.com", FirstName="Zac", LastName ="George", Address=addresses.ElementAt(3), SpecialistProfile=specialistProfiles.ElementAt(0), ImageUrl="https://images-na.ssl-images-amazon.com/images/I/B16UbTtfGAS.jpg"},
                new User{ SecurityStamp=Guid.NewGuid().ToString(), UserName="specialist2@example.com", Email="specialist2@example.com", FirstName="Joel", LastName ="Beckman", Address=addresses.ElementAt(4), SpecialistProfile=specialistProfiles.ElementAt(1), ImageUrl="https://beckmansdogtraining.com/wp-content/uploads/2018/10/BECKMANs-DOG-TRAINING-9-e1539820915421.png"},
                new User{ SecurityStamp=Guid.NewGuid().ToString(), UserName="specialist3@example.com", Email="specialist3@example.com", FirstName="Emily", LastName ="L", Address = addresses.ElementAt(5), SpecialistProfile = specialistProfiles.ElementAt(2), ImageUrl = "https://i.pinimg.com/originals/ab/93/e7/ab93e772f7e6ab4816f300efae8b8019.png"},
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
            var serviceType = dtx.ServiceType.SingleOrDefault(st => st.ServiceTypeName.ToLower().Equals(req.ServiceType.ToLower()));


            var newService = new Service()
            {
                ServiceType = serviceType,
                ServiceTypeId = serviceType.Id,
                ServiceName = req.ServiceName,
                Price = req.Price,
                Specialist = specialistProfile,
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
        public void deleteServicesFromSpecialist(string specialistId, DeleteServicesBody req)
        {
            var specialistProfile = dtx.SpecialistProfile.Include("Services").SingleOrDefault(cp => cp.Specialist.Id.Equals(specialistId));

            try
            {
                foreach (int serviceId in req.serviceIds)
                {
                    var service = specialistProfile.Services.FirstOrDefault(s => s.Id.Equals(serviceId));
                    specialistProfile.Services.Remove(service);
                }

                dtx.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
        }



        public IEnumerable<User> getAllSpecialists()
        {
            var allSpecialists = userManager.Users.Where(u => u.SpecialistProfileId != null).Include("Address").Include(s => s.SpecialistProfile).Include(s => s.SpecialistProfile.ServiceTypes);
          
            return allSpecialists;
        }

        public async Task<User> updateSpecialist(string specialistId, EditSpecialistBody reqBody)
        {
            var user = userManager.Users.Include("Address").Include("SpecialistProfile.ServiceTypes").SingleOrDefault(u => u.Id.Equals(specialistId));
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
            user.SpecialistProfile.ProvideHomeVisitService = reqBody.provideHomeVisitService;
            user.SpecialistProfile.Radius = reqBody.radius;

            foreach(string serviceType in reqBody.serviceTypes)
            {
                var tmpServiceType = dtx.ServiceType.SingleOrDefault(e => e.ServiceTypeName.ToLower().Equals(serviceType.ToLower()));

                user.SpecialistProfile.ServiceTypes.Add(tmpServiceType);
            }

            await userManager.UpdateAsync(user);
            return user;
        }

        public void deleteDogById(int dogId)
        {
            var dog = dtx.Dog.Find(dogId);
            if (dog == null) return;
            dtx.Dog.Remove(dog);
            dtx.SaveChanges();
            return;
        }

    }
}