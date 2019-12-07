import React from 'react'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'

import PropTypes from 'prop-types'
import './table.scss'
import MyModal from '../myModal/myModal'

export default class MyTable extends React.PureComponent  {
  static propTypes = {
    remove: PropTypes.func.isRequired,
    add: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    datas: PropTypes.array.isRequired
  }
  state = {
    saveTmpChecked: [],
    showAlert: false
  }
  markClick = (event) => {
    let { id : domId } = event.currentTarget.dataset
    if (event.currentTarget.classList.contains('mark')) {
      let disableIndex = this.state.saveTmpChecked.findIndex( item => item === domId)
      let newTmpChecked = [...this.state.saveTmpChecked]
      newTmpChecked.splice(disableIndex, 1)
      this.setState({
        saveTmpChecked: newTmpChecked
      })
    } else {
      this.setState({
        saveTmpChecked: [...this.state.saveTmpChecked, domId]
      })
    }
    event.currentTarget.classList.toggle('mark')
  }

  doDelAlert = () => {
    this.setState({
      showAlert: true
    })
  }

  cancel = () => {
    this.setState({
      showAlert: false
    })
  }

  doDel = () => {
    this.props.remove(this.state.saveTmpChecked)
    this.setState({
      showAlert: false,
      saveTmpChecked: []
    })
  }

  doUpdate = () => {
    // console.log(this.state.saveTmpChecked)
    // only one
    this.props.update(this.state.saveTmpChecked[0])
  }

  renderHtml(datas) {
    return datas.map((item, rowIndex) => {
      let id = item.id
      return (
        <tr key={`tr${id}`} onClick={ this.markClick } className="row-item" data-id={id}>
          <td className="d-none d-md-table-cell" key={`rd${id}`}>{id}</td>
          {
            Object.keys(item).map(index => (
              index !== 'id' && <td key={`${id}${index}`}>{item[index]}</td>
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

        <div className="action-wrap">
          <Button variant="info" className="mr-1" onClick={this.props.add}>新增</Button>
          {
            this.state.saveTmpChecked.length === 1 && <Button variant="info" className="mr-1" onClick={this.doUpdate}>修改</Button>
          }
          {
            this.state.saveTmpChecked.length > 0 && <Button variant="info" onClick={this.doDelAlert}>刪除</Button>
          }
          
        </div>
        <MyModal show={this.state.showAlert} cancel={this.cancel} doDel={this.doDel}></MyModal>
      </div>
    )
  }
}
