import React from 'react'
import { Button, Modal } from 'react-bootstrap'

export default class MyModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: this.props.visible
    }
  }

  render () {
    const closeButton = this.props.closeButton
      ? <Button
        className='actionButton'
        variant='secondary'
        onClick={this.props.handleToggleModal}>
        Close
      </Button>
      : null

    return (
      <Modal
        show={this.props.visible}
        onHide={this.props.handleToggleModal}
        size='sm'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Body>
          {this.props.body}
          {closeButton}
        </Modal.Body>
      </Modal>
    )
  }
}
