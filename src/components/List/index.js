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
        if (this.props.length > 0) {
            const {
                textMessage,
                classMessage,
            } = this.props.location.state;

            return <Message textMessage={textMessage} classMessage={classMessage} />;
        }
    }

    listTransactions = (transactions) => {
        transactions.reverse();

        const list = transactions.map((transaction, index) => {
            return <Transaction value={transaction[0]} description={transaction[1]} key={index} />;
        });

        return list;
    }

    render() {
        const {
            transactions,
        } = this.state;

        if (transactions) {
            return (
                <article className="container">
                    {this.message()}
    
                    <div className="card">
                        <div className="card-body">
                            <ul className="list-group list-group-flush">
                                {this.listTransactions(transactions)}
                            </ul>
                        </div>
                    </div>
                </article>
            );
        }

        return (
            <article className="container">
                <div className="card">
                    <div className="card-body">
                        Nenhuma transação foi adicionada.
                    </div>
                </div>
            </article>
        );
    }
}

export default List;