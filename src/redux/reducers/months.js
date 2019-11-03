
import moment from 'moment'

const currentMonth = moment().month()

const months = (state = currentMonth, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return (state + 1) % 12
    case 'DECREMET':
      return (state - 1 + 12) % 12
    default:
      return state
  }
}

export default months
