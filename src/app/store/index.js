import { createStore, applyMiddleware, combineReducers } from 'redux';
import { defaultState } from '../../server/defaultState';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
// import * as sagas from './sagas.mock';
import * as sagas from './sagas';
import * as mutations from './mutations';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  combineReducers({
    session(session = defaultState.session || {}) {
      return session;
    },
    tasks(tasks = defaultState.tasks, action) {
      switch (action.type) {
        case mutations.CREATE_TASK:
          return [
            ...tasks,
            {
              id: action.taskID,
              name: 'New Task',
              group: action.groupID,
              owner: action.ownerID,
              isComplete: false,
            },
          ];
        case mutations.SET_TASK_COMPLETE:
          return tasks.map((t) => {
            return t.id === action.taskID ? { ...t, isComplete: action.isComplete } : t;
          });

        case mutations.SET_TASK_NAME:
          return tasks.map((t) => {
            return t.id === action.taskID ? { ...t, name: action.name } : t;
          });
        case mutations.SET_TASK_GROUP:
          return tasks.map((t) => {
            return t.id === action.taskID ? { ...t, group: action.groupID } : t;
          });
      }

      return tasks;
    },
    comments(comments = defaultState.comments) {
      return comments;
    },
    groups(groups = defaultState.groups) {
      return groups;
    },
    users(users = defaultState.users) {
      return users;
    },
  }),
  applyMiddleware(createLogger(), sagaMiddleware)
);

for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}
