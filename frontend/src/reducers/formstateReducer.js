const reducer = (state = 'house', action) => {

  switch (action.type) {
    case 'SET_FORM':
      return action.form
    default:
      return state
  }
}

export const setForm = (formState) => {
  return async dispatch => {

    dispatch({
      type: 'SET_FORM',
      form: formState,
    })
  }
}

export default reducer