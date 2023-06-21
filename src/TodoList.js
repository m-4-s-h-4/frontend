import useSWR, { mutate } from 'swr';

const fetcher = url => fetch(url).then(res => res.json());

export default function TodoList() {
    const { data: todos, error } = useSWR('http://localhost:3000/todos', fetcher);

    if (error) return <div>Failed</div>;
    if (!todos) return <div>Loading</div>;

    const toggleComplete = async (index) => {
        const updatedTodos = [...todos];
        updatedTodos[index].completed = !updatedTodos[index].completed;
        await fetch(`http://localhost:3000/todos/${index}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ todo: updatedTodos[index] }),
        });
        mutate('http://localhost:3000/todos', updatedTodos);
    };

    const deleteTodo = async (index) => {
        await fetch(`http://localhost:3000/todos/${index}`, {
            method: 'DELETE',
        });
        mutate('http://localhost:3000/todos');
    };

    return (
        <ul className="mt-4">
            {todos.map((todo, index) => (
                <li
                    key={index}
                    className={`flex items-center justify-between py-4 border-b ${todo.completed ? 'line-through' : ''
                        }`}
                >
                    <span>{todo.task}</span>
                    <div>
                        <button
                            className="text-green-500 mr-2"
                            onClick={() => toggleComplete(index)}
                        >
                            Complete
                        </button>
                        <button
                            className="text-red-500"
                            onClick={() => deleteTodo(index)}
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}
