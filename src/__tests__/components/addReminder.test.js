import React from 'react'
import { shallow } from 'enzyme'
import CreateReminderModal from '../../components/createReminderModal'
const prettyFormat = require('pretty-format')

const styles = require('react-datepicker/dist/react-datepicker.css')
const styles2 = require('../../App.css')

jest.mock('react-datepicker/dist/react-datepicker.css', () => {
  return {
  }
})
jest.mock('../../App.css', () => {
  return {
  }
})

// handleClickCreateReminder

describe('<CreateReminderForm />', () => {
  it('should collect and validate data: kkk', () => {

    const props = {}
    // date={this.props.date}
    //   toggleModal={this.props.toggleModal}
    //   handleSubmit={this.handleSubmit}
    const wrapper = shallow(<CreateReminderModal {...props} />)

    console.log(prettyFormat(wrapper))
  })
})
