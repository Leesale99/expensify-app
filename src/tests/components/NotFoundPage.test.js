import React from 'react';
import { shallow } from 'enzyme';
import NotFoundPage from '../../componenents/NotFoundPage';

test('should render NotFoudPage correctly', () => {
  const wrapper = shallow(<NotFoundPage />);
  expect(wrapper).toMatchSnapshot();
});
