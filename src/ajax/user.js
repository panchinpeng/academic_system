import ajax from './ajax'
export const userLoginAjax = async (username, password, callbackFail, callbackSuccess) => {
  let response = await ajax({ username, password, action: 'user' })
  if (response.res === 0) {
    callbackFail()
  }else{
    callbackSuccess(response.data)
  }
}