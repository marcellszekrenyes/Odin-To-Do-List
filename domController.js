import {sortDomList} from './sortController.js';
import {tabs, filterRadio} from './filterController.js';

const listHeader = document.getElementById('listHeader');
const domListContainer = document.getElementById('domListContainer');

const addIcon = document.getElementById('addIcon');
const addButton = document.getElementById('addButton');
const addTaskForm = document.getElementById('addTaskForm');
const editTaskForm = document.getElementById('editTaskForm');
const editButton = document.getElementById('editButton');

const filterIcon = document.getElementById('filterIcon');
const filterButton = document.getElementById('filterButton');
const filterForm = document.getElementById('filterForm');

const todayTab = document.getElementById('today');
const sidebarContainer = document.getElementById('sidebarContainer');

const taskButtonContainer = document.createElement('div');
const cloneList = [];

function generateDomList(taskList) {
    for(let i = 0; i <= taskList.length - 1; i++) {
        const listItem = createListItem(taskList[i]);
        if(taskList[i].getIsFinished() == true) {
            listItem.classList.add('finished');
        }
        domListContainer.appendChild(listItem);
    }

    const cloneList = [...taskList];

    return cloneList;
}

function getInput() {
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const project = document.getElementById('project').value;
    const priority = document.getElementById('priority').value;
    const deadline = document.getElementById('deadline').value;
    const input = [name, description, project, priority, deadline];
    return input;
}

function resetDomList() {
    while (domListContainer.hasChildNodes()) {
        domListContainer.removeChild(domListContainer.firstChild);
    }
}

function createListItem(task) {
    const listItem = document.createElement('div');
    const taskName = document.createElement('div');
    const taskDescription = document.createElement('div');
    const taskProject = document.createElement('div');
    const taskPriority = document.createElement('div');
    const taskDeadline = document.createElement('div');

    taskName.textContent = task.getName();
    taskName.setAttribute('class', 'listItem');
    taskDescription.textContent = task.getDescription();
    taskDescription.setAttribute('class', 'listItem');
    taskProject.textContent = task.getProject();
    taskProject.setAttribute('class', 'listItem');
    taskPriority.textContent = task.getPriority();
    taskPriority.setAttribute('class', 'listItem');
    taskDeadline.textContent = task.getDeadline();
    taskDeadline.setAttribute('class', 'listItem');

    listItem.setAttribute('class', 'listTemplate');
    listItem.appendChild(taskName);
    listItem.appendChild(taskDescription);
    listItem.appendChild(taskProject);
    listItem.appendChild(taskPriority);
    listItem.appendChild(taskDeadline);
    return listItem;
}

function setAdditionRules() {
    if(filterRadio.checked == true){
        filterRadio.checked = false;
    }

    let choosenTab = '';
    for(let i = 0; i <= tabs.length - 1; i++) {
        if(tabs[i].checked == true) {
            choosenTab = tabs[i];
        }
    }

    if(choosenTab.value == 'project'){
        document.getElementById('project').value = choosenTab.id;
        document.getElementById('project').placeholder = choosenTab.id;
        document.getElementById('project').value = choosenTab.id;
        document.getElementById('project').disabled = true;


    }

    if(choosenTab.value == 'today'){
        document.getElementById('deadline').value = new Date().toLocaleDateString('fr-ca');
        document.getElementById('deadline').placeholder = new Date().toLocaleDateString('fr-ca');
        document.getElementById('deadline').disabled = true;
    }

    if(choosenTab.value == 'upcoming'){
        let lastDay = new Date();
        lastDay.setDate(lastDay.getDate() + 3);

        document.getElementById('deadline').min = new Date().toLocaleDateString('fr-ca');
        document.getElementById('deadline').max = lastDay.toLocaleDateString('fr-ca');
    }

    if(choosenTab.value == 'weekly'){
        const lastDay = new Date();

        while(lastDay.getDay() != 0){
            lastDay.setDate(lastDay.getDate() + 1);
        }

        document.getElementById('deadline').min = new Date().toLocaleDateString('fr-ca');
        document.getElementById('deadline').max = lastDay.toLocaleDateString('fr-ca');
    }

    if(choosenTab.value == 'monthly'){
        const thisDay = new Date();
        const lastDay = new Date();
    
        while(lastDay.getMonth() == thisDay.getMonth()){
            lastDay.setDate(lastDay.getDate() + 1);
        }
    
        lastDay.setDate(lastDay.getDate() - 1);

        document.getElementById('deadline').min = new Date().toLocaleDateString('fr-ca');
        document.getElementById('deadline').max = lastDay.toLocaleDateString('fr-ca');
    }
}

function resetAdditionRules()  {
        document.getElementById('project').value = '';
        document.getElementById('project').placeholder = '';
        document.getElementById('project').disabled = false;
        document.getElementById('deadline').value = '';
        document.getElementById('deadline').placeholder = '';
        document.getElementById('deadline').disabled = false;
        document.getElementById('deadline').max = '';
}

function setEditRules(name, description, project, priority, deadline) {
    document.getElementById('editName').defaultValue = name;
    document.getElementById('editDescription').defaultValue = description;
    document.getElementById('editProject').defaultValue = project;
    document.getElementById('editPriority').defaultValue = priority;
    document.getElementById('editDeadline').defaultValue = deadline;
}

function resetEditRules() {
    document.getElementById('editName').defaultValue = '';
    document.getElementById('editDescription').defaultValue = '';
    document.getElementById('editProject').defaultValue = '';
    document.getElementById('editPriority').defaultValue = '';
    document.getElementById('editDeadline').defaultValue = '';
}

export {addIcon, addButton, addTaskForm, filterIcon, filterButton, filterForm, todayTab,
    sidebarContainer, editButton, editTaskForm, domListContainer, taskButtonContainer, listHeader, cloneList,
    getInput, generateDomList, resetDomList, sortDomList, createListItem, setAdditionRules, resetAdditionRules, setEditRules, resetEditRules};
