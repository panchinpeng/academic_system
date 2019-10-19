import ajax from './ajax'
export const userLoginAjax = async (username, password, callbackFail, callbackSuccess) => {
  let response = await ajax({ username, password, action: 'user' })
  if (!response || response.res === 0) {
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

export const logout = async (username = '') => {
  if (username) {
    await ajax({ username, action: 'user', method: 'logout' })
  }
}

export const getPeopleList = async (info, callbackFail, callbackSuccess) => {
  console.log(info)
  let response = await ajax({ username: info.username, idx: info.idx, action: "user", method: "getToken", ntreqtype: "peoplelist" })
  if (response.res === 0 && response.data === 'login fail') {
    callbackFail()
  }
  let token = response.data
  response = await ajax({ "token": token, "action": "user", "method": "getData" })

  if(response.code === 0) {
    alert(response.data)
    return;
  }

  callbackSuccess(response.data)
  
}