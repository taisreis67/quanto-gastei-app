import React from 'react';
import Dashboard from '../Dashboard';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

it('Deve renderizar o dashboard com o valor total das transações', () => {
    const dashboard = mount(<Dashboard />);

    expect(toJson(dashboard)).toMatchSnapshot();
});