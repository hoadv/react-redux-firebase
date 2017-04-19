import React from 'react'
import { Provider } from 'react-redux'
import Home from './home'
import configureStore from './store'
import './App.css'
import Routes from './routes';
import { browserHistory } from 'react-router';

const initialState = window.__INITIAL_STATE__ || { firebase: { authError: null } }
const store = configureStore(initialState)

export default () => (
  <Provider store={store}>
     <Routes history={browserHistory} />
  </Provider>
)
