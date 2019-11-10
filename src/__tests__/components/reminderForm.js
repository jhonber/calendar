import React from 'react'
import { shallow } from 'enzyme'
import ReminderForm from '../../components/reminderForm'
import toJSON from 'enzyme-to-json'

let now, props

/*eslint-disable */
describe('<ReminderForm />', () => {
  beforeAll (() => {
    const curDate = 1573340175550
    now = new Date(curDate)
    global.Date = jest.fn(() => now)

    props = {
      date: now,
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
