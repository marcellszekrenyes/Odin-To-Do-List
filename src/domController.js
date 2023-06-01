
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
const priorityFilter = document.getElementById('priorityFilter');

const todayTab = document.getElementById('today');
const homeTab = document.getElementById('home');
const sidebarContainer = document.getElementById('sidebarContainer');

const deadline = document.getElementById('deadline');
deadline.min =  new Date().toLocaleDateString('fr-ca');
deadlineFilter.min = new Date().toLocaleDateString('fr-ca');

const sort = document.getElementsByName('sort');
const tabs = document.getElementsByName('tabs');

function generateDomList(taskList) {
    for(let i = 0; i <= taskList.length - 1; i++) {
        const listItem = createListItem(taskList[i]);
        domListContainer.appendChild(listItem);
    }
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
    taskDescription.textContent = task.getDescription();
    taskProject.textContent = task.getProject();
    taskPriority.textContent = task.getPriority();
    taskDeadline.textContent = task.getDeadline();

    listItem.setAttribute('style', 'display: grid; gap: 5%; grid-template-columns: 1fr 3fr 1fr 1fr 1fr;');
    listItem.appendChild(taskName);
    listItem.appendChild(taskDescription);
    listItem.appendChild(taskProject);
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
        const sortedTaskList = sortByDeadline(taskList);
        return sortedTaskList;
    }

    
    if(sortByValue == 'priority'){
        const sortedTaskList = sortByPriority(taskList);
        return sortedTaskList;
    }

}

function sortByPriority(taskList) {
    const sortedTaskList = [];
    for(let i = 0; i <= taskList.length - 1; i++) {
        const nextItem = taskList[i];
          
        if(i == 0){
            sortedTaskList.push(nextItem);
        }

        if(i >= 1) {
            for(let j = 0; j <= sortedTaskList.length - 1; j++){
                if(nextItem.getPriority() == 'High' && sortedTaskList[j].getPriority() == 'High'){
                    if(nextItem.getDeadline() <= sortedTaskList[j].getDeadline()){
                        sortedTaskList.splice(j, 0, nextItem);
                        break;
                    }
                }

                if(nextItem.getPriority() == 'High' && sortedTaskList[j].getPriority() != 'High'){
                    sortedTaskList.splice(j, 0, nextItem);
                    break;
                }

                if(nextItem.getPriority() == 'Medium' && sortedTaskList[j].getPriority() == 'Medium'){
                    if(nextItem.getDeadline() <= sortedTaskList[j].getDeadline()){
                        sortedTaskList.splice(j, 0, nextItem);
                        break;
                    }
                }

                if(nextItem.getPriority() == 'Medium' && sortedTaskList[j].getPriority() == 'Low'){
                    sortedTaskList.splice(j, 0, nextItem);
                        break;
                }

                if(nextItem.getPriority() == 'Low' && sortedTaskList[j].getPriority() == 'Low'){
                    if(nextItem.getDeadline() <= sortedTaskList[j].getDeadline()){
                        sortedTaskList.splice(j, 0, nextItem);
                        break;
                    }
                }

                if(sortedTaskList.length - 1 == j){
                    sortedTaskList.push(nextItem);
                    break;
                }
            }
        }

    }

    return sortedTaskList;
}        

function sortByDeadline(taskList) {
    const sortedTaskList = [];
    for(let i = 0; i <= taskList.length - 1; i++) {
        const nextItem = taskList[i];
            
        if(i == 0){
            sortedTaskList.push(nextItem);
        }    

        if(i >= 1) {
            for(let j = 0; j <= sortedTaskList.length - 1; j++){
                if(nextItem.getDeadline() <= sortedTaskList[j].getDeadline()){
                    if(nextItem.getPriority() == 'High'){
                        sortedTaskList.splice(j, 0, nextItem);
                        break;
                    }

                    if(nextItem.getPriority() == 'Medium' && (sortedTaskList[j].getPriority() == 'Medium' || sortedTaskList[j].getPriority() == 'Low')){
                        sortedTaskList.splice(j, 0, nextItem);
                        break;
                    }

                    if(nextItem.getPriority() == 'Low' && sortedTaskList[j].getPriority() == 'Low'){
                        sortedTaskList.splice(j, 0, nextItem);
                        break;
                    }
                }

                if(sortedTaskList.length - 1 == j){
                    sortedTaskList.push(nextItem);
                    break;
                }
            }
        }    
    }

    return sortedTaskList;
}

function todayFilter(taskList) {
    const filteredList = [];
    const orderedAndFilteredList = [];
    const todaysDate = new Date().toLocaleDateString('fr-ca');

    for(let i = 0; i <= taskList.length - 1; i++) {
        console.log(todaysDate);
        console.log(taskList[i].getDeadline());
        if(todaysDate == taskList[i].getDeadline()) {
            filteredList.push(taskList[i]);
        }
    }

    for(let i = 0; i <= filteredList.length - 1; i++) {
        const nextItem = filteredList[i];
        
        if(i == 0){
            orderedAndFilteredList.push(nextItem);
        }

        if(i >= 1) {
            for(let j = 0; j <= orderedAndFilteredList.length - 1; j++){
                if(nextItem.getDeadline() <= orderedAndFilteredList[j].getDeadline()){
                    if(nextItem.getPriority() == 'High'){
                        orderedAndFilteredList.splice(j, 0, nextItem);
                        break;
                    }
                    if(nextItem.getPriority() == 'Medium' && (orderedAndFilteredList[j].getPriority() == 'Medium' || orderedAndFilteredList[j].getPriority() == 'Low')){
                        orderedAndFilteredList.splice(j, 0, nextItem);
                        break;
                    }
                    if(nextItem.getPriority() == 'Low' && orderedAndFilteredList[j].getPriority() == 'Low'){
                        orderedAndFilteredList.splice(j, 0, nextItem);
                        break;
                    }
                }

                if(orderedAndFilteredList.length - 1 == j){
                    orderedAndFilteredList.push(nextItem);
                    break;
                }
            }
        }

    }

    return orderedAndFilteredList;
}

//Later make a module from this function!!
function tabController(taskList) {
    let choosenTab = "";
    
    if(taskList == undefined){
        console.log('undefined');
        return;
    }

    for(let i = 0; i <= sort.length-1; i++) {
        if(tabs[i].checked == true) {
            choosenTab = tabs[i].value;
        }
    }

    switch(choosenTab) {
        case 'home':
            generateDomList(taskList);
            break;
        case 'today':
            generateDomList(todayFilter(taskList));
            break;
        // case 'upcoming':
        //     // code block
        //     break;
        // default:

        //     // code block
      }
}
export {addIcon, addButton, addTaskForm, filterIcon, filterButton, filterForm, todayTab, homeTab, sidebarContainer, getInput, generateDomList, resetDomList, filterDomList, sortDomList, todayFilter, tabController};
