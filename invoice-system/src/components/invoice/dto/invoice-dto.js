export const InvoiceDto = {
    id: null,
    created_at: null,
    total_amount: null,
    subtotal_amount: null,
    delivery: null,
    included_taxes: null,
    client: {
        id: null,
        card_id: null,
        name: null,
        address: null,
        phone_number: null,
    },
    invoiceProducts: [
        {
            invoice_id: null,
            product_id: null,
            quantity: null,
            product: {
                id: null,
                name: null,
                short_description: null,
                unit_price: null,
                quantity: null,
                taxes: null,
            }
        }
    ],
    show: false,
    message_error: null,
}
