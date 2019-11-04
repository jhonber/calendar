import React from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import Modal from './modal'
import CreateReminder from './addReminder'
import { addReminder } from '../redux/actions/reminders'
import '../App.css'

const MAX_ITEMS_TO_LIST = 2

class Day extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      body: null,
      color: '#FF6900',
      text: '',
      city: '',
      time: new Date(),
      date: new Date()
    }
    this.handleClickOnItem = this.handleClickOnItem.bind(this)
    this.handleClickAddNewItem = this.handleClickAddNewItem.bind(this)
    this.handleColor = this.handleColor.bind(this)
    this.handleText = this.handleText.bind(this)
    this.handleCity = this.handleCity.bind(this)
    this.handleDate = this.handleDate.bind(this)
    this.handleTime = this.handleTime.bind(this)
  }

  handleToggleModal () {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  handleClickOnItem (item) {
    const body = <div>
      <span>{item.color}</span>
      <span>{item.text}</span>
      <span>{item.city}</span>
      <span>{moment(item.date).format('YYYY-MM-DD')}</span>
      <span>{moment(item.time).format('HH:MM')}</span>
    </div>

    this.setState({
      showModal: true,
      body: body
    })
  }

  handleClickAddNewItem (e) {
    console.log('disable: ', this.props.disable)
    console.log(e.target.id)
    if (!this.props.disable && e.target.id === 'day-square') {
      const body = <CreateReminder
        state={this.state}
        handleColor={this.handleColor}
        handleText={this.handleText}
        handleCity={this.handleCity}
        handleDate={this.handleDate}
        handleTime={this.handleTime}
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

  handleSubmitNewItem () {
    console.log('DATA')
    console.log(this.state)
    this.props.dispatch(addReminder({
      color: this.state.color,
      text: this.state.text,
      city: this.state.city,
      date: moment(this.state.date),
      time: moment(this.state.time)
    }))
  }

  render () {
    const itemsToList = this.props.items.slice(0, MAX_ITEMS_TO_LIST)
    const rest = this.props.items.length - itemsToList.length
    const overflow = rest > 0
      ? <li>{rest} more</li>
      : null

    const classesLabel = 'Day-label' + (this.props.disable ? ' Disable-day' : '')
    return (
      <div
        className='Day'
        id='day-square'
        onClick={(e) => this.handleClickAddNewItem(e)}
      >
        <div className={classesLabel}>
          {this.props.label}
        </div>
        <div className='Items'>
          <ul>
            {itemsToList.map((item, cnt) => {
              return (
                <li
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
          handleOkButton={() => this.handleSubmitNewItem()}
          handleToggleModal={() => this.handleToggleModal()}
        />
      </div>
    )
  }
}

export default connect()(Day)
