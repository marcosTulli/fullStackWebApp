// TODO: FIX ADD NEW TASKS, EDIT TASK
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as mutations from '../store/mutations';

const TaskDetail = ({
  id,
  comments,
  task,
  isComplete,
  groups,
  setTaskCompletion,
  setTaskName,
  setTaskGroup,
}) => {
  return (
    <div>
      <div>
        <input type="text" onChange={setTaskName} value={task.name} />
      </div>
      <div>
        <button onClick={() => setTaskCompletion(id, !isComplete)}>
          {isComplete ? 'Reopen' : 'Complete'}
        </button>
      </div>
      <div>
        <select onChange={setTaskGroup} value={task.group}>
          {groups.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <Link to="/dashboard">
          <button>Done</button>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state, props) => {
  let id = props.match.params.id;
  let task = state.tasks.find((t) => t.id === id);
  let groups = state.groups;
  return {
    id,
    task,
    groups,
    isComplete: task.isComplete,
  };
};

const mapDispatchtpProps = (dispatch, ownProps) => {
  const id = ownProps.match.params.id;
  return {
    setTaskCompletion(id, isComplete) {
      dispatch(mutations.setTaskCompletion(id, isComplete));
    },
    setTaskGroup(e) {
      dispatch(mutations.setTaskGroup(id, e.target.value));
    },
    setTaskName(e) {
      dispatch(mutations.setTaskGroup(id, e.target.value));
    },
  };
};

export const ConnectedTaskDetail = connect(mapStateToProps, mapDispatchtpProps)(TaskDetail);
