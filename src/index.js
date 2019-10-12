import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './components/app'
import store from './redux/store'

import 'bootstrap/dist/css/bootstrap.min.css';
ReactDOM.render((
  <Provider store={store}>
    <App></App>
  </Provider>
), document.getElementById('root'))