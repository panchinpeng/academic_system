import React, { Component } from 'react'
import { ListGroup } from 'react-bootstrap'

import { menuAjax } from '../../ajax/menu'

export default class Slider extends Component{
  state = {
    menu: []
  }

  setMenu = (menu) => {
    console.log('menu', menu)
    this.setState({
      menu
    })
  }

  renderItem = () => {
    return this.state.menu.map((item, index) => (
      <ListGroup.Item action key={item.id}>{item.title}</ListGroup.Item>
    ))
    
  }

  componentDidMount() {
    let {username, idx} = this.props.user
    menuAjax(username, idx, this.setMenu)
  }
  render() {
    return (
      <ListGroup >
        { this.renderItem() }
        
      </ListGroup>
    )
  }
}
