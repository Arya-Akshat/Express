const express = require("express");
const { todo } = require("node:test");
const app = express();
const PORT = 3000;

app.use(express.json());

let todos = [
    { id:1 , task: "Learn Express", done: false },
    { id:2 , task: "Build a to-do api", done: false }
];
let nextId = 3;

app.get("/todos", (req, res) => {
    
    res.status(200).json(todos);
});

app.post("/todos", (req, res) => {

    const { task } = req.body;

    if ((!task) || task.trim() === "" ) {
        return res.status(400).json({ error: "Task is required" });
    }

    const newTodo = { id: nextId++, task, done: false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

app.patch("/todos/:id", (req, res) => {
    
    const todoID = parseInt(req.params.id);
    const {done} = req.body;

    const todoToUpdate = todos.find(t => t.id === todoID);

    if(!todoToUpdate) {
        return res.status(404).json({ error: "Task not found" });
    }   
    if ( typeof done === 'boolean')
    {
        todoToUpdate.done = done;
    }
    res.status(200).json(todoToUpdate);

});

app.delete("/todos/:id", (req, res) => {
    const todoID = parseInt(req.params.id);

    const todoIndex = todos.findIndex(t => t.id === todoID);

    if (todoIndex === -1) {
        return res.status(404).json({ error: "Task not found" });
    }
    todos.splice(todoIndex, 1);
    res.status(204).json("Task deleted successfully");
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}
);







