import { createStore, combineReducers } from 'redux'
import remindersReducer from '../reducers/reminders'
import filtersReducer from '../reducers/filters'
import monthReducers from '../reducers/months'

export default () => {
  const store = createStore(
    combineReducers({
      reminders: remindersReducer,
      filters: filtersReducer,
      months: monthReducers
    })
  )

  return store
}
