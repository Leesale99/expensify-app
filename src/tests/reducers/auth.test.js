import authReducer from '../../reducers/auth';
import { logout } from '../../actions/auth';

test('should set uid for login', () => {
  const uid = 'someID';
  const action = {
    type: 'LOGIN',
    uid
  };
  const state = authReducer(undefined, action);
  expect(state).toEqual({ uid });
});

test('should clear uid for logout', () => {
  const uid = 'SomeID';
  const action = {
    type: 'LOGOUT'
  };
  const state = authReducer({ uid }, action);
  expect(state).toEqual({});
});
