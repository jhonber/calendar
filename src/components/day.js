import React from 'react'
import '../App.css'

const MAX_ITEMS_TO_LIST = 2

export default class Day extends React.Component {
  render () {
    const itemsToList = this.props.items.slice(0, MAX_ITEMS_TO_LIST)
    const rest = this.props.items.length - itemsToList.length
    const overflow = rest > 0
      ? <li>{rest} more ...</li>
      : null

    return (
      <div className='Day'>
        <div className='Day-label'>
          {this.props.label}
        </div>
        <div className='Items'>
          <ul>
            {itemsToList.map((item, cnt) => {
              return <li key={item.id}> {item.text} </li>
            })}
            {overflow}
          </ul>
        </div>
      </div>
    )
  }
}
