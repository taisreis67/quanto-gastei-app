import React from 'react';

const Transaction = (props) => {
    const {
        value,
        description,
    } = props;

    let newValue = value
            .replace('R$ ', '')
            .replace('.', '')
            .replace(',', '.');

    newValue = parseFloat(newValue);

    newValue = String(newValue.toFixed(2)).replace('.', ',');

    return (
        <li className="list-group-item">{`R$ ${newValue} | ${description}`}</li>
    );
}

export default Transaction;