import React, { useRef, useState } from 'react'
import CountdownTimer from './CountdownTimer'

export default function Task({ task, onDelete }) {
  const [isRunning, setIsRunning] = useState(false);
  const countdownRef = useRef();

  function handlePlayPause() {
    if (isRunning) {
      countdownRef.current.pause();
    } else {
      countdownRef.current.play();
    }

    setIsRunning(!isRunning);
  }

  function resetTimer() {
    if (isRunning) {
      countdownRef.current.pause();
      setIsRunning(false);
    }

    countdownRef.current.reset();
  }


  return (
    <div className='task' data-id={task.id}>
        <h3 className="title">{task.title}</h3>
        <button className="play-pause" onClick={handlePlayPause}>
          {isRunning ? 'PAUSE' : 'PLAY'}
        </button>
        <button className="reset-button" onClick={resetTimer}>Reset</button>
        <CountdownTimer 
          ref={countdownRef}
          startingMinutes={task.time}
          onTimerComplete={() => setIsRunning(false)} 
          id={task.id}
        />
        <div className="options">
            <button className="delete" onClick={(() => onDelete(task.id))}>
                DELETE
            </button>
        </div>
    </div>
  )
}
