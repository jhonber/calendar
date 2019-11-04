import React from 'react'
import { Form } from 'react-bootstrap'
import { HuePicker } from 'react-color'

export default class AddReminder extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      color: '#FF6900',
      text: '',
      city: ''
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
          <Form.Control type='text' placeholder='Date' />
          <Form.Control type='text' placeholder='Time' />
        </Form.Group>
      </Form>
    )
  }
}
