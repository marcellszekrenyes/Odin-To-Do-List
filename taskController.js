import {addTaskForm, filterForm, editTaskForm, resetDomList, generateDomList, cloneList, setEditRules, resetEditRules} from './domController.js';
import {returnList, completeTask, removeTask, editTask} from './taskList.js';
import {tabs, homeTab, filterDomList} from './filterController.js';
import {sortDomList} from './sortController.js';
import {projectController} from './projectController.js';

const taskButtonContainer = document.createElement('div');
taskButtonContainer.classList.add('taskButtonContainer');
taskButtonContainer.classList.add('doNotAppend');
const editorButton = document.createElement('div');
editorButton.classList.add('editorButton');
editorButton.classList.add('doNotAppend');
const pencilLogo = document.createElement('img');
pencilLogo.setAttribute('src', "./Media/pencil.svg");
pencilLogo.classList.add('smallIcons');
pencilLogo.classList.add('doNotAppend');
editorButton.appendChild(pencilLogo);

const deleteButton = document.createElement('div');
deleteButton.classList.add('deleteButton');
deleteButton.classList.add('doNotAppend');
const trashLogo = document.createElement('img');
trashLogo.setAttribute('src', "./Media/trash.svg");
trashLogo.classList.add('smallIcons');
trashLogo.classList.add('doNotAppend');
deleteButton.appendChild(trashLogo);

const completeButton = document.createElement('div');
completeButton.classList.add('completeButton');
completeButton.classList.add('doNotAppend');
const tickLogo = document.createElement('img');
tickLogo.setAttribute('src', "./Media/tick.svg");
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

function editListener(editedItem) {
    const allChildren = editedItem.children;
    let choosenTab = "";
    
    if(returnList == undefined){
        console.log('undefined');
        return;
    }

    for(let i = 0; i <= tabs.length - 1; i++) {
        if(tabs[i].checked == true) {
            choosenTab = tabs[i];
        }
    }

    
    const editedProject = allChildren[2].textContent;
    editTaskForm.onsubmit = function (e) {
        e.preventDefault();
        if(choosenTab.value == 'project'){
            editController(returnList(), allChildren[0].textContent, allChildren[1].textContent, allChildren[2].textContent, allChildren[3].textContent, allChildren[4].textContent);
            projectController(returnList());
            if(document.getElementById(`${editedProject}`) != undefined){
                document.getElementById(`${editedProject}`).checked = true;
            }else{
                projectController(returnList());
                homeTab.checked = true;
            }
            
            console.log('reset comes');
            resetDomList();
            console.log('reset goes');
            cloneList.splice(0, cloneList.length, ...generateDomList(sortDomList(filterDomList(returnList()))));
            console.log('generated');
            console.log(returnList());
            editTaskForm.setAttribute('style', 'width: 0; height: 0; opacity: 0; pointer-events: none;');
            editTaskForm.reset();
            resetEditRules();
        } else{
            editController(returnList(), allChildren[0].textContent, allChildren[1].textContent, allChildren[2].textContent, allChildren[3].textContent, allChildren[4].textContent);
            projectController(returnList());
            choosenTab.checked = true;
            resetDomList();
            cloneList.splice(0, cloneList.length, ...generateDomList(sortDomList(filterDomList(returnList()))));
            console.log(returnList());
            editTaskForm.setAttribute('style', 'width: 0; height: 0; opacity: 0; pointer-events: none;');
            editTaskForm.reset();
        }   
    };
    
    editTaskForm.onreset = function() {
        editTaskForm.setAttribute('style', 'width: 0; height: 0; opacity: 0; pointer-events: none;');
        resetEditRules();
        editTaskForm.reset();
        console.log('5');
        editTaskForm.removeEventListener('submit', onsubmit);
        editTaskForm.removeEventListener('submit', onreset);
        resetDomList();
        cloneList.splice(0, cloneList.length, ...generateDomList(sortDomList(filterDomList(returnList()))));
        console.log('6');
        return;
    };

}

editorButton.addEventListener('click', () => {
    const editedItem = taskButtonContainer.parentNode;
    const allChildren = editedItem.children;
    console.log(editedItem);
    setEditRules(allChildren[0].textContent, allChildren[1].textContent, allChildren[2].textContent, allChildren[3].textContent, allChildren[4].textContent);
    editTaskForm.setAttribute('style', 'width: 17.5%; height: 45%; opacity: 1; pointer-events: auto;');
    filterForm.setAttribute('style', 'width: 0; height: 0; opacity: 0; pointer-events: none;');
    addTaskForm.setAttribute('style', 'width: 0; height: 0; opacity: 0; pointer-events: none;');
    editListener(editedItem);
});

completeButton.addEventListener('click', () => {
    console.log(taskButtonContainer.parentNode);
    const allChildren = taskButtonContainer.parentNode.children;
    completeTask(returnList(), allChildren[0].textContent, allChildren[1].textContent, allChildren[2].textContent, allChildren[3].textContent, allChildren[4].textContent);
    resetDomList();
    cloneList.splice(0, cloneList.length, ...generateDomList(sortDomList(filterDomList(returnList()))));
    console.log(returnList());
});

taskButtonContainer.addEventListener('click', () => {
    taskButtonContainer.parentNode.removeChild(taskButtonContainer);
});

deleteButton.addEventListener('click', () => {
    console.log(taskButtonContainer.parentNode);
    const allChildren = taskButtonContainer.parentNode.children;
    removeTask(returnList(), allChildren[0].textContent, allChildren[1].textContent, allChildren[2].textContent, allChildren[3].textContent, allChildren[4].textContent);
    removeTask(cloneList, allChildren[0].textContent, allChildren[1].textContent, allChildren[2].textContent, allChildren[3].textContent, allChildren[4].textContent);
    resetDomList();
    cloneList.splice(0, cloneList.length, ...generateDomList(sortDomList(filterDomList(returnList()))));
    if(cloneList.length == 0) {
        projectController(returnList());
        homeTab.checked = true;
        cloneList.splice(0, cloneList.length, ...generateDomList(sortDomList(filterDomList(returnList()))));
    }
    console.log(returnList());
});

export {taskButtonContainer, addTaskbuttons, removeTaskButtons}
