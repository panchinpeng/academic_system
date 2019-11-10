import React, {Component} from 'react'
import { withRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPeopleList, delPeople, addPeople, updatePeople } from '../../ajax/user'

import MyTable from '../../common/table/table'
import Pagation from '../../common/pagation/pagation'
import { PAGE_SIZE } from '../../constants/constant'
import PeopleAdd from '../../views/people/peopleAdd'
import { BREAD_DEL } from '../../redux/actions'
import fileAjax from '../../ajax/fileAjax'


import './index.scss'
class People extends Component{

  setList = (data) => {
    let pageInfo = data.pop()
    let urlPage = this.props.match.params.page * 1 
    if  (Math.ceil(pageInfo.total / PAGE_SIZE) >= urlPage && urlPage > 0) {
      this.setState({
        peopleList: data,
        dataSum: pageInfo.total
      })
    } else {
      // page error
      this.props.history.replace(this.props.match.path.replace(':page', 1))
    }
    
  }
  noLogin = () => {
    this.props.history.replace('/logout')
  }

  removeUsers = (checkedData) => {
    // get will delete id
    let info = { username: this.props.user.username, idx: this.props.user.idx, user_ids: checkedData.join(',')}
    delPeople(info, this.noLogin, this.getList)
  }

  tableAdd = () => {
    this.props.history.push('/people/add')
  }

  tableUpdate = (pid) => {
    let updateProple = this.state.peopleList.find(item => item.id === pid)
    this.props.history.push('/people/update', updateProple)
  }

  tableAddDoAction = (obj) => {
    addPeople(obj, this.noLogin, this.addSuccess);
  }
  tableUpdateDoAction = (obj) => {
    updatePeople(obj, this.noLogin, this.addSuccess)
  }


  addSuccess = (insertId) => {
    insertId = insertId || this.props.location.state.id
    // update img
    this.dzObj.files.length && fileAjax({ id: insertId}, this.dzObj.files, this.props.user)
    this.props.history.replace('/people')
    this.props.remoteBread()
  }

  getList = () => {
    let info = { username: this.props.user.username, idx: this.props.user.idx, pageSize: PAGE_SIZE, page: this.props.match.params.page * 1}
    getPeopleList(info, this.noLogin, this.setList)
  }

  getFileList = (dzObj) => {
    this.dzObj = dzObj
  }

  state = {
    dataSum : 0,
    peopleList: [],
    fieldTitles : [{title: '帳號'},  {title: 'Email'}, { title: '姓名'}]
  }

  
  componentDidMount() {
    let { page } = this.props.match.params
    if( page !== 'add' && page !== 'update') {
      this.getList()
    }
  }
  render(){
    let { page } = this.props.match.params
    if ( page === 'add' || page === 'update') {
      return (
        <div className="content-wrap">
          <Route path={["/people/add", "/people/update"]}>
            <PeopleAdd getFileList={this.getFileList} doAction={page === 'add' ? this.tableAddDoAction : this.tableUpdateDoAction} />

          </Route>
        </div>
      )
    } else {
      return (
        <div className="content-wrap">
          {
            this.state.fieldTitles && this.state.peopleList.length > 0 ? (
              <div>
                <MyTable titles={this.state.fieldTitles} datas={this.state.peopleList} remove={this.removeUsers} add={this.tableAdd} update={this.tableUpdate}/>
                <Pagation dataSum={this.state.dataSum} onePeriod={PAGE_SIZE}/>
              </div>
            ) : ''
          }
          
        </div>
      )
    
    }
  }
}

let mapStateToProps = (state) => ({
  user: state.user
})
let mapDispatchToProps = (dispatch) => ({
  remoteBread: () => {
    dispatch({ type: BREAD_DEL })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(People))