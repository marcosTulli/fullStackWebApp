import React from 'react';
import { connect } from 'react-redux';
import { ConnectedTaskList } from './TaskList';

const mapStatetoProps = (state) => {
  return {
    groups: state.groups,
  };
};
const Dashboard = ({ groups }) => {
  return (
    <div>
      <h2>DASHBOARD</h2>
      {groups.map((g) => (
        <div key={g.id}>
          <ConnectedTaskList id={g.id} name={g.name} />
        </div>
      ))}
    </div>
  );
};

export const ConnectedDashboard = connect(mapStatetoProps)(Dashboard);
