using System.Collections.Generic;
using System;

namespace invoice_system_backend.Models{
    public class Invoice {
        public int id { get; set; }
        public int client_id { get; set; }
        public decimal subtotal_amount { get; set; }
        public decimal delivery { get; set; }
        public decimal included_taxes { get; set; }
        public decimal total_amount { get; set; }
        public DateTime created_at { get; set; }
        public Client client { get; set; }
        public ICollection<Product> products { get; set; }
        public List<InvoiceHasProduct> invoiceProducts { get; set; }
    }
}