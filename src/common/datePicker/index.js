import React from 'react'
import DatePicker  from 'react-datepicker'
import PropTypes from 'prop-types'
import "react-datepicker/dist/react-datepicker.css";
class CustomDatePicker extends React.Component {
  static propTypes = {
    receiveDatePicker : PropTypes.func.isRequired 
  }
  state = {
    startDate: ''
  }
  handleDataChange = (d) => {
    let pickDate = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
    this.props.receiveDatePicker(pickDate)
    this.setState({
      startDate: d
    })
  }
  render() {
    return (
      <DatePicker dateFormat="yyyy-MM-dd" selected={this.state.startDate} onChange={this.handleDataChange} className="form-control"/>
    )
    
  }
} 

export default CustomDatePicker