import moment from 'moment'
// Filters Reducer

const stringStartDate = moment().format('YYYY-MM-01')
const stringEndDate = moment().format('YYYY-MM-') + moment().daysInMonth()

const filtersReducerDefaultState = {
  startDate: moment(stringStartDate),
  endDate: moment(stringEndDate)
}

export default (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate
      }
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate
      }
    default:
      return state
  }
}
