import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from '../views/login'
import Home from '../views/home'
import './app.scss'
class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/" >
              <Home />
            </Route>
          </Switch>
        </BrowserRouter>
    )
  }
}

let mapStateToProps = (state) => ({
  test: state.test
})

export default connect(mapStateToProps)(App)