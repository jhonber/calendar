import React from 'react'
import { connect } from 'react-redux'
import uuid from 'uuid'
import getRemindersRange from '../redux/selectors/reminders'
import Header from './header'
import Day from './day'
import '../App.css'

class Month extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      daysOfWeek: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      monthsOfYear: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
    }
  }

  filterRemindersByDay (reminders, curDay) {
    return reminders.filter((reminder) => {
      return reminder.date.date() === curDay
    })
  }

  createBoard () {
    return (
      this.props.storeMonth.boardCalendar.map((rows) => {
        return (
          <div key={uuid()} className='Row-style'>
            {
              rows.map((curDay, dayIndex) => {
                const dayView = <Day
                  key={uuid()}
                  label={curDay % 100}
                  disable={curDay < 1 || curDay > 31}
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

  render () {
    console.log('List of reminders: ', this.props.reminders)
    const monthName = this.state.monthsOfYear[this.props.storeMonth.month]
    const year = this.props.storeMonth.year
    const title = <div className='Title'>
      {monthName} {year}
    </div>

    return (
      <div>
        {title}
        <div className='Column-style'>
          {this.createBoard()}
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
