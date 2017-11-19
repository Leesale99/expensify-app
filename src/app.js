import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import { addExpense, removeExpense, editExpense } from './actions/expenses';
import { setTextFilter, sortByAmount, sortByDate } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import 'normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

const store = configureStore();

const expenseOne = store.dispatch(
  addExpense({ description: 'Water bill', amount: 300, createdAt: Date.now() })
);
const expenseTwo = store.dispatch(
  addExpense({ description: 'Gas bill', amount: 500, createdAt: Date.now() })
);

// store.dispatch(setTextFilter('water'));
store.dispatch(setTextFilter('bill'));

store.dispatch(sortByAmount());

const state = store.getState();
console.log(getVisibleExpenses(state.expenses, state.filters));

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.querySelector('#root'));
