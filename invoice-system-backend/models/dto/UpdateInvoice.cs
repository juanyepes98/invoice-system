namespace  invoice_system_backend.Models {
    public class UpdateInvoiceDto {
        public int invoiceId { get; set; }
        public string clientName { get; set; }
        public string clientAddress { get; set; }
        public string clientPhone { get; set; }
    }
}