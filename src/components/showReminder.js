import React from 'react'
import moment from 'moment'
import uuid from 'uuid'

export default class ShowReminder extends React.Component {
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
            style={{ backgroundColor: item[key] }}
          />
        )
      } else {
        return (
          <li key={uuid()}>{key}: {item[key]}</li>
        )
      }
    })
  }

  render () {
    const item = this.props.data
    item.date = moment(item.date).format('YYYY-MM-DD')
    item.time = moment(item.time).format('HH:MM')

    return (
      <div className='showReminder'>
        <ul>
          {this.renderItems(item)}
        </ul>
      </div>
    )
  }
}
