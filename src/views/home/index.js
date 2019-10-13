import React, { Component } from 'react'
import { connect } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './index.scss'
class Home extends Component {
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

export default connect(mapStateToProps)(Home)