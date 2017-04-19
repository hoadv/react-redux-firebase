import React, { PropTypes, Component } from 'react'
import { firebase } from 'react-redux-firebase'

import './todo.css'

class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object,
    id: PropTypes.string
  }

  render() {
    const {firebase, todo, id} = this.props
    const increaseTodo = (event) => {
      todo.num = todo.num + 1;
      firebase.set(`/todos/${id}/num`, todo.num)
    }

     const decreaseTodo = (event) => {
       if (todo.num === 1) {
          firebase.remove(`/todos/${id}`)
          return;
       }

      todo.num = todo.num - 1;
      firebase.set(`/todos/${id}/num`, todo.num)
    }
    return (
      <li className="Todo">
        {todo.text || todo.name}(Number task(s): {todo.num})
         <button className="Todo-Button" onClick={increaseTodo}>
          +1
        </button>
        <button className="Todo-Button" onClick={decreaseTodo}>
          -1
        </button>
      </li>
    )
  }
}
export default firebase()(TodoItem)