import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react'

export default forwardRef(function CountdownTimer({ startingMinutes, onTimerComplete, id }, ref ) {
    // Generating a unique key for the localStorage value based on the task id
    const localStorageKey = `remainingTime-${id}`;

    // Creating initial state with 60 seconds to work from
    const [time, setTime] = useState(() => {
        const storedTime = localStorage.getItem(localStorageKey);
        // const time = new Date(storedTime).getTime();
        return storedTime !== null ? parseInt(storedTime) : startingMinutes * 60;
    });
    const intervalRef = useRef();

    useEffect(() => {
        if (time === 0) {
            clearInterval(intervalRef.current);
            onTimerComplete();
        }
    }, [time, onTimerComplete])

    useImperativeHandle(ref, () => ({
        play: () => {
            clearInterval(intervalRef.current);
            intervalRef.current = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        },
        pause: () => clearInterval(intervalRef.current),
        reset: () => setTime(startingMinutes * 60)
    }));

    // Local storage
    useEffect(() => {
        localStorage.setItem(localStorageKey, time);
    }, [time, localStorageKey])

    useEffect(() => {
        const storedTime = localStorage.getItem(localStorageKey);
        if (storedTime) {
            setTime(parseInt(storedTime));
        }
    }, [localStorageKey])

    const hours = Math.floor(time / 3600);
    let minutes = Math.floor((time % 3600) / 60);
    let seconds = time % 60;

    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    const countdown = time >= 0 ? `${hours}:${minutes}:${seconds}` : 'Expired';
  
    // Return component to App.js
    return <div>{countdown}</div>
})
