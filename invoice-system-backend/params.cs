using System.Collections.Generic;
using System;

namespace invoice_system_backend {
    // project parameters
    public class Params {
        // delivery cost
        public static decimal DELIVERY { get; set; } = 10;

        // api base url
        public static string URL_DEV { get; set; } = "http://localhost:5000";
    }
}