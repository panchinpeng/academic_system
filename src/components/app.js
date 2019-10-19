import React, { Component } from 'react'
import { connect } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Cookies from 'js-cookie'

import Login from '../views/login'
import Home from '../views/home'
import Logout from '../views/logout/logout'
import './app.scss'
import { USER_SET_INFO } from '../redux/actions'



class App extends Component {
  UNSAFE_componentWillMount(){
    if (Cookies.get('idx') && Cookies.get('username')) {
      this.props.setUser({ username: Cookies.get('username') , idx: Cookies.get('idx')})
    }
  }
  render() {
    return (
        <BrowserRouter>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/logout" >
              <Logout />
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
 
})

let mapDispatchToProps = (dispatch) => ({
  setUser: (user) => {
    dispatch({ type: USER_SET_INFO, data: user})
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(App)