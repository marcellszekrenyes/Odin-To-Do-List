

const listContainer = document.getElementById('listContainer');
const domListContainer = document.getElementById('domListContainer');

const addIcon = document.getElementById('addIcon');
const addButton = document.getElementById('addButton');
const addTaskForm = document.getElementById('addTaskForm');

const filterIcon = document.getElementById('filterIcon');
const filterButton = document.getElementById('filterButton');
const filterForm = document.getElementById('filterForm');

const lowPriority = document.getElementById('lowPriority');
const mediumPriority = document.getElementById('mediumPriority');
const highPriority = document.getElementById('highPriority');

const deadlineFilter = document.getElementById('deadlineFilter');
const categoryFilter = document.getElementById('categoryFilter');

const deadline = document.getElementById('deadline');
deadline.min =  new Date().toLocaleDateString('fr-ca');
deadlineFilter.min = new Date().toLocaleDateString('fr-ca');

const sort = document.getElementsByName('sort');
// const deadlineRadio = document.getElementById('deadlineRadio');
// const priorityRadio = document.getElementById('priorityRadio');
// const categoryRadio = document.getElementById('categoryRadio');

function generateDomList(taskList) {
    for(let i = 0; i <= taskList.length - 1; i++) {
        const listItem = createListItem(taskList[i]);
        domListContainer.appendChild(listItem);
    }
}

function getInput() {
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const priority = document.getElementById('priority').value;
    const deadline = document.getElementById('deadline').value;
    const input = [name, description, category, priority, deadline];
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
    const taskCategory = document.createElement('div');
    const taskPriority = document.createElement('div');
    const taskDeadline = document.createElement('div');

    taskName.textContent = task.getName();
    taskDescription.textContent = task.getDescription();
    taskCategory.textContent = task.getCategory();
    taskPriority.textContent = task.getPriority();
    taskDeadline.textContent = task.getDeadline();

    listItem.setAttribute('style', 'display: grid; gap: 5%; grid-template-columns: 1fr 3fr 1fr 1fr 1fr;');
    listItem.appendChild(taskName);
    listItem.appendChild(taskDescription);
    listItem.appendChild(taskCategory);
    listItem.appendChild(taskPriority);
    listItem.appendChild(taskDeadline);
    return listItem;
}

function filterDomList(taskList) {
    const filteredList = [];

    //Filters based on priority selections
    for(let i = 0; i <= taskList.length - 1; i++) {
        if(lowPriority.checked == true && taskList[i].getPriority() == 'Low' ||
           mediumPriority.checked == true && taskList[i].getPriority() == 'Medium' ||
           highPriority.checked == true && taskList[i].getPriority() == 'High') {
                filteredList.push(taskList[i]);
        }
    }

    //Filters based on selected deadline
    for(let i = 0; i <= filteredList.length - 1; i++) {
        if(deadlineFilter.value < filteredList[i].getDeadline()) {
            filteredList.splice(i, 1);
            i--;
        }
    }

    return filteredList;
}

function sortDomList(taskList) {
    let sortByValue = "";
    const orderedTaskList = [];
    
    if(taskList == undefined){
        console.log('undefined');
        return;
    }

    for(let i = 0; i <= sort.length-1; i++) {
        if(sort[i].checked == true) {
            sortByValue = sort[i].value;
        }
    }

    if(sortByValue == 'deadline') {
        for(let i = 0; i <= taskList.length - 1; i++) {
            const nextItem = taskList[i];
            
            if(i == 0){
                orderedTaskList.push(nextItem);
            }

            if(i >= 1) {
                for(let j = 0; j <= orderedTaskList.length - 1; j++){
                    if(nextItem.getDeadline() <= orderedTaskList[j].getDeadline()){
                        if(nextItem.getPriority() == 'High'){
                            orderedTaskList.splice(j, 0, nextItem);
                            break;
                        }
                        if(nextItem.getPriority() == 'Medium' && (orderedTaskList[j].getPriority() == 'Medium' || orderedTaskList[j].getPriority() == 'Low')){
                            orderedTaskList.splice(j, 0, nextItem);
                            break;
                        }
                        if(nextItem.getPriority() == 'Low' && orderedTaskList[j].getPriority() == 'Low'){
                            orderedTaskList.splice(j, 0, nextItem);
                            break;
                        }
                    }

                    if(orderedTaskList.length - 1 == j){
                        orderedTaskList.push(nextItem);
                        break;
                    }
                }
            }

        }
    }

    if(sortByValue == 'priority'){
        for(let i = 0; i <= taskList.length - 1; i++) {
            const nextItem = taskList[i];
            
            if(i == 0){
                orderedTaskList.push(nextItem);
            }

            if(i >= 1) {
                for(let j = 0; j <= orderedTaskList.length - 1; j++){
                    if(nextItem.getPriority() == 'High' && orderedTaskList[j].getPriority() == 'High'){
                        if(nextItem.getDeadline() <= orderedTaskList[j].getDeadline()){
                            orderedTaskList.splice(j, 0, nextItem);
                            break;
                        }
                    }

                    if(nextItem.getPriority() == 'High' && orderedTaskList[j].getPriority() != 'High'){
                        orderedTaskList.splice(j, 0, nextItem);
                        break;
                    }

                    if(nextItem.getPriority() == 'Medium' && orderedTaskList[j].getPriority() == 'Medium'){
                        if(nextItem.getDeadline() <= orderedTaskList[j].getDeadline()){
                            orderedTaskList.splice(j, 0, nextItem);
                            break;
                        }
                    }

                    if(nextItem.getPriority() == 'Medium' && orderedTaskList[j].getPriority() == 'Low'){
                            orderedTaskList.splice(j, 0, nextItem);
                            break;
                    }

                    if(nextItem.getPriority() == 'Low'){
                        if(nextItem.getDeadline() <= orderedTaskList[j].getDeadline()){
                            orderedTaskList.splice(j, 0, nextItem);
                            break;
                        }
                    }

                    if(orderedTaskList.length - 1 == j){
                        orderedTaskList.push(nextItem);
                        break;
                    }
                }
            }

        }
    }

    return orderedTaskList;
}

export {addIcon, addButton, addTaskForm, filterIcon, filterButton, filterForm, getInput, generateDomList, resetDomList, filterDomList, sortDomList};
