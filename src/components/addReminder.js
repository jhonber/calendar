import React from 'react'
import { Form } from 'react-bootstrap'
import { HuePicker } from 'react-color'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default class AddReminder extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      color: '#FF6900',
      text: '',
      city: '',
      time: new Date(),
      date: new Date()
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleText = this.handleText.bind(this)
    this.handleCity = this.handleCity.bind(this)
  }

  handleChange (color, event) {
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

  render () {
    console.log('state')
    console.log(this.state)
    return (
      <Form>
        <Form.Group controlId='formBasicEmail'>
          <HuePicker
            width='100%'
            color={this.state.color}
            onChangeComplete={this.handleChange}
          />
          <Form.Control
            onChange={this.handleText}
            type='text'
            placeholder='Text'
          />
          <Form.Control
            onChange={this.handleCity}
            type='text'
            placeholder='City'
          />
          <DatePicker
            selected={this.state.date}
            onChange={date => this.handleDate(date)}
          />

          <DatePicker
            selected={this.state.time}
            onChange={time => this.handleTime(time)}
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
