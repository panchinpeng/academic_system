import { createStore, combineReducers } from 'redux'

import { test } from './reducers'
let store = createStore(combineReducers({
  test: test
}))

export default store