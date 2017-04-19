import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  dataToJS
} from 'react-redux-firebase'

import ProjectItem from './project-item'
import './style.css'

class Projects extends Component {
  static propTypes = {
    projects: PropTypes.object,
    firebase: PropTypes.shape({
      push: PropTypes.func.isRequired
    })
  }

  handleAdd = () => {
    const { firebase } = this.props
    const { newProject } = this.refs
    firebase.push('/projects', { name: newProject.value })
    newProject.value = ''
  }

  render () {
    const { projects } = this.props

    const projectsList = (!isLoaded(projects))
                        ? 'Loading'
                        : (isEmpty(projects))
                          ? 'Project list is empty'
                          : Object.keys(projects).map((key) => (
                            <ProjectItem key={key} id={key} project={projects[key]} />
                          ))
    return (
      <div className='project-container'>
        <table>
          <tr>
            <td>
              New Project N&#176; 
              <input type='number' ref='newProject' className="input-number" min="0"/>
              <button onClick={this.handleAdd}>+</button>
            </td>
          </tr>
          <tr></tr>
           <tr></tr>
          {projectsList}
        </table>
      </div>
    )
  }
}
const fbWrappedComponent = firebaseConnect([
  '/projects'
  // { type: 'once', path: '/projects' } // for loading once instead of binding
  // '/projects#populate=owner:displayNames' // for populating owner parameter from id into string loaded from /displayNames root
  // '/projects#populate=collaborators:users' // for populating owner parameter from id to user object loaded from /users root
  // { path: 'projects', populates: [{ child: 'collaborators', root: 'users' }] } // object notation of population
  // '/projects#populate=owner:users:displayName' // for populating owner parameter from id within to displayName string from user object within users root
])(Projects)

export default connect(
  ({ firebase }) => ({
    projects: dataToJS(firebase, 'projects'),
  })
)(fbWrappedComponent)
