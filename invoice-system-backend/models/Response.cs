using System.Collections.Generic;
using invoice_system_backend.Models;

namespace invoice_system_backend.Models{
    public class Response {
        public int code { get; set; }
        public string message { get; set; }
        public List<Invoice> data { get; set; }
    }
}