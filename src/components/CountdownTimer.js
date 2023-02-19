import React, { useState, useEffect } from 'react'

export default function CountdownTimer({ startingMinutes }) {
    // Creating initial state with 60 seconds to work from
    const [time, setTime] = useState(startingMinutes * 60);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const hours = Math.floor(time / 3600);
    let minutes = Math.floor((time % 3600) / 60);
    let seconds = time % 60;

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    const countdown = time >= 0 ? `${hours}:${minutes}:${seconds}` : 'Expired';
  
    // Return component to App.js
    return <div>{countdown}</div>
}
