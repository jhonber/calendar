import remindersReducer from '../../../redux/reducers/reminders'
import uuid from 'uuid'
import moment from 'moment'

/*eslint-disable */
const ADD_REMINDER = 'ADD_REMINDER'

jest.mock('uuid')
uuid.mockImplementation(() => 'testid')

const initialState = []
const reminder = {
  id: uuid(),
  text: 'My reminder',
  color: '#fff',
  date: moment().startOf('day'),
  time: 123456789,
  city: 'London'
}

describe('reducers ADD_REMINDER', () => {
  it('should return the initial state', () => {
    const state = remindersReducer(undefined, {})
    expect(state).toEqual(initialState)
  })

  it('should add a reminder', () => {
    const expectedState = [reminder]
    const action = {
      type: ADD_REMINDER,
      reminder: reminder
    }

    const state = remindersReducer(initialState, action)
    expect(state).toEqual(expectedState)
  })
})
