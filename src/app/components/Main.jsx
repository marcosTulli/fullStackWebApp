import React from 'react';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store';
import { ConnectedDashboard } from './Dashboard';
import { history } from '../store/history';
import { ConnectedNavigation } from './Navigation';

const Main = () => {
  return (
    <Router history={history}>
      <Provider store={store}>
        <div>
          <ConnectedNavigation />

          <Route exact path="/dashboard" render={() => <ConnectedDashboard />} />
        </div>
      </Provider>
    </Router>
  );
};

export default Main;
