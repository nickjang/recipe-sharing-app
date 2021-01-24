import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import EditRecipe from './EditRecipe';

describe(`EditRecipe component`, () => {
  it('renders EditRecipe by default', () => {
    const wrapper = shallow(<EditRecipe />);
    expect(toJson(wrapper)).toMatchSnapshot()
  });
})