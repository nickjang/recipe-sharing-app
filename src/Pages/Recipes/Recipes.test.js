import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Recipes from './Recipes';

describe(`Recipes component`, () => {
  it('renders Recipes by default', () => {
    const wrapper = shallow(<Recipes />);
    expect(toJson(wrapper)).toMatchSnapshot()
  });
})