import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Recipe from './Recipe';

describe(`Recipe component`, () => {
  it('renders Recipe by default', () => {
    const wrapper = shallow(<Recipe />);
    expect(toJson(wrapper)).toMatchSnapshot()
  });
})