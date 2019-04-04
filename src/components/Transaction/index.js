import React from 'react';

const Transaction = (props) => {
    const {
        value,
        description,
    } = props;

    return (
        <li className="list-group-item">{value} | {description}</li>
    );
}

export default Transaction;