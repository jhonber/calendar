import React from 'react'
import moment from 'moment'
import { Popover, OverlayTrigger } from 'react-bootstrap'

export default class ShowReminder extends React.Component {
  renderItems (item) {
    return (
      <div className='Row-style-left'>
        <p
          className='reminder-color-tag'
          style={{ backgroundColor: item.color }}
        />
        <div>
          <div className='title-show-reminder'>
            {item.text}
          </div>
          <div className='Row-style-left'>
            <span className='title-small-show-reminder'>City:</span>
            <span className='text-show-reminder'>{item.city}</span>
          </div>
          <div className='Row-style-left'>
            <span className='title-small-show-reminder'>Weather: </span>
            <span className='text-show-reminder'>{item.weather}</span>
          </div>
          <div className='Row-style-left date-show-reminder'>
            <span>{this.props.dayName}</span>
            <span>{this.props.monthName} {this.props.label}</span>
          </div>
          <div className='date-show-reminder no-padding'>
            <span>at {item.time} </span>
          </div>
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
          {this.renderItems(item)}
        </div>
      </div>
    )
  }
}
