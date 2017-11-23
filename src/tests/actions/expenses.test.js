import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  startAddExpense,
  addExpense,
  editExpense,
  removeExpense,
  setExpenses,
  startSetExpenses,
  startRemoveExpense,
  startEditExpense
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);
const uid = 'mytestuid';
const defaultAthState = { auth: { uid } };

beforeEach(done => {
  const expenseData = {};

  expenses.forEach(({ id, description, amount, note, createdAt }) => {
    expenseData[id] = { description, amount, note, createdAt };
  });

  database
    .ref(`users/${uid}/expenses`)
    .set(expenseData)
    .then(() => done());
});

test('should setup remove expense action object', () => {
  const action = removeExpense('123abc');
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

test('should remove expense from firebase', done => {
  const id = expenses[0].id;
  const store = createMockStore(defaultAthState);
  store
    .dispatch(startRemoveExpense(id))
    .then(() => {
      const actions = store.getActions();

      expect(actions[0]).toEqual({
        type: 'REMOVE_EXPENSE',
        id
      });

      return database.ref(`users/${uid}/expenses/${id}`).once('value');
    })
    .then(snapshot => {
      expect(snapshot.exists()).toBeFalsy();
      done();
    });
});

test('should setup edit expense action object', () => {
  const action = editExpense('123', {
    description: 'test',
    amount: 100,
    note: 'test',
    createdAt: 1000
  });

  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123',
    updates: {
      description: 'test',
      amount: 100,
      note: 'test',
      createdAt: 1000
    }
  });
});

test('should edit the expense in firebase', done => {
  const store = createMockStore(defaultAthState);
  const id = expenses[2].id;
  const updates = {
    amount: 9999
  };
  store
    .dispatch(startEditExpense(id, updates))
    .then(() => {
      const actions = store.getActions();

      expect(actions[0]).toEqual({
        type: 'EDIT_EXPENSE',
        id,
        updates
      });

      return database.ref(`users/${uid}/expenses/${id}`).once('value');
    })
    .then(snapshot => {
      expect(snapshot.val().amount).toEqual(updates.amount);
      done();
    });
});

test('should setup add expense action object with provided values', () => {
  const expense = expenses[0];
  const action = addExpense(expense);

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense
  });
});

test('should add expense to database and store', done => {
  const store = createMockStore(defaultAthState);
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: '',
    createdAt: 1000
  };

  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseData
        }
      });

      return database
        .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once('value');
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});

test('should add expense with defaults to database and store', done => {
  const store = createMockStore(defaultAthState);
  const defaultExpenseData = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0
  };

  store
    .dispatch(startAddExpense({}))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...defaultExpenseData
        }
      });

      return database
        .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once('value');
    })
    .then(snapshot => {
      expect(snapshot.val()).toEqual(defaultExpenseData);
      done();
    });
});

test('should setup set expenses object with the data', () => {
  const action = setExpenses(expenses);

  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

test('should fetch the expenses from firebase', done => {
  const store = createMockStore(defaultAthState);
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });

    done();
  });
});
