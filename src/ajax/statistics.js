import ajax from './ajax'
export async function groupNumber(user) {
  let response = await ajax({ username: user.username, idx: user.idx, action: "LottoAction", method: "getToken", ntreqtype: "groupNumber" })

  if (response.res !== 1) {
    return {}
  } else {
    response = await ajax({ token: response.data, action: "LottoAction", method : "getData"})
    return response.data
  }
}

export async function todayNumber(user) {
  let response = await ajax({ username: user.username, idx: user.idx, action: "LottoAction", method: "getToken", ntreqtype: "todayNumber" })
  if (response.res !== 1) {
    return {}
  } else {
    response = await ajax({ token: response.data, action: "LottoAction", method : "getData"})
    return response.data
  }
}

export async function statistNumberAppearSearchTime(user, queryTime) {
  let response = await ajax({
    username: user.username, idx: user.idx, action: "LottoAction", method: "getToken", ntreqtype: "statistNumberAppearSearchTime"
  })

  if (response.res !== 1) {
    return {}
  } else {
    response = await ajax({ token: response.data, action: "LottoAction", method : "getData", queryTime})
    return response.data
  }
}

export async function numberChart(user) {
  let response = await ajax({
    username: user.username, idx: user.idx, action: "LottoAction", method: "getToken", ntreqtype: "numberChart"
  })

  if (response.res !== 1) {
    return {}
  } else {
    response = await ajax({ token: response.data, action: "LottoAction", method : "getData"})
    return response.data
  }

}