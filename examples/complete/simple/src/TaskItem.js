import React, { PropTypes, Component } from 'react'
import { firebase } from 'react-redux-firebase'

import './Todo.css'

class TaskItem extends Component {
  static propTypes = {
    task: PropTypes.object,
    id: PropTypes.string,
    onNumTaskChange: PropTypes.func.isRequired
  }

  render() {
    const {firebase, task, id, onNumTaskChange} = this.props
    return (
      <li className="task">
        {task.text || task.name}
        <button className="Todo-Button" onClick={() => {task.num = 1; onNumTaskChange(task)}}>
          +1
        </button>
        <button className="Todo-Button" onClick={() => {task.num = -1; onNumTaskChange(task)}}>
          -1
        </button>
      </li>
    )
  }
}
export default firebase()(TaskItem)
