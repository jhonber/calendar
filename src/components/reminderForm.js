import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { CirclePicker } from 'react-color'
import DatePicker from 'react-datepicker'
import { colorPalette } from './constants'
import 'react-datepicker/dist/react-datepicker.css'

import {
  getDateObjectFromString,
  getTimeObjectFromString
} from '../utils'

export default class ReminderForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      color: props.reminder ? props.reminder.color : '#9c27b0',
      text: props.reminder ? props.reminder.text : '',
      city: props.reminder ? props.reminder.city : '',
      date: null,
      time: null,
      validated: false
    }

    this.handleColor = this.handleColor.bind(this)
    this.handleText = this.handleText.bind(this)
    this.handleCity = this.handleCity.bind(this)
    this.handleDate = this.handleDate.bind(this)
    this.handleTime = this.handleTime.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    if (this.props.reminder) {
      this.setState({
        date: getDateObjectFromString(this.props.reminder.date),
        time: getTimeObjectFromString(this.props.reminder.time)
      })
    } else {
      this.setState({
        date: new Date(this.props.date),
        time: new Date()
      })
    }
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
    this.setState({
      date: date
    })
  }

  handleSubmit (event) {
    event.preventDefault()
    event.stopPropagation()
    const form = document.getElementById('createFormId')

    if (form.checkValidity() !== false) {
      if (this.props.reminder) {
        const id = this.props.reminder.id
        this.props.handleSubmit({
          ...this.state,
          id
        })
      } else {
        this.props.toggleModal()
        this.props.handleSubmit(this.state)
      }
    }

    this.setState({
      validated: true
    })
  }

  render () {
    return (
      <div className='create-form'>
        <Form
          noValidate
          validated={this.state.validated}
          onSubmit={this.handleSubmit}
          id='createFormId'
        >
          <Form.Group controlId='formBasicEmail' className='create-form-body'>
            <div className='inputField palette'>
              <CirclePicker
                colors={colorPalette}
                color={this.state.color}
                circleSpacing={5}
                onChangeComplete={this.handleColor}
              />
            </div>
            <div className='inputField'>
              <Form.Control
                onChange={(e) => this.handleText(e)}
                type='text'
                value={this.state.text}
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
                value={this.state.city}
                placeholder='City'
                required
              />
              <Form.Control.Feedback type='invalid'>
                  Please enter a city
              </Form.Control.Feedback>
            </div>
            <div className='inputField Row-style-center'>
              <DatePicker
                className='date-picker-style'
                selected={this.state.date}
                onChange={date => this.handleDate(date)}
              />
              <DatePicker
                className='date-picker-style'
                selected={this.state.time}
                onChange={time => this.handleTime(time)}
                showTimeSelect
                showTimeSelectOnly
                timeFormat='HH:00'
                timeIntervals={60}
                timeCaption='Hour'
                dateFormat='HH:00'
              />
            </div>
          </Form.Group>
          <Button
            size='sm'
            type='submit'
            className='action-button create-button'
          >
            {this.props.labelButton}
          </Button>
        </Form>
      </div>
    )
  }
}
