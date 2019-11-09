import React from 'react'
import '../App.css'

class ListReminder extends React.Component {
  renderReminders (reminders) {
    return reminders.map((item, cnt) => {
      return (
        <li
          style={{ backgroundColor: item.color }}
          key={item.id}
          onClick={() => this.props.handleClick(item)}
        >
          <div className='reminder-text'>
            {item.text}
          </div>
        </li>
      )
    })
  }

  render () {
    const remindersToList = this.props.showAll
      ? this.props.reminders
      : this.props.reminders.slice(0, this.props.total)

    const rest = !this.props.showAll
      ? this.props.reminders.length - remindersToList.length
      : 0
    const overflow = rest > 0
      ? <p
        className='overflow'
        onClick={() => this.props.handleClickShowMore()}
      >
        {rest} more
      </p>
      : null

    const mainClass = this.props.showAll
      ? 'Items list-reminders'
      : 'Items'

    return (
      <div className={mainClass}>
        <ul>
          {this.renderReminders(remindersToList)}
          {overflow}
        </ul>
      </div>
    )
  }
}

export default ListReminder
