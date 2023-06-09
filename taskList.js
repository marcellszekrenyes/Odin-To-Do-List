import task from './task.js';
const taskList = [];

function newTask(name, description, project, priority, deadline) {
    const newTask = Object.create(task);
    newTask.init(name, description, project, priority, deadline);
    return newTask;
}

function addTask(task) {
    taskList.push(task);
    return task;
}

function editTask(task, name, description, project, priority, deadline) {
    task.setName(name);
    task.setDescription(description);
    task.setProject(project);
    task.setPriority(priority);
    task.setDeadline(deadline);
}

function completeTask(taskList, name, description, project, priority, deadline) {
    for(let i = 0; i <= taskList.length - 1; i++) {
        const nextItem = taskList[i];
        if(nextItem.getName() == name && nextItem.getDescription() == description && nextItem.getProject() == project  
        && nextItem.getPriority() == priority && nextItem.getDeadline() == deadline) {
            if(nextItem.getIsFinished() == false) {
                nextItem.setIsFinished(true);
                return true;
            }else{        
                nextItem.setIsFinished(false);
                return false;
            }
        }
    }
}

function removeTask(taskList, name, description, project, priority, deadline){
    for(let i = 0; i <= taskList.length - 1; i++) {
        const nextItem = taskList[i];
        if(nextItem.getName() == name && nextItem.getDescription() == description && nextItem.getProject() == project  
        && nextItem.getPriority() == priority && nextItem.getDeadline() == deadline) {
            if(nextItem.getIsFinished() == true) {
                taskList.splice(i, 1);
                console.log('Task has been removed');
                return;
            }else{
                let responseText = '';
                responseText = prompt('This task is not yet completed, are you sure you want to remove it? Yes or No?');
                if(responseText.toLowerCase() == 'yes'){
                    taskList.splice(i, 1);
                    console.log('Task has been removed');
                    responseText = '';
                    return;
                }

                if(responseText.toLowerCase() == 'no' || responseText == undefined || responseText == null || responseText == ''){
                    console.log('Task has not been removed');
                    responseText = '';
                    return;
                }
            }
        }
    }
}

function returnTask(index) {
    return taskList[index];
}

function returnList() {
    return taskList;
}

function createTestList() {
    for(let i = 0; i <= 6; i++){
        const deadline = new Date;
        deadline.setDate(deadline.getDate() + i);
        addTask(newTask(i, i, i, 'Low', deadline.toLocaleDateString('fr-ca')));
    }
    for(let i = 0; i <= 6; i++){
        const deadline = new Date;
        deadline.setDate(deadline.getDate() + i);
        addTask(newTask(i, i, i, 'Medium', deadline.toLocaleDateString('fr-ca')));
    }
    for(let i = 0; i <= 6; i++){
        const deadline = new Date;
        deadline.setDate(deadline.getDate() + i);
        addTask(newTask(i, i, i, 'High', deadline.toLocaleDateString('fr-ca')));
    }
}

export {newTask, addTask, removeTask, returnList, returnTask, completeTask, editTask, createTestList};
