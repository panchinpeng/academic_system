import routes from '../routers/routers'
export default function (location) {

  return routes.find(item => {
    return location.slice(1).indexOf(item.directory) > -1
  })
}