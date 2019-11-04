import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { HuePicker } from 'react-color'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default class CreateReminder extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      color: '#FF6900',
      text: '',
      city: '',
      date: new Date(this.props.date),
      time: new Date()
    }

    this.handleColor = this.handleColor.bind(this)
    this.handleText = this.handleText.bind(this)
    this.handleCity = this.handleCity.bind(this)
    this.handleDate = this.handleDate.bind(this)
    this.handleTime = this.handleTime.bind(this)
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
    console.log('DATE: ', date)
    this.setState({
      date: date
    }, () => {
      console.log('UPDATED date')
      console.log(this.state.date)
    })
  }

  handleSubmit () {
    this.props.handleSubmitCreateReminder(this.state)
  }

  render () {
    console.log('PROPS')
    console.log(this.props)
    return (
      <Form>
        <Form.Group controlId='formBasicEmail' className='createForm'>
          <HuePicker
            width='100%'
            color={this.state.color}
            onChangeComplete={this.handleColor}
          />
          <Form.Control
            onChange={(e) => this.handleText(e)}
            type='text'
            placeholder='Text'
          />
          <Form.Control
            onChange={(e) => this.handleCity(e)}
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
        <Button
          className='actionButton'
          onClick={this.handleSubmit}>
          Create
        </Button>
      </Form>
    )
  }
}
