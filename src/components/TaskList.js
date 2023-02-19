import React, { useEffect, useState } from 'react'
import Task from './Task';

export default function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const response = await fetch('http://localhost:3000/tasks')
            const data = await response.json();
            setTasks(data);
        }
        fetchData();
    }, []);

    async function deleteTask(id) {
        const response = await fetch (`http://localhost:3000/tasks/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`Failed to delete task with id ${id}`);
        }
    } 

    async function handleDelete(id) {
        // const updatedTasks = tasks.filter((task) => task.id !== id);
        // setTasks(updatedTasks);
        // deleteTask(id);

        try {
            await deleteTask(id);
            setTasks((tasks) => tasks.filter((task) => task.id !== id));
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
