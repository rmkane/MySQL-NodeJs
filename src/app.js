const TodoDao = require("./app/dao/todo");

class TodoApp {
    constructor() {
        this.todoDao = new TodoDao();
    }

    async run() {
        let savedTodo = await this.todoDao.saveEntity({
            title: "Read a book of JS",
            completed: 0
        });
        console.log("Saving todo --> ", savedTodo)

        savedTodo.completed = 1;
        let isUpdated = await this.todoDao.updateEntity(savedTodo);
        console.log("Was it updated --> ", isUpdated);

        let todoList = await this.todoDao.readEntities();
        console.log("List of todo --> ", todoList);

        let isDeleted = await this.todoDao.deleteEntity(savedTodo.id);
        console.log("Was it deleted --> ", isDeleted)

        let isReset = await this.todoDao.truncateAndResetTable();
        console.log("Was table reset --> ", isReset)
    }
}

module.exports = TodoApp;