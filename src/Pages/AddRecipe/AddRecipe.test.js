import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import AddRecipe from './AddRecipe';

describe(`AddRecipe component`, () => {
  it('renders AddRecipe by default', () => {
    const wrapper = shallow(<AddRecipe />);
    expect(toJson(wrapper)).toMatchSnapshot()
  });
})