import task from './task.js';

function newTask(name, description, category, priority, deadline) {
    const newTask = Object.create(task);
    newTask.init(name, description, category, priority, deadline);
    return newTask;
}

function editTask() {

}

export {newTask};