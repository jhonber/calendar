import { addReminder } from '../../redux/actions/reminders'
import remindersReducer from '../../redux/reducers/reminders'
import uuid from 'uuid'
import moment from 'moment'

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

describe('actions ADD_REMINDER ', () => {
  it('should create an action to add a reminder', () => {
    const expectedAction = {
      type: ADD_REMINDER,
      reminder
    }

    expect(addReminder(reminder)).toEqual(expectedAction)
  })
})

describe('reducers ADD_REMINDER', () => {
  it('should return the initial state', () => {
    expect(remindersReducer(undefined, {}))
      .toEqual([])
  })

  it('should handle ADD_REMINDER', () => {
    const expectedState = reminder
    expect(
      remindersReducer([], {
        type: ADD_REMINDER,
        reminder: reminder
      })
    ).toEqual([expectedState])

    const otherReminder = {
      id: uuid(),
      text: 'My other reminder',
      color: '#000',
      date: moment().startOf('month'),
      time: 666666666,
      city: 'Pereira'
    }

    expect(
      remindersReducer(
        [
          reminder
        ],
        {
          type: ADD_REMINDER,
          reminder: otherReminder
        }
      )
    ).toEqual([
      reminder,
      otherReminder
    ])
  })
})
