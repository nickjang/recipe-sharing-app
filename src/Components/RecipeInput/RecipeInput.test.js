import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import RecipeInput from './RecipeInput';

describe(`RecipeInput component`, () => {
  it('renders RecipeInput by default', () => {
    const wrapper = shallow(<RecipeInput />);
    expect(toJson(wrapper)).toMatchSnapshot()
  });
})