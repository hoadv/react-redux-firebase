import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  dataToJS
} from 'react-redux-firebase'

import logo from './logo.svg'
import TaskItem  from './TaskItem'
import './App.css'

class Tasks extends Component {
  static propTypes = {
    tasks: PropTypes.object,
    firebase: PropTypes.shape({
    })
  }


  render () {
    const { tasks } = this.props

    const tasksList = (!isLoaded(tasks))
                        ? 'Loading'
                        : (isEmpty(tasks))
                          ? 'Task list is empty'
                          : Object.keys(tasks).map((key) => (
                            <TaskItem key={key} id={key} task={tasks[key]} />
                          ))
    return (
        <div className='App-todos'>
          <h4>Tasks List</h4>
          {tasksList}
        </div>
    )
  }
}
const fbWrappedComponent = firebaseConnect([
  '/tasks'
  // { type: 'once', path: '/tasks' } // for loading once instead of binding
  // '/tasks#populate=owner:displayNames' // for populating owner parameter from id into string loaded from /displayNames root
  // '/tasks#populate=collaborators:users' // for populating owner parameter from id to user object loaded from /users root
  // { path: 'tasks', populates: [{ child: 'collaborators', root: 'users' }] } // object notation of population
  // '/tasks#populate=owner:users:displayName' // for populating owner parameter from id within to displayName string from user object within users root
])(Tasks)

export default connect(
  ({ firebase }) => ({
    tasks: dataToJS(firebase, 'tasks'),
  })
)(fbWrappedComponent)
