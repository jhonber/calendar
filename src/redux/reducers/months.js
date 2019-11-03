
import moment from 'moment'

let nextMonth, nextYear, nextDate, nextInitialDayOfWeek, nextNumberOfDays
const currentDate = moment()
const monthInit = {
  year: currentDate.year(),
  month: currentDate.month(),
  initialDayOfWeek: currentDate.weekday(),
  numberOfDays: currentDate.daysInMonth()
}

const getDate = (year, month) => {
  return moment(year + '-' + (month + 1) + '-01', 'YYYY-MM-DD')
}

const months = (state = monthInit, action) => {
  switch (action.type) {
    case 'INCREMENT':
      nextMonth = (state.month + 1) % 12
      nextYear = nextMonth === 0 ? state.year + 1 : state.year
      nextDate = getDate(nextYear, nextMonth)
      nextInitialDayOfWeek = nextDate.weekday()
      nextNumberOfDays = nextDate.daysInMonth()
      return {
        year: nextYear,
        month: nextMonth,
        initialDayOfWeek: nextInitialDayOfWeek,
        numberOfDays: nextNumberOfDays
      }
    case 'DECREMET':
      nextMonth = (state.month - 1 + 12) % 12
      nextYear = nextMonth === 11 ? state.year - 1 : state.year
      nextDate = getDate(nextYear, nextMonth)
      nextInitialDayOfWeek = nextDate.weekday()
      nextNumberOfDays = nextDate.daysInMonth()
      return {
        year: nextYear,
        month: nextMonth,
        initialDayOfWeek: nextInitialDayOfWeek,
        numberOfDays: nextNumberOfDays
      }
    default:
      return state
  }
}

export default months
