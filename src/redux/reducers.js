import { USER_SET_INFO } from './actions'
export const userReducer = (state = {}, actions) => {
  switch (actions.type) {
    case USER_SET_INFO: {
      console.log('run', actions.data)
      let newState = Object.assign({}, actions.data)
      return newState
    }
    default:
      return state
  }
}