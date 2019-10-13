import React, { Component } from 'react'
import { connect } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Cookies from 'js-cookie'
import { withRouter } from 'react-router-dom'



import { checkLogin } from '../../ajax/user'
import { USER_DEL } from '../../redux/actions'
import Slider from './slider'
import './index.scss'
class Home extends Component {
  state = {
    isLogin: null
  }
  noLogin = () => {
    this.props.history.replace('/login')
    Cookies.remove('idx')
    Cookies.remove('username')
    this.props.removeUser()
  }

  login = () => {
    this.setState({
      isLogin: true
    })
  }
  UNSAFE_componentWillMount(){
    // console.log(Cookies.get('idx'), Cookies.get('username'))
    // check cookie idx exist if isn't login redirect login
    checkLogin(Cookies.get('idx'), Cookies.get('username'), this.noLogin, this.login)
    
  }
  alertClicked(){

  }
  render() {
    let {isLogin} = this.state
    if (isLogin) {
      return (
        <Container fluid={true}>
        <Row className="header">
          <Col>hreder</Col>
        </Row>
        <Row className="content">
          <Col sm="3" className="d-none d-sm-block slide-wrap">
            <Slider user={this.props.user}></Slider>
          </Col>
          <Col>content</Col>
        </Row>
        <Row className="footer">
          <Col>footer</Col>
        </Row>
      </Container>
      )
    } else {
      return <div />
    }
    
  }
}

let mapStateToProps = (state) => ({
  user: state.user
})

let mapDispatchToProps = (dispatch) => ({
  removeUser: () => {
    dispatch({ type: USER_DEL })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home))