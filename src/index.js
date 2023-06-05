import {newTask} from './taskController.js';
import {addTask, removeTask, returnList, returnTask} from './taskList.js';
import {addIcon, addButton, addTaskForm, filterIcon, filterButton, filterForm,
    projectContainer, todayTab, weeklyFilter, homeTab, sidebarContainer,  getInput,
    generateDomList, resetDomList, filterDomList, sortDomList, todayFilter, tabController,
    projectController, resetProjectList, createProject, projectFilter, resetRadios, styleProject,
    resetProjectTabs, editTaskForm, editButton, domListContainer, editController, editListener} from './domController.js';

addIcon.addEventListener('click', () => {
    addTaskForm.setAttribute('style', 'width: 17.5%; height: 45%; opacity: 1; pointer-events: auto;');
    filterForm.setAttribute('style', 'width: 0; height: 0; opacity: 0; pointer-events: none;');
    editTaskForm.setAttribute('style', 'width: 0; height: 0; opacity: 0; pointer-events: none;');
});

addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = getInput();
    addTask(newTask(input[0], input[1], input[2], input[3], input[4]));
    resetDomList();
    homeTab.checked = true;
    generateDomList(sortDomList(returnList()));
    projectController(returnList());
    console.log(returnList());
    addTaskForm.setAttribute('style', 'width: 0; height: 0; opacity: 0; pointer-events: none;');
    addTaskForm.reset();
})

addTaskForm.addEventListener('reset', (e) => {
    addTaskForm.setAttribute('style', 'width: 0; height: 0; opacity: 0; pointer-events: none;');
    addTaskForm.reset();
})

domListContainer.addEventListener('click', (e) => {
    const editedItem = e.target.parentNode;
    editTaskForm.setAttribute('style', 'width: 17.5%; height: 45%; opacity: 1; pointer-events: auto;');
    filterForm.setAttribute('style', 'width: 0; height: 0; opacity: 0; pointer-events: none;');
    addTaskForm.setAttribute('style', 'width: 0; height: 0; opacity: 0; pointer-events: none;');
    editListener(editedItem, returnList());
    projectController(returnList());
});

editTaskForm.addEventListener('reset', (e) => {
    editTaskForm.setAttribute('style', 'width: 0; height: 0; opacity: 0; pointer-events: none;');
    editTaskForm.reset();
})

filterForm.addEventListener('reset', (e) => {
    filterForm.setAttribute('style', 'width: 0; height: 0; opacity: 0; pointer-events: none;');
    filterForm.reset();
})

filterIcon.addEventListener('click', () => {
    addTaskForm.setAttribute('style', 'width: 0; height: 0; opacity: 0; pointer-events: none;');
    editTaskForm.setAttribute('style', 'width: 0; height: 0; opacity: 0; pointer-events: none;');
    filterForm.setAttribute('style', 'width: 15%; height: 28%; opacity: 1; pointer-events: auto;');
});

filterButton.addEventListener('click', (e) => {
    e.preventDefault();
    resetDomList();
    resetProjectTabs();
    generateDomList(sortDomList(filterDomList(returnList())));
    console.log(returnList());
    filterForm.setAttribute('style', 'width: 0; height: 0; opacity: 0; pointer-events: none;');
});

// todayTab.addEventListener('click', () => {
//     resetDomList();
//     generateDomList(todayFilter(returnList()));
// });

sidebarContainer.addEventListener('click',  (e) => {
    resetDomList();
    console.log(e.target.name);
    if(e.target.name == 'tabs'){
        projectController(returnList());
    } else{
        resetProjectTabs(); 
    }
    
    tabController(returnList());
});

projectContainer.addEventListener('click', (e) => {
    const filteredProject = e.target.textContent;
    console.log(filteredProject);
    resetRadios();
    resetDomList();
    setTimeout(() => {
        styleProject(e.target);
    }, 1);
    setTimeout((e) => {
    generateDomList(projectFilter(returnList(), filteredProject));
}, 1);
})

