
const PageDivider = (items, itemsPerPage) => {

  const pagedItems = []
  const indexDivider = -itemsPerPage + 1

  for (let i = 0; i < items.length; i++) {
    if (items.length === 0) {
      return pagedItems
    }
    if ((i + 1) % itemsPerPage === 0) {

      const indexOffset = i + indexDivider

      pagedItems.push(
        items.filter(p => 
          (items.indexOf(p)) <= i && 
          (items.indexOf(p) >= indexOffset))
      )


      if (i + (itemsPerPage + 1) > items.length && (i + 1) !== items.length) {
        // console.log('rest')
        pagedItems.push(items.filter(p => items.indexOf(p) > i))
        break
      }
    }

    if ((i + itemsPerPage) > items.length && !i + itemsPerPage > items.length) {
      // console.log(i)
      // console.log(items.length)
      pagedItems.push(items.filter(p => items.indexOf(p) < items.length))
      break
    }
  }

  return pagedItems
}

export default PageDivider