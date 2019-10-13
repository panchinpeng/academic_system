import { createStore, combineReducers } from 'redux'

import { userReducer } from './reducers'
let store = createStore(combineReducers({
  user: userReducer
}),
// show redux devtools
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store