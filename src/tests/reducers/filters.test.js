import moment from 'moment';
import filterReducer from '../../reducers/filters';

test('should setup default filter values', () => {
  const state = filterReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  });
});

test('should set text filter', () => {
  const text = 'test';
  const action = {
    type: 'SET_TEXT_FILTER',
    text
  };
  const state = filterReducer(undefined, action);
  expect(state.text).toBe(text);
});

test('should set SortBy to amount', () => {
  const state = filterReducer(undefined, { type: 'SORT_BY_AMOUNT' });
  expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
  const currentState = {
    text: '',
    startDate: undefined,
    endDate: undefined,
    sortBy: 'amount'
  };
  const state = filterReducer(currentState, { type: 'SORT_BY_DATE' });
  expect(state.sortBy).toBe('date');
});

test('should set startDate', () => {
  const date = moment(0).add(2, 'months');
  const action = {
    type: 'SET_START_DATE',
    date
  };
  const state = filterReducer(undefined, action);
  expect(state.startDate).toEqual(date);
});

test('should set endDate', () => {
  const date = moment(0).add(2, 'months');
  const action = {
    type: 'SET_END_DATE',
    date
  };
  const state = filterReducer(undefined, action);
  expect(state.endDate).toEqual(date);
});
