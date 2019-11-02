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
      board: Array(7).fill(Array(5))
    }
  }

  createBoard (rows, columns) {
    return (
      this.state.board.map((val) => {
        return (
          <div key={val} className='Column-style'>
            <div className='Month-header'>
              <Header label='Monday' styleName='Day-name' />
            </div>
            {this.state.board.map((val2) => {
              return (
                <Day key={val2} label='2' />
              )
            })}
          </div>
        )
      })
    )
  }

  render () {
    return (
      <div className='Row-style'>
        {this.createBoard()}
      </div>
    )
  }
}
