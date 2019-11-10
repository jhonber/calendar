import React from 'react'
import { shallow } from 'enzyme'
import ReminderForm from '../../components/reminderForm'
import toJSON from 'enzyme-to-json'
import timemachine from 'timemachine'

/*eslint-disable */
let props, reminder, now
global.window.alert = jest.fn()

describe('add reminder', () => {
  beforeAll (() => {
    timemachine.config({
      dateString: 'December 25, 1991 13:12:59'
    });

    reminder = {
      id: 1234,
      text: 'My cool reminder',
      city: 'Pereira',
      color: '#cddc39',
      date: '2019-11-10',
      time: '20:00'
    }

    now = new Date()

    props = {
      date: now,
      toggleModal: jest.fn(),
      handleSubmit: jest.fn(),
      labelButton: 'Create',
      reminder: reminder
    }
  })

  afterEach(() => {
    global.window.alert.mockClear()
    props.handleSubmit.mockClear()
  })

  it('should render reminder form correctly', () => {
    const wrapper = shallow(<ReminderForm {...props} />)
    expect(toJSON(wrapper)).toMatchSnapshot()
  })

  it('should not call handleSubmit: form.checkValidity() = false', () => {
    const wrapper = shallow(<ReminderForm {...props} />)

    wrapper.find('Form').props().onSubmit({
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      target: {
        checkValidity: () => false
      }
    })
    expect(props.handleSubmit).toBeCalledTimes(0)
  })

  it('should call handleSubmit: second validation should be true', () => {
    const wrapper = shallow(<ReminderForm {...props} />)

    wrapper.find('Form').props().onSubmit({
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      target: {
        checkValidity: () => true
      }
    })
    expect(props.handleSubmit).toBeCalledTimes(1)
  })

  it('should show error: maximum allowed length of text is 30', () => {
    const wrapper = shallow(<ReminderForm {...props} />)
    const state = {
      text: 'The text is greater than 30 characters'
    }
    const expectedError = '"text" length must be ' +
      'less than or equal to 30 characters long'

    wrapper.setState(state)

    wrapper.find('Form').props().onSubmit({
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      target: {
        checkValidity: () => true
      }
    })

    expect(props.handleSubmit).toBeCalledTimes(0)
    expect(window.alert).toHaveBeenCalledWith(expectedError)
  })

  it('should show error: color fails match pattern', () => {
    const wrapper = shallow(<ReminderForm {...props} />)
    const state = {
      color: '#invalid'
    }
    const expectedError = '"color" with value "#invalid" ' +
      'fails to match the required pattern: /^#[0-9a-f]{6}$/'

    wrapper.setState(state)

    wrapper.find('Form').props().onSubmit({
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      target: {
        checkValidity: () => true
      }
    })

    expect(props.handleSubmit).toBeCalledTimes(0)
    expect(window.alert).toHaveBeenCalledWith(expectedError)
  })

  it('should show error: city must be a string', () => {
    const wrapper = shallow(<ReminderForm {...props} />)
    const state = {
      city: 1234
    }
    const expectedError = '"city" must be a string'

    wrapper.setState(state)

    wrapper.find('Form').props().onSubmit({
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      target: {
        checkValidity: () => true
      }
    })

    expect(props.handleSubmit).toBeCalledTimes(0)
    expect(window.alert).toHaveBeenCalledWith(expectedError)
  })

  it('should show error: date must be a valid date', () => {
    const wrapper = shallow(<ReminderForm {...props} />)
    const state = {
      date: 'invalid'
    }
    const expectedError = '"date" must be a valid date'

    wrapper.setState(state)

    wrapper.find('Form').props().onSubmit({
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      target: {
        checkValidity: () => true
      }
    })

    expect(props.handleSubmit).toBeCalledTimes(0)
    expect(window.alert).toHaveBeenCalledWith(expectedError)
  })

  it('should show error: time must be a valid date', () => {
    const wrapper = shallow(<ReminderForm {...props} />)
    const state = {
      time: 'invalid'
    }
    const expectedError = '"time" must be a valid date'

    wrapper.setState(state)

    wrapper.find('Form').props().onSubmit({
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      target: {
        checkValidity: () => true
      }
    })

    expect(props.handleSubmit).toBeCalledTimes(0)
    expect(window.alert).toHaveBeenCalledWith(expectedError)
  })

  it('call handle submit with correct reminder data', () => {
    const wrapper = shallow(<ReminderForm {...props} />)
    const expectedData = {
      text: reminder.text,
      color: reminder.color,
      city: reminder.city,
      date: expect.any(Date),
      time: expect.any(Date),
      id: reminder.id,
      validated: expect.any(Boolean)
    }

    wrapper.find('Form').props().onSubmit({
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      target: {
        checkValidity: () => true
      }
    })

    expect(props.handleSubmit).toBeCalledTimes(1)
    expect(props.handleSubmit.mock.calls[0][0]).toEqual(expectedData)
  })

  it('call handle submit with correct reminder data and call toggleModal', () => {
    const customProp = {
      date: props.date,
      toggleModal: props.toggleModal,
      handleSubmit: props.handleSubmit,
      labelButton: 'Create'
    }

    const wrapper = shallow(<ReminderForm {...customProp} />)

    wrapper.setState({
      text: reminder.text,
      color: reminder.color,
      city: reminder.city
    })

    const expectedData = {
      text: reminder.text,
      color: reminder.color,
      city: reminder.city,
      date: expect.any(Date),
      time: expect.any(Date),
      validated: expect.any(Boolean)
    }

    wrapper.find('Form').props().onSubmit({
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      target: {
        checkValidity: () => true
      }
    })

    expect(props.toggleModal).toBeCalledTimes(1)
    expect(props.handleSubmit).toBeCalledTimes(1)
    expect(props.handleSubmit.mock.calls[0][0]).toEqual(expectedData)
  })
})
