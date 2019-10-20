import React from 'react'
import { Link, NavLink, withRouter } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStepBackward, faStepForward } from '@fortawesome/free-solid-svg-icons'

import './index.scss'
class Pagation extends React.Component {
  
  render() {
    let max = Math.ceil(this.props.dataSum / this.props.onePeriod)
    let now = this.props.match.params.page * 1
    let defaultSpace = 2
    let pageArr = [0, 0, 0, 0, 0]
    
    if (max < 5) {

      pageArr = []
      for(let i = 0; i < max; i++) {
        pageArr[i] = i + 1;
      }
    } else if (now > max || now < 1) {
      pageArr = [1, 2, 3, 4, 5]
      return 
    } else if (now - 2 < 1) {
      pageArr = [1, 2, 3, 4, 5]
    } else if (now + 2 - max > 0){
      
      // 2 3 4 5 6
      // max 5
      // now 4
      // noresize 1
      // currentSpace 3
      // defaultSpace 2
      // 0 0 0 4 0
      if (now + 2 - max > 0) {
        let moreSize = now * 1 + 2 - max
        let currentSpace = defaultSpace + moreSize;
        pageArr[currentSpace] = now
        pageArr.forEach((number, index) => {
          if(number === 0) {
            // compute first then add index 
            let page = now - currentSpace + index
            pageArr[index] = page
          }
        })
      } 
    } else {
      pageArr = [now -2, now - 1, now,  now + 1, now +2]
    }
    
    
    let {path} = this.props.match
   

    return (
      <div className="pagation-wrap">
        <Link className="page-link first" to={path.replace(':page', 1)}>
          <FontAwesomeIcon icon={faStepBackward}></FontAwesomeIcon>
        </Link>
        { pageArr.map( num => <NavLink className="page-link" key={num} to={ path.replace(':page', num) }>{num}</NavLink>) }
       
        <Link className="page-link last" to={path.replace(':page', max)}>
        <FontAwesomeIcon icon={faStepForward}></FontAwesomeIcon>
        </Link>
        
      </div>
    )
  }
}

export default withRouter(Pagation)