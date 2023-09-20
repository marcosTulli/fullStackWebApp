import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const TaskDetail = ({ id, comments, task, isComplete, groups }) => {
  return (
    <div>
      <div>
        <input defaultValue={task.name}></input>
      </div>
      <div>
        <button onClick={() => console.log('TUKI')}>Complete / Reopen Task</button>
      </div>
      <div>
        <select>
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
    isComplete: task ? task.isComplete : false,
  };
};

export const ConnectedTaskDetail = connect(mapStateToProps)(TaskDetail);
