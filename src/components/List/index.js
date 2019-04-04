import React, { Component } from 'react';
import ls from 'local-storage';
import Message from '../Message';
import Transaction from '../Transaction';

class List extends Component {
    constructor(props) {
        super(props);

        const transactions = ls.get('transactions');

        this.state = {
            transactions,
        };
    }

    message = () => {
        if (this.props.location.state) {
            const {
                textMessage,
                classMessage,
            } = this.props.location.state;

            return <Message textMessage={textMessage} classMessage={classMessage} />;
        }
    }

    listTransactions = () => {
        const {
            transactions,
        } = this.state;

        const list = transactions.map((transaction, index) => {
            return <Transaction value={transaction[0].value} description={transaction[1].value} key={index} />;
        });

        return list;
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
                    {this.message()}

                    <div className="row">
                        <div className="col">
                            <ul className="list-group list-group-flush">
                                {this.listTransactions()}
                            </ul>
                        </div>
                    </div>
                </div>
            </article>
        );
    }
}

export default List;