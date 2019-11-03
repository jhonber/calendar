import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import './index.css'
import App from './App'
import configureStore from './redux/store/configureStore'
import { addReminder } from './redux/actions/reminders'
import getSortedReminders from './redux/selectors/reminders'
import * as serviceWorker from './serviceWorker'

const store = configureStore()
console.log(store.getState())

store.dispatch(addReminder({
  text: 'Cumple',
  color: 'blue',
  date: '20 nov',
  time: '12:00',
  city: 'London'
}))

store.dispatch(addReminder({
  text: 'Cita',
  color: 'amarillo',
  date: '4 dic',
  time: '19:00',
  city: 'Pereira'
}))

store.dispatch(addReminder({
  text: 'Cita',
  color: 'amarillo',
  date: '4 dic',
  time: '19:00',
  city: 'Pereira'
}))
store.dispatch(addReminder({
  text: 'Cita',
  color: 'amarillo',
  date: '4 dic',
  time: '19:00',
  city: 'Pereira'
}))


const state = store.getState()
console.log(state)
const data = getSortedReminders(state.reminders, state.filters)
console.log(data)

const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
)

ReactDOM.render(jsx, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
