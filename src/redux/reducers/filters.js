import moment from 'moment'
import {
  getStringCurrentStartDate,
  getStringCurrentEndDate
} from '../../utils'

const stringStartDate = getStringCurrentStartDate()
const stringEndDate = getStringCurrentEndDate()

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
