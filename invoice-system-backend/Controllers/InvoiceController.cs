using System.Collections.Generic;
using System.Linq;
using invoice_system_backend.Models;
using invoice_system_backend.db;
using Microsoft.AspNetCore.Mvc;
using System;
using Microsoft.EntityFrameworkCore;

namespace invoice_system_backend.Controllers {
    [Route("api/v1/invoices")]
    public class InvoicesController : Controller {
        private readonly InvoiceSystemBackendDbContext _context;

        // class constructor
        public InvoicesController(InvoiceSystemBackendDbContext context) {
            _context = context; 
        }

        // controller action to get all invoices
        [HttpGet]
        public IActionResult Get(){
            Response response = new Response();
            response.data = new List<Invoice>();

            var result = this._context.Invoice.Include(i => i.client).Include(i => i.invoiceProducts).ToList();

            if(result.Count > 0) {
                response.code = 1;
                response.message = "Ok";
                response.data = result;
                return Ok(response);
            } else {
                response.code = 0;
                response.message = "No invoices created";
                return NotFound(response);
            }
        }

        // controller action to get an invoice
        [HttpGet("{id}")]
        public IActionResult GetById(int id){
            Response response = new Response();
            response.data = new List<Invoice>();

            var result = this._context.Invoice.Include(i => i.client).Include(i => i.invoiceProducts).SingleOrDefault( t => t.id == id);

            if(result != null) {
                for(int i = 0; i < result.invoiceProducts.Count; i++) {
                    var product = this._context.Product.SingleOrDefault( p => p.id == result.invoiceProducts[i].product_id);
                    result.invoiceProducts[i].product = product;
                }

                response.code = 1;
                response.message = "Ok";
                response.data.Add(result);
                return Ok(response);
            } else {
                response.code = 0;
                response.message = "Not found this invoice";
                return NotFound(response);
            }
        }

        // controller action to save an invoice
        [HttpPost]
        public IActionResult SaveInvoice([FromBody]CreateInvoiceDto body) {
            Response response = new Response();
            response.data = new List<Invoice>();

            var transaction = this._context.Database.BeginTransaction();
            try {
                var clientExists = this._context.Client.SingleOrDefault( t => t.card_id == body.clientId);
                decimal subtotalAmount = 0;
                decimal totalTaxes = 0;

                if(clientExists == null) {
                    clientExists = new Client {card_id = body.clientId, name = body.clientName, address = body.clientAddress, phone_number = body.clientPhone, created_at = DateTime.Now};
                    this._context.Client.Add(clientExists);
                }  

                Invoice invoice = new Invoice {client = clientExists, created_at = DateTime.Now, delivery = Params.DELIVERY, invoiceProducts = new List<InvoiceHasProduct>()};
            
                this._context.Invoice.Add(invoice);
                this._context.SaveChanges();

                for(int i = 0; i < body.products.Count; i++) {
                    var product = this._context.Product.SingleOrDefault( t => t.id == body.products[i].id);

                    if(product == null) throw new Exception("Product: " + body.products[i].id + " not found ...");

                    subtotalAmount += (product.unit_price * body.products[i].quantity);
                    totalTaxes += (product.taxes * body.products[i].quantity);

                    InvoiceHasProduct invoiceProduct = new InvoiceHasProduct {invoice_id = invoice.id, product_id = product.id, quantity = body.products[i].quantity, product = product};
                    invoice.invoiceProducts.Add(invoiceProduct);  
                } 

                invoice.subtotal_amount = subtotalAmount;
                invoice.included_taxes = totalTaxes;
                invoice.total_amount = invoice.subtotal_amount + invoice.delivery;
                
                this._context.Update(invoice);
                this._context.SaveChanges();
                transaction.Commit();

                response.code = 1;
                response.message = "Ok";
                response.data.Add(invoice);
                return Ok(invoice); 
            } catch(Exception e) {
                transaction.Rollback();

                response.code = 0;
                response.message = e.Message;
                return BadRequest(response);
            } 
        }

        // controller action to update an invoice
        [HttpPut]
        public IActionResult UpdateInvoice([FromBody] UpdateInvoiceDto body) {
            Response response = new Response();
            response.data = new List<Invoice>();
            response.code = 0;

            var transaction = this._context.Database.BeginTransaction();
            try {
                var invoice = this._context.Invoice.SingleOrDefault( i => i.id == body.invoiceId);

                if(invoice != null) {
                    var clientInvoice = this._context.Client.SingleOrDefault( c => c.id == invoice.client_id);

                    if(clientInvoice != null) {
                        if(body.clientName != null) clientInvoice.name = body.clientName;
                        if(body.clientAddress != null) clientInvoice.address = body.clientAddress;
                        if(body.clientPhone != null) clientInvoice.phone_number = body.clientPhone;
                        invoice.client = clientInvoice;

                        this._context.Update(clientInvoice);
                        this._context.SaveChanges();
                        transaction.Commit();

                        response.code = 1;
                        response.message = "Ok";
                        response.data.Add(invoice);

                        return Ok(response);
                    } else {
                        response.message = "Not Found Client";
                        return NotFound(response);
                    }
                } else {
                    response.message = "Not Found Invoice";
                    return NotFound(response);
                }
            } catch(Exception e) {
                transaction.Rollback();

                response.code = 0;
                response.message = e.Message;
                return BadRequest(response);
            }
        }

        // controller action to delete an invoice
        [HttpDelete("{invoiceId}")]
        public IActionResult DeleteInvoice(int invoiceId) {
            Response response = new Response();
            response.data = new List<Invoice>();
            response.code = 0;
            
            var transaction = this._context.Database.BeginTransaction();
            try {
                Invoice invoice = this._context.Invoice.Include(i => i.invoiceProducts).SingleOrDefault( i => i.id == invoiceId);

                if(invoice != null) {
                    for(int i = 0; i < invoice.invoiceProducts.Count; i ++) {
                        this._context.InvoiceHasProduct.Remove(invoice.invoiceProducts[i]);
                    }
                    this._context.Invoice.Remove(invoice);
                    this._context.SaveChanges();
                    transaction.Commit();

                    response.code = 1;
                    response.message = "The invoice was successfully deleted";
                    return Ok(response);
                } else {
                    throw new Exception("This invoice does not exist ...");
                }
            } catch(Exception e) {
                transaction.Rollback();
                response.message = (e.Message != null) ? e.Message : "An error occurred while deleting the invoice ...";
                return BadRequest(response);
            }
        }
    }
}
