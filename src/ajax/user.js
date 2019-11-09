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

  let response = await ajax({ username: info.username, idx: info.idx, action: "user", method: "getToken", ntreqtype: "peoplelist" })
  if (response.res === 0 && response.data === 'login fail') {
    callbackFail()
  }
  let token = response.data
  response = await ajax({ token, action: "user", method: "getData", page_size: info.pageSize, page: info.page })

  if (response.code === 0) {
    console.log(response.data)
    alert('請求發生錯誤')
    return;
  }

  callbackSuccess(response.data)

}

export const delPeople = async (info, callbackFail, callbackSuccess) => {

  let response = await ajax({ username: info.username, idx: info.idx, action: "user", method: "getToken", ntreqtype: "deleteUser" })
  if (response.res === 0 && response.data === 'login fail') {
    callbackFail()
  }
  let token = response.data
  response = await ajax({ token, action: "user", method: "getData", user_ids: info.user_ids })

  if (response.code === 0) {
    console.log(response.data)
    alert('請求發生錯誤')
    return;
  }

  callbackSuccess(response.data)

}

export const addPeople = async (info, callbackFail, callbackSuccess) => {

  let response = await ajax({ username: info.username, idx: info.idx, action: "user", method: "getToken", ntreqtype: "addUser" })
  if (response.res === 0 && response.data === 'login fail') {
    callbackFail()
  }
  let token = response.data
  response = await ajax({ token, action: "user", method: "getData", addUsername: info.doUsername, addPassword: info.password, addEmail: info.email, addName: info.name })

  if (response.code === 0) {
    console.log(response.data)
    alert('請求發生錯誤')
    return;
  }

  callbackSuccess(response.data)

}

export const updatePeople = async (info, callbackFail, callbackSuccess) => {

  let response = await ajax({ username: info.username, idx: info.idx, action: "user", method: "getToken", ntreqtype: "updateUser" })
  if (response.res === 0 && response.data === 'login fail') {
    callbackFail()
  }
  let token = response.data
  let updateObj = { token, action: "user", method: "getData", upUsername: info.doUsername, upEmail: info.email, upName: info.name }
  info.password && (updateObj['upPassword'] = info.password)
  
  response = await ajax(updateObj)

  if (response.code === 0) {
    console.log(response.data)
    alert('請求發生錯誤')
    return;
  }

  callbackSuccess(response.data)

}