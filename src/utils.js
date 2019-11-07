import moment from 'moment'

export const getNextMonth = (curMonth) => {
  return (curMonth + 1) % 12
}

export const getNextYear = (nextMonth, curYear) => {
  return nextMonth === 0 ? curYear + 1 : curYear
}

export const getPrevMonth = (curMonth) => {
  return (curMonth - 1 + 12) % 12
}

export const getPrevYear = (nextMonth, curYear) => {
  return nextMonth === 11 ? curYear - 1 : curYear
}

export const getStartDate = (year, month) => {
  return moment(year + '-' + (month + 1) + '-01', 'YYYY-MM-DD')
}

export const getEndDate = (year, month, days) => {
  return moment(year + '-' + (month + 1) + '-' + days, 'YYYY-MM-DD')
}

export const getCurrentDate = () => {
  return moment().startOf('month')
}

export const getCurrentStartDate = () => {
  return moment().startOf('month')
}

export const getCurrentEndDate = () => {
  return moment().endOf('month').format('YYYY-MM-DD')
}

export const getLastDayPreviousMonth = (currentDate) => {
  return moment(currentDate)
    .subtract(1, 'months').endOf('month').daysInMonth()
}
