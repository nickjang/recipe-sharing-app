import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import RecipeForm from './RecipeForm';

describe(`RecipeForm component`, () => {
  it('renders RecipeForm by default', () => {
    const wrapper = shallow(<RecipeForm />);
    expect(toJson(wrapper)).toMatchSnapshot()
  });
})