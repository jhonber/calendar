
export const incrementMonth = () => dispatch => {
  dispatch({
    type: 'INCREMENT'
  })
  return Promise.resolve()
}

export const decrementMonth = () => dispatch => {
  dispatch({
    type: 'DECREMET'
  })
  return Promise.resolve()
}
