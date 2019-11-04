import React from 'react'
import { Form } from 'react-bootstrap'
import { HuePicker } from 'react-color'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default class AddReminder extends React.Component {
  render () {
    return (
      <Form>
        <Form.Group controlId='formBasicEmail'>
          <HuePicker
            width='100%'
            color={this.props.state.color}
            onChangeComplete={this.props.handleColor}
          />
          <Form.Control
            onChange={(e) => this.props.handleText(e)}
            type='text'
            placeholder='Text'
          />
          <Form.Control
            onChange={(e) => this.props.handleCity(e)}
            type='text'
            placeholder='City'
          />
          <DatePicker
            selected={this.props.state.date}
            onChange={date => this.props.handleDate(date)}
          />

          <DatePicker
            selected={this.props.state.time}
            onChange={time => this.props.handleTime(time)}
            showTimeSelect
            showTimeSelectOnly
            timeFormat='HH:mm'
            timeIntervals={60}
            timeCaption='time'
            dateFormat='HH:mm'
          />
        </Form.Group>
      </Form>
    )
  }
}
