import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  dataToJS
} from 'react-redux-firebase'

import TodoItem from './todo-item'
import Tasks from './tasks';

class Edit extends Component {
  static propTypes = {
    todos: PropTypes.object,
    firebase: PropTypes.shape({
      push: PropTypes.func.isRequired
    })
  }

  updateTodo = (todos, task, taskId) => {
    const { firebase } = this.props;

    let todo = null;
    if (todos) {
      todo = this.findTodoByTaskAndProject(taskId, this.props.location.query.projectId, todos);
    }

    if (task.num === -1 && !todo) {
      return;
    }

    if (task.num === 1 && !todo) {
      if(this.props.location.query.projectId) {
        firebase.push(`/todos`, {text: task.name, num: 1, taskId: taskId, projectId: this.props.location.query.projectId});
      }
      return;
    }

     if (todo) {
       todo.num += task.num;
       if (todo.num <= 0) {
         firebase.remove(`/todos/${todo.key}`)
       } else {
         firebase.set(`/todos/${todo.key}/num`, todo.num)
       }
    }
  }

  findTodoByTaskAndProject(taskId, projectId, todos) {
    let todo = null;
    Object.keys(todos).map((key) => {
      if (todos[key].taskId === taskId && todos[key].projectId === projectId) {
        todo = todos[key];
        todo.key = key;
        return;
      }
    });

    return todo;
  }

  render () {
    const  {todos}  = this.props

    const todosList = (!isLoaded(todos))
                        ? 'Loading'
                        : (isEmpty(todos))
                          ? 'Todo list is empty'
                          : Object.keys(todos).map((key) => (
                            (todos[key].projectId === this.props.location.query.projectId) && <TodoItem key={key} id={key} todo={todos[key]} />
                          ))
    return (
      <div className='App'>
        <div className='App-todos'>
          <h4>Project N° {this.props.location.query.projectName}</h4>
          {todosList}
          <Tasks onNumTaskChange={(task, taskId) => this.updateTodo(todos, task, taskId)}/>
        </div>
      </div>
    )
  }
}
const fbWrappedComponent = firebaseConnect([
  // '/todos#orderByChild=projectId&equalTo=' + projectId
  '/todos'
  // { type: 'once', path: '/todos' } // for loading once instead of binding
  // '/todos#populate=owner:displayNames' // for populating owner parameter from id into string loaded from /displayNames root
  // '/todos#populate=collaborators:users' // for populating owner parameter from id to user object loaded from /users root
  // { path: 'todos', populates: [{ child: 'collaborators', root: 'users' }] } // object notation of population
  // '/todos#populate=owner:users:displayName' // for populating owner parameter from id within to displayName string from user object within users root
])(Edit)

export default connect(
  ({ firebase }) => ({
    todos: dataToJS(firebase, 'todos'),
  })
)(fbWrappedComponent)
