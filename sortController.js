const sort = document.getElementsByName('sort');

function sortDomList(taskList) {
    if(taskList == undefined){
        console.log('undefined');
        return;
    }

    for(let i = 0; i <= sort.length-1; i++) {
        if(sort[i].checked == true) {
            console.log(sort[i].value);
            if(sort[i].value == 'deadline') {
                const sortedTaskList = sortByDeadline(taskList);
                return sortedTaskList;
            }

            if(sort[i].value == 'priority'){
                const sortedTaskList = sortByPriority(taskList);
                return sortedTaskList;
            }

            if(sort[i].value == 'project'){
                const sortedTaskList = sortByProject(taskList);
                return sortedTaskList;
            }
        }
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

function sortByProject(taskList) {
    const sortedTaskList = [];
    for(let i = 0; i <= taskList.length - 1; i++) {
        const nextItem = taskList[i];
            
        if(i == 0){
            sortedTaskList.push(nextItem);
        }

        if(i >= 1) {
            for(let j = 0; j <= sortedTaskList.length - 1; j++){
                if(nextItem.getProject() <= sortedTaskList[j].getProject()){
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

                if(sortedTaskList.length - 1 == j){
                    sortedTaskList.push(nextItem);
                    break;
                }
            }
        }
    }

    return sortedTaskList;
}

export {sortDomList};