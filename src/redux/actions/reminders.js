import uuid from 'uuid'

export const addReminder = (
  {
    text = '',
    color = '',
    date = '',
    time = '',
    city = ''
  } = {}
) => ({
  type: 'ADD_REMINDER',
  reminder: {
    id: uuid(),
    text,
    color,
    date,
    time,
    city
  }
})

export const editReminder = (id, updates) => ({
  type: 'EDIT_REMINDER',
  id,
  updates
})

export const delReminder = ({ id } = {}) => ({
  type: 'REMOVE_REMINDER',
  id
})
