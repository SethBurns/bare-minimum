import './TaskListView.css'
import { useState } from 'react'
import TableRow from '../TableRow/TableRow'


const TaskListView = (props) => {

  const task = props.savedData.map((saved, index) => {
    return (<TableRow saved={saved} key={`row-${index}`}/>)
  })

  return (
    <table>
      <thead>
        <tr>
          <th>Category</th>
          <th>Task</th>
          <th className='complete-header'>Complete</th>
          {/* <th>Delete</th> */}
        </tr>
      </thead>
      <tbody>
        {task}
      </tbody>
    </table>
  )
}

export default TaskListView