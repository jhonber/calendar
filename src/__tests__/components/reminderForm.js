import React from 'react'
import { shallow } from 'enzyme'
import ReminderForm from '../../components/reminderForm'
import toJSON from 'enzyme-to-json'
import timemachine from 'timemachine'

let props
/*eslint-disable */
describe('add reminder', () => {
  beforeAll (() => {
    timemachine.config({
      dateString: 'December 25, 1991 13:12:59'
    });

    window.alert = jest.fn()

    props = {
      date: new Date(),
      toggleModal: jest.fn(),
      handleSubmit: jest.fn(),
      labelButton: 'Create'
    }
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

  it('should call handleSubmit: form.checkValidity() = true', () => {
    const wrapper = shallow(<ReminderForm {...props} />)

    const state = {
      text: 'My cool reminder',
      city: 'Pereira',
      color: '#cddc39',
      date: new Date(),
      time: new Date()
    }

    wrapper.setState(state)

    wrapper.find('Form').props().onSubmit({
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
      target: {
        checkValidity: () => true
      }
    })

    expect(props.handleSubmit).toBeCalledTimes(1)
  })
})
