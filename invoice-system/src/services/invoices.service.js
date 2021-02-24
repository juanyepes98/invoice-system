import { params } from "../params";
import axios from 'axios';

export class InvoicesService {
    /**
     * service to consult all invoices
     * @returns {Promise<unknown>}
     */
    getAll() {
        return new Promise( async ( resolve, reject ) => {
            try {
                this.connectionApi(params.connection_api.methods.get_all, {})
                .then( result => {
                    if(typeof result !== 'undefined') {
                        resolve(result.data)
                    } else {
                        reject(params.default_message)
                    }
                }).catch( err => {
                    if(typeof err !== 'undefined') {
                        reject(err.message)
                    } else {
                        reject(params.default_message)
                    }
                });
            } catch (e) {
                reject(params.default_message)
            }
        })
    }

    /**
     * service to consult an invoice
     * @param id
     * @returns {Promise<unknown>}
     */
    getOne(id) {
        return new Promise( async ( resolve, reject ) => {
            try {
                const conf = { ...params.connection_api.methods.get_one };
                conf.end_point = conf.end_point.replace('{invoice_id}', id);

                this.connectionApi(conf, {})
                .then( result => {
                    if(typeof result !== 'undefined') {
                        resolve(result.data)
                    } else {
                        reject(params.default_message)
                    }
                }).catch( err => {
                    if(typeof err !== 'undefined') {
                        reject(err.message)
                    } else {
                        reject(params.default_message)
                    }
                });
            } catch (e) {
                reject(params.default_message)
            }
        })
    }

    /**
     * service to create an invoice
     * @param data
     * @returns {Promise<unknown>}
     */
    saveInvoice(data) {
        return new Promise( async ( resolve, reject ) => {
            try {
                const conf = params.connection_api.methods.save_invoice;

                this.connectionApi(conf, data)
                .then( result => {
                    if(typeof result !== 'undefined') {
                        resolve(result.data)
                    } else {
                        reject(params.default_message_created)
                    }
                }).catch( err => {
                    if(typeof err !== 'undefined') {
                        reject(err.message)
                    } else {
                        reject(params.default_message_created)
                    }
                });
            } catch (e) {
                reject(params.default_message_created)
            }
        })
    }

    /**
     * service to update an invoice
     * @param data
     * @returns {Promise<unknown>}
     */
    updateInvoice(data) {
        return new Promise( async ( resolve, reject ) => {
            try {
                const conf = params.connection_api.methods.update_invoice;

                this.connectionApi(conf, data)
                    .then( result => {
                        if(typeof result !== 'undefined') {
                            resolve(result.data)
                        } else {
                            reject(params.default_message_update)
                        }
                    }).catch( err => {
                    if(typeof err !== 'undefined') {
                        reject(err.message)
                    } else {
                        reject(params.default_message_update)
                    }
                });
            } catch (e) {
                reject(params.default_message_update)
            }
        })
    }

    /**
     * service to delete an invoice
     * @param data
     * @returns {Promise<unknown>}
     */
    deleteInvoice(id) {
        return new Promise( async ( resolve, reject ) => {
            try {
                const conf = { ...params.connection_api.methods.delete_one };
                conf.end_point = conf.end_point.replace('{invoice_id}', id);

                this.connectionApi(conf, {})
                    .then( result => {
                        if(typeof result !== 'undefined') {
                            resolve(result.data)
                        } else {
                            reject(params.default_message_deleted_error)
                        }
                    }).catch( err => {
                    if(typeof err !== 'undefined') {
                        reject(err.message)
                    } else {
                        reject(params.default_message_deleted_error)
                    }
                });
            } catch (e) {
                reject(params.default_message_deleted_error)
            }
        })
    }

    /**
     * connection service with api
     * @param conf
     * @param json
     * @returns {Promise<unknown>}
     */
    connectionApi(conf, json) {
        return new Promise( ( resolve, reject ) => {
            axios({
                method: conf.method,
                url: `${params.connection_api.url}${conf.end_point}`,
                data: json
            }).then( result => {
                if(typeof result.data !== 'undefined') {
                    resolve(result.data)
                } else {
                    resolve(undefined)
                }
            }).catch( err => {
                if(typeof err.response !== 'undefined' && typeof err.response.data !== 'undefined') {
                    reject(err.response.data)
                } else {
                    reject('Connection Error ...')
                }
            })
        })
    }
}
