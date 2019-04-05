import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Dashboard from '../Dashboard';
import List from '../List';
import Register from '../Register';

class Header extends Component {
    render() {
        return (
            <Router>
                <header>
                    <nav className="navbar navbar-expand-lg navbar-dark">
                        <div className="container">
                            <span className="navbar-brand mb-0 h1">Quanto Gastei?</span>

                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mainNavbar" aria-controls="mainNavbar" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>

                            <div className="collapse navbar-collapse" id="mainNavbar">
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <a className="nav-link" href="/">Dashboard</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/list">Minhas Transações</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="/register">Adicionar Transação</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </header>

                <Route path="/" exact component={Dashboard} />
                <Route path="/list" exact component={List} />
                <Route path="/register" exact component={Register} />
            </Router>
        );
    }
}

export default Header;