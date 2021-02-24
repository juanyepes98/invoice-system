import React, { Component } from 'react';
import {InvoiceDto} from "./dto/invoice-dto";
import {InvoicesService} from "../../services/invoices.service";

/**
 * component of an invoice detail
 */
export class InvoiceDetail extends Component {
    constructor(props) {
        super(props);
        this.state = InvoiceDto;
        this.invoicesServices = new InvoicesService();
    }

    async componentWillMount() {
        const invoiceId = (typeof this.props.invoiceId !== 'undefined') ? this.props.invoiceId : this.props.match.params.invoiceId;
        await this.invoicesServices.getOne(invoiceId)
        .then( async invoice => {
            if(typeof invoice !== 'undefined' && typeof invoice[0] !== 'undefined') {
                invoice[0].show = true;
                await this.setState(invoice[0])
            }
        })
        .catch( async err => {
            await this.setState({
                message_error: err,
            })
        });
    }

    async componentWillReceiveProps(nextProps, nextContext) {
        const invoiceId = nextProps.invoiceId;

        if(typeof invoiceId !== 'undefined') {
            await this.invoicesServices.getOne(invoiceId)
            .then( async invoice => {
                if(typeof invoice !== 'undefined' && typeof invoice[0] !== 'undefined') {
                    invoice[0].show = true;
                    await this.setState(invoice[0])
                } else {
                    await this.setState({
                        show: false,
                    })
                }
            })
            .catch( async err => {
                await this.setState({
                    message_error: err,
                    show: false,
                })
            });
        }
    }

    render() {
        return (
            <div className="container align-items-center">
                <div className="row">
                    {
                        (this.state.show)
                            ?
                            <div className="col-md-12 shadow p-3 mb-5 bg-body rounded">
                                <div className="row bg-info" style={{height: '150px'}}>
                                    <div className="col-md-4 pt-5">
                                        <h2 className="text-left font-weight-bold text-white text-capitalize">INVOICE</h2>
                                    </div>
                                </div>
                                <div className="row pt-3">
                                    <div className="col-md-5 pl-5">
                                        <h5 className="text-left font-weight-bold">Invoice to: </h5>
                                        <p className="text-capitalize font-weight-bold text-left pt-3" style={{marginBottom: '2px'}}>{this.state.client.name}, {this.state.client.id}</p>
                                        <p className="text-capitalize font-weight-lighter text-left">Address: {this.state.client.address} - {this.state.client.phone_number}</p>
                                    </div>
                                    <div className="col-md-4 offset-3 pl-5">
                                        <h5 className="text-left font-weight-bold">Invoice # {this.state.id}</h5>
                                        <p className="text-capitalize font-weight-lighter text-left pt-3" style={{marginBottom: '2px'}}>Date: {this.state.created_at}</p>
                                    </div>
                                </div>
                                <div className="row pt-4">
                                    <div className="col-md-12 align-items-center">
                                        <table className="table table-bordered">
                                            <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">Description</th>
                                                <th scope="col">Price</th>
                                                <th scope="col">Quantity</th>
                                                <th scope="col">Total</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                this.state.invoiceProducts.map( ( item, index ) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td scope="row">{item.product.id}</td>
                                                            <td>{item.product.name}</td>
                                                            <td>{item.product.short_description}</td>
                                                            <td>{item.product.unit_price}</td>
                                                            <td>{item.quantity}</td>
                                                            <td>{item.product.unit_price*item.quantity}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div className="row pt-5">
                                    <div className="col-md-3 offset-9 pr-5">
                                        <p className="text-left font-weight-bold" style={{marginBottom: '2px'}}>Sub total: {this.state.subtotal_amount}</p>
                                        <p className="text-left font-weight-bold">Delivery: {this.state.delivery}</p>
                                        <div className="border-dark border-top"></div>
                                        <p className="text-left font-weight-bold">Total: {this.state.total_amount}</p>
                                    </div>
                                </div>
                            </div>
                            :
                            <div className="row w-75 py-4">
                                <div className="col-md-12 border p-3">
                                    <div className="alert alert-warning" role="alert">
                                        {
                                            (this.state.message_error !== null)
                                                ?
                                                <p>{this.state.message_error}</p>
                                                :
                                                <p>Ups, we have not found the invoice</p>
                                        }
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            </div>
        )
    }
}
