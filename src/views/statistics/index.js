import React, { Component } from 'react'
import Chart from 'chart.js'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom' 
import Button from 'react-bootstrap/Button'

import CustomDatePicker from '../../common/datePicker'
import { groupNumber, todayNumber, statistNumberAppearSearchTime, numberChart } from '../../ajax/statistics'

import './index.scss'


class Statistics extends Component {
  state = {
    todayNumbers: ['', '', '', '', ''],
    secondShow: false,
    showAllNumber: false,
    allNumberDatas: []
  }
  constructor(props) {
    super(props)
    this.parentDiv = React.createRef()
    this.chart1 = React.createRef()
    this.chart2 = React.createRef()
  }

  getPickDate = (d) => {
    this.pickDate = d
  }

  handleSearch = async () => {
    this.chart2Dom && this.chart2Dom.destroy()
    if (!this.pickDate) {
      alert('請選擇日期')
      return false;
    }
    let result = await statistNumberAppearSearchTime(this.props.user, this.pickDate)
    this.setState({
      secondShow: true
    })
    console.log(result)
    let chart2 = this.chart2.current
    chart2.width = this.parentDiv.current.offsetWidth
    let ctx = chart2.getContext('2d')
    this.chart2Dom = new Chart(ctx, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          label: this.pickDate + '至今出現次數',
          data: result,
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
  }

  showNumberAll = async () => {
    let tmp = await numberChart(this.props.user)
    this.datePeriod = tmp.pop()
    
    let allNumberDatas = tmp
    this.setState({
      allNumberDatas,
      showAllNumber: true
    })
  }

  renderNumberAll = () => {
    console.log(this.state.allNumberDatas)
    let pW = this.parentDiv.current.offsetWidth
    let canvasDom = this.state.allNumberDatas.map((item, index) => {
      if(index != 0) {
        return (
          <canvas key={index} id={`canvasnumber` + index} height="100" width={pW}></canvas>
        )
      }
      
    })
    
    return canvasDom
  }
  componentDidUpdate() {
    this.drawNumber();
  }

  drawNumber = () => {
    if(this.state.allNumberDatas.length) {
      for(let i = 1; i < this.state.allNumberDatas.length; i++) {
        
        let loopData = this.state.allNumberDatas[i]
        let fillData = new Array(this.state.allNumberDatas[0])
        for (let y = 0; y < this.state.allNumberDatas[0]; y++) {
          if (loopData.indexOf(y) > -1) {
            fillData[y] = 1
          } else {
            fillData[y] = 0
          }
        }
        let ctx = document.getElementById('canvasnumber' + i).getContext('2d')
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: this.datePeriod,
            datasets: [{
              label: i + '至今出現次數',
              data: fillData,
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
      }
    }
    
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
    this.labels = labels

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
        <h4>歷年開獎</h4>
        <canvas id = "chart1" ref = { this.chart1 } height = "400" ></canvas>
        <div className="my-1">
          <h4>今日號碼</h4>
          <div className="number-wrap">
            <div className="today-number">{ todayNumbers[0] }</div>
            <div className="today-number">{ todayNumbers[1] }</div>
            <div className="today-number">{ todayNumbers[2] }</div>
            <div className="today-number">{ todayNumbers[3] }</div>
            <div className="today-number">{ todayNumbers[4] }</div>
          </div>
        </div>

        <div className="my-1">
          <h4>查詢近日開獎統計</h4>
          <div className="current-search-wrap">
            <CustomDatePicker receiveDatePicker={this.getPickDate}></CustomDatePicker>
            <Button variant="warning" onClick={this.handleSearch}>查詢</Button>
          </div>
          <div>
            <canvas id="chart2" height="400" ref={this.chart2}></canvas>
          </div>
          
        </div>

        <div className="my-3" style={{overflow: 'auto'}}>
          <h4>查詢號碼歷年走勢</h4>
          <Button variant="warning" onClick={this.showNumberAll}>查詢</Button>
          <div>
            {this.state.showAllNumber && this.renderNumberAll() }
          </div>
          
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