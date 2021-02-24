import React, { Component } from "react";
import { NavLink } from 'react-router-dom';

export class Header extends Component {
    render() {
        return (
            <div>
                <header>
                    <h1 className="text-center text-info font-weight-bold">Menu</h1>
                    <ul className="list-group">
                        <NavLink to = "/" ><li className="list-group-item">Home</li></NavLink>
                        <NavLink to = "/invoices" ><li className="list-group-item">List Invoices</li></NavLink>
                        <NavLink to = "/create-invoice" ><li className="list-group-item">Create Invoice</li></NavLink>
                        <NavLink to = "/search-invoice" ><li className="list-group-item">Search Invoice</li></NavLink>
                    </ul>
                </header>
            </div>
        )
    }
}
