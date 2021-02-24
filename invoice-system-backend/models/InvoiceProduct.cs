
namespace invoice_system_backend.Models{
    // Model of table InvoiceHasProduct
    public class InvoiceHasProduct {
        public int invoice_id { get; set; }
        public int product_id { get; set; }
        public int quantity { get; set; }
        public Invoice invoice { get; set; }
        public Product product { get; set; }
    }
}