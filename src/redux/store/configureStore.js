import { createStore, combineReducers } from 'redux'
import remindersReducer from '../reducers/reminders'
import filtersReducer from '../reducers/filters'

export default () => {
  const store = createStore(
    combineReducers({
      reminders: remindersReducer,
      filters: filtersReducer
    })
  )

  return store
}
