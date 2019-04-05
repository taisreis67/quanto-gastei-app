import React from 'react';
import List from '../List';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import ls from 'local-storage';

it('Deve renderizar uma mensagem de nenhuma transação cadastrada', () => {
    const list = mount(<List />);

    expect(toJson(list)).toMatchSnapshot();
});

it('Deve renderizar uma listagem com as transações adicionadas', () => {
    const transactions = [
        ['R$ 230,50', 'Tênis'],
        ['R$ 230,50', 'Tênis'],
    ];

    ls.set('transactions', transactions);

    const list = mount(<List />);

    expect(toJson(list)).toMatchSnapshot();
});