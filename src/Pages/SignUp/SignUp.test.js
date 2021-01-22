import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SignUp from './SignUp';

describe(`SignUp component`, () => {
  it('renders SignUp by default', () => {
    const wrapper = shallow(<SignUp />);
    expect(toJson(wrapper)).toMatchSnapshot()
  });
})