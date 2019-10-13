export default async function (postData) {
  let response = await fetch('/controller.php', {
    method: 'POST',
    body: JSON.stringify(postData)
  }).then(res => {
    return res.json()
  }).catch(err => {
    alert(err)
  })
  return response 
}
