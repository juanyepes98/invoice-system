export const params = {
    title_main_page: 'Invoice System',
    default_message: 'Ups, an error occurred while consulting the information ...',
    default_message_created: 'Ups, an error occurred while creating the invoice ...',
    default_message_update: 'Ups, an error occurred while updating the invoice ...',
    default_message_success_created: 'The invoice has been created successfully ...',
    default_message_success_updated: 'The invoice has been updated successfully ...',
    default_message_deleted_error: 'Ups, an error occurred while deleting the invoice',
    hide_messages: 2000,
    connection_api: {
        url: 'http://localhost:5000/api/v1',
        methods: {
            get_all: {
                end_point: '/invoices',
                method: 'GET',
            },
            get_one: {
                end_point: '/invoices/{invoice_id}',
                method: 'GET',
            },
            save_invoice: {
                end_point: '/invoices',
                method: 'POST',
            },
            update_invoice: {
                end_point: '/invoices',
                method: 'PUT',
            },
            delete_one: {
                end_point: '/invoices/{invoice_id}',
                method: 'DELETE',
            },
        }
    }
}
