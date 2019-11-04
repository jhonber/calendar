import React from 'react'
import { connect } from 'react-redux'
import { addReminder } from '../redux/actions/reminders'
import { getRequest } from './apiUtils/utils.js'
import CONFIG from '../config.json'
import '../App.css'

import moment from 'moment'
import Modal from './modal'
import CreateReminder from './createReminder'
import ShowReminder from './showReminder'

const ENV = CONFIG.env

const MAX_ITEMS_TO_LIST = 2

class Day extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      body: null
    }
    this.handleClickOnItem = this.handleClickOnItem.bind(this)
    this.handleSubmitCreateReminder = this.handleSubmitCreateReminder.bind(this)
  }

  handleToggleModal () {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  renderShowReminder (data) {
    const body = <ShowReminder
      data={data}
    />

    this.setState({
      showModal: true,
      body: body
    })
  }

  handleClickOnItem (data) {
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

  handleClickCreateReminder (e) {
    if (!this.props.disable && e.target.id === 'day-square') {
      const body = <CreateReminder
        date={this.props.date}
        handleSubmitCreateReminder={this.handleSubmitCreateReminder}
      />

      this.setState({
        showModal: true,
        body: body
      })
    }
  }

  handleColor (color, event) {
    this.setState({
      color: color.hex
    })
  }

  handleText (e) {
    this.setState({
      text: e.target.value
    })
  }

  handleCity (e) {
    this.setState({
      city: e.target.value
    })
  }

  handleTime (time) {
    this.setState({
      time: time
    })
  }

  handleDate (date) {
    this.setState({
      date: date
    })
  }

  handleSubmitCreateReminder (data) {
    this.props.dispatch(addReminder({
      color: data.color,
      text: data.text,
      city: data.city,
      date: moment(data.date),
      time: data.time
    }))
  }

  render () {
    const itemsToList = this.props.items.slice(0, MAX_ITEMS_TO_LIST)
    const rest = this.props.items.length - itemsToList.length
    const overflow = rest > 0
      ? <p>{rest} more</p>
      : null
    const classesLabel = 'Day-label' + (this.props.disable ? ' Disable-day' : '')

    return (
      <div
        className='Day'
        id='day-square'
        onClick={(e) => this.handleClickCreateReminder(e)}
      >
        <div className={classesLabel}>
          {this.props.label}
        </div>
        <div className='Items'>
          <ul>
            {itemsToList.map((item, cnt) => {
              return (
                <li
                  style={{ backgroundColor: item.color }}
                  key={item.id}
                  onClick={() => this.handleClickOnItem(item)}
                >
                  {item.text}
                </li>
              )
            })}
            {overflow}
          </ul>
        </div>
        <Modal
          visible={this.state.showModal}
          body={this.state.body}
          okButton
          okButtonText='Add'
          closeButton
          handleOkButton={() => this.handleSubmitCreateReminder()}
          handleToggleModal={() => this.handleToggleModal()}
        />
      </div>
    )
  }
}

export default connect()(Day)
