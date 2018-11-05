const TodoDao = require("./Dao/TodoDao");
const todoDao = new TodoDao();

const app = async () => {
    let savedTodo = await todoDao.saveEntity({
        title: "Read a book of JS",
        completed: 0
    });
    console.log("Saved todo --> ", savedTodo)

    savedTodo.completed = 1;
    let isUpdated = await todoDao.updateEntity(savedTodo);
    console.log("Is it updated --> ", isUpdated);

    let todoList = await todoDao.readEntities();
    console.log("List of todo --> ", todoList);

    let isDeleted = await todoDao.deleteEntity(savedTodo.id);
    console.log("Is it deleted --> ", isDeleted)
}

app();