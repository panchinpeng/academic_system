import React from 'react'
import Table from 'react-bootstrap/Table'

export default class myTable extends React.Component {
  renderHtml(datas) {
    return datas.map((item, rowIndex) => {
      return (
        <tr key={rowIndex}>
          <td>{rowIndex + 1}</td>
          {
            Object.keys(item).map(index => (
              <td key={item[index]}>{item[index]}</td>
            ))
          }
        </tr>
      )
    })

  }
  render() {
    console.log('table', this.props)
    return (
      <Table striped bordered hover style={{backgroundColor: '#fff'}}>
        <thead>
          <tr>
            <th>#</th>
            {this.props.titles.map( (item, index) => <th key={index} >{item}</th>)}
          </tr>
        </thead>
        <tbody>
          { this.renderHtml(this.props.datas) }
        </tbody>
      </Table>
    )
  }
}