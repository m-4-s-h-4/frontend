import { useState } from 'react';
import { mutate } from 'swr';

export default function TodoForm() {
    const [newTodo, setNewTodo] = useState('');

    const addTodo = async () => {
        if (newTodo !== '') {
            await fetch('http://localhost:3000/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ todo: newTodo }),
            });
            mutate('http://localhost:3000/todos');
            setNewTodo('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    };

    return (
        <div className="flex">
            <input
                className="flex-grow border border-blue-900 rounded px-3 py-2 mb-2 text-blue-900"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add a new todo"
            />
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded ml-2"
                onClick={addTodo}
            >
                Add
            </button>
        </div>
    );
}
