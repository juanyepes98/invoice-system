using Microsoft.EntityFrameworkCore;
using invoice_system_backend.Models;

namespace invoice_system_backend.db {
    public class InvoiceSystemBackendDbContext : DbContext{
        public InvoiceSystemBackendDbContext(DbContextOptions<InvoiceSystemBackendDbContext> data)
        :base (data){}

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<InvoiceHasProduct>().HasKey( x => new {x.product_id, x.invoice_id});
            modelBuilder.Entity<InvoiceHasProduct>().HasOne( i => i.product).WithMany( c => c.invoiceProducts).HasForeignKey( i => i.product_id).HasConstraintName("FK_InvoiceProduct_Product");
            modelBuilder.Entity<InvoiceHasProduct>().HasOne( i => i.invoice).WithMany( c => c.invoiceProducts).HasForeignKey( i => i.invoice_id).HasConstraintName("FK_InvoiceProduct_Invoice");
            modelBuilder.Entity<Invoice>().HasOne( i => i.client).WithMany( c => c.invoices).HasForeignKey( i => i.client_id).HasConstraintName("FK_Invoice_Client");
            modelBuilder.Entity<Invoice>().HasMany( x => x.products).WithMany( y => y.invoices);
            modelBuilder.Entity<Client>().HasKey(i => i.id);
            modelBuilder.Entity<Invoice>().HasKey(i => i.id);
            modelBuilder.Entity<Product>().HasKey(i => i.id);
            
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<Client> Client {get; set;}
        public DbSet<Invoice> Invoice {get; set;}
        public DbSet<Product> Product {get; set;}
        public DbSet<InvoiceHasProduct> InvoiceHasProduct { get; set; }
    }
}