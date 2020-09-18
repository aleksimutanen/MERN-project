const searchReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_SEARCH':
      return action.search
    case 'REMOVE_SEARCH':
      return action.search
    default:
      return state
  }
}

export const setSearch = (word) => {
  console.log(word)

  return {
    type: 'SET_SEARCH',
    search: word
  }
}

export const removeSearch = () => {
  return {
    type: 'REMOVE_SEARCH',
    filter: ''
  }
}

export default searchReducer