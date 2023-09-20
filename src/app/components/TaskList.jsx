import React from 'react';
import { connect } from 'react-redux';
import { requestTaskCreation } from '../store/mutations';
import { Link } from 'react-router-dom';

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
      {tasks.map((t) => (
        <Link key={t.id} to={`/task/${t.id}`}>
          <div>{t.name}</div>
        </Link>
      ))}
      <button onClick={() => createNewTask(id)}>Add new</button>
    </div>
  );
};

export const ConnectedTaskList = connect(mapStatetoProps, mapDispatchtoProps)(TaskList);
