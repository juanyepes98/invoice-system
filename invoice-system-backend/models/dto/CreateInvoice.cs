using System.Collections.Generic;

namespace invoice_system_backend.Models {
    // Product DTO when creating an invoice
    public class CreateInvoiceProductDto {
        public int id { get; set; }
        public int quantity { get; set; }
    }

    // DTO of the invoice to create it
    public class CreateInvoiceDto {
        public int clientId { get; set; }
        public string clientName { get; set; }
        public string clientAddress { get; set; }
        public string clientPhone { get; set; }
        public List<CreateInvoiceProductDto> products { get; set; }
    }
}