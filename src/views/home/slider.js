import React, { Component } from 'react'
import { ListGroup } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'


import './slider.scss';

export default class Slider extends Component{
  renderItem = () => {
    return this.props.menus.map((item, index) => (
      <NavLink to={'/' + item.directory} key={item.id}>
        <ListGroup.Item action key={item.id}>{item.title}</ListGroup.Item>
      </NavLink>
      
    ))
    
  }
  render() {
    return (
      <ListGroup >
        { this.renderItem() }
        
      </ListGroup>
    )
  }
}
