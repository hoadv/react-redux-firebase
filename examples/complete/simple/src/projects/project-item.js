import React, { PropTypes, Component } from 'react'
import { firebase } from 'react-redux-firebase'

import './style.css'

class ProjectItem extends Component {
  static propTypes = {
    project: PropTypes.object,
    id: PropTypes.string
  }

  render(){
    const {firebase, project, id} = this.props

    return (
      <tr>
        <td className="project-wrapper">
          <a href={'/edit?projectId=' + id + '&projectName=' + project.name}>
            Project N° {project.name}
          </a>
        </td>
      </tr>
    )
  }
}
export default firebase()(ProjectItem)