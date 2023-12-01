import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/todos')
      .then(response => setTodos(response.data.todos))
      .catch(error => console.error('Error fetching todos:', error));
  }, []);

  const addTodo = () => {
    axios.post('http://localhost:5000/todos', { content: newTodo })
      .then(() => {
        setTodos([...todos, { content: newTodo }]);
        setNewTodo('');
      })
      .catch(error => console.error('Error adding todo:', error));
  };

  return (
    <div>
      <h1>Todo App</h1>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.content}</li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={e => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>
    </div>
  );
}

export default App;

