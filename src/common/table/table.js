import React from 'react'
import Table from 'react-bootstrap/Table'

export default class myTable extends React.PureComponent  {
  // componentDidMount() {
  //   debugger
  // }
  // componentWillUpdate() {
  //   debugger
  // }
  renderHtml(datas) {
    return datas.map((item, rowIndex) => {
      let id = item.id
      delete item.id
      return (
        <tr key={rowIndex + 'tr'}>
          <td className="d-none d-md-table-cell" key={id}>{id}</td>
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
    return (
      <div>
        <Table striped bordered hover style={{backgroundColor: '#fff'}} responsive="md" >
          <thead>
            <tr>
              <th className="d-none d-md-table-cell">#</th>
              {this.props.titles.map( (item, index) => <th key={index} style={item.css ? item.css : {}}>{item.title}</th>)}
            </tr>
          </thead>
          <tbody>
            { this.renderHtml(this.props.datas) }
          </tbody>
        </Table>
      </div>
    )
  }
}