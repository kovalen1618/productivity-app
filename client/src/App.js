// React
import { useEffect, useState } from 'react';

// Styles
import './App.css';

// Components
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

// Server
import { io } from 'socket.io-client';
const socket = io('http://localhost:3001');

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch('http://localhost:3000/tasks');
      const data = await response.json();
      setTasks(data);
    }
    fetchData();
    
    socket.on('taskAdded', (task) => {
      setTasks((prevTasks) => [...prevTasks, task]);
    })

    
    socket.on('taskDeleted', (taskId) => {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
    })

    return () => {
      socket.off('taskAdded');
      socket.off('taskDeleted');
    }
  }, [])


  return (
    <div className="app">
      <TaskList tasks={tasks} setTasks={setTasks} socket={socket} />
      <TaskForm setTasks={setTasks} socket={socket} />
    </div>
  );
}

export default App;
