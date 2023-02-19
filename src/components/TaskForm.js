import React, { useState } from 'react'

export default function TaskForm() {
    // Empty initial states for user input
    const [title, setTitle] = useState('');
    const [time, setTime] = useState();

    const onAddTask = async () => {
        const newTask = {
            title: title,
            time: time 
        };

        try {
            const response = await fetch('http://localhost:3000/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTask)
            });

            if (!response.ok) {
                throw new Error('Failed to add task');
            } else {
                handleSubmit(newTask);
            }
            
        } catch (error) {
            console.error(error);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        onAddTask({ title, time });
        setTitle('');
        setTime('');
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
                    onChange={(event) => setTime(parseInt(event.target.value))}
                />
            </div>
            <button type='submit'>Add Task</button>
        </form>
    )
}
