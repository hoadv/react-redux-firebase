import React, { PropTypes, Component } from 'react'
import { firebase } from 'react-redux-firebase'

import './Todo.css'

class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object,
    id: PropTypes.string
  }

  render() {
    const {firebase, todo, id} = this.props
    const toggleDone = () => {
      firebase.set(`/todos/${id}/done`, !todo.done)
    }

    const increaseTodo = () => {
      todo.num = todo.num + 1;
      firebase.set(`/todos/${id}/num`, todo.num)
    }

    const decreaseTodo = () => {
      if (todo.num === 1) {
        firebase.remove(`/todos/${id}`);
        return;
      }
      
      todo.num = todo.num - 1;
      firebase.set(`/todos/${id}/num`, todo.num)
    }
    const deleteTodo = (event) => {
      firebase.remove(`/todos/${id}`)
    }
    return (
      <li className="Todo">
        <input
          className="Todo-Input"
          type="checkbox"
          checked={todo.done}
          onChange={toggleDone}
          />
        {todo.text || todo.name} (Number task(s): {todo.num})
        <button className="Todo-Button" onClick={increaseTodo}>
          +1
        </button>
        <button className="Todo-Button" onClick={decreaseTodo}>
          -1
        </button>
        <button className="Todo-Button" onClick={deleteTodo}>
          Delete
        </button>
      </li>
    )
  }
}
export default firebase()(TodoItem)
