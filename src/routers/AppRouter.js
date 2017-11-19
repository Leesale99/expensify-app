import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../componenents/Header';
import ExpenseDashboardPage from '../componenents/ExpenseDashboardPage';
import AddExpensePage from '../componenents/AddExpensePage';
import EditExpensePage from '../componenents/EditExpensePage';
import HelpPage from '../componenents/HelpPage';
import NotFoundPage from '../componenents/NotFoundPage';

const AppRouter = () => (
  <BrowserRouter>
    <div>
      <Header />
      <Switch>
        <Route path="/" component={ExpenseDashboardPage} exact={true} />
        <Route path="/create" component={AddExpensePage} />
        <Route path="/edit/:id" component={EditExpensePage} />
        <Route path="/help" component={HelpPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default AppRouter;
