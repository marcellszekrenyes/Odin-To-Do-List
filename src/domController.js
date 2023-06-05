const listContainer = document.getElementById('listContainer');
const domListContainer = document.getElementById('domListContainer');

const addIcon = document.getElementById('addIcon');
const addButton = document.getElementById('addButton');
const addTaskForm = document.getElementById('addTaskForm');
const editTaskForm = document.getElementById('editTaskForm');
const editButton = document.getElementById('editButton');

const filterIcon = document.getElementById('filterIcon');
const filterButton = document.getElementById('filterButton');
const filterForm = document.getElementById('filterForm');

const lowPriority = document.getElementById('lowPriority');
const mediumPriority = document.getElementById('mediumPriority');
const highPriority = document.getElementById('highPriority');

const deadlineFilter = document.getElementById('deadlineFilter');
const priorityFilter = document.getElementById('priorityFilter');

const todayTab = document.getElementById('today');
const homeTab = document.getElementById('homeRadio');
const sidebarContainer = document.getElementById('sidebarContainer');
const projectContainer = document.getElementById('projectContainer');

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

function upcomingFilter(taskList) {
    const filteredList = [];
    const orderedAndFilteredList = [];

    const lastDay = new Date();
    lastDay.setDate(lastDay.getDate() + 3);

    for(let i = 0; i <= taskList.length - 1; i++) {
        if(lastDay.toLocaleDateString('fr-ca') >= taskList[i].getDeadline()) {
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

function weeklyFilter(taskList) {
    const filteredList = [];
    const orderedAndFilteredList = [];
    //const todaysDate = new Date().toLocaleDateString('fr-ca');

    const lastDay = new Date();

    while(lastDay.getDay() != 0){
        lastDay.setDate(lastDay.getDate() + 1);
    }

    for(let i = 0; i <= taskList.length - 1; i++) {
        if(lastDay.toLocaleDateString('fr-ca') >= taskList[i].getDeadline()) {
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

function monthlyFilter(taskList) {
    const filteredList = [];
    const orderedAndFilteredList = [];
    //const todaysDate = new Date().toLocaleDateString('fr-ca');

    const thisDay = new Date();
    const lastDay = new Date();

    while(lastDay.getMonth() == thisDay.getMonth()){
        lastDay.setDate(lastDay.getDate() + 1);
    }

    lastDay.setDate(lastDay.getDate() - 1);

    for(let i = 0; i <= taskList.length - 1; i++) {
        if(lastDay.toLocaleDateString('fr-ca') >= taskList[i].getDeadline()) {
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

function projectController(taskList) {
    resetProjectList();
    const projectList = [];

    for(let i = 0; i <= taskList.length - 1; i++) {
        const nextItem = taskList[i];

        if(i == 0){
            projectList.push(nextItem.getProject());
        }

        if(i >= 1){
            if(projectList.includes(nextItem.getProject())){
                continue;
            } else {
                projectList.push(nextItem.getProject());
            }
        }
    }

    for(let i = 0; i <= projectList.length-1; i++){
        createProject(projectList[i]);
    }
}

function createProject(projectName) {
    const newProject = document.createElement('div');
    newProject.textContent = projectName;
    newProject.classList.add('projectTab');
    projectContainer.appendChild(newProject);
}

function resetProjectList() {
    while (projectContainer.hasChildNodes()) {
        projectContainer.removeChild(projectContainer.firstChild);
    }
}

function projectFilter(taskList, projectName) {
    const filteredList = [];
    const orderedAndFilteredList = [];

    for(let i = 0; i <= taskList.length - 1; i++) {
        if(projectName == taskList[i].getProject()) {
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

function styleProject(project) {
    resetProjectTabs();
    project.setAttribute('style', 'background-color: #e9edf5');
}

function resetProjectTabs() {
    const allProjects = projectContainer.children;
    for(let i = 0; i < allProjects.length; i++ ){
        allProjects[i].setAttribute('style', 'background-color: #ffffff');
    }
}

//Later make a module from this function!!
function tabController(taskList) {
    let choosenTab = "";
    
    if(taskList == undefined){
        console.log('undefined');
        return;
    }

    for(let i = 0; i <= tabs.length - 1; i++) {
        if(tabs[i].checked == true) {
            choosenTab = tabs[i].value;
        }
    }

    switch(choosenTab) {
        case 'home':
            console.log('home');
            generateDomList(taskList);
            break;
        case 'today':
            console.log('today');
            generateDomList(todayFilter(taskList));
            break;
        case 'upcoming':
            console.log('upcoming');
            generateDomList(upcomingFilter(taskList));
            break;
        case 'weekly':
            console.log('weekly');
            generateDomList(weeklyFilter(taskList));
            break;
        case 'monthly':
            console.log('monthly');
            generateDomList(monthlyFilter(taskList));
            break;
        // case 'project':
        //     console.log('project');
        //     resetProjectList();
        //     projectController(taskList);
        //     break;
        // default:

        //     // code block
    }
}

function resetRadios() {
    for(let i = 0; i <= tabs.length - 1; i++) {
        if(tabs[i].checked == true) {
            tabs[i].checked = false;
        }
    }
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

function editTask(task, name, description, project, priority, deadline) {
    task.setName(name);
    task.setDescription(description);
    task.setProject(project);
    task.setPriority(priority);
    task.setDeadline(deadline);
}

function editListener(editedItem, returnList) {
    const allChildren = editedItem.children;
    editTaskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        editController(returnList, allChildren[0].textContent, allChildren[1].textContent, allChildren[2].textContent, allChildren[3].textContent, allChildren[4].textContent);
        resetDomList();
        homeTab.checked = true;
        generateDomList(sortDomList(returnList));
        projectController(returnList);
        console.log(returnList);
        editTaskForm.setAttribute('style', 'width: 0; height: 0; opacity: 0; pointer-events: none;');
        editTaskForm.reset();
    }, {once: true});
}

export {tabs, addIcon, addButton, addTaskForm, filterIcon, filterButton, filterForm, todayTab, homeTab, sidebarContainer, projectContainer, editButton, editTaskForm, domListContainer, resetProjectTabs, styleProject, getInput, generateDomList, resetDomList, filterDomList, sortDomList, todayFilter, weeklyFilter, tabController, projectController, resetProjectList, createProject, projectFilter, resetRadios, editController, editListener};
