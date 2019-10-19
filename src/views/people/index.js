import React, {Component} from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getPeopleList } from '../../ajax/user'


import MyTable from '../../common/table/table'
import './index.scss'
class People extends Component{

  setList = (data) => {
    this.setState({
      peopleList: data
    })
  }
  noLogin = () => {
    this.props.history.replace('/logout')
  }

  state = {
    peopleList: [],
    fieldTitles : ['帳號', '姓名', 'Email']
  }
  componentDidMount() {
    let info = { username: this.props.user.username, idx: this.props.user.idx}
    console.log(this)
    getPeopleList(info, this.noLogin, this.setList)
    
  }
  render(){
    return (
      <div className="content-wrap">
        {this.state.fieldTitles && this.state.peopleList.length > 0 ? <MyTable titles={this.state.fieldTitles} datas={this.state.peopleList}/> : ''}
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(withRouter(People))