import React from 'react';
import { connect } from 'react-redux';

const mapStatetoProps = (state, props) => {
  return {
    name: props.name,
    id: props.id,
    tasks: state.tasks.filter((t) => t.group === props.id),
  };
};

const TaskList = ({ tasks, name }) => {
  return (
    <div>
      <h3>{name} </h3>
      {tasks.map((t, i) => (
        <div key={i}>{t.name}</div>
      ))}
    </div>
  );
};

export const ConnectedTaskList = connect(mapStatetoProps)(TaskList);
