import React from 'react'
import Header from './header'
import Day from './day'
import '../App.css'

export default class Month extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      name: 'January',
      year: 2019,
      day: 1,
      board: Array(7).fill(Array(5).fill(0)),
      daysOfWeek: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ]
    }
  }

  createBoard () {
    let cnt = 1
    return (
      this.state.board.map((rows, dayIndex) => {
        return (
          <div key={rows + dayIndex} className='Column-style Header'>
            <div className='Month-header'>
              <Header label={this.state.daysOfWeek[dayIndex]} styleName='Day-name' />
            </div>
            {rows.map((label, i) => {
              return (
                <Day key={label + i} label={cnt++} />
              )
            })}
          </div>
        )
      })
    )
  }

  render () {
    console.log(this.state.board)
    return (
      <div className='Row-style'>
        {this.createBoard()}
      </div>
    )
  }
}
