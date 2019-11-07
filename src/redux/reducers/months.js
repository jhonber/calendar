
import {
  getStartDate,
  getEndDate,
  getNextMonth,
  getNextYear,
  getPrevMonth,
  getPrevYear,
  getCurrentDate,
  getCurrentStartDate,
  getCurrentEndDate,
  getLastDayPreviousMonth
} from '../../utils'

const rows = 6
const columns = 7
let nextMonth, nextYear, nextDate, nextInitialDayOfWeek,
  nextNumberOfDays, lastDayPreviousMonth
const currentDate = getCurrentDate()
const startDate = getCurrentStartDate()
const endDate = getCurrentEndDate()

lastDayPreviousMonth = getLastDayPreviousMonth(currentDate)

const fillBoard = (initialDayOfWeek, numberOfDays, lastDayPreviousMonth) => {
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

    for (let j = init - 1; j >= 0; --j) {
      curRow[j] = -lastDayPreviousMonth
      lastDayPreviousMonth--
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
  boardCalendar: fillBoard(currentDate.day(), currentDate.daysInMonth(), lastDayPreviousMonth)
}

const months = (state = monthInit, action) => {
  switch (action.type) {
    case 'INCREMENT':
      lastDayPreviousMonth = getStartDate(state.year, state.month).daysInMonth()
      nextMonth = getNextMonth(state.month)
      nextYear = getNextYear(nextMonth, state.year)
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
        boardCalendar: fillBoard(nextInitialDayOfWeek, nextNumberOfDays, lastDayPreviousMonth)
      }
    case 'DECREMET':
      lastDayPreviousMonth = getStartDate(state.year, state.month).daysInMonth()
      nextMonth = getPrevMonth(state.month)
      nextYear = getPrevYear(nextMonth, state.year)
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
        boardCalendar: fillBoard(nextInitialDayOfWeek, nextNumberOfDays, lastDayPreviousMonth)
      }
    default:
      return state
  }
}

export default months
