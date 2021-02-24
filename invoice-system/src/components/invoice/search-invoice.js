import React, { Component } from 'react';
import {InvoiceDetail} from "./invoice-detail";

export class SearchInvoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoice_id: null,
            redirect: false,
        };
        this.invoiceIdRef = React.createRef();
        this.searchInvoice = this.searchInvoice.bind(this);
    }

    async searchInvoice(e) {
        e.preventDefault();

         await this.setState({
            invoice_id: this.invoiceIdRef.current.value,
            redirect: true,
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row w-75 py-4">
                    <div className="col-md-12 border align-items-center">
                        <form action="#" onSubmit={this.searchInvoice} className="py-3">
                            <div className="mb-3">
                                <label htmlFor="input-search-invoice" className="form-label">Search Invoice:</label>
                                <input type="text" className="form-control" id="input-search-invoice" ref={this.invoiceIdRef}/>
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
                <div className="row">
                    {
                        (this.state.redirect)
                            ?
                                <InvoiceDetail invoiceId = {this.state.invoice_id} />
                            :
                                null
                    }
                </div>
            </div>
        )
    }
}
