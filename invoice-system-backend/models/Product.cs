using System.Collections.Generic;
using System;

namespace invoice_system_backend.Models{
    public class Product {
        public int id { get; set; }
        public string name { get; set; }
        public string short_description { get; set; }
        public decimal unit_price { get; set; }
        public decimal taxes { get; set; }
        public DateTime created_at { get; set; }
        public ICollection<Invoice> invoices { get; set; }
        public List<InvoiceHasProduct> invoiceProducts { get; set; }
    }
}