import React from 'react';
import Message from '../Message';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';

it('Deve renderizar uma alerta com a menssagem passada.', () => {
    const message = mount(<Message textMessage="A message" classMessage="success" />);
    expect(toJson(message)).toMatchSnapshot();
});