import React, { Component } from 'react'
import Chart from 'chart.js'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom' 
import InputGroup from 'react-bootstrap/InputGroup'
import Button from 'react-bootstrap/Button'
import FormControl from 'react-bootstrap/FormControl'
import DatePicker  from 'react-datepicker'

import { groupNumber, todayNumber } from '../../ajax/statistics'

import './index.scss'
import "react-datepicker/dist/react-datepicker.css";

class Statistics extends Component {
  state = {
    todayNumbers: ['', '', '', '', '']
  }
  constructor(props) {
    super(props)
    this.parentDiv = React.createRef()
    this.chart1 = React.createRef()
  }

  createDatePicker = () => {
    return (
      <DatePicker selected={new Date()} onChange={this.handleDataChange}/>
    )
  }

  handleDataChange = () => {

  }

  async componentDidMount() {

    let pW = this.parentDiv.current.offsetWidth
    let chart1 = this.chart1.current
    chart1.width = pW
    let ctx = chart1.getContext('2d')
    let labels = []
    for(let i = 1; i < 40; i++) {
      labels.push(i)
    }

    let statistData = await groupNumber(this.props.user)

    new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          label: '出現次數',
          data: statistData,
          backgroundColor: 'rgba(0,0,0,0)',
          borderColor: 'rgb(255,0,0, .5)',
          pointBackgroundColor: 'rgb(0,116,231)',
          borderWidth: 1,
          hoverBorderCapStyle: {
            transform: 'scale(1.4)',
          }
        }]
      }
    });

    let todayNumbers = await todayNumber(this.props.user)
    this.setState({
      todayNumbers
    })
  }
  render() {
    let {todayNumbers} = this.state
    
    return ( 
      <div ref = { this.parentDiv } >
        <h3>歷年開獎</h3>
        <canvas id = "chart1" ref = { this.chart1 } height = "400" ></canvas>
        <div>
          <h3>今日號碼</h3>
          <div className="number-wrap">
            <div className="today-number">{ todayNumbers[0] }</div>
            <div className="today-number">{ todayNumbers[1] }</div>
            <div className="today-number">{ todayNumbers[2] }</div>
            <div className="today-number">{ todayNumbers[3] }</div>
            <div className="today-number">{ todayNumbers[4] }</div>
          </div>
        </div>

        <div>
          <InputGroup className="my-3">
            {this.createDatePicker()}
          </InputGroup>
        </div>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  user: state.user
})
let mapDispatchToProps = (dispatch) => ({
 
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Statistics))