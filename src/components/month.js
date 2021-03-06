import React from 'react'
import uuid from 'uuid'
import { connect } from 'react-redux'
import getRemindersRange from '../redux/selectors/reminders'
import { incrementMonth, decrementMonth } from '../redux/actions/months'
import { setStartDate, setEndDate } from '../redux/actions/filters'
import { daysOfWeek, monthsOfYear } from './constants'
import '../App.css'

import {
  getStartDate,
  getEndDate,
  getNextMonth,
  getNextYear,
  getPrevMonth,
  getPrevYear,
  getCurrentDateByDate
} from '../utils'

import CreateReminderModal from './createReminderModal'
import Header from './header'
import Day from './day'

class Month extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      monthName: null,
      clickedDate: null,
      showCreateReminderModal: false
    }

    this.handleNextMonth = this.handleNextMonth.bind(this)
    this.handlePrevMonth = this.handlePrevMonth.bind(this)
    this.handleClickCreateReminder = this.handleClickCreateReminder.bind(this)
    this.toggleReminderModal = this.toggleReminderModal.bind(this)
  }

  componentDidMount () {
    this.setState({
      monthName: monthsOfYear[this.props.storeMonth.month]
    })
  }

  filterRemindersByDay (reminders, curDay) {
    return reminders.filter((reminder) => {
      return reminder.date.date() === curDay
    })
  }

  renderDay (data) {
    return <Day
      key={uuid()}
      dayName={data.dayName}
      monthName={this.state.monthName}
      label={data.label}
      disable={data.disable}
      date={data.date}
      holiday={data.holiday}
      handleClickCreateReminder={data.handle}
      reminders={data.reminders}
    />
  }

  renderRows (rows) {
    return rows.map((curDay, dayIndex) => {
      const year = this.props.storeMonth.year
      const month = this.props.storeMonth.month
      const date = getCurrentDateByDate(year, month, curDay)
      const data = {
        dayName: daysOfWeek[dayIndex],
        label: (curDay % 100) < 0 ? -curDay : curDay % 100,
        disable: curDay < 1 || curDay > 31,
        date: date,
        holiday: dayIndex === 0 || dayIndex === 6,
        handle: this.handleClickCreateReminder,
        reminders: this.filterRemindersByDay(this.props.reminders, curDay)
      }

      const dayView = this.renderDay(data)
      const headerView = <div
        key={uuid()}
        className='Month-header Header'
      >
        <Header
          label={daysOfWeek[dayIndex]}
          styleName='Day-name'
        />
      </div>

      return (curDay === -1 ? headerView : dayView)
    })
  }

  createBoard () {
    return (
      this.props.storeMonth.boardCalendar.map((rows) => {
        return (
          <div key={uuid()} className='Row-style-center'>
            {this.renderRows(rows)}
          </div>
        )
      })
    )
  }

  toggleReminderModal () {
    this.setState({
      showCreateReminderModal: !this.state.showCreateReminderModal
    })
  }

  handleNextMonth () {
    this.props.incrementMonth()

    const nextMonth = getNextMonth(this.props.storeMonth.month)
    const nextYear = getNextYear(nextMonth, this.props.storeMonth.year)
    const nextDate = getStartDate(nextYear, nextMonth)
    const nextNumberOfDays = nextDate.daysInMonth()

    this.setState({
      monthName: monthsOfYear[nextMonth]
    })

    const endDate = getEndDate(nextYear, nextMonth, nextNumberOfDays)
    this.props.setStartDate(nextDate)
    this.props.setEndDate(endDate)
  }

  handlePrevMonth () {
    this.props.decrementMonth()

    const nextMonth = getPrevMonth(this.props.storeMonth.month)
    const nextYear = getPrevYear(nextMonth, this.props.storeMonth.year)
    const nextDate = getStartDate(nextYear, nextMonth)
    const nextNumberOfDays = nextDate.daysInMonth()

    this.setState({
      monthName: monthsOfYear[nextMonth]
    })

    const endDate = getEndDate(nextYear, nextMonth, nextNumberOfDays)
    this.props.setStartDate(nextDate)
    this.props.setEndDate(endDate)
  }

  handleClickCreateReminder (date) {
    this.setState({
      clickedDate: date,
      showCreateReminderModal: true
    })
  }

  render () {
    const year = this.props.storeMonth.year
    const title = <div className='Title'>
      {this.state.monthName} {year}
    </div>

    const createReminderModalView = <CreateReminderModal
      visible={this.state.showCreateReminderModal}
      toggleModal={this.toggleReminderModal}
      date={this.state.clickedDate}
    />

    return (
      <div>
        <div className='Row-style-center'>
          <span
            onClick={this.handlePrevMonth}
            className='fas fa-chevron-left manage-button'
          />
          {title}
          <span
            onClick={this.handleNextMonth}
            className='fas fa-chevron-right manage-button'
          />
        </div>
        <div className='Column-style'>
          {this.createBoard()}
          {createReminderModalView}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    storeMonth: state.months,
    reminders: getRemindersRange(state.reminders, state.filters)
  }
}

const mapDispatchProps = (dispatch) => ({
  setStartDate: (startDate) => dispatch(setStartDate(startDate)),
  setEndDate: (endDate) => dispatch(setEndDate(endDate)),
  incrementMonth: () => dispatch(incrementMonth()),
  decrementMonth: () => dispatch(decrementMonth())
})

export default connect(mapStateToProps, mapDispatchProps)(Month)
