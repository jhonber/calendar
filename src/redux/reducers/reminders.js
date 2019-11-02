
const reminders = (state = [], action) => {
  switch (action.type) {
    case 'ADD_REMINDER':
      return [
        ...state,
        action.reminder
      ]
    case 'REMOVE_REMINDER':
      return state.filter(({ id }) => id !== action.id)
    case 'EDIT_REMINDER':
      return state.map((reminder) => {
        if (reminder.id === action.id) {
          return {
            ...reminder,
            ...action.updates
          }
        } else {
          return reminder
        }
      })
    default:
      return state
  }
}

export default reminders
