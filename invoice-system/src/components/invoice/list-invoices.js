import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import {InvoicesService} from "../../services/invoices.service";

/**
 * component of the invoice list
 */
export class ListInvoices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoices: []
        };
        this.invoicesServices = new InvoicesService();
    }

    async componentWillMount() {
        await this.invoicesServices.getAll()
        .then( async invoices => {
            await this.setState({
                invoices: invoices,
            })
        })
        .catch( async err => {
            await this.setState({
                message_error: err,
            })
        });
    }

    async deleteInvoice(id) {
        await this.invoicesServices.deleteInvoice(id)
        .then( async invoices => {
            await this.invoicesServices.getAll()
            .then( async invoices => {
                await this.setState({
                    invoices: invoices,
                })
            })
            .catch( async err => {
                await this.setState({
                    message_error: err,
                    invoices: [],
                })
            });
        })
        .catch( async err => {
            await this.setState({
                message_error: err,
            })
        });
    }

    render(){
        return (
            <div className="container align-items-center">
                <h2 className="text-center text-info py-3">Invoices</h2>
                <table className="table table-body table-hover">
                    <thead>
                        <tr>
                            <th scope="col">NO. INVOICE</th>
                            <th scope="col">CLIENT ID</th>
                            <th scope="col">CLIENT NAME</th>
                            <th scope="col">SUBTOTAL</th>
                            <th scope="col">TOTAL</th>
                            <th scope="col">TAXES</th>
                            <th scope="col">DELIVERY</th>
                            <th scope="col">ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.invoices.map( ( invoice, index ) => {
                            return (
                                <tr key={ index }>
                                    <th scope="row">{invoice.id}</th>
                                    <th>{invoice.client.card_id}</th>
                                    <th>{invoice.client.name}</th>
                                    <th>{invoice.subtotal_amount}</th>
                                    <th>{invoice.total_amount}</th>
                                    <th>{invoice.included_taxes}</th>
                                    <th>{invoice.delivery}</th>
                                    <th>
                                        <div className="btn-group" role="group" aria-label="actions">
                                            <NavLink to={`/invoices/${invoice.id}`}><button type="button" className="btn btn-info">View</button></NavLink>
                                            <NavLink to={`/update-invoice/${invoice.id}`}><button type="button" className="btn btn-success">Edit</button></NavLink>
                                            <button type="button" className="btn btn-danger" onClick={() => this.deleteInvoice(invoice.id)}>Delete</button>
                                        </div>
                                    </th>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}
