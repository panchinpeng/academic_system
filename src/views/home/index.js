import React, { Component } from 'react'
import { connect } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Cookies from 'js-cookie'
import { withRouter } from 'react-router-dom'


import { checkLogin } from '../../ajax/user'

import './index.scss'
class Home extends Component {
  noLogin = () => {
    this.props.history.replace('/login')
    Cookies.remove('idx')
    Cookies.remove('username')
  }
  componentWillMount(){
    // console.log(Cookies.get('idx'), Cookies.get('username'))
    // check cookie idx exist if isn't login redirect login
    checkLogin(Cookies.get('idx'), Cookies.get('username'), this.noLogin)
  }
  render() {
    return (
      <Container fluid={true}>
      <Row className="header">
        <Col>hreder</Col>
      </Row>
      <Row className="content">
        <Col sm="3" className="d-none d-sm-block">slider</Col>
        <Col>content</Col>
      </Row>
      <Row className="footer">
        <Col>footer</Col>
      </Row>
    </Container>
    )
  }
}

let mapStateToProps = (state) => ({
  test: state.test
})

export default connect(mapStateToProps)(withRouter(Home))