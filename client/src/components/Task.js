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


  return (
    <div className='task' data-id={task.id}>
        <h3 className="title">{task.title}</h3>
        <button className="play-pause" onClick={handlePlayPause}>
          {isRunning ? 'PAUSE' : 'PLAY'}
        </button>
        <CountdownTimer 
          ref={countdownRef}
          startingMinutes={task.time}
          onTimerComplete={() => setIsRunning(false)} 
        />
        <div className="options">
            <button className="delete" onClick={(() => onDelete(task.id))}>
                DELETE
            </button>
        </div>
    </div>
  )
}
