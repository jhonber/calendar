import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { HuePicker } from 'react-color'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export default class CreateReminderForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      color: '#FF6900',
      text: '',
      city: '',
      date: new Date(this.props.date),
      time: new Date(this.props.date).getTime(),
      validated: false
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
      time: time.getTime()
    })
  }

  handleDate (date) {
    console.log('DATE: ', date)
    this.setState({
      date: date
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    event.stopPropagation()
    const form = document.getElementById('createFormId')

    if (form.checkValidity() !== false) {
      this.props.handleSubmit(this.state)
      this.props.toggleModal()
    }

    this.setState({
      validated: true
    })
  }

  render () {
    return (
      <div className='createForm'>
        <Form
          noValidate
          validated={this.state.validated}
          onSubmit={this.handleSubmit}
          id='createFormId'
        >
          <Form.Group controlId='formBasicEmail' className='createForm'>
            <div className='inputField'>
              <HuePicker
                width='100%'
                color={this.state.color}
                onChangeComplete={this.handleColor}
              />
            </div>
            <div className='inputField'>
              <Form.Control
                onChange={(e) => this.handleText(e)}
                type='text'
                placeholder='Text'
                maxLength={30}
                required
              />
              <Form.Control.Feedback type='invalid'>
                Please enter a text (30 max)
              </Form.Control.Feedback>
            </div>
            <div className='inputField'>
              <Form.Control
                onChange={(e) => this.handleCity(e)}
                type='text'
                placeholder='City'
                required
              />
              <Form.Control.Feedback type='invalid'>
                  Please enter a city
              </Form.Control.Feedback>
            </div>
            <div className='inputField'>
              <DatePicker
                selected={this.state.date}
                onChange={date => this.handleDate(date)}
              />
            </div>
            <div className='inputField'>
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
            </div>
          </Form.Group>
          <Button
            type='submit'
            className='actionButton'
          >
            Create
          </Button>
        </Form>
      </div>
    )
  }
}
