import React from 'react'
import { Row, Col } from 'react-bootstrap'

import Project from './listProject'
import Employee from './employee'
import { ProjectData } from './projectDataPage'


const Grid = ({ items, itemsPerRow, componentName }) => {
  if (!items || items.length === 0) return null

  const gridItems = []

  const indexDivider = -itemsPerRow + 1

  for (let i = 0; i < items.length; i++) {
    if ((i + 1) % itemsPerRow === 0) {
      const indexOffset = i + indexDivider

      gridItems.push(
        items.filter(p =>
          (items.indexOf(p)) <= i &&
          (items.indexOf(p) >= indexOffset))
      )

      if (i + (itemsPerRow + 1) > items.length && (i + 1) !== items.length) {
        // console.log('rest')
        gridItems.push(items.filter(p => items.indexOf(p) > i))
        break
      }
    }

    if ((i + itemsPerRow) > items.length && !i + itemsPerRow > items.length) {
      // console.log(i)
      // console.log(items.length)
      gridItems.push(items.filter(p => items.indexOf(p) < items.length))
      break
    }
  }

  console.log(gridItems)

  // gridItems.forEach(e => {
  //   e.forEach(k => {
  //     console.log(typeof k)
  //   })
  // })

  let colWidth = 0

  switch (itemsPerRow) {
    case 2:
      colWidth = 6
      break
    case 3:
      colWidth = 4
      break
    case 4:
      colWidth = 3
      break
    case 5:
      colWidth = 2
      break
    case 6:
      colWidth = 2
      break
  }

  return (
    <>

      {gridItems.map((items, i) =>
        <Row key={i} className='justify-content-md-center imagesRow'>
          {items.map((item, k) =>
            <Col md={colWidth} key={k}>

              {componentName === 'project' ?
                <Project project={item} /> : ''}

              {componentName === 'projectData' ?
                <ProjectData project={item} /> : ''}

              {componentName === 'employee' ?
                <Employee employee={item} /> : ''}

            </Col>
          )}
        </Row>
      )}

    </>
  )
}


// const gridItems = []

//   if (items.length === 6) {

//     items.forEach((item, i) => {
//       if ((i + 1) % 3 === 0) {
//         gridItems.push([items[i - 2], items[i - 1], items[i]]);
//       }
//     })
//     console.log(gridItems)

//   } else if (items.length > 3) {

//     items.forEach((item, i) => {
//       if ((i + 1) % 3 === 0) {
//         gridItems.push([items[i - 2], items[i - 1], items[i]])
//         gridItems.push(items.filter(p => items.indexOf(p) > i))
//       }
//     })
//     console.log(gridItems)

//   } else if (items.length <= 3) {

//     gridItems.push(items)
//     console.log(gridItems)
//   }

//   return (
//     <>

//       {gridItems.map((items, i) =>
//         <Row key={i} className='justify-content-md-center imagesRow'>
//           {items.map((item, k) =>
//             <Col md={4} key={k}>
//               <Project project={item} />
//             </Col>
//           )}
//         </Row>
//       )}

//     </>
//   )

export default Grid