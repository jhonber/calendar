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
        size='sm'
        className='actionButton'
        variant='danger'
        onClick={this.props.handleToggleModal}>
        Close
      </Button>
      : null

    const closeTopRight = this.props.closeTopRight
      ? <span
        onClick={this.props.handleToggleModal}
        className='top-right close'>
        x
      </span>
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
          {closeTopRight}
          {this.props.body}
          {closeButton}
        </Modal.Body>
      </Modal>
    )
  }
}
