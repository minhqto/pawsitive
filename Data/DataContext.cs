using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using pawsitive.EntityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace pawsitive.Data
{
    public class DataContext : IdentityDbContext<User>
    {
        /*public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<ProductOrder> ProductOrders { get; set; }*/
        public DbSet<Address> Address { get; set; }
        public DbSet<Booking> Booking { get; set; }
        public DbSet<BookingMessage> BookingMessage { get; set; }
        public DbSet<BookingStatus> BookingStatus { get; set; }
        public DbSet<Dog> Dog { get; set; }
        public DbSet<Review> Review { get; set; }
        public DbSet<Service> Service { get; set; }
        public DbSet<ServiceType> ServiceType { get; set; }
        public DbSet<SpecialistProfile> SpecialistProfile { get; set; }

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            IConfigurationRoot configuration = new ConfigurationBuilder()
                .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                .AddJsonFile("appsettings.json")
                .Build();

            optionsBuilder.UseSqlServer(configuration.GetConnectionString("LocalDatabase"));

        }
    }
}
