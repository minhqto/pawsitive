using Microsoft.EntityFrameworkCore;
using pawsitive.EntityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pawsitive.Data
{
    public class DataManager
    {
        DataContext dtx;

        public DataManager(DataContext dataContext)
        {
            dtx = dataContext;
        }

        /* public void ProductAddNew()
         {
             Product newProduct = new Product()
             {
                 Name = "Test Product",
                 Price = 1.10M
             };

             dtx.Products.Add(newProduct);
             dtx.SaveChanges();

             return;
         }

         public IEnumerable<Product> ProductGetAll()
         {
             var products = dtx.Products;

             return products;
         }

         public Product ProductGetOne(int id)
         {
             var product = dtx.Products.Find(id);

             return product;
         }*/

        //ADDRESS
        public void AddressAddNew(User user, char street, char city, char province, char pcode, char country)
        {
            Address newAddress = new Address()
            {
                User = user,
                StreetAddress = street,
                City = city,
                Province = province,
                PostalCode = pcode,
                Country = country
            };

            dtx.Address.Add(newAddress);
            dtx.SaveChanges();

            return;
        }

        public Address AddressGetOne(int id)
        {
            var address = dtx.Address.Find(id);

            return address;
        }

        //Booking
        public void BookingAddNew(Service service, User user, SpecialistProfile specialistProfile, BookingStatus bookingStatus, DateTime bookingDate)
        {
            Booking newBooking = new Booking()
            {
                User = user,
                Service = service,
                SpecialistProfile = specialistProfile,
                BookingStatus = bookingStatus,
                BookingDate = bookingDate
            };

            dtx.Booking.Add(newBooking);
            dtx.SaveChanges();

            return;
        }

        public Booking BookingGetOne(int id)
        {
            var booking = dtx.Booking.Find(id);

            return booking;
        }

        //BookingMessage
        public void BookingMessageAddNew(User user, Booking booking, char message, DateTime bookingMessageTime)
        {
            BookingMessage newBookingMessage = new BookingMessage()
            {
                User = user,
                Booking = booking,
                Message = message,
                BookingMessageTime = bookingMessageTime
            };

            dtx.BookingMessage.Add(newBookingMessage);
            dtx.SaveChanges();

            return;
        }

        public BookingMessage BookingMessageGetOne(int id)
        {
            var bookingMessage = dtx.BookingMessage.Find(id);

            return bookingMessage;
        }

        //BookingStatus
        public void BookingStatusAddNew(char statusName)
        {
            BookingStatus newBookingStatus = new BookingStatus()
            {
                StatusName = statusName
            };

            dtx.BookingStatus.Add(newBookingStatus);
            dtx.SaveChanges();

            return;
        }

        public BookingStatus BookingStatusGetOne(int id)
        {
            var bookingStatus = dtx.BookingStatus.Find(id);

            return bookingStatus;
        }

        //Dog
        public void DogAddNew(User user, char dogBreed, char dogName, int dogWeight, int dogAge, bool hasBiteHistory, bool isVaccinated)
        {
            Dog newDog = new Dog()
            {
                User = user,
                DogBreed = dogBreed,
                DogName = dogName,
                DogWeight = dogWeight,
                DogAge = dogAge,
                HasBiteHistory = hasBiteHistory,
                IsVaccinated = isVaccinated
            };

            //dtx.Products.Add(newProduct);
            dtx.Dog.Add(newDog);
            dtx.SaveChanges();

            return;
        }

        public Dog DogGetOne(int id)
        {
            var dog = dtx.Dog.Find(id);

            return dog;
        }

        //Review
        public void ReviewAddNew(User user, SpecialistProfile specialistProfile, Booking booking, int rating, char reviewText)
        {
            Review newReview = new Review()
            {
                User = user,
                SpecialistProfile = specialistProfile,
                Booking = booking,
                Rating = rating,
                ReviewText = reviewText
            };

            dtx.Review.Add(newReview);
            dtx.SaveChanges();

            return;
        }

        public Review ReviewGetOne(int id)
        {
            var review = dtx.Review.Find(id);

            return review;
        }

        //Service
        public void ServiceAddNew(User user, ServiceType serviceType, char serviceName, char serviceDescription, double price)
        {
            Service newService = new Service()
            {
                User = user,
                ServiceType = serviceType,
                ServiceName = serviceName,
                ServiceDescription = serviceDescription,
                Price = price
            };

            dtx.Service.Add(newService);
            dtx.SaveChanges();

            return;
        }

        public Service ServiceGetOne(int id)
        {
            var service = dtx.Service.Find(id);

            return service;
        }

        //ServiceType
        public void ServiceTypeAddNew(char serviceTypeName)
        {
            ServiceType newServiceType = new ServiceType()
            {
                ServiceTypeName = serviceTypeName
            };

            dtx.ServiceType.Add(newServiceType);
            dtx.SaveChanges();

            return;
        }

        public ServiceType ServiceTypeGetOne(int id)
        {
            var serviceType = dtx.ServiceType.Find(id);

            return serviceType;
        }

        //SpecialistProfile
        public void SpecialistProfileAddNew(User user, char description, bool status, float radius, char availability)
        {
            SpecialistProfile newSpecialistProfile = new SpecialistProfile()
            {
                User = user,
                Description = description,
                Status = status,
                Radius = radius,
                Availability = availability
            };

            //dtx.Products.Add(newProduct);
            dtx.SpecialistProfile.Add(newSpecialistProfile);
            dtx.SaveChanges();

            return;
        }

        public SpecialistProfile SpecialistProfileGetOne(int id)
        {
            var specialistProfile = dtx.SpecialistProfile.Find(id);

            return specialistProfile;
        }

        //UserServiceType
        public void UserServiceTypeAddNew(User user, ServiceType serviceType)
        {
            UserServiceType newUserServiceType = new UserServiceType()
            {
                User = user,
                ServiceType = serviceType,
            };

            dtx.UserServiceType.Add(newUserServiceType);
            dtx.SaveChanges();

            return;
        }

        public UserServiceType UserServiceTypeGetOne(int id)
        {
            var userServiceType = dtx.UserServiceType.Find(id);

            return userServiceType;
        }

        //UserRoles
        public void UserRolesAddNew(char roleName)
        {
            UserRoles newUserRoles = new UserRoles()
            {
                RoleName = roleName
            };

            dtx.UserRoles.Add(newUserRoles);
            dtx.SaveChanges();

            return;
        }

        public UserRoles UserRolesGetOne(int id)
        {
            var userRoles = dtx.UserRoles.Find(id);

            return userRoles;
        }
    }
}
