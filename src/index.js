import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.css'
import App from './App'
import configureStore from './redux/store/configureStore'
import * as serviceWorker from './serviceWorker'
import { addReminder } from './redux/actions/reminders'
import moment from 'moment'

import { genRandomNumber } from './utils'
import {
  samplesTextForReminders,
  colorPalette,
  samplesCities
} from './components/constants'

const store = configureStore()

for (let i = 0; i < 5; ++i) {
  const indText = genRandomNumber(samplesTextForReminders.length - 1)
  const indColor = genRandomNumber(colorPalette.length - 1)
  const indCity = genRandomNumber(samplesCities.length - 1)

  store.dispatch(addReminder({
    text: samplesTextForReminders[indText].substr(0, 30),
    color: colorPalette[indColor],
    date: moment().startOf('day'),
    time: new Date().getTime(),
    city: samplesCities[indCity]
  }))
}

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'))

serviceWorker.unregister()
