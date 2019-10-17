import React, { Component } from 'react'
import { connect } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { withRouter } from 'react-router-dom'
import Cookies from 'js-cookie'


import { userLoginAjax, checkLogin } from '../../ajax/user'
import { USER_SET_INFO } from '../../redux/actions'
import './index.scss'
class Login extends Component {
  validData = (datas) => {
    if(!datas) return {
      isInvalid: true,
      errMsg: '必填'
    }

    if(!/^[\w]+$/.test(datas)){
      return {
        isInvalid: true,
        errMsg: '必須是數字、字母、_'
      }
    }
    
    return {}
  }

  loginFail = () => {
    let errObj = {
      isInvalid: true,
      errMsg: '帳號或密碼錯誤'
    }
    this.setState({
      usernameInput: errObj,
      passwordInput: errObj
    })
  }

  loginSuccess = (res) => {
    Cookies.set('username', res.username, { expires: 1/48 })
    Cookies.set('idx', res.idx, { expires: 1/48 })
    this.props.setLoginInfo({ username: res.username, idx: res.idx})
    this.props.history.replace('/')
  }
  handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget
    let { username, password } = form
    let usernameInput = this.validData(username.value)
    let passwordInput = this.validData(password.value)
    this.setState({
      usernameInput, passwordInput
    }, () => {
      if (!usernameInput.errMsg && !passwordInput.errMsg) {
        userLoginAjax(username.value, password.value, this.loginFail, this.loginSuccess)
        
      }
    })

    

    
    
  }
  state = {
    validated: false,
    usernameInput: {},
    passwordInput: {}
  }

  redirectHome = () => {
    this.props.history.replace('/')
  }
 
  UNSAFE_componentWillMount(){
    let {idx, username} = this.props.user
    // if logined redirect home
    checkLogin(idx, username, null, this.redirectHome)
  }

  render() {
    
    return (
      <Container className="d-flex align-items-center justify-content-center">
        <Card bg="light" className="form-wrap">
          <Card.Header>登入</Card.Header>
          <Card.Body>
            <Form validated={this.state.validated} noValidate  onSubmit={this.handleSubmit}>
              <Form.Group controlId="username">
                <Form.Label>帳號</Form.Label>
                <Form.Control type="text" placeholder="Enter username" isInvalid={this.state.usernameInput.isInvalid}/>
                <Form.Control.Feedback type="invalid">
                  {this.state.usernameInput.errMsg}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>密碼</Form.Label>
                <Form.Control type="password" placeholder="Password" isInvalid={this.state.passwordInput.isInvalid}/>
                <Form.Control.Feedback type="invalid">
                {this.state.passwordInput.errMsg}
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" type="submit">
                送出
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    )
  }
}

let mapStateToProps = (state) => ({
  user: state.user
})

let mapDispatchToProps = (dispatch) => ({
  setLoginInfo : (user) => {
    dispatch({ type: USER_SET_INFO, data: user })
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login))