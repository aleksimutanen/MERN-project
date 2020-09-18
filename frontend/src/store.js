import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import projectReducer from './reducers/projectReducer'
import employeeReducer from './reducers/employeesReducer'
import formstateReducer from './reducers/formstateReducer'
import notificationReducer from './reducers/notificationReducer'
import pageIndexReducer from './reducers/pageIndexReducer'
import loginReducer from './reducers/loginReducer'
import infoReducer from './reducers/infoReducer'
import filterReducer from './reducers/filterReducer'
import singleProjectReducer from './reducers/singleProjectReducer'
import searchReducer from './reducers/searchReducer'

const reducer = combineReducers({
  projects: projectReducer,
  singleProject: singleProjectReducer,
  employees: employeeReducer,
  filter: filterReducer,
  search: searchReducer,
  info: infoReducer,
  formstate: formstateReducer,
  user: loginReducer,
  pageIndex: pageIndexReducer,
  notification: notificationReducer
})

const store = createStore(
  reducer, 
  composeWithDevTools(applyMiddleware(thunk))
)

export default store