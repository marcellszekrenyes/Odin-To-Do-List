const tabs = document.getElementsByName('tabs');
const homeTab = document.getElementById('homeRadio');
const deadline = document.getElementById('deadline');
const deadlineFilter = document.getElementById('deadlineFilter');
const filterRadio = document.getElementById('filterRadio');

deadline.min =  new Date().toLocaleDateString('fr-ca');
deadlineFilter.min = new Date().toLocaleDateString('fr-ca');
let filterCount = 0;

function filterDomList(taskList) {
    const filteredList = [];
    let choosenTab  = '';
    
    //Filters based on priority selections
    for(let i = 0; i <= taskList.length - 1; i++) {
        if(lowPriority.checked == true && taskList[i].getPriority() == 'Low' ||
        mediumPriority.checked == true && taskList[i].getPriority() == 'Medium' ||
        highPriority.checked == true && taskList[i].getPriority() == 'High') {
            filteredList.push(taskList[i]);
        }
    }

    for(let i = 0; i <= tabs.length - 1; i++) {
        if(tabs[i].checked == true) {
            choosenTab = tabs[i];
        }
    }    

    if(filterRadio.checked == true){
        console.log('checked');
        //Filters based on selected deadline
        if(choosenTab.value == 'home' || choosenTab.value == 'project') {
            for(let i = 0; i <= filteredList.length - 1; i++) {
                console.log('deadlineFilter.value:');
                console.log(deadlineFilter.value);
                if(deadlineFilter.value < filteredList[i].getDeadline()){
                    filteredList.splice(i, 1);
                    i--;
                }
            }
        }
    }

    filteredList.splice(0, filteredList.length, ...tabController(filteredList));
    return filteredList;
}

function todayFilter(taskList) {
    const filteredList = [];
    // const orderedAndFilteredList = [];
    const todaysDate = new Date().toLocaleDateString('fr-ca');

    for(let i = 0; i <= taskList.length - 1; i++) {
        console.log(todaysDate);
        console.log(taskList[i].getDeadline());
        if(todaysDate == taskList[i].getDeadline()) {
            filteredList.push(taskList[i]);
        }
    }
    return filteredList;
}

function upcomingFilter(taskList) {
    const filteredList = [];
    // const orderedAndFilteredList = [];

    const lastDay = new Date();
    lastDay.setDate(lastDay.getDate() + 3);

    for(let i = 0; i <= taskList.length - 1; i++) {
        if(lastDay.toLocaleDateString('fr-ca') >= taskList[i].getDeadline()) {
            filteredList.push(taskList[i]);
        }
    }

    return filteredList;
}

function weeklyFilter(taskList) {
    const filteredList = [];

    const lastDay = new Date();

    while(lastDay.getDay() != 0){
        lastDay.setDate(lastDay.getDate() + 1);
    }

    for(let i = 0; i <= taskList.length - 1; i++) {
        if(lastDay.toLocaleDateString('fr-ca') >= taskList[i].getDeadline()) {
            filteredList.push(taskList[i]);
        }
    }

    return filteredList;
}

function monthlyFilter(taskList) {
    const filteredList = [];

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

    return filteredList;
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

function tabController(taskList) {
    let choosenTab = "";
    
    if(taskList == undefined){
        console.log('undefined');
        return;
    }

    for(let i = 0; i <= tabs.length - 1; i++) {
        if(tabs[i].checked == true) {
            choosenTab = tabs[i];
        }
    }

    switch(choosenTab.value) {
        case 'home':
            console.log('home');
            return taskList;
        case 'today':
            console.log('today');
            return todayFilter(taskList);
        case 'upcoming':
            console.log('upcoming');
            return upcomingFilter(taskList);
        case 'weekly':
            console.log('weekly');
            return weeklyFilter(taskList);
        case 'monthly':
            console.log('monthly');
            return monthlyFilter(taskList);
        case 'project':
            console.log('project');
            return projectFilter(taskList, choosenTab.id)
    }
}

function resetRadios() {
    for(let i = 0; i <= tabs.length - 1; i++) {
        if(tabs[i].checked == true) {
            tabs[i].checked = false;
        }
    }
}

function getFilterCount() {
    return filterCount;
}

export {homeTab, filterRadio, tabs, filterDomList, resetRadios, getFilterCount}

