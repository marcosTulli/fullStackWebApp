import React from 'react';
import { Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedTaskDetail } from './TaskDetail';
import { ConnectedDashboard } from './Dashboard';
import { ConnectedNavigation } from './Navigation';
import { ConnectedLogin } from './Login';
import { store } from '../store';
import { history } from '../store/history';
import { Redirect } from 'react-router';

const RouteGuard =
  (Component) =>
  ({ match }) => {
    console.log('Router Guard: ', match);
    if (!store.getState().userSession) {
      return <Redirect to="/" />;
    } else {
      return <Component match={match} />;
    }
  };

const Main = () => {
  return (
    <Router history={history}>
      <Provider store={store}>
        <div>
          <ConnectedNavigation />
          <Route exact path="/" component={ConnectedLogin} />
          <Route exact path="/dashboard" render={RouteGuard(ConnectedDashboard)} />
          <Route exact path="/task/:id" render={RouteGuard(ConnectedTaskDetail)} />
        </div>
      </Provider>
    </Router>
  );
};

export default Main;
