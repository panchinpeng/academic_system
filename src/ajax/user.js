import ajax from './ajax'
export const userLoginAjax = async (username, password, callbackFail, callbackSuccess) => {
  let response = await ajax({ username, password, action: 'user' })
  if (response.res === 0) {
    callbackFail()
  } else {
    callbackSuccess(response.data)
  }
}

export const checkLogin = async (idx = '', username = '', callbackFail = null, callbackSuccess = null) => {
  if (!idx || !username) {
    callbackFail && callbackFail()
    return
  }
  let response = await ajax({ idx, username, action: 'user', method: 'checklogin' })
  if (response.res === 0) {
    callbackFail && callbackFail()
  } else {
    callbackSuccess && callbackSuccess(response.data)
  }
}