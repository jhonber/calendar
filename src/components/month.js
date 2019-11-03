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
      name: 'January',
      year: 2019,
      day: 1,
      board: Array(6).fill(Array(7).fill(0)),
      daysOfWeek: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ]
    }
  }

  createBoard () {
    return (
      this.state.board.map((rows) => {
        return (
          <div key={uuid()} className='Row-style'>
            {
              rows.map((curDay, dayIndex) => {
                const dayView = <Day
                  key={uuid()}
                  label={curDay}
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
    return (
      <div className='Column-style'>
        {this.createBoard()}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    reminders: getRemindersRange(state.reminders, state.filters)
  }
}

export default connect(mapStateToProps)(Month)
