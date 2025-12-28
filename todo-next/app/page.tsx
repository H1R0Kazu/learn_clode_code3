'use client';

import { useState, useEffect } from 'react';

interface Todo {
  id: number;
  task: string;
  completed: boolean;
  createdAt: string;
}

type FilterType = 'all' | 'active' | 'completed';

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    const stored = localStorage.getItem('todos');
    if (stored) {
      setTodos(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  const addTodo = () => {
    const task = inputValue.trim();
    if (!task) return;

    const newTodo: Todo = {
      id: Date.now(),
      task,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const getFilteredTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  };

  const filteredTodos = getFilteredTodos();
  const activeCount = todos.filter(todo => !todo.completed).length;
  const hasCompleted = todos.some(todo => todo.completed);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-purple-800 flex items-center justify-center p-5">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          TODO App
        </h1>

        <div className="flex gap-2 mb-5">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            placeholder="新しいTODOを入力..."
            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg text-base text-gray-900 placeholder:text-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
          />
          <button
            onClick={addTodo}
            className="px-8 py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            追加
          </button>
        </div>

        <div className="flex gap-2 mb-5 justify-center">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === 'all'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            全て
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === 'active'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            未完了
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === 'completed'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            完了済み
          </button>
        </div>

        <ul className="mb-5">
          {filteredTodos.map(todo => (
            <li
              key={todo.id}
              className={`flex items-center p-4 bg-gray-50 rounded-lg mb-2 transition-all hover:bg-gray-100 ${
                todo.completed ? 'opacity-60' : ''
              }`}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="w-5 h-5 mr-4 cursor-pointer"
              />
              <span
                className={`flex-1 text-base ${
                  todo.completed ? 'line-through text-gray-500' : 'text-gray-800'
                }`}
              >
                {todo.task}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                className="px-4 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600 transition-colors"
              >
                削除
              </button>
            </li>
          ))}
        </ul>

        <div className="flex justify-between items-center pt-4 border-t-2 border-gray-200 text-gray-600">
          <span>{activeCount}件のTODO</span>
          {hasCompleted && (
            <button
              onClick={clearCompleted}
              className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              完了済みを削除
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
