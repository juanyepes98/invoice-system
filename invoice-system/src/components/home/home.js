import React, { Component } from "react";

export class Home extends Component {
    render() {
        return (
            <div>
                <h1 className="text-center text-info font-weight-bold">Welcome to the invoice management system</h1>
                <div className="align-items-center p-5">
                    <div className="spinner-grow text-primary" role="status">
                        <span className="visually-hidden"></span>
                    </div>
                    <div className="spinner-grow text-secondary" role="status">
                        <span className="visually-hidden"></span>
                    </div>
                    <div className="spinner-grow text-success" role="status">
                        <span className="visually-hidden"></span>
                    </div>
                    <div className="spinner-grow text-danger" role="status">
                        <span className="visually-hidden"></span>
                    </div>
                    <div className="spinner-grow text-warning" role="status">
                        <span className="visually-hidden"></span>
                    </div>
                    <div className="spinner-grow text-info" role="status">
                        <span className="visually-hidden"></span>
                    </div>
                    <div className="spinner-grow text-dark" role="status">
                        <span className="visually-hidden"></span>
                    </div>
                </div>
            </div>
        )
    }
}
