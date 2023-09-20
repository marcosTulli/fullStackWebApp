import React from 'react';
import { connect } from 'react-redux';
import { requestTaskCreation } from '../store/mutations';

const mapStatetoProps = (state, props) => {
  return {
    name: props.name,
    id: props.id,
    tasks: state.tasks.filter((t) => t.group === props.id),
  };
};

const mapDispatchtoProps = (dispatch, props) => {
  return {
    createNewTask(id) {
      console.log('Creating new task...', id);
      dispatch(requestTaskCreation(id));
    },
  };
};

const TaskList = ({ tasks, name, id, createNewTask }) => {
  return (
    <div>
      <h3>{name} </h3>
      {tasks.map((t, i) => (
        <div key={i}>
          {t.name} {t.id}
        </div>
      ))}
      <button onClick={() => createNewTask(id)}>Add new</button>
    </div>
  );
};

export const ConnectedTaskList = connect(mapStatetoProps, mapDispatchtoProps)(TaskList);
