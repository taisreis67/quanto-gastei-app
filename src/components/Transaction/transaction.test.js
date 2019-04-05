import React from 'react';
import Transaction from '../Transaction';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

it('Deve renderizar os dados da transação informada', () => {
    const props = {
        value: "R$ 240,00",
        description: 'Uma nova transação de débito'
    };

    const transaction = mount(<Transaction {...props} />);

    expect(toJson(transaction)).toMatchSnapshot();
});