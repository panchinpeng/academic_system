import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'


import './slider.scss';

export default class Slider extends React.PureComponent{
  renderItem = () => {
    return this.props.menus.map((item, index) => (
      !item.hiddenSlider &&
      <NavLink to={'/' + item.directory} key={item.id} >
        <ListGroup.Item action key={item.id} onClick={ () => { this.props.emptyBreadAry(index) }}>{item.title}</ListGroup.Item>
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