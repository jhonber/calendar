import { addReminder } from '../../../redux/actions/reminders'
import uuid from 'uuid'
import moment from 'moment'

/*eslint-disable */
const ADD_REMINDER = 'ADD_REMINDER'

jest.mock('uuid')
uuid.mockImplementation(() => 'testid')

const reminder = {
  id: uuid(),
  text: 'My reminder',
  color: '#fff',
  date: moment().startOf('day'),
  time: 123456789,
  city: 'London'
}

describe('actions ADD_REMINDER', () => {
  it('should setup add reminder action object with provided data', () => {
    const expectedAction = {
      type: ADD_REMINDER,
      reminder
    }

    const action = addReminder(reminder)
    expect(action).toEqual(expectedAction)
  })

  it('should setup add reminder action object with default data', () => {
    const dafaultData = {
      id: uuid(),
      text: '',
      color: '',
      date: '',
      time: '',
      city: ''
    }

    const expectedAction = {
      type: ADD_REMINDER,
      reminder: dafaultData
    }
    const action = addReminder()
    expect(action).toEqual(expectedAction)
  })
})