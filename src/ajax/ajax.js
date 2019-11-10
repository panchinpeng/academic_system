export default async function (postData, url = '/controller.php') {
  let response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(postData)
  }).then(res => {
    return res.json()
  }).catch(err => {
    alert(err)
  })
  return response 
}
