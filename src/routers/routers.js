import People from '../views/people/index'
import Produce from '../views/produce/index'
import Banner from '../views/banner/index'
import Statistics from '../views/statistics/index'

const routes = [
  { id: '1', title: '人員管理', component: People, directory: 'people'},
  { id: '2', title: '商品管理', component: Produce, directory: 'produce'},
  { id: '3', title: 'banner管理', component: Banner, directory: 'banner'},
  { id: '4', title: '報表管理', component: Statistics, directory: 'statistics'}
]

export default routes