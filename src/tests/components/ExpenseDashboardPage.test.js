import React from 'react';
import { shallow } from 'enzyme';
import ExpenseDashboarPage from '../../componenents/ExpenseDashboardPage';

test('should render ExpenseDashboarPage correctly', () => {
  const wrapper = shallow(<ExpenseDashboarPage />);
  expect(wrapper).toMatchSnapshot();
});
