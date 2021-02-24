import React, { Component } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { Redirect } from 'react-router-dom';
import { InvoicesService } from "../../services/invoices.service";
import { params } from "../../params";

export class CreateInvoice extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirect: false,
            invoiceId: props.invoiceId || null,
            products: [],
            clientId: '',
            clientName: '',
            clientAddress: '',
            clientPhone: '',
            isUpdate: props.isUpdate || false,
            productId: '',
            productQuantity: '',
            messageError: null,
        };

        this.invoicesServices = new InvoicesService();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.removeProduct = this.removeProduct.bind(this);
        this.loadData = this.loadData.bind(this);
        this.validator = new SimpleReactValidator({autoForceUpdate: this});
        this.invoicesServices = new InvoicesService();
    }

    componentWillMount() {
        if(this.state.isUpdate === true) {
            this.loadData(this.state.invoiceId);
        }
    }

    async componentWillReceiveProps(nextProps, nextContext) {
        if(nextProps.isUpdate === true) {
            this.loadData(nextProps.invoiceId)
        } else{
            await this.setState({
                isUpdate: false,
                invoiceId: null,
                products: [],
                clientId: '',
                clientName: '',
                clientAddress: '',
                clientPhone: '',
            })
        }
    }

    /**
     * method to load invoice data
     * @param invoiceId
     * @returns {Promise<void>}
     */
    async loadData(invoiceId) {
        try {
            const invoice = await this.invoicesServices.getOne(invoiceId);

            if(typeof invoice !== 'undefined' && typeof  invoice[0] !== 'undefined') {
                invoice[0].isUpdate = true;
                invoice[0].invoiceId = invoice.id;
                await this.setState({
                    isUpdate: true,
                    invoiceId: invoice[0].id,
                    clientId: invoice[0].client.card_id,
                    clientName: invoice[0].client.name,
                    clientAddress: invoice[0].client.address,
                    clientPhone: invoice[0].client.phone_number,
                    products: invoice[0].invoiceProducts,
                })
            } else {
                await this.setState({
                    show: false,
                })
            }
        } catch (e) {
            alert(`Error loading information ...`)
        }
    }

    async handleChange(e) {
        await this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        if(this.validator.fieldValid('clientId') && this.validator.fieldValid('clientName') && this.validator.fieldValid('clientAddress') && this.validator.fieldValid('clientPhone')) {
            const json = {
              clientId: this.state.clientId,
              clientName: this.state.clientName,
              clientAddress: this.state.clientAddress,
              clientPhone: this.state.clientPhone,
              products: this.state.products,
            };

            if(this.state.isUpdate === true) {
                json.invoiceId = this.state.invoiceId;

                this.invoicesServices.updateInvoice(json)
                .then( async result => {
                    await this.setState({redirect: true, messageError: null});
                })
                .catch( async err => {
                    await this.setState({messageError: err})

                    setTimeout(async () => {
                        await this.setState({messageError: null})
                    }, params.hide_messages)
                });
            } else {
                this.invoicesServices.saveInvoice(json)
                .then( async result => {
                    await this.setState({redirect: true, messageError: null});
                })
                .catch( async err => {
                    await this.setState({messageError: err})

                    setTimeout(async () => {
                        await this.setState({messageError: null})
                    }, params.hide_messages)
                });
            }
        } else {
            this.validator.showMessageFor('clientId');
            this.validator.showMessageFor('clientName');
            this.validator.showMessageFor('clientAddress');
            this.validator.showMessageFor('clientPhone');

            setTimeout(() => {
                this.validator.hideMessageFor('clientId');
                this.validator.hideMessageFor('clientName');
                this.validator.hideMessageFor('clientAddress');
                this.validator.hideMessageFor('clientPhone');
            }, params.hide_messages)
        }
    }

    /**
     * method to add a product from the list
     * @returns {Promise<void>}
     */
    async addProduct() {
        const products = this.state.products;
        const exists = products.find(element => element.id == this.state.productId);

        if(typeof exists !== 'undefined') {
            alert('This product had already been added')
        } else {
            if(this.validator.fieldValid('productId') && this.validator.fieldValid('productQuantity')) {
                products.push({
                    id: this.state.productId,
                    quantity: this.state.productQuantity,
                })

                await this.setState({products})
            } else {
                this.validator.showMessageFor('productId');
                this.validator.showMessageFor('productQuantity');

                setTimeout(() => {
                    this.validator.hideMessageFor('productId');
                    this.validator.hideMessageFor('productQuantity');
                }, params.hide_messages)
            }
        }
    }

    /**
     * method to remove a product from the list
     * @param dataIndex
     * @returns {Promise<void>}
     */
    async removeProduct(dataIndex) {
        const products = this.state.products;
        products.splice(dataIndex, 1);

        await this.setState({products});
    }

    render() {
        return (
            <div className="container">
                <div className="row w-75 py-4">
                    <div className="col-md-12 border align-items-center">
                        <h2 className="text-center text-info font-weight-bold">{(this.state.isUpdate) ? `Update Invoice #${this.state.invoiceId}` : `Create Invoice`}</h2>
                        <form action="#" onSubmit={this.handleSubmit} className="py-3">
                            <div className="mb-3">
                                <label htmlFor="input-client-id" className="form-label float-left">Client Id:</label>
                                <input value={this.state.clientId} type="text" className="form-control" id="input-client-id" name="clientId" onChange={this.handleChange}/>
                                {this.validator.message('clientId', this.state.clientId, 'required|integer', {className: "text-danger text-left"})}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="input-client-name" className="form-label float-left">Client Name:</label>
                                <input value={this.state.clientName} type="text" className="form-control" id="input-client-name" name="clientName" onChange={this.handleChange}/>
                                {this.validator.message('clientName', this.state.clientName, 'required|alpha_space', {className: "text-danger text-left"})}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="input-client-address" className="form-label float-left">Client Address:</label>
                                <input value={this.state.clientAddress} type="text" className="form-control" id="input-client-address" name="clientAddress" onChange={this.handleChange}/>
                                {this.validator.message('clientAddress', this.state.clientAddress, 'required', {className: "text-danger text-left"})}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="input-client-phone" className="form-label float-left">Client Phone:</label>
                                <input value={this.state.clientPhone} type="text" className="form-control" id="input-client-phone" name="clientPhone" onChange={this.handleChange}/>
                                {this.validator.message('clientPhone', this.state.clientPhone, 'required|integer', {className: "text-danger text-left"})}
                            </div>
                            <div className="mb-3">
                                <label className="form-label float-left">Products:</label>
                                <div className="row">
                                    <div className="col-md-12">
                                        <table className="table table-bordered">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Product Id</th>
                                                    <th scope="col">Quantity</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                this.state.products.map( ( item, index ) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td scope="row">
                                                                {
                                                                    (typeof item.product !== 'undefined' && typeof item.product.id !== 'undefined')
                                                                        ?
                                                                            item.product.id
                                                                        :
                                                                            item.id
                                                                }
                                                            </td>
                                                            <td>{item.quantity}</td>
                                                            {
                                                                (this.state.isUpdate)
                                                                    ?
                                                                        null
                                                                    :
                                                                        <td><li className="btn btn-sm btn-danger" onClick={() => this.removeProduct(index)}> - </li></td>
                                                            }
                                                        </tr>
                                                    )
                                                })
                                            }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            {
                                (this.state.isUpdate)
                                    ?
                                        null
                                    :
                                        <div className="row g-3">
                                            <div className="col-auto">
                                                <input type="text" className="form-control" id="input-product-id" placeholder="Id product ..." name="productId" value={this.state.productId} onChange={this.handleChange}/>
                                                {this.validator.message('productId', this.state.productId, 'required|integer', {className: "text-danger text-left"})}
                                            </div>
                                            <div className="col-auto">
                                                <input type="text" className="form-control" id="input-product-quantity" placeholder="Quantity product ..." name="productQuantity" value={this.state.productQuantity} onChange={this.handleChange} />
                                                {this.validator.message('productQuantity', this.state.productQuantity, 'required|integer', {className: "text-danger text-left"})}
                                            </div>
                                            <div className="col-auto">
                                                <li className="btn btn-info mb-3" onClick={this.addProduct}>Add Product</li>
                                            </div>
                                        </div>
                            }

                            <button type="submit" className="btn btn-info btn-block">Submit</button>
                        </form>
                    </div>
                </div>
                {
                    (this.state.messageError !== null)
                        ?
                        <div className="row w-57 py-4">
                            <div className="col-md-12 align-items-center">
                                <div className="alert alert-warning" role="alert">
                                    {this.state.messageError}
                                </div>
                            </div>
                        </div>
                        :
                        null
                }

                {
                    (this.state.redirect)
                        ?
                            <Redirect to='/invoices'/>
                        :
                            null
                }

            </div>
        )
    }
}
