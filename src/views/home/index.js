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
import { Route, Switch, Redirect } from 'react-router-dom'
import Breadcrumb from 'react-bootstrap/Breadcrumb'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import routers from '../../routers/routers'

import { BREAD_ADD } from '../../redux/actions'
import { checkLogin } from '../../ajax/user'

import Slider from './slider'
import bread from '../../routers/bread'



import './index.scss'
class Home extends React.PureComponent {

  noLogin = () => {
    this.props.history.replace('/logout')
  }

  login = () => {
    this.setState({
      isLogin: true
    }, () => {
      // this.props.updateBread([this.state.menus.find(item => item.id*1 === 1)])
      // this.setState({
      //   selectedMenu: [this.state.menus.find(item => item.id*1 === 1)]
      // })
    })
  }
  componentDidUpdate() {
    let breadName = bread(this.props.location.pathname)
    let {selectedMenu} = this.state
    console.log(selectedMenu)
    if (breadName && (selectedMenu[selectedMenu.length - 1] === undefined || 
      breadName.title !== selectedMenu[selectedMenu.length - 1].title)
    ) {
      let breadData = routers.find(item => item.title === breadName.title)
      this.setState({
        selectedMenu: [breadData]
      })
    }
    
  }

  
 
  handlerBarClick = () => {
    this.setState({
      showTools: !this.state.showTools
    })
  }

  emptyBreadAry = (index) => {
    // this.props.updateBread([this.state.menus[index]])
    this.setState({
      selectedMenu: [this.state.menus[index]]
    })
  }

  handlerLogoutClick = () => {
    this.noLogin()
  }

 
  

  componentDidMount(){
    // console.log(Cookies.get('idx'), Cookies.get('username'))
    // check cookie idx exist if isn't login redirect login
    checkLogin(Cookies.get('idx'), Cookies.get('username'), this.noLogin, this.login)
  }



  
 
  state = {
    isLogin: null,
    showTools: true,
    menus: routers,
    selectedMenu: []
  }
  render() {
    let {isLogin } = this.state
    let {pathname} = this.props.location
    if (isLogin) {
      let {showTools} = this.state
      return (
        <Container fluid>
          <Row className="header">
            <Col  className="silder-toolbar">
              <FontAwesomeIcon icon={faBars} size="lg" onClick={this.handlerBarClick}/>
              <FontAwesomeIcon icon={faSignOutAlt} size="lg" onClick={this.handlerLogoutClick}/>
            </Col>
          </Row> 
          <Row className="home-content-wrap">
            <Collapse in={showTools}>
              <Col xs="12" sm="3" id="example-collapse-text" className="slide-wrap pr-0">
                <Slider user={this.props.user} menus={this.state.menus} emptyBreadAry={this.emptyBreadAry}></Slider>
              </Col>
            </Collapse>
            
            <Col className="right-content-wrap">
            <Breadcrumb>
              {  this.state.selectedMenu && this.state.selectedMenu.map((item, index) => <Breadcrumb.Item key={index}>{item.title}</Breadcrumb.Item>) }
            </Breadcrumb>
              <TransitionGroup className="todo-list" appear>
                <CSSTransition
                  timeout={1000}
                  classNames={'page'}
                  key={this.props.location.pathname}
                >
                  <Switch location={this.props.location}>
                    
                    { 
                      this.state.menus.map((item, index) => {        
                        return (
                          <Route exact key={item.id} path={'/' + item.directory + (item.params ? item.params : '') } component={item.component}></Route>
                        )
                      })
                      
                    }
                    
                    <Redirect to={( pathname !== '/' && pathname.indexOf('/people') === -1 ? pathname : '/people/1' ) }></Redirect>
                  </Switch>
                  
                </CSSTransition>
              </TransitionGroup>
                
            </Col>
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
  user: state.user,
})
let mapDispatchToProps = (dispatch) => ({

})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home))