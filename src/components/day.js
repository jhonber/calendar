import React from 'react'
import Modal from './modal'
import '../App.css'

const MAX_ITEMS_TO_LIST = 2

export default class Day extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showModal: false,
      body: null
    }
    this.handleClickOnItem = this.handleClickOnItem.bind(this)
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
      <span>{item.date.format('YYYY-MM-DD')}</span>
      <span>{item.time}</span>
    </div>

    this.setState({
      showModal: true,
      body: body
    })
  }

  render () {
    const itemsToList = this.props.items.slice(0, MAX_ITEMS_TO_LIST)
    const rest = this.props.items.length - itemsToList.length
    const overflow = rest > 0
      ? <li>{rest} more ...</li>
      : null

    const classesLabel = 'Day-label' + (this.props.disable ? ' Disable-day' : '')
    return (
      <div className='Day'>
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
          handleToggleModal={() => this.handleToggleModal()}
        />
      </div>
    )
  }
}
