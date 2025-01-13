import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrashAlt, FaEdit, FaCheckCircle, FaPlusCircle } from 'react-icons/fa';
import AsyncStorage from '@react-native-async-storage/async-storage';
import '../styles/TodoList.css';

const BASE_URL = "https://recently-levitra-taxi-becoming.trycloudflare.com/api/todos"; // Updated base URL

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [editId, setEditId] = useState(null);

  // Fetch the token from AsyncStorage
  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      return token;
    } catch (error) {
      console.error("Error fetching token:", error);
      return null;
    }
  };

  // Fetch Todos
  const fetchTodos = async () => {
    const token = await getToken(); // Retrieve the token
    if (token) {
      try {
        const response = await axios.get(`${BASE_URL}/get`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
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
    const token = await getToken(); // Retrieve the token
    if (token) {
      if (editId) {
        try {
          await axios.put(`${BASE_URL}/update${editId}`,
            { title, description, completed },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setEditId(null);
        } catch (error) {
          console.error("Error updating todo:", error);
        }
      } else {
        try {
          await axios.post(`${BASE_URL}/create`,
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
      fetchTodos();
    } else {
      console.log("No token available.");
    }
  };

  // Delete Todo
  const handleDelete = async (id) => {
    const token = await getToken(); // Retrieve the token
    if (token) {
      try {
        await axios.delete(`${BASE_URL}/delete${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchTodos();
      } catch (error) {
        console.error("Error deleting todo:", error);
      }
    } else {
      console.log("No token available.");
    }
  };

  // Edit Todo
  const handleEdit = (todo) => {
    setEditId(todo.id);
    setTitle(todo.title);
    setDescription(todo.description);
    setCompleted(todo.completed);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="todo-container">
      <h1 className="todo-header">Your Todo List</h1>

      <form onSubmit={handleSubmit} className="todo-form">
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="todo-input"
        />
        <label className="todo-checkbox-label">
          <input
            type="checkbox"
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
        {todos.map((todo) => (
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
        ))}
      </div>
    </div>
  );
};

export default TodoList;