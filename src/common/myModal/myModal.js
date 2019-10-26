import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import PropTypes from 'prop-types'

import './myModal.scss'

class MyModal extends React.Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    cancel: PropTypes.func.isRequired,
    doDel: PropTypes.func.isRequired
  }
  render() {
    return (
      <div>
        <Modal show={this.props.show}> 
          <Modal.Body>
            <p>確定要刪除嗎??</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.cancel}>取消</Button>
            <Button variant="primary" onClick={ this.props.doDel }>確定</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

export default MyModal