import React, { Component } from 'react'
import { connect } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Collapse from 'react-bootstrap/Collapse'
import Cookies from 'js-cookie'
import { withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'



import { checkLogin } from '../../ajax/user'
import { USER_DEL } from '../../redux/actions'
import Slider from './slider'
import './index.scss'
class Home extends Component {
  
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
  handlerBarClick = () => {
    this.setState({
      showTools: !this.state.showTools
    })

  }

  state = {
    isLogin: null,
    showTools: true
  }
  render() {
    let {isLogin} = this.state
    if (isLogin) {
      let {showTools} = this.state
      return (
        <Container fluid>
          <Row className="header">
            <Col  className="silder-toolbar">
              <FontAwesomeIcon icon={faBars} size="lg" onClick={this.handlerBarClick}/>
              <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
            </Col>
          </Row>
          <Row className="home-content-wrap">
            <Collapse in={showTools}>
              <Col xs="12" sm="3" id="example-collapse-text" className="slide-wrap pr-0">
                <Slider user={this.props.user}></Slider>
              </Col>
            </Collapse>
            
            <Col>content</Col>
          </Row>
          <Row className="footer">
            <Col>後台管理系統版權</Col>
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