import React from 'react'
import { connect } from 'react-redux'
import { addReminder } from '../redux/actions/reminders'
import '../App.css'

import moment from 'moment'
import Modal from './modal'
import ReminderForm from './reminderForm'

export class CreateReminderModal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (data) {
    this.props.addReminder({
      color: data.color,
      text: data.text,
      city: data.city,
      date: moment(data.date),
      time: data.time
    })
  }

  render () {
    const body = <ReminderForm
      date={this.props.date}
      toggleModal={this.props.toggleModal}
      handleSubmit={this.handleSubmit}
      labelButton='Create'
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

const mapDispatchToProps = (dispatch) => ({
  addReminder: (reminder) => dispatch(addReminder(reminder))
})

export default connect(null, mapDispatchToProps)(CreateReminderModal)
