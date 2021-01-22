import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import AccountInput from './AccountInput';

describe(`AccountInput component`, () => {
  it('renders AccountInput by default', () => {
    const wrapper = shallow(<AccountInput />);
    expect(toJson(wrapper)).toMatchSnapshot()
  });
})