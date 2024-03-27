import React from 'react'
import Task from './Task'
import Taskcard from './Taskcard'
import Taskitem from './Taskitem'

function Taskmain() {
  return (
    <div className='flex gap-10 w-[80%] m-auto'>
      <div>
        <Task/>
      </div>
      <div>
       <Taskitem/>
      </div> 
    </div>
  )
}

export default Taskmain

