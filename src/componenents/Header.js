import React from 'react';
import { NavLink } from 'react-router-dom';
import { startLogout } from '../actions/auth';
import { connect } from 'react-redux';

export const Header = ({ startLogout }) => (
  <header>
    <h1>Expensify</h1>
    <ul>
      <li>
        <NavLink to="/" activeClassName="is-active" exact={true}>
          Login
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard" activeClassName="is-active">
          Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink to="/create" activeClassName="is-active">
          Add Expense
        </NavLink>
      </li>
      <li>
        <button onClick={startLogout}>Logout</button>
      </li>
    </ul>
  </header>
);

const mapDispatchToProps = dispatch => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
