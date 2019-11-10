import React from 'react'
import { shallow } from 'enzyme'
import { CreateReminderModal } from '../../components/createReminderModal'
import toJSON from 'enzyme-to-json'
import moment from 'moment'

/*eslint-disable */
describe('create reminder modal', () => {
  it('should render create reminder modal correctly', () => {
    const props = {
      visible: true,
      toggleModal: jest.fn(),
      date: '2019-11-10'
    }

    const wrapper = shallow(<CreateReminderModal {...props} />)
    expect(toJSON(wrapper)).toMatchSnapshot()
  })

  it('should call addReminder with correct data', () => {
    const reminder = {
      text: 'My cool reminder',
      city: 'Pereira',
      color: '#cddc39',
      date: '2019-11-10',
      time: '20:00'
    }

    const props = {
      visible: true,
      toggleModal: jest.fn(),
      date: '2019-11-10',
      reminder: reminder,
      addReminder: jest.fn()
    }

    const expectedData = {
      text: reminder.text,
      city: reminder.city,
      color: reminder.color,
      date: moment(reminder.date),
      time: reminder.time
    }

    const wrapper = shallow(<CreateReminderModal {...props} />)
    wrapper.props().children.props.body.props.handleSubmit(reminder)
    expect(props.addReminder.mock.calls[0][0]).toEqual(expectedData)
  })
})