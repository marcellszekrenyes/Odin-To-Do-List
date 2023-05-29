const task = {
    isFinished: false,
    date: new Date(),

    init: function(name, description, category, priority, deadline) {
        this.name = name;
        this.description = description;
        this.category = category;
        this.priority = priority;
        this.deadline = deadline;
    },

    getName: function(){
        return this.name;
    },

    setName: function(){
        this.name = name;
    },

    getDescription: function(){
        return this.description;
    },

    setDescription: function(description){
        this.description = description;
    },

    getCategory: function(){
        return this.category;
    },

    setCategory: function(){
        this.category = category;
    },

    getPriority: function(){
        return this.priority;
    },

    setPriority: function(){
        this.priority = priority;
    },

    getDeadline: function(){
        return this.deadline;
    },

    setDeadline: function(){
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
