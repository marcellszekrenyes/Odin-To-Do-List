const task = {

    init: function(name, description, project, priority, deadline) {
        this.name = name;
        this.description = description;
        this.project = project;
        this.priority = priority;
        this.deadline = deadline;
        this.isFinished = false;
        this.date = new Date();
    },

    getName: function(){
        return this.name;
    },

    setName: function(name){
        this.name = name;
    },

    getDescription: function(){
        return this.description;
    },

    setDescription: function(description){
        this.description = description;
    },

    getProject: function(){
        return this.project;
    },

    setProject: function(project){
        this.project = project;
    },

    getPriority: function(){
        return this.priority;
    },

    setPriority: function(priority){
        this.priority = priority;
    },

    getDeadline: function(){
        return this.deadline;
    },

    setDeadline: function(deadline){
        this.deadline = deadline;
    }, 

    getDate: function() {
        return this.date;
    },

    getIsFinished: function() {
        return this.isFinished;
    },

    setIsFinished: function(isFinished) {
        this.isFinished = isFinished;
    }
}

export default task;
