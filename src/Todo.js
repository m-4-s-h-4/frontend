import TodoList from './TodoList';
import TodoForm from './TodoForm';

export default function Todo() {
    return (
        <div className="Todo max-w-md mx-auto flex flex-col h-screen bg-blue-900 text-white">
            <div className="flex-grow">
                <div className="sticky top-0 bg-blue-900 py-4">
                    <h1 className="text-4xl font-bold mb-4">To Do List</h1>
                </div>
                <TodoList />
            </div>
            <div className="bg-blue-900 p-4">
                <TodoForm />
            </div>
        </div>
    );
}
