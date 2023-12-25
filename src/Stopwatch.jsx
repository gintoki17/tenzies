import React from 'react'

export default function Stopwatch({formatTime,timer,stopWatch,timerOn}) {
  return (
    <div className='stopwatch'>
      <div className='timer-heading'>Timer</div>
      <div className="timer-body">
        <div className="time">
       {formatTime(timer)}</div>
       <button className='start' onClick={stopWatch}>{timerOn?"stop":"start"}</button>
    </div></div>
  )
}
