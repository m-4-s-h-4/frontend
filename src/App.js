import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:3000/todos');
    setTodos(response.data);
  };

  const addTodo = async () => {
    if (newTodo !== '') {
      await axios.post('http://localhost:3000/todos', { todo: newTodo });
      fetchTodos();
      setNewTodo('');
    }
  };

  const deleteTodo = async (index) => {
    await axios.delete(`http://localhost:3000/todos/${index}`);
    fetchTodos();
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input
        value={newTodo}
        onChange={e => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => deleteTodo(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
