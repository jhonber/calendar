import React from 'react'
import moment from 'moment'
import { Popover, OverlayTrigger } from 'react-bootstrap'

export default class ShowReminder extends React.Component {
  renderItems (item) {
    const color = <p
      className='reminder-color-tag'
      style={{ backgroundColor: item.color }}
    />

    const text = <div className='title-show-reminder'>
      {item.text}
    </div>

    const city = <div className='Row-style-left'>
      <span className='title-small-show-reminder'>City:</span>
      <span className='text-show-reminder'>{item.city}</span>
    </div>

    const weather = item.weather
      ? <div className='Row-style-left'>
        <span className='title-small-show-reminder'>Weather:</span>
        <span className='text-show-reminder'>{item.weather}</span>
      </div>
      : null

    const date = <div className='Row-style-left date-show-reminder'>
      <span>{this.props.dayName}, </span>
      <span>{this.props.monthName} {this.props.label}</span>
    </div>

    const time = <div className='date-show-reminder no-padding'>
      <span>at {item.time} </span>
    </div>

    return (
      <div className='Row-style-left'>
        {color}
        <div>
          {text}
          {city}
          {weather}
          {date}
          {time}
        </div>
      </div>
    )
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
      <div>
        <div className='top-right-buttons top-right-buttons-primary'>
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
              className='fas fa-trash-alt'
              onClick={() => this.props.handleClickRemoveReminder(item.id)}
            />
          </OverlayTrigger>
        </div>
        <div className='show-content'>
          {this.renderItems(item)}
        </div>
      </div>
    )
  }
}
