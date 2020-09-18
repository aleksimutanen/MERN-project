import projectService from '../services/projects'

import { setNotification } from './notificationReducer'
import { setToNull} from './singleProjectReducer'

import history from '../components/history'


const reducer = (state = [false], action) => {

  console.log('state: ', state)
  console.log('action:', action)
  console.log('data:', action.data)

  switch (action.type) {
    case 'NEW_PROJECT':
      return [...state, action.data].sort((a, b) => Date.parse(b.startingDate) - Date.parse(a.startingDate))
    case 'UPDATE_PROJECT':
      const updatedProject = action.data
      const id = action.data.id
      return state.map(p =>
        p.id !== id ? p : updatedProject
      ).sort((a, b) => Date.parse(b.startingDate) - Date.parse(a.startingDate))
    case 'DELETE_PROJECT':
      return state.filter(p => p.id !== action.data)
    case 'INIT_PROJECTS':
      return action.data.sort((a, b) => Date.parse(b.startingDate) - Date.parse(a.startingDate))
    default:
      return state
  }
}

export const createProject = (project, formData, { resetForm }) => {
  return async dispatch => {

    try {

      await projectService.uploadImages(formData)

      const newProject = await projectService.createNew(project)

      for (let i = 0; i < newProject.images.length; i++) {
        const image = await projectService.getImage(newProject.images[i])
        newProject.images[i] = URL.createObjectURL(image)
      }

      dispatch({
        type: 'NEW_PROJECT',
        data: newProject,
      })

      dispatch(setNotification('Success', `created project ${newProject.projectName}.`, 5))
      resetForm({})
      history.push('/projects')
    }

    catch (exception) {
      dispatch(setNotification('Error', `something went wrong in creation.`, 5))
    }
  }
}

export const updateProject = (id, project, formData, { resetForm }) => {
  return async dispatch => {

    try {

      await projectService.uploadImages(formData)

      const updatedProject = await projectService.update(id, project)

      for (let i = 0; i < updatedProject.images.length; i++) {
        const image = await projectService.getImage(updatedProject.images[i])
        updatedProject.images[i] = URL.createObjectURL(image)
      }

      dispatch({
        type: 'UPDATE_PROJECT',
        data: updatedProject
      })

      dispatch(setNotification('Success', `updated project ${updatedProject.projectName}.`, 5))
      resetForm({})
      history.push(`/projects/${id}`)
    }

    catch (exception) {
      dispatch(setNotification('Error', 'something went wrong in project update.', 5))
    }
  }
}

export const deleteProject = (id) => {
  return async dispatch => {

    try {

      await projectService.remove(id)

      dispatch({
        type: 'DELETE_PROJECT',
        data: id
      })

      dispatch(setToNull())
      dispatch(setNotification('Success', `deleted project.`, 5))
      history.push(`/projects`)
    }

    catch (exception) {
      dispatch(setNotification('Error', `something went wrong in project deletion.`, 5))
    }
  }
}

export const initializeProjects = () => {
  return async dispatch => {

    try {

      const projects = await projectService.getAll()

      for (let i = 0; i < projects.length; i++) {

        if (projects[i].images.length > 0 && projects[i].relevant) {
          const image = await projectService.getImage(projects[i].images[0])
          projects[i].images[0] = URL.createObjectURL(image)
        }
      }

      dispatch({
        type: 'INIT_PROJECTS',
        data: projects
      })

    }

    catch (exception) {
      dispatch(setNotification('Error', 'something went wrong in project data fetching.', 5))
    }
  }
}







// export const initializeProjects = () => {
//   return async dispatch => {
//     const projects = await projectService.getAll()

//     // console.log(projects[0].images)
//     // console.log(typeof projects[0].images[0])





//     // let binary = '';
//     // let bytes = new Uint8Array(projects[0].images[0]);
//     // let length = bytes.byteLength;
//     // for (let i = 0; i < length; i++) {
//     //     binary += String.fromCharCode(bytes[i]);
//     // }

//     // projects[0].images[0] = btoa(binary)

//     // console.log(projects[0].images)



//     // for (let i = 0; i < 1; i++) {
//     //   for (let k = 0; k < projects[i].images.length; k++) {
//     //     const b64 = projects[i].images[k].toString('base64')
//     //     const byteCharacters = atob(b64)

//     //     const byteNumbers = new Array(byteCharacters.length);
//     //     for (let f = 0; f < byteCharacters.length; f++) {
//     //       byteNumbers[f] = byteCharacters.charCodeAt(f);
//     //     }

//     //     const byteArray = new Uint8Array(byteNumbers);

//     //     const blob = new Blob([byteArray], { type: 'image/jpeg' });

//     //     console.log(projects[i])
//     //     projects[i].images[k] = URL.createObjectURL(blob)
//     //   }
//     // }

//     // console.log('start crunch')

//     for (let i = 0; i < projects.length; i++) {
//       for (let k = 0; k < projects[i].images.length; k++) {
//         const b64 = projects[i].images[k].toString('base64')
//         const byteCharacters = atob(b64)

//         const byteNumbers = new Array(byteCharacters.length);
//         for (let f = 0; f < byteCharacters.length; f++) {
//           byteNumbers[f] = byteCharacters.charCodeAt(f);
//         }

//         const byteArray = new Uint8Array(byteNumbers);

//         const blob = new Blob([byteArray], { type: 'image/jpeg' });

//         projects[i].images[k] = URL.createObjectURL(blob)
//       }
//     }

//     // console.log('end crunch')


//     // for (let i = 0; i < projects.length; i++) {
//     //   if (i > 10) {
//     //     await projectService.remove(projects[i].id)
//     //   }
//     // }



//     dispatch({
//       type: 'INIT_PROJECTS',
//       data: projects,
//     })
//   }
// }

export default reducer