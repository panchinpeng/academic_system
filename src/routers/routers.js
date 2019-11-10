import People from '../views/people/index'
import Produce from '../views/produce/index'
import Banner from '../views/banner/index'
import Statistics from '../views/statistics/index'


const routes = [
  // { id: '5', title: '新增人員', component: PeopleAdd, directory: 'people/add', hiddenSlider: true},
  { id: '1', title: '新增', component: People, directory: 'people/add', params: '/:page', render: false},
  { id: '1', title: '人員管理', component: People, directory: 'people', params: '/:page', render: true},
  { id: '2', title: '商品管理', component: Produce, directory: 'produce', render: true},
  { id: '3', title: 'banner管理', component: Banner, directory: 'banner', render: true},
  { id: '4', title: '報表管理', component: Statistics, directory: 'statistics', render: true},
  
]

export default routes