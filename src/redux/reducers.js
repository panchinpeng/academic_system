import { USER_SET_INFO, USER_DEL } from './actions'
import { logout } from '../ajax/user'
import Cookies from 'js-cookie'


export const userReducer = (state = {}, actions) => {
  switch (actions.type) {
    case USER_SET_INFO: {
      let newState = Object.assign({}, actions.data)
      return newState
    }
    case USER_DEL:{
      logout(state.username)
      Cookies.remove('idx')
      Cookies.remove('username')
      return {}
    } 
      
    default:
      return state
  }
}