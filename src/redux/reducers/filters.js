
// Filters Reducer

const filtersReducerDefaultState = {
  sortBy: 'time'
}

export default (state = filtersReducerDefaultState, action) => {
  switch (action.type) {
    case 'SORT_BY_TIME':
      return {
        ...state,
        sortBy: 'time'
      }
    default:
      return state
  }
}
