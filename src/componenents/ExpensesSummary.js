import React from 'react';
import { connect } from 'react-redux';
import selectExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';

export const ExpensesSummary = props => {
  const info = `Viewing ${props.expenseCount} ${props.expenseCount === 1
    ? 'expense'
    : 'expenses'} totaling ${numeral(props.expensesTotal / 100).format(
    '$0,0.00'
  )}`;
  return (
    <div>
      <h2>Total:</h2>
      <p>{info}</p>
    </div>
  );
};

const mapStateToProps = state => ({
  expenseCount: state.expenses.length,
  expensesTotal: selectExpensesTotal(state.expenses)
});

export default connect(mapStateToProps)(ExpensesSummary);
