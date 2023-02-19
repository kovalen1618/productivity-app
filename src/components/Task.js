import React from 'react'
import CountdownTimer from './CountdownTimer'

export default function Task({ task, onDelete }) {
  return (
    <div className='task' data-id={task.id}>
        <h3 className="title">{task.title}</h3>
        <CountdownTimer time={task.time} />
        <div className="options">
            <button className="delete" onClick={(() => onDelete(task.id))}>
                DELETE
            </button>
        </div>
    </div>
  )
}
