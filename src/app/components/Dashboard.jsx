import React from 'react';
import { connect } from 'react-redux';
import { ConnectedTaskList } from './TaskList';

const mapStatetoProps = (state) => {
  return {
    groups: state.groups,
  };
};
export const Dashboard = ({ groups }) => {
  return (
    <div>
      <h2>DASHBOARD</h2>
      {groups.map((g, i) => (
        <div key={i}>
          <ConnectedTaskList id={g.id} name={g.name} />
        </div>
      ))}
    </div>
  );
};

export const ConnectedDashboard = connect(mapStatetoProps)(Dashboard);
