import ajax from './ajax'
export default async function (postData, files, user) {
  let response = await ajax({ username: user.username, idx: user.idx, action: "fileModal", method: "getToken", ntreqtype: "userFile" })
  if (response.res !== 1) {
    console.log('file upload fail')
  } else {
    let token = response.data
    let data = new FormData()
    data.append('file_flag', '1')
    data.append('token', token)
    data.append('action', 'fileModal')
    data.append('method', 'getData')

    for (const key in postData) {
      if (postData.hasOwnProperty(key)) {
        const element = postData[key]
        data.append(key, element)
      }
    }

    if (files.length) {
      files.map(file => data.append('file[]', file))
    }
    
    // console.log('data', data)
    response = await fetch('/controller.php', {
      method: 'POST',
      body: data
    }).then(res => {
    }).catch(err => {
      alert(err)
    })
  }

  
  // return response 
}