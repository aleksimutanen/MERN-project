const reducer = (state = 1, action) => {

  switch (action.type) {
    case 'SET_INDEX':
      return action.index
    case 'SET_DEFAULT_INDEX':
      return action.index
    default:
      return state
  }
}

export const setPageIndex = (index) => {
  return async dispatch => {
    dispatch({
      type: 'SET_INDEX',
      index: index,
    })
  }
}

export const setDefaultIndex = () => {
  return async dispatch => {
    dispatch({
      type: 'SET_DEFAULT_INDEX',
      index: 1,
    })
  }
}

export default reducer