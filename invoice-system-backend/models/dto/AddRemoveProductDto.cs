namespace invoice_system_backend.Models {
    public class AddProductDto {
        public int invoiceId { get; set; }
        public int productId { get; set; }
        public int quantity { get; set; }
    }

    public class RemoveProductDto {
        public int invoiceId { get; set; }
        public int productId { get; set; }
    }
}
