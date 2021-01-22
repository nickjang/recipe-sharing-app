import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import AddRecipeForm from './AddRecipeForm';

describe(`AddRecipeForm component`, () => {
  it('renders AddRecipeForm by default', () => {
    const wrapper = shallow(<AddRecipeForm />);
    expect(toJson(wrapper)).toMatchSnapshot()
  });
})