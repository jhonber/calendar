import React from 'react'
import uuid from 'uuid'
import moment from 'moment'
import { connect } from 'react-redux'
import getRemindersRange from '../redux/selectors/reminders'
import { incrementMonth, decrementMonth } from '../redux/actions/months'
import { setStartDate, setEndDate } from '../redux/actions/filters'
import { daysOfWeek, monthsOfYear } from './constants'
import '../App.css'

import CreateReminderModal from './createReminderModal'
import Header from './header'
import Day from './day'

class Month extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      daysOfWeek: daysOfWeek,
      monthsOfYear: monthsOfYear,
      clickedDate: null,
      showCreateReminderModal: false
    }

    this.handleNextMonth = this.handleNextMonth.bind(this)
    this.handlePrevMonth = this.handlePrevMonth.bind(this)
    this.handleClickCreateReminder = this.handleClickCreateReminder.bind(this)
    this.toggleReminderModal = this.toggleReminderModal.bind(this)
  }

  filterRemindersByDay (reminders, curDay) {
    return reminders.filter((reminder) => {
      return reminder.date.date() === curDay
    })
  }

  getDate (data, day) {
    return moment(data.year + '-' + (data.month + 1) +
      '-' + day, 'YYYY-MM-DD')
  }

  createBoard () {
    return (
      this.props.storeMonth.boardCalendar.map((rows) => {
        return (
          <div key={uuid()} className='Row-style'>
            {
              rows.map((curDay, dayIndex) => {
                const date = this.getDate(this.props.storeMonth, curDay)
                const dayView = <Day
                  key={uuid()}
                  label={(curDay % 100) < 0 ? -curDay : curDay % 100}
                  disable={curDay < 1 || curDay > 31}
                  date={date}
                  handleClickCreateReminder={this.handleClickCreateReminder}
                  items={this.filterRemindersByDay(this.props.reminders, curDay)}
                />

                const headerView = <div key={uuid()} className='Month-header Header'>
                  <Header
                    label={this.state.daysOfWeek[dayIndex]}
                    styleName='Day-name'
                  />
                </div>

                return (curDay === -1 ? headerView : dayView)
              })
            }
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
    this.props.dispatch(incrementMonth()).then(() => {
      const startDate = this.props.storeMonth.startDate
      const endDate = this.props.storeMonth.endDate
      this.props.dispatch(setStartDate(startDate))
      this.props.dispatch(setEndDate(endDate))
    })
  }

  handlePrevMonth () {
    this.props.dispatch(decrementMonth()).then(() => {
      const startDate = this.props.storeMonth.startDate
      const endDate = this.props.storeMonth.endDate
      this.props.dispatch(setStartDate(startDate))
      this.props.dispatch(setEndDate(endDate))
    })
  }

  handleClickCreateReminder (date) {
    console.log('SECOND!')
    console.log(date)
    this.setState({
      clickedDate: date,
      showCreateReminderModal: true
    })
  }

  render () {
    console.log('List of reminders: ', this.props.reminders)
    console.log('STATE')
    console.log(this.props.storeMonth)
    const monthName = this.state.monthsOfYear[this.props.storeMonth.month]
    const year = this.props.storeMonth.year
    const title = <div className='Title'>
      {monthName} {year}
    </div>

    const createReminderModalView = <CreateReminderModal
      visible={this.state.showCreateReminderModal}
      toggleModal={this.toggleReminderModal}
      date={this.state.clickedDate}
    />

    return (
      <div>
        <div className='Row-style'>
          <span
            onClick={this.handlePrevMonth}
            className='previous round'
          >
            &#8249;
          </span>
          {title}
          <span
            onClick={this.handleNextMonth}
            className='previous round'
          >
            &#8250;
          </span>
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

export default connect(mapStateToProps)(Month)
