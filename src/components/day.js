import React from 'react'
import { connect } from 'react-redux'
import { getRequest } from './apiUtils/utils.js'
import { delReminder } from '../redux/actions/reminders'
import CONFIG from '../config.json'
import '../App.css'

import Modal from './modal'
import ShowReminder from './showReminder'
import EditReminder from './editReminder'

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
    this.handleClickEditReminder = this.handleClickEditReminder.bind(this)
    this.handleClickRemoveReminder = this.handleClickRemoveReminder.bind(this)
  }

  handleToggleModal () {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  renderShowReminder (data) {
    const body = <ShowReminder
      handleClickEditReminder={this.handleClickEditReminder}
      handleClickRemoveReminder={this.handleClickRemoveReminder}
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

  handleClickCreateReminder (event) {
    if (!this.props.disable && event.target.id === 'day-square') {
      this.props.handleClickCreateReminder(this.props.date)
    }
  }

  handleClickEditReminder (data) {
    const body = <EditReminder
      reminder={data}
    />

    this.setState({
      body: body
    })
  }

  handleClickRemoveReminder (id) {
    if (window.confirm('Remove reminder?')) {
      this.props.dispatch(delReminder(
        { id: id }
      ))
    }
  }

  render () {
    const itemsToList = this.props.items.slice(0, MAX_ITEMS_TO_LIST)
    const rest = this.props.items.length - itemsToList.length
    const overflow = rest > 0
      ? <p>{rest} more</p>
      : null
    let classesLabel = 'Day-label' + (this.props.disable ? ' Disable-day' : '')
    classesLabel = this.props.holiday && !this.props.disable
      ? classesLabel + ' holiday-label'
      : classesLabel

    const classesMain = this.props.holiday
      ? 'Day holiday'
      : 'Day'

    return (
      <div
        className={classesMain}
        id='day-square'
        onClick={(event) => this.handleClickCreateReminder(event)}
      >
        <div className={classesLabel}>
          {this.props.label}
        </div>
        <div className='Items'>
          <ul>
            {itemsToList.map((item, cnt) => {
              return (
                <div key={item.id + cnt} className='Row-style'>
                  <li
                    style={{ backgroundColor: item.color }}
                    key={item.id}
                    onClick={() => this.handleClickOnItem(item)}
                  >
                    {item.text}
                  </li>
                </div>
              )
            })}
            {overflow}
          </ul>
        </div>
        <Modal
          visible={this.state.showModal}
          body={this.state.body}
          closeButton
          handleToggleModal={() => this.handleToggleModal()}
        />
      </div>
    )
  }
}

export default connect()(Day)
