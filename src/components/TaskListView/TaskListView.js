import './TaskListView.css'
import TableRow from '../TableRow/TableRow'
import { deleteSavedTask, patchTask } from '../apiCalls'
import PropTypes from 'prop-types';

const TaskListView = ({savedTasks, setSavedTasks}) => {

  const deleteTask = (id) => {
    deleteSavedTask(id).then(newSaved => {
      setSavedTasks(newSaved)
    })
  }

  const handleChange = (savedTask) => {
    savedTask.completed = !savedTask.completed
    patchTask(savedTask.id, savedTask.completed)
    .then(updatedTasks => {
      setSavedTasks(updatedTasks)
    })
    .catch(error => console.log(error))
  }

  const rows = () => savedTasks.sort((a,b) => b.id - a.id).map((savedTask, index) => {
    return (<TableRow savedTask={savedTask} key={`row-${index}`} deleteTask={deleteTask} handleChange={handleChange}/>)
  }) 

  return (
    <table>
      <thead>
        <tr>
          <th>Category</th>
          <th>Task</th>
          <th className='complete-header'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {savedTasks.length ? rows() : <tr className='no-tasks'><td>Save a task to view it here!</td></tr>}
      </tbody>
    </table>
  )
}

TaskListView.propTypes = {
  savedTasks: PropTypes.array
}

export default TaskListView