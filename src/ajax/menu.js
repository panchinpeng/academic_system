import ajax from './ajax'

export const menuAjax = async (username, idx, callbackSuccess) => {
  let response = await ajax({ username, idx, action: 'menu', method: 'getMenu' })
  callbackSuccess(response.data)
}