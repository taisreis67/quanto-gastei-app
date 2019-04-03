import React from 'react';
import List from '../List';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

it('Deve renderizar uma listagem com as transações adicionadas', () => {
    const list = mount(<List />);

    expect(toJson(list)).toMatchSnapshot();
});