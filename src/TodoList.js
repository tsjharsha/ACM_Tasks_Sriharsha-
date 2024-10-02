// src/TodoList.js
import React, { useState, useEffect } from 'react';
import './App.css'; // Ensure the CSS is imported

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editTask, setEditTask] = useState('');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask('');
    }
  };
  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const markComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const startEdit = (index) => {
    setEditIndex(index);
    setEditTask(tasks[index].text);
  };

  const saveEdit = () => {
    if (editTask.trim()) {
      const updatedTasks = tasks.map((task, i) =>
        i === editIndex ? { ...task, text: editTask } : task
      );
      setTasks(updatedTasks);
      setEditIndex(null);
      setEditTask('');
    }
  };
  return (
    <div className="todo-container">
      <h1 class="ll">To-Do List</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task"
      />
      <button onClick={addTask}>Add Task</button>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <span
              className={task.completed ? 'completed' : ''}
              style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
            >
              {task.text}
            </span>
            <button onClick={() => markComplete(index)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => deleteTask(index)}>Delete</button>
            <button onClick={() => startEdit(index)}>Edit</button>
          </li>
        ))}
</ul>

{editIndex !== null && (
  <div className="edit-box">
    <input
      type="text"
      value={editTask}
      onChange={(e) => setEditTask(e.target.value)}
    />
    <button onClick={saveEdit}>Save Edit</button>
  </div>
)}
</div>
);
}

export default TodoList;