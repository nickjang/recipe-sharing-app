import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import UserRecipes from './UserRecipes';

describe(`UserRecipes component`, () => {
  it('renders UserRecipes by default', () => {
    const wrapper = shallow(<UserRecipes />);
    expect(toJson(wrapper)).toMatchSnapshot()
  });
})