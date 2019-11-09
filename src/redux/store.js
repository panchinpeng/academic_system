import { createStore, combineReducers } from 'redux'

import { userReducer, breadReducer } from './reducers'
let store = createStore(combineReducers({
  user: userReducer,
  bread: breadReducer
}),
// show redux devtools
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store