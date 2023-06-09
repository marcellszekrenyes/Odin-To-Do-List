import {addTaskForm, filterForm, editTaskForm, resetDomList, sortDomList, generateDomList, cloneList} from './domController.js';
import {returnList, completeTask, removeTask, editTask} from './taskList.js';
import {homeTab} from './filterController.js';
import {projectController} from './projectController.js';

const taskButtonContainer = document.createElement('div');
taskButtonContainer.classList.add('taskButtonContainer');
taskButtonContainer.classList.add('doNotAppend');
const editorButton = document.createElement('div');
editorButton.classList.add('editorButton');
editorButton.classList.add('doNotAppend');
const pencilLogo = document.createElement('img');
pencilLogo.setAttribute('src', "./../Media/pencil.svg");
pencilLogo.classList.add('smallIcons');
pencilLogo.classList.add('doNotAppend');
editorButton.appendChild(pencilLogo);

const deleteButton = document.createElement('div');
deleteButton.classList.add('deleteButton');
deleteButton.classList.add('doNotAppend');
const trashLogo = document.createElement('img');
trashLogo.setAttribute('src', "./../Media/trash.svg");
trashLogo.classList.add('smallIcons');
trashLogo.classList.add('doNotAppend');
deleteButton.appendChild(trashLogo);

const completeButton = document.createElement('div');
completeButton.classList.add('completeButton');
completeButton.classList.add('doNotAppend');
const tickLogo = document.createElement('img');
tickLogo.setAttribute('src', "./../Media/tick.svg");
tickLogo.classList.add('smallIcons');
tickLogo.classList.add('doNotAppend');
completeButton.appendChild(tickLogo);

taskButtonContainer.appendChild(completeButton);
taskButtonContainer.appendChild(editorButton);
taskButtonContainer.appendChild(deleteButton);    

function addTaskbuttons(listItem) {
    listItem.appendChild(taskButtonContainer);
}

function removeTaskButtons() {
    taskButtonContainer.parentNode.removeChild(taskButtonContainer);
}

function editController(taskList, name, description, project, priority, deadline) {
    for(let i = 0; i <= taskList.length - 1; i++) {
        const nextItem = taskList[i];
        if(nextItem.getName() == name && nextItem.getDescription() == description && nextItem.getProject() == project  
        && nextItem.getPriority() == priority && nextItem.getDeadline() == deadline) {
            const newName = document.getElementById('editName').value;
            const newDescription = document.getElementById('editDescription').value;
            const newProject = document.getElementById('editProject').value;
            const newPriority = document.getElementById('editPriority').value;
            const newDeadline = document.getElementById('editDeadline').value;
            editTask(nextItem, newName, newDescription, newProject, newPriority, newDeadline);
            break;
        }
    }
}

function editListener(editedItem, returnList) {
    const allChildren = editedItem.children;
    editTaskForm.onsubmit = function (e) {
        e.preventDefault();
        editController(returnList, allChildren[0].textContent, allChildren[1].textContent, allChildren[2].textContent, allChildren[3].textContent, allChildren[4].textContent);
        resetDomList();
        homeTab.checked = true;
        generateDomList(sortDomList(returnList));
        projectController(returnList);
        console.log(returnList);
        editTaskForm.setAttribute('style', 'width: 0; height: 0; opacity: 0; pointer-events: none;');
        editTaskForm.reset();
    };

    editTaskForm.onreset = function() {
        editTaskForm.setAttribute('style', 'width: 0; height: 0; opacity: 0; pointer-events: none;');
        editTaskForm.reset();
        console.log('5');
        editTaskForm.removeEventListener('submit', onsubmit);
        editTaskForm.removeEventListener('submit', onreset);
        console.log('6');
        return;
    };

}

editorButton.addEventListener('click', () => {
    const editedItem = taskButtonContainer.parentNode;
    console.log(editedItem);
    editTaskForm.setAttribute('style', 'width: 17.5%; height: 45%; opacity: 1; pointer-events: auto;');
    filterForm.setAttribute('style', 'width: 0; height: 0; opacity: 0; pointer-events: none;');
    addTaskForm.setAttribute('style', 'width: 0; height: 0; opacity: 0; pointer-events: none;');
    editListener(editedItem, returnList());
    projectController(returnList());
});  

completeButton.addEventListener('click', () => {
    console.log(taskButtonContainer.parentNode);
    const allChildren = taskButtonContainer.parentNode.children;
    completeTask(returnList(), allChildren[0].textContent, allChildren[1].textContent, allChildren[2].textContent, allChildren[3].textContent, allChildren[4].textContent);
    resetDomList();
    generateDomList(sortDomList(cloneList));
    projectController(returnList());
    console.log(returnList());
}); 

taskButtonContainer.addEventListener('click', () => {
    taskButtonContainer.parentNode.removeChild(taskButtonContainer);
});

deleteButton.addEventListener('click', () => {
    console.log(taskButtonContainer.parentNode);
    const allChildren = taskButtonContainer.parentNode.children;
    removeTask(returnList(), allChildren[0].textContent, allChildren[1].textContent, allChildren[2].textContent, allChildren[3].textContent, allChildren[4].textContent);
    resetDomList();
    homeTab.checked = true;
    generateDomList(sortDomList(returnList()));
    projectController(returnList());
    console.log(returnList());
});

export {taskButtonContainer, addTaskbuttons, removeTaskButtons}