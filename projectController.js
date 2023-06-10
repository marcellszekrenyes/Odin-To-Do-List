const projectContainer = document.getElementById('projectContainer');

function projectController(taskList) {
    resetProjectList();
    const projectList = [];

    for(let i = 0; i <= taskList.length - 1; i++) {
        const nextItem = taskList[i];
        let addProject = true;

        if(i == 0){
            projectList.push(nextItem.getProject());
        }

        if(i >= 1){
            for(let i = 0; i <= projectList.length - 1; i++){
                if(projectList[i] == nextItem.getProject()){
                    addProject = false;
                }
            }

            if(addProject == true){
                projectList.push(nextItem.getProject());
            }
        }
    }

    for(let i = 0; i <= projectList.length-1; i++){
        createProject(projectList[i]);
    }
}

function createProject(projectName) {
    const projectDiv = document.createElement('div');  
    projectDiv.classList.add('sidebarTab');

    const positionerDiv = document.createElement('div');

    const newProject = document.createElement('input');
    newProject.setAttribute('type', 'radio');
    newProject.setAttribute('name', 'tabs');
    newProject.setAttribute('id', `${projectName}`);
    newProject.setAttribute('value', `project`);
    newProject.classList.add('radio');

    const projectLabel = document.createElement('label');
    projectLabel.setAttribute('for', `${projectName}`);
    projectLabel.classList.add('radioLabel');
    projectLabel.textContent = projectName;

    positionerDiv.appendChild(newProject);
    positionerDiv.appendChild(projectLabel);
    projectDiv.appendChild(positionerDiv);
    projectContainer.appendChild(projectDiv);
}

function resetProjectList() {
    while (projectContainer.hasChildNodes()) {
        projectContainer.removeChild(projectContainer.firstChild);
    }
}

export {projectContainer, projectController, resetProjectList};