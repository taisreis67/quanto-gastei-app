import React, { Component } from 'react';
import ls from 'local-storage';

class List extends Component {
    constructor(props) {
        super(props);

        const transactions = ls.get('transactions');

        this.state = {
            transactions,
        };

        console.log(transactions);
    }

    render() {
        return (
            <article>
                <header className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <h2 className="display-4">Transações</h2>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="container">
                    <div className="row">
                        <div className="col">
                            <ul className="list-group">
                                <li className="list-group-item">Cras justo odio</li>
                                <li className="list-group-item">Dapibus ac facilisis in</li>
                                <li className="list-group-item">Morbi leo risus</li>
                                <li className="list-group-item">Porta ac consectetur ac</li>
                                <li className="list-group-item">Vestibulum at eros</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </article>
        );
    }
}

export default List;