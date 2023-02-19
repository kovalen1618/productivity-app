import './App.css';
import CountdownTimer from './components/CountdownTimer';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

function App() {
  return (
    <div className="app">
      <div className="countdown">
        <TaskList />
        <TaskForm />
      </div>
    </div>
  );
}

export default App;
