import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
  firebaseConnect,
  isLoaded,
  isEmpty,
  dataToJS
} from 'react-redux-firebase'

import logo from './logo.svg'
import Projects from './projects/'
import './App.css'

class Home extends Component {

  render () {
    return (
      <div className='App'>
        <div className='App-header'>
          <h2>react-redux-firebase demo</h2>
          <img src={logo} className='App-logo' alt='logo' />
        </div>
        <div className='App-todos'>
          <h4>
            Loaded From
            <span className='App-Url'>
              <a href='https://redux-firebasev3.firebaseio.com/'>
                redux-firebasev3.firebaseio.com
              </a>
            </span>
          </h4>
          <Projects />
        </div>
      </div>
    )
  }
}

export default Home