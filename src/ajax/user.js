import ajax from './ajax'
export const userLoginAjax = async (username, password, callbackFail, callbackSuccess) => {
  let response = await ajax({ username, password, action: 'user' })
  if (response.res === 0) {
    callbackFail()
  }else{
    callbackSuccess(response.data)
  }
}

export const checkLogin = async(idx = '', username = '', noLoginCallback) => {
  if(!idx || !username) {
    noLoginCallback()
    return
  }
  let response = await ajax({idx, username, action: 'user', method: 'checklogin'})
  if(response.res === 0) {
    noLoginCallback()
  } 
}
