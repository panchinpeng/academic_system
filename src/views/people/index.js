import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPeopleList } from '../../ajax/user'


import MyTable from '../../common/table/table'
import Pagation from '../../common/pagation/pagation'
import { PAGE_SIZE } from '../../constants/constant'
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

  state = {
    dataSum : 0,
    peopleList: [],
    fieldTitles : [{title: '帳號'},  {title: 'Email'}, { title: '姓名'}]
  }

  
  componentDidMount() {
    let info = { username: this.props.user.username, idx: this.props.user.idx, pageSize: PAGE_SIZE, page: this.props.match.params.page * 1}
    getPeopleList(info, this.noLogin, this.setList)
    
  }
  render(){
    return (
      <div className="content-wrap">
        
        {
          this.state.fieldTitles && this.state.peopleList.length > 0 ? (
            <div>
              <MyTable titles={this.state.fieldTitles} datas={this.state.peopleList}/>
              <Pagation dataSum={this.state.dataSum} onePeriod={PAGE_SIZE}/>
            </div>
          ) : ''
        }
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(withRouter(People))