import React from 'react';
import { ExpensesSummary } from '../../componenents/ExpensesSummary';
import { shallow } from 'enzyme';
import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should render ExpenseSummary with 0 expenses correctly', () => {
  const wrapper = shallow(
    <ExpensesSummary expenseCount={0} expensesTotal={0} />
  );

  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseSummary with multiple expenses correctly', () => {
  const expenseCount = expenses.length;
  const expensesTotal = selectExpensesTotal(expenses);
  const wrapper = shallow(
    <ExpensesSummary
      expenseCount={expenseCount}
      expensesTotal={expensesTotal}
    />
  );

  expect(wrapper).toMatchSnapshot();
});
