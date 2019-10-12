import React, { Component } from 'react'
import { connect } from 'react-redux'

import './app.scss'
class App extends Component {
  render() {
    return (
      <div className="test">asdasdasd</div>
    )
  }
}

let mapStateToProps = (state) => ({
  test: state.test
})

export default connect(mapStateToProps)(App)