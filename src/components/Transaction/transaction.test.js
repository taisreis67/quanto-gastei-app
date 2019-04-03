import React from 'react';
import Transaction from '../Transaction';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

it('Deve renderizar os dados da transação informada', () => {
    const props = {
        id: 1,
        valor: 200.00,
        tipo: 1,
        descricao: 'Uma nova transação de débito'
    };

    const transaction = mount(<Transaction {...props} />);

    expect(toJson(transaction)).toMatchSnapshot();
});