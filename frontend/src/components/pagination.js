import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { Pagination } from 'react-bootstrap'

import {setPageIndex} from '../reducers/pageIndexReducer'


const PaginationCreator = ({length}) => {

  const dispatch = useDispatch()

  const pageIndex = useSelector(state => state.pageIndex)

  let items = []
  for (let i = 1; i <= length; i++) {
    items.push(
      <Pagination.Item
        className='paginationItem'
        key={i}
        active={i === pageIndex}
        onClick={() => { dispatch(setPageIndex(i)); window.scroll(0,0)}}
      >
        {i}
      </Pagination.Item>
    )
  }

  return (
    <div className='pagination'>
      <Pagination>{items}</Pagination>
    </div>
  )
}

export default PaginationCreator