
// Get reminders in a range

export default (reminders, { startDate, endDate }) => {
  return reminders.filter((reminder) => {
    const matchStartDate = reminder.date >= startDate
    const matchEndDate = reminder.date <= endDate

    return matchStartDate && matchEndDate
  }).sort((a, b) => {
    return a.time > b.time ? 1 : -1
  })
}
