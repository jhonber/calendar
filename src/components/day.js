import React from 'react'
import '../App.css'

export default class Day extends React.Component {
  render () {
    return (
      <div className='Day'>
        {this.props.label}
      </div>
    )
  }
}
