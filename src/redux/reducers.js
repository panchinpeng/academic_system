import { TESTACTION } from './actions'
export const test = (state = '', actions) => {
  switch (actions.type) {
    case TESTACTION: {
      return 'test'
    }
    default:
      return state
  }
}