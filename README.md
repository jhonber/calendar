# Cool Calendar :P

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Significant changes
- Added edit reminder feature
- Added view for overflow of reminders per day
- Completed unit tests for "Add reminder" action
- Added extra validation for check data inputs in form (using @hapi/joi)
- Fixed wrong implementation of redux actions
- Fixed overflow of days in the current month (To visualize this, go to the month May 2020)
- Improved UI/UX look (Added font awesome icons, new color palette, among other stuff)
- Refactored some components to keep them simples

### Installation
```
$  yarn install or npm install
```

### Run
```
$  yarn start or npm start
```

### Run tests
```
$  yarn test  or npm test
```

### Mandatory Features
- [x] Add reminder
- [x] Display reminders on the calendar in the correct order
- [x] Allow select and show propertly the color
- [x] Edit reminder
- [x] Call weather API (You have to use a valid city e.g. Bogota, Pereira, London, Lima) **sometimes the response from API goes slow, this causes a delay in "show reminder" view**
- [X] Unit tests for add reminder

### Bonus
- [x] Support more than 1 month
- [x] Propertly handle overflow in a day
- [x] Delete 1 or ALL reminders per day (Delete 1 reminder at once)

### Considerations
- [x] Use Redux or something similar
- [x] Focus only in front end part
- [x] Use git
- [x] Use helper libraries (I used moment, react-color, react-datepicker, react-bootstrap and hapi/joi)


### About tests
Inside *\_\_tests\_\_* there are tests for redux and components, covering the action to add a reminder.

To show coverage, run:

```
yarn test --coverage --watchAll
```

### Snapshots

