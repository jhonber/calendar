import React from 'react'
import { connect } from 'react-redux'
import { getRequest } from './apiUtils/utils.js'
import { delReminder } from '../redux/actions/reminders'
import CONFIG from '../config.json'
import { MaxRemindersToList } from './constants'
import '../App.css'

import Modal from './modal'
import ShowReminder from './showReminder'
import EditReminder from './editReminder'
import ListReminders from './listReminders'

const ENV = CONFIG.env

class Day extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      body: null,
      showCloseTopRight: false,
      showCloseButton: true
    }
    this.handleClickOnReminder = this.handleClickOnReminder.bind(this)
    this.handleClickEditReminder = this.handleClickEditReminder.bind(this)
    this.handleClickRemoveReminder = this.handleClickRemoveReminder.bind(this)
    this.handleClickShowMore = this.handleClickShowMore.bind(this)
  }

  handleToggleModal () {
    this.setState({
      showModal: !this.state.showModal,
      showCloseButton: true
    })
  }

  renderShowReminder (data) {
    const body = <ShowReminder
      handleClickEditReminder={this.handleClickEditReminder}
      handleClickRemoveReminder={this.handleClickRemoveReminder}
      data={data}
    />

    this.setState({
      body: body,
      showModal: true,
      showCloseButton: true,
      showCloseTopRight: false
    })
  }

  handleClickOnReminder (data) {
    const query = CONFIG.weather + data.city
    const url = `${CONFIG[ENV].urlBase}${query}`
    const self = this

    getRequest(url, data.city).then((res) => {
      if (res && Object.prototype.hasOwnProperty.call(res, 'weather')) {
        self.renderShowReminder({
          ...data,
          weather: res.weather[0].main
        })
      } else {
        self.renderShowReminder({
          ...data
        })
      }
    }).catch((err) => {
      console.log('Error: ', err)
      self.renderShowReminder({
        ...data
      })
    })
  }

  handleClickCreateReminder (event) {
    const id = event.target.id
    if (!this.props.disable && (id === 'daySquare' || id === 'dayLabel')) {
      this.props.handleClickCreateReminder(this.props.date)
    }
  }

  handleClickEditReminder (data) {
    const body = <EditReminder
      reminder={data}
    />

    this.setState({
      body: body,
      showCloseTopRight: false
    })
  }

  handleClickRemoveReminder (id) {
    if (window.confirm('Remove reminder?')) {
      this.props.dispatch(delReminder(
        { id: id }
      ))
    }
  }

  handleClickShowMore () {
    console.log('Called handleClickShowMore!')
    const body = <div className='body-weight'>
      <div className='title-day'>
        <p className='title-day-name'>{this.props.name}</p>
        <p className='title-day-number'>{this.props.label}</p>
      </div>
      <ListReminders
        handleClick={this.handleClickOnReminder}
        reminders={this.props.reminders}
        showAll
      />
    </div>

    this.setState({
      body: body,
      showModal: true,
      showCloseButton: false,
      showCloseTopRight: true
    })
  }

  render () {
    let classesLabel = 'Day-label' + (this.props.disable ? ' Disable-day' : '')
    classesLabel = this.props.holiday && !this.props.disable
      ? classesLabel + ' holiday-label'
      : classesLabel

    const classesMain = this.props.holiday
      ? 'Day holiday'
      : 'Day'

    const list = <ListReminders
      handleClick={this.handleClickOnReminder}
      handleClickShowMore={this.handleClickShowMore}
      reminders={this.props.reminders}
      total={MaxRemindersToList}
    />

    return (
      <div
        className={classesMain}
        id='daySquare'
        onClick={(event) => this.handleClickCreateReminder(event)}
      >
        <div
          className={classesLabel}
          id='dayLabel'
        >
          {this.props.label}
        </div>
        {list}
        <Modal
          visible={this.state.showModal}
          body={this.state.body}
          closeButton={this.state.showCloseButton}
          closeTopRight={this.state.showCloseTopRight}
          handleToggleModal={() => this.handleToggleModal()}
        />
      </div>
    )
  }
}

export default connect()(Day)
