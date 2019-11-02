import React from 'react'
import '../App.css'

export default class Header extends React.Component {
  render () {
    return (
      <div className={this.props.styleName}>
        {this.props.label}
      </div>
    )
  }
}
