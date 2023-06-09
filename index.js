import {newTask, addTask, returnList, createTestList} from './taskList.js';
import {addTaskbuttons, taskButtonContainer} from './taskController.js';
import {homeTab, filterDomList, filterRadio} from './filterController.js';
import {addIcon, addTaskForm, filterIcon, filterButton, filterForm,
    sidebarContainer, getInput, generateDomList, resetDomList, sortDomList,
    editTaskForm, domListContainer, listHeader, cloneList, createListItem, setAdditionRules, resetAdditionRules} from './domController.js';
    import {projectController} from './projectController.js';

createTestList();
resetDomList();
homeTab.checked = true;
cloneList.splice(0, cloneList.length, ...generateDomList(sortDomList(returnList())));
projectController(returnList());

addIcon.addEventListener('click', () => { 
    filterForm.setAttribute('style', 'width: 0; height: 0; opacity: 0; pointer-events: none;');
    editTaskForm.setAttribute('style', 'width: 0; height: 0; opacity: 0; pointer-events: none;');
    setAdditionRules();
    addTaskForm.setAttribute('style', 'width: 17.5%; height: 45%; opacity: 1; pointer-events: auto;');
    addIcon.setAttribute('style', 'background-color: #c3f1ec; border: 3px solid #37BEB0;')
});

addTaskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = getInput();
    domListContainer.appendChild(createListItem(addTask(newTask(input[0], input[1], input[2], input[3], input[4]))));
    resetDomList();
    cloneList.splice(0, cloneList.length, ...generateDomList(sortDomList(filterDomList(returnList()))));
    projectController(returnList());
    console.log(returnList());
    addTaskForm.setAttribute('style', 'width: 0; height: 0; opacity: 0; pointer-events: none;');
    addIcon.setAttribute('style', 'background-color: #dbf7f4;')
    addTaskForm.reset();
    resetAdditionRules();
})

addTaskForm.addEventListener('reset', (e) => {
    addTaskForm.setAttribute('style', 'width: 0; height: 0; opacity: 0; pointer-events: none;');
    addIcon.setAttribute('style', 'background-color: #dbf7f4;')
    addTaskForm.reset();
    resetAdditionRules();
})

domListContainer.addEventListener('mouseover', (e) => {
    if(e.target.parentNode.classList.contains('listTemplate')){
        console.log(e.target.parentNode);
        addTaskbuttons(e.target.parentNode);
    }

    if(e.target.classList.contains('listTemplate')){
        console.log(e.target);
        addTaskbuttons(e.target);
    }
});

domListContainer.addEventListener('mouseleave', () => {
        if(taskButtonContainer.parentNode != null) {
            taskButtonContainer.parentNode.removeChild(taskButtonContainer);
        }
});

editTaskForm.addEventListener('reset', () => {
    editTaskForm.setAttribute('style', 'width: 0; height: 0; opacity: 0; pointer-events: none;');
    resetDomList();
    resetProjectTabs();
    cloneList.splice(0, cloneList.length, ...generateDomList(sortDomList(returnList())));
    editTaskForm.reset();
})

filterForm.addEventListener('reset', (e) => {
    filterForm.setAttribute('style', 'width: 0; height: 0; opacity: 0; pointer-events: none;');
    filterIcon.setAttribute('style', 'background-color: #dbf7f4;')
    resetDomList();
    cloneList.splice(0, cloneList.length, ...generateDomList(sortDomList(filterDomList(returnList()))));
    filterForm.reset();
})

//opens filter form
filterIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    addTaskForm.setAttribute('style', 'width: 0; height: 0; opacity: 0; pointer-events: none;');
    editTaskForm.setAttribute('style', 'width: 0; height: 0; opacity: 0; pointer-events: none;');


    if(filterRadio.checked == false) {
        filterForm.setAttribute('style', 'width: 15%; height: 28%; opacity: 1; pointer-events: auto;');
        filterIcon.setAttribute('style', 'background-color: #c3f1ec; border: 3px solid #37BEB0;')
    }

    if(filterRadio.checked == true){
        filterRadio.checked = false;
        filterIcon.setAttribute('style', 'background-color: #dbf7f4;')
        console.log('filterRadio got unchecked');
        resetDomList();
        cloneList.splice(0, cloneList.length, ...generateDomList(sortDomList(filterDomList(returnList()))));
    }

    
});

//submits filter form
filterButton.addEventListener('click', (e) => {
    e.preventDefault();
    resetDomList();
    filterRadio.checked = true;
    cloneList.splice(0, cloneList.length, ...generateDomList(sortDomList(filterDomList(returnList()))));
    console.log(returnList());
    filterForm.setAttribute('style', 'width: 0; height: 0; opacity: 0; pointer-events: none;');
});

sidebarContainer.addEventListener('click', (e) => {
    resetDomList();
    console.log(e.target.name);
    cloneList.splice(0, cloneList.length, ...generateDomList(sortDomList(filterDomList(returnList()))));
});

listHeader.addEventListener('click', (e) => {
    if((e.target != document.getElementById('addLogo')) && (e.target != filterIcon)){
        console.log('listHeader clicked, target:');
        console.log(e.target);
        resetDomList();
        generateDomList(sortDomList(cloneList));
        console.log('cloneList sorted and displayed');
    }
}, true);

