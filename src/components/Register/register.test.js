import React from 'react';
import Register from '../Register';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

it('Deve renderizar o formulário para adcionar uma transação', () => {
    const register = mount(<Register />);

    expect(toJson(register)).toMatchSnapshot();
});