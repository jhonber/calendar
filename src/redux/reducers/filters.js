import moment from 'moment'
// Filters Reducer

const filtersReducerDefaultState = {
  startDate: moment().startOf('month'),
  endDate: moment().endOf('month')
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
