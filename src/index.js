import {newTask, addTask, returnList} from './taskList.js';
import {addTaskbuttons, taskButtonContainer} from './taskController.js';
import {addIcon, addTaskForm, filterIcon, filterButton, filterForm,
    projectContainer, homeTab, sidebarContainer,  getInput,
    generateDomList, resetDomList, filterDomList, sortDomList, tabController,
    projectController, projectFilter, resetRadios, styleProject,
    resetProjectTabs, editTaskForm, domListContainer} from './domController.js';

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

domListContainer.addEventListener('mouseover', (e) => {
    if(e.target.parentNode.classList.contains('listTemplate')){
        console.log(e.target.parentNode);
        addTaskbuttons(e.target.parentNode);
        console.log('1');
    }

    if(e.target.classList.contains('listTemplate')){
        console.log(e.target);
        addTaskbuttons(e.target);
        console.log('2');
    }
});

domListContainer.addEventListener('mouseleave', () => {
        if(taskButtonContainer.parentNode != null) {
            taskButtonContainer.parentNode.removeChild(taskButtonContainer);
            console.log('3');
        }
});

editTaskForm.addEventListener('reset', () => {
    editTaskForm.setAttribute('style', 'width: 0; height: 0; opacity: 0; pointer-events: none;');
    resetDomList();
    resetProjectTabs();
    generateDomList(sortDomList(returnList()));
    editTaskForm.reset();
})

filterForm.addEventListener('reset', (e) => {
    filterForm.setAttribute('style', 'width: 0; height: 0; opacity: 0; pointer-events: none;');
    resetDomList();
    resetProjectTabs();
    generateDomList(sortDomList(filterDomList(returnList())));
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
