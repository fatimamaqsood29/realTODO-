import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt, FaEdit, FaCheckCircle, FaPlusCircle } from 'react-icons/fa';
import "../styles/TodoList.css";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch the token from localStorage
  const getToken = () => {
    const token = localStorage.getItem("userToken");
    console.log("Retrieved Token:", token); // Debugging log
    return token;
  };

  // Fetch Todos
  const fetchTodos = async () => {
    const token = getToken();
    if (token) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/todos/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("fetched todos:", response.data);
        
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    } else {
      console.log("No token available.");
    }
  };

  // Add or Edit Todo
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();
    if (token) {
      if (editId) {
        try {
          // Use todo.id for the update in the URL
          await axios.put(`${import.meta.env.VITE_BASE_URL}/api/todos/update/${editId}`,
            { title, description, completed },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          console.log(`${import.meta.env.VITE_BASE_URL}/api/todos/put/${editId}`);
          
          setEditId(null); // Reset the edit state
        } catch (error) {
          console.error("Error updating todo:", error);
        }
      } else {
        try {
          await axios.post(`${import.meta.env.VITE_BASE_URL}/api/todos/create`,
            { title, description, completed },
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } catch (error) {
          console.error("Error adding todo:", error);
        }
      }
      setTitle('');
      setDescription('');
      setCompleted(false);
      fetchTodos(); // Refresh the todo list
    } else {
      console.log("No token available.");
    }
  };

  // Delete Todo
  const handleDelete = async (id) => {
    const token = getToken();
    console.log("Todo ID for delete:", id); // Log the ID being passed
    
    if (id && token) {
      try {
        const url = `${import.meta.env.VITE_BASE_URL}/api/todos/delete/${id}`;
        console.log("Request URL:", url); // Log the full URL for debugging
  
        await axios.delete(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        fetchTodos(); // Refresh the todos list after deletion
      } catch (error) {
        console.error("Error deleting todo:", error);
      }
    } else {
      console.log("No token available or invalid Todo ID.");
    }
  };

  // Edit Todo
  const handleEdit = (todo) => {
    setEditId(todo.id);  // Use todo.id here for the edit action
    setTitle(todo.title);
    setDescription(todo.description);
    setCompleted(todo.completed);
  };

  // Fetch Todos on Component Mount
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="todo-container">
      <h1 className="todo-header">Your Todo List</h1>

      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          name="title"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="todo-input"
        />
        <label className="todo-checkbox-label">
          <input
            type="checkbox"
            name="completed"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="todo-checkbox"
          />
          Mark as Completed
        </label>
        <button type="submit" className="todo-submit-button">
          {editId ? <FaCheckCircle /> : <FaPlusCircle />}
          {editId ? " Update Todo" : " Add Todo"}
        </button>
      </form>

      <div className="todo-list">
        {todos.map((todo) => {
          console.log("Todo item:", todo); // Ensure todo has the correct ID field
          return (
            <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
              <div className="todo-details">
                <h3 className="todo-title">{todo.title}</h3>
                <p className="todo-description">{todo.description}</p>
                <p className="todo-status">
                  Status: {todo.completed ? "Completed" : "Incomplete"}
                </p>
              </div>

              <div className="todo-actions">
                <button onClick={() => handleEdit(todo)} className="todo-edit-button">
                  <FaEdit /> Edit
                </button>
                <button onClick={() => handleDelete(todo.id)} className="todo-delete-button">
                  <FaTrashAlt /> Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TodoList;