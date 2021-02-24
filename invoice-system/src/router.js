import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import { Header } from "./components/core/header";
import { Footer } from "./components/core/footer";
import { Home } from "./components/home/home";
import { ListInvoices } from "./components/invoice/list-invoices";
import {InvoiceDetail} from "./components/invoice/invoice-detail";
import {SearchInvoice} from "./components/invoice/search-invoice";
import {CreateInvoice} from "./components/invoice/create-invoice";
import {NotFound} from "./components/core/not-found";

export class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="row">
                    <div className="col-md-3 min-vh-100 bg-light border p-5">
                        <Header/>
                    </div>
                    <div className="col-md-9 min-vh-100 bg-light p-5">
                        <Switch>
                            <Route exact path = {'/'} component={Home} />
                            <Route exact path = {'/invoices'} component={ListInvoices} />
                            <Route exact path={'/invoices/:invoiceId'} component={InvoiceDetail} />
                            <Route exact path={'redirect/:invoiceId'} render={
                                ( props ) => {
                                    const invoiceId = props.match.params.invoiceId;

                                    return <Redirect to={`/invoice/${invoiceId}`} />
                                }
                            } />
                            <Route exact path={'/search-invoice'} component={SearchInvoice}></Route>
                            <Route exact path={'/create-invoice'} component={CreateInvoice}></Route>
                            <Route exact path={'/update-invoice/:invoiceId'} render={
                                ( props ) => {
                                    return <CreateInvoice isUpdate={true} invoiceId={props.match.params.invoiceId} />
                                }
                            }></Route>
                            <Route component={NotFound} />
                        </Switch>
                    </div>
                </div>
                <Footer/>
            </BrowserRouter>
        )
    }
}
