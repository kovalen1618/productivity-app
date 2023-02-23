import React, { useEffect} from 'react'
import Task from './Task';

export default function TaskList({ tasks, setTasks, socket }) {
    useEffect(() => {
        socket.on('taskAdded', (task) => {
        setTasks((prevTasks) => [...prevTasks, task])
        })

        return () => socket.off('taskAdded')
    }, [socket, setTasks])


    useEffect(() => {
        async function fetchData() {
            const response = await fetch('/api/tasks')
            const data = await response.json();
            setTasks(data);
        }
        fetchData();
    }, [setTasks]);

    async function deleteTask(id) {
        const response = await fetch (`/api/tasks/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Failed to delete task with id ${id}`);
        }
    } 

    async function handleDelete(id) {
        try {
            await deleteTask(id);
            setTasks((tasks) => tasks.filter((task) => task.id !== id));
            localStorage.removeItem(`remainingTime-${id}`);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className='task-container'>
            {tasks.map((task) => (
                <Task key={task.id} task={task} onDelete={handleDelete} />
            ))}
        </div>
    )
}
