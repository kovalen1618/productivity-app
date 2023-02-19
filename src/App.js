import './App.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className="app">
      <TaskList />
      <TaskForm />
    </div>
  );
}

export default App;
