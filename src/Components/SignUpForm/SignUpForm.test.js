import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SignUpForm from './SignUpForm';

describe(`SignUpForm component`, () => {
  it('renders SignUpForm by default', () => {
    const wrapper = shallow(<SignUpForm />);
    expect(toJson(wrapper)).toMatchSnapshot()
  });
})