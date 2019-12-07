import ajax from './ajax'
export async function addBanner (postData, file, user) {
  let response = await ajax({ username: user.username, idx: user.idx, action: "Banner", method: "getToken", ntreqtype: "addBanner" })
  if (response.res !== 1) {
    console.log('file upload fail')
  } else {
    let token = response.data
    let data = new FormData()
    data.append('file_flag', '1')
    data.append('token', token)
    data.append('action', 'Banner')
    data.append('method', 'getData')

    for (const key in postData) {
      if (postData.hasOwnProperty(key)) {
        const element = postData[key]
        data.append(key, element)
      }
    }

    if (file) {
      data.append('files', file)
    }
    
    // console.log('data', data)
    response = await fetch('/controller.php', {
      method: 'POST',
      body: data
    }).then(res => {
      return res.json()
     
    }).catch(err => {
      alert(err)
    })
    return response.res
    
  }
}

export async function getBanner(user) {
  let response = await ajax({ username: user.username, idx: user.idx, action: "Banner", method: "getToken", ntreqtype: "getBanner" })
  if (response.res !== 1) {
   return {}
  } else {
    response = await ajax({ token: response.data, action: "Banner", method : "getData"})
    return response.data
  }
}


export async function delBanner(user, bid = 0) {
  if  (!bid) {
    return {}
  } 
  let response = await ajax({"action":"Banner", "method": "getToken", "username" : user.username, "idx" : user.idx, "ntreqtype" : "delBanner"});
  if (response.res !== 1) {
    return {}
  } else {
    response = await ajax({"token": response.data, "action": "Banner", "method" : "getData", "id" : bid})
  }
  
}

export async function editBanner(user, bannerInfo) {
  let response = await ajax({"action":"Banner", "method": "getToken", "username" : user.username, "idx" : user.idx, "ntreqtype" : "editBanner"});

  if (response.res !== 1) {
    return {}
  } else {
    return await ajax({"token": response.data, "action" : "Banner", "method" : "getData", "id" : bannerInfo.id, "title": bannerInfo.title, "content" : bannerInfo.content}) 
  }
}