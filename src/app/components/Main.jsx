import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { ConnectedDashboard } from './Dashboard';

const Main = () => {
  return (
    <Provider store={store}>
      <ConnectedDashboard />
    </Provider>
  );
};

export default Main;
