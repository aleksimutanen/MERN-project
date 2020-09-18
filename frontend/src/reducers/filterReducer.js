const filterReducer = (state = { filterType: 'type', filterWord: 'all', listName: 'all' }, action) => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.filter
    case 'REMOVE_FILTER':
      return action.filter
    default:
      return state
  }
}

export const setFilter = (filter) => {
  // console.log(filter)

  let filterType = ''
  let filterWord = ''
  let listName = ''

  switch (filter) {
    case 'houses':
      filterType = 'type'
      filterWord = 'house'
      break
    case 'parking complexes':
      filterType = 'type'
      filterWord = 'parkingComplex'
      break
    case 'zones':
      filterType = 'type'
      filterWord = 'zone'
      break
    case 'facades':
      filterType = 'type'
      filterWord = 'facade'
      break
    case 'competitions':
      filterType = 'type'
      filterWord = 'competition'
      break
    case 'offices':
      filterType = 'type'
      filterWord = 'office'
      break

    case 'design phase':
      filterType = 'status'
      filterWord = 'designing'
      break
    case 'construction phase':
      filterType = 'status'
      filterWord = 'construction'
      break
    case 'finished':
      filterType = 'status'
      filterWord = 'finished'
      break


    default:
      filterType = 'type'
      filterWord = 'all'
    // default:
    //   filterType = 'name'
    //   filterWord = filter
  }

  listName = filter

  return {
    type: 'SET_FILTER',
    filter: { filterType, filterWord, listName }
  }
}

export const removeFilter = () => {
  return {
    type: 'REMOVE_FILTER',
    filter: 'all'
  }
}

export default filterReducer