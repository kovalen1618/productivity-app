import React, { useState } from 'react'

export default function TaskForm({ setTasks, socket }) {
    // Empty initial states for user input
    const [title, setTitle] = useState('');
    const [time, setTime] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newTask = { title, time };

        try {
            const response = await fetch('/api/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTask)
            });          
            
            const data = await response.json();
            setTasks((prevTasks) => [...prevTasks, data]);

            socket.emit('taskAdded', data);
            // Reset the form input fields if the task was added successfully
            setTitle('');
            setTime('');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title"></label>
                <input 
                    type="text"
                    id='title'
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
            </div>
            <div>
                <label htmlFor="time"></label>
                <input 
                    type="number"
                    id='time'
                    value={time}
                    onChange={(event) => {
                        const value = event.target.value;
                        console.log(value)
                        setTime(value !== '' ? parseInt(value, 10) : 0)}
                    }
                />
            </div>
            <button type='submit'>Add Task</button>
        </form>
    )
}
