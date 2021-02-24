using System.Collections.Generic;
using System;

namespace invoice_system_backend.Models{
    public class Client {
        public int id { get; set; }
        public int card_id { get; set; }
        public string name { get; set; }
        public string address { get; set; }
        public string phone_number { get; set; }
        public DateTime created_at { get; set; }
        public List<Invoice> invoices { get; set; }
    }
}