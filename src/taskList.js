import {newTask} from './taskController.js';
const taskList = [];

function addTask(task) {
    taskList.push(task);
}

function removeTask(task){
    for(let i = 0; i <= taskList.length; i++){
        if(taskList[i].getName == task.getName){
            taskList.splice(i, 1);
            break;
        }
    }
}

function returnList() {
    return taskList;
}

function returnTask(index) {
    return taskList[index];
}

export {addTask, removeTask, returnList, returnTask};
