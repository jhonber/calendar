import React from 'react'
import moment from 'moment'
import uuid from 'uuid'

export default class ShowReminder extends React.Component {
  capitalize (word) {
    return word.charAt(0).toUpperCase() +
      word.slice(1)
  }

  renderItems (item) {
    const keysOrder = [
      'color',
      'text',
      'city',
      'date',
      'time',
      'weather'
    ]

    return keysOrder.map((key, index) => {
      if (key === 'color') {
        return (
          <li
            key={uuid()}
            className='reminder-color-tag'
            style={{ backgroundColor: item[key] }}
          />
        )
      } else {
        const title = this.capitalize(item[key] ? key + ': ' : '')
        return (
          <li
            key={uuid()}
          >
            {title}{item[key]}
          </li>
        )
      }
    })
  }

  render () {
    const item = {
      ...this.props.data
    }

    item.date = moment(item.date).format('YYYY-MM-DD')
    item.time = moment(item.time).format('HH:00')

    return (
      <div className='showReminder'>
        <div className='top-right'>
          <span
            className='far fa-edit edit'
            onClick={() => this.props.handleClickEditReminder(item)}
          />
          <span
            className='far fa-trash-alt edit'
            onClick={() => this.props.handleClickRemoveReminder(item.id)}
          />
        </div>
        <div className='show-content'>
          <ul>
            {this.renderItems(item)}
          </ul>
        </div>
      </div>
    )
  }
}
