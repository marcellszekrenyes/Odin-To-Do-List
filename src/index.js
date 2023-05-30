import {newTask} from './taskController.js';
import {addTask, removeTask, returnList, returnTask} from './taskList.js';
import {addIcon, addButton, addTaskForm, filterIcon, filterButton, filterForm, todayTab, homeTab,  getInput, generateDomList, resetDomList, filterDomList, sortDomList, todayFilter} from './domController.js';



addIcon.addEventListener('click', () => {
    addTaskForm.setAttribute('style', 'width: 15%; height: 30%; opacity: 1; pointer-events: auto;');
    filterForm.setAttribute('style', 'width: 0; height: 0; opacity: 0; pointer-events: none;');
})

homeTab.addEventListener('click', (e) => {
    e.preventDefault();
    resetDomList();
    generateDomList(sortDomList(returnList()));
    console.log(returnList());
});

addButton.addEventListener('click', (e) => {
    e.preventDefault();
    const input = getInput();
    addTask(newTask(input[0], input[1], input[2], input[3], input[4]));
    resetDomList();
    generateDomList(sortDomList(returnList()));
    console.log(returnList());
    addTaskForm.setAttribute('style', 'width: 0; height: 0; opacity: 0; pointer-events: none;');
});

filterIcon.addEventListener('click', () => {
    addTaskForm.setAttribute('style', 'width: 0; height: 0; opacity: 0; pointer-events: none;');
    filterForm.setAttribute('style', 'width: 15%; height: 25%; opacity: 1; pointer-events: auto;');
})

filterButton.addEventListener('click', (e) => {
    e.preventDefault();
    resetDomList();
    generateDomList(sortDomList(filterDomList(returnList())));
    console.log(returnList());
    filterForm.setAttribute('style', 'width: 0; height: 0; opacity: 0; pointer-events: none;');
})

todayTab.addEventListener('click', () => {
    resetDomList();
    generateDomList(todayFilter(returnList()));
})