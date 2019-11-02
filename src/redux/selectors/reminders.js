
// Get sorted reminders by time

export default (reminders, { sortBy }) => {
  return reminders.filter((item) => {
    return true
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return a.time < b.time ? 1 : -1
    }
  })
}
