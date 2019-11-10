import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { CirclePicker } from 'react-color'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { colorPalette, MaxLengthText } from './constants'
import {
  getDateObjectFromString,
  getTimeObjectFromString
} from '../utils'

const Joi = require('@hapi/joi')

const dataForm = Joi.object({
  color: Joi.string()
    .pattern(/^#[0-9a-f]{6}$/)
    .max(7)
    .required(),
  text: Joi.string()
    .min(1)
    .max(30)
    .required(),
  city: Joi.string()
    .min(1)
    .required(),
  date: Joi.date(),
  time: Joi.date(),
  validated: Joi.boolean()
})

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

  handleColor (color) {
    this.setState({
      color: color.hex
    })
  }

  handleText (event) {
    this.setState({
      text: event.target.value
    })
  }

  handleCity (event) {
    this.setState({
      city: event.target.value
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
    const out = dataForm.validate(this.state)

    if (Object.prototype.hasOwnProperty.call(out, 'error')) {
      const message = out.error.details[0].message
      window.alert(message)
      return
    }

    if (event.target.checkValidity() !== false) {
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
                onChange={(event) => this.handleText(event)}
                type='text'
                value={this.state.text}
                placeholder='Text'
                maxLength={MaxLengthText}
                required
              />
              <Form.Control.Feedback type='invalid'>
                Please enter a text (30 max)
              </Form.Control.Feedback>
            </div>
            <div className='inputField'>
              <Form.Control
                onChange={(event) => this.handleCity(event)}
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
