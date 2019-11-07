import React from 'react'
import { connect } from 'react-redux'
import { addReminder } from '../redux/actions/reminders'
import '../App.css'

import moment from 'moment'
import Modal from './modal'
import CreateReminderForm from './createReminderForm'

class CreateReminderModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleColor (color, event) {
    this.setState({
      color: color.hex
    })
  }

  handleText (e) {
    this.setState({
      text: e.target.value
    })
  }

  handleCity (e) {
    this.setState({
      city: e.target.value
    })
  }

  handleTime (time) {
    this.setState({
      time: time
    })
  }

  handleDate (date) {
    this.setState({
      date: date
    })
  }

  handleSubmit (data) {
    this.props.dispatch(addReminder({
      color: data.color,
      text: data.text,
      city: data.city,
      date: moment(data.date),
      time: data.time
    }))
  }

  render () {
    const body = <CreateReminderForm
      date={this.props.date}
      toggleModal={this.props.toggleModal}
      handleSubmit={this.handleSubmit}
    />

    return (
      <div>
        <Modal
          visible={this.props.visible}
          body={body}
          okButton
          okButtonText='Add'
          closeButton
          handleOkButton={() => this.handleSubmit()}
          handleToggleModal={this.props.toggleModal}
        />
      </div>
    )
  }
}

export default connect()(CreateReminderModal)