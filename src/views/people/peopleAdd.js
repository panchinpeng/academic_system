import React from 'react'
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { withRouter } from 'react-router-dom'

import { BREAD_ADD, BREAD_DEL } from '../../redux/actions'
import PropTypes from 'prop-types'
class PeopleAdd extends React.Component {
  static propTypes = {
    doAction: PropTypes.func.isRequired
  }
  state = {
    status: 'add'
  }
  do = (event) => {
    let {username , password, email, name} = this.form
    // parent define do something
    let sendData = { username: this.props.user.username, idx: this.props.user.idx, doUsername: username.value, email: email.value, name: name.value }
    if (password) {
      sendData['password'] = password.value
    }
    this.props.doAction(sendData)
   
    event.preventDefault()
    event.stopPropagation()
  }

  

  goBack = () => {
    this.props.remoteBread()
    this.props.history.goBack()
  }

  UNSAFE_componentWillMount() {
    // bread title
    let nowRoute
    if (this.props.location.state) {
      nowRoute = { title : '修改人員'}
      this.setState({
        status: 'update'
      })
    } else {
      nowRoute = { title : '新增人員'}
    }
    this.props.updateBread([...this.props.bread, nowRoute])
  }
  render() {
    let {status} = this.state
    return (
      <div>
        <Card>
          <Card.Body>
          <Form ref={(f) => this.form = f} onSubmit={this.do}>
            <Form.Group controlId="username">
              <Form.Label>帳號</Form.Label>
              {
                status === 'add' ? <Form.Control type="text" placeholder="請輸入帳號" required/> : <Form.Control type="text" placeholder="請輸入帳號" required defaultValue={this.props.location.state.username} readOnly/>
              }
              
              <Form.Control.Feedback type="invalid">
                Please provide a valid state.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>密碼</Form.Label>
              <Form.Control type="password" placeholder="請輸入密碼，修改狀態下如為空則繼續使用舊密碼" required={status === 'add'}/>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>E-mail</Form.Label>
              {
                status === 'add' ? <Form.Control type="email" placeholder="請輸入E-mail" required/> : <Form.Control type="email" placeholder="請輸入E-mail" required defaultValue={this.props.location.state.email}/>
              }
            </Form.Group>
            <Form.Group controlId="name">
              <Form.Label>姓名</Form.Label>
              {
                status === 'add' ? <Form.Control placeholder="請輸入姓名" required /> : <Form.Control placeholder="請輸入姓名" required defaultValue={this.props.location.state.realname} />
              }
            </Form.Group>
            <Button variant="primary" type="submit">
              確定新增
            </Button>
            <Button variant="primary" className="float-right" onClick={this.goBack}>
              取消
            </Button>
          </Form>
          </Card.Body>
        </Card>
      </div>
    )
  }
}
let mapStateToProps = (state) => ({
  bread: state.bread,
  user: state.user
})

let mapDispatchToProps = (dispatch) => ({
  updateBread: (bread) => {
    dispatch({ type: BREAD_ADD, data: bread })
  },
  remoteBread: () => {
    dispatch({ type: BREAD_DEL })
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PeopleAdd))