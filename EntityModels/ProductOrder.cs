namespace pawsitive.EntityModels
{
    public class ProductOrder
    {
        public int Id { get; set; }

        public int Quality { get; set; }

        public int ProductId { get; set; }

        public int OrderId { get; set; }

        public Order Order { get; set; }

        public Product Product { get; set; }
    }
}