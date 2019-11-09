import React from 'react'
import moment from 'moment'
import uuid from 'uuid'
import { Popover, OverlayTrigger } from 'react-bootstrap'

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

    const popOverEdit = <Popover>
      <Popover.Content>
        Edit reminder
      </Popover.Content>
    </Popover>

    const popOverDelete = <Popover>
      <Popover.Content>
        Delete reminder
      </Popover.Content>
    </Popover>

    return (
      <div className='showReminder'>
        <div className='top-right-buttons'>
          <OverlayTrigger
            trigger='hover'
            placement='top'
            overlay={popOverEdit}
          >
            <span
              className='fas fa-edit edit'
              onClick={() => this.props.handleClickEditReminder(item)}
            />
          </OverlayTrigger>
          <OverlayTrigger
            trigger='hover'
            placement='top'
            overlay={popOverDelete}
          >
            <span
              className='fas fa-trash-alt delete'
              onClick={() => this.props.handleClickRemoveReminder(item.id)}
            />
          </OverlayTrigger>
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
