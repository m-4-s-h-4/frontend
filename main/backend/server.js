const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let todos = [];

app.use(cors({ origin: 'http://localhost:3001' }));

app.get('/todos', (req, res) => {
    res.json(todos);
});

app.post('/todos', (req, res) => {
    const todo = {
        task: req.body.todo,
        completed: false
    };
    todos.push(todo);
    res.json({ message: 'Todo created successfully', data: todos });
});

app.put('/todos/:index', (req, res) => {
    const index = req.params.index;
    const updatedTodo = req.body.todo;

    if (index >= todos.length || index < 0) {
        res.status(404).json({ message: 'Todo not found' });
    } else {
        todos[index] = updatedTodo;
        res.json({ message: 'Todo updated successfully', data: todos });
    }
});

app.delete('/todos/:index', (req, res) => {
    const index = req.params.index;

    if (index >= todos.length || index < 0) {
        res.status(404).json({ message: 'Todo not found' });
    } else {
        todos.splice(index, 1);
        res.json({ message: 'Todo deleted successfully', data: todos });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
