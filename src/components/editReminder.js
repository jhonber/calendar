import React from 'react'
import { connect } from 'react-redux'
import { editReminder } from '../redux/actions/reminders'
import '../App.css'

import moment from 'moment'
import ReminderForm from './reminderForm'

class EditReminder extends React.Component {
  constructor (props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit (data) {
    this.props.editReminder(data.id, {
      color: data.color,
      text: data.text,
      city: data.city,
      date: moment(data.date),
      time: data.time
    })
  }

  render () {
    return (
      <ReminderForm
        date={this.props.date}
        reminder={this.props.reminder}
        handleSubmit={this.handleSubmit}
        labelButton='Edit'
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  editReminder: (id, reminder) => dispatch(editReminder(id, reminder))
})

export default connect(null, mapDispatchToProps)(EditReminder)
