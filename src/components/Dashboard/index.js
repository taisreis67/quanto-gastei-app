import React, { Component } from 'react';
import ls from 'local-storage';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        const transactions = ls.get('transactions');
        let totalTransactions = 0;

        if (transactions) {
            const values = transactions.map(transaction => {
                let value = transaction[0]
                        .replace('R$ ', '')
                        .replace('.', '')
                        .replace(',', '.');
    
                return parseFloat(value);
            });
    
            const sum = (total, value) => {
                return total + value;
            }
    
            totalTransactions = values.reduce(sum);
    
            totalTransactions = String(totalTransactions.toFixed(2)).replace('.', ',');
        }

        this.state = {
            totalTransactions,
        };
    }

    render() {
        const {
            totalTransactions,
        } = this.state;

        return (
            <section className="container">
                <div className="row">
                    <div className="col">
                        <div className="card">
                            <div className="card-header">
                                Resumo
                            </div>

                            <div className="card-body">
                                <h5 className="card-title">Saldo total das transações:</h5>
                                <p className="card-text">{`R$ ${totalTransactions}`}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Dashboard;