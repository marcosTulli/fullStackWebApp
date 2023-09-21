import { addNewTask, updateTask } from './server';

(async function test() {
  addNewTask({
    name: 'NEW TASK',
    id: '111',
  });
  addNewTask({
    name: 'WAIT',
    id: '111',
  });
})();
