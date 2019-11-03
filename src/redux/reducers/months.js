
import moment from 'moment'

const rows = 6
const columns = 7
let nextMonth, nextYear, nextDate, nextInitialDayOfWeek, nextNumberOfDays
const currentDate = moment().startOf('month')
const startDate = moment().startOf('month').format('YYYY-MM-DD')
const endDate = moment().endOf('month').format('YYYY-MM-DD')

const getStartDate = (year, month) => {
  return moment(year + '-' + (month + 1) + '-01', 'YYYY-MM-DD')
}

const getEndDate = (year, month, days) => {
  return moment(year + '-' + (month + 1) + '-' + days, 'YYYY-MM-DD')
}

const fillBoard = (initialDayOfWeek, numberOfDays) => {
  let cntDays = 1

  const board = Array(rows)
  board[0] = Array(columns).fill(-1)
  for (let i = 1; i < rows; ++i) {
    const curRow = Array(columns).fill(0)
    const init = (i === 1 ? initialDayOfWeek : 0)
    for (let j = init; j < columns; ++j) {
      curRow[j] = cntDays
      if (cntDays >= numberOfDays && cntDays < 100) {
        cntDays = 101
      } else {
        cntDays++
      }
    }
    board[i] = curRow
  }
  return board
}

const monthInit = {
  startDate: startDate,
  endDate: endDate,
  year: currentDate.year(),
  month: currentDate.month(),
  initialDayOfWeek: currentDate.day(),
  numberOfDays: currentDate.daysInMonth(),
  boardCalendar: fillBoard(currentDate.day(), currentDate.daysInMonth())
}

const months = (state = monthInit, action) => {
  switch (action.type) {
    case 'INCREMENT':
      nextMonth = (state.month + 1) % 12
      nextYear = nextMonth === 0 ? state.year + 1 : state.year
      nextDate = getStartDate(nextYear, nextMonth)
      nextInitialDayOfWeek = nextDate.day()
      nextNumberOfDays = nextDate.daysInMonth()
      return {
        startDate: nextDate,
        endDate: getEndDate(nextYear, nextMonth, nextNumberOfDays),
        year: nextYear,
        month: nextMonth,
        initialDayOfWeek: nextInitialDayOfWeek,
        numberOfDays: nextNumberOfDays,
        boardCalendar: fillBoard(nextInitialDayOfWeek, nextNumberOfDays)
      }
    case 'DECREMET':
      nextMonth = (state.month - 1 + 12) % 12
      nextYear = nextMonth === 11 ? state.year - 1 : state.year
      nextDate = getStartDate(nextYear, nextMonth)
      nextInitialDayOfWeek = nextDate.day()
      nextNumberOfDays = nextDate.daysInMonth()
      return {
        startDate: nextDate,
        endDate: getEndDate(nextYear, nextMonth, nextNumberOfDays),
        year: nextYear,
        month: nextMonth,
        initialDayOfWeek: nextInitialDayOfWeek,
        numberOfDays: nextNumberOfDays,
        boardCalendar: fillBoard(nextInitialDayOfWeek, nextNumberOfDays)
      }
    default:
      return state
  }
}

export default months
