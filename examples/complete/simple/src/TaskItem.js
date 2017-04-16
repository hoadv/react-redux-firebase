import React, { PropTypes, Component } from 'react'
import { firebase } from 'react-redux-firebase'

import './Todo.css'

class TaskItem extends Component {
  static propTypes = {
    task: PropTypes.object,
    id: PropTypes.string
  }

  render() {
    const {firebase, task, id} = this.props

    const increasetask = () => {
      task.num = task.num + 1;
      firebase.set(`/tasks/${id}/num`, task.num)
    }

    const decreasetask = () => {
      if (task.num === 1) {
        firebase.remove(`/tasks/${id}`);
        return;
      }
      
      task.num = task.num - 1;
      firebase.set(`/tasks/${id}/num`, task.num)
    }

    return (
      <li className="task">
        {task.text || task.name} (Number task(s): {task.num})
        <button className="Todo-Button" onClick={increasetask}>
          +1
        </button>
        <button className="Todo-Button" onClick={decreasetask}>
          -1
        </button>
      </li>
    )
  }
}
export default firebase()(TaskItem)
