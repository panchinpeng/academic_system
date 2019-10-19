import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { USER_DEL } from '../../redux/actions'
/**
 * do all logout action
 */
class Logout extends React.Component{

  UNSAFE_componentWillMount() {
    this.props.removeUser()
    this.props.history.replace('/login')
  }
  render() {
    return (
      <div></div>
    )
  }
}
let mapStateToProps = () => ({

})
let mapDispatchToProps = (dispatch) => ({
  removeUser: () => {
    dispatch({ type: USER_DEL })
    
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Logout))