import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTimes } from '@fortawesome/free-solid-svg-icons'
import ScrollArea  from 'react-scrollbar'

// popup
import { PopupboxManager, PopupboxContainer } from 'react-popupbox'
import "react-popupbox/dist/react-popupbox.css"

import './index.scss'
import { getBanner, delBanner, editBanner } from '../../ajax/banner'

class Banner extends React.PureComponent{

  state = {
    showAddBtn : false,
    banner : [],
    targetDom: '',
    editPos : {
      x: 0,
      y: 0
    },
    editDom: '',
    editTitle: null,
    editContent: null
  }

  titleUpdateInput = (event) => {
    this.setState({
      editTitle: event.target.value
    })
  }

  contentUpdateInput = (event) => {
    this.setState({
      editContent: event.target.value
    })
  }

  openPopupbox = () => {
    const BannerAdd = React.lazy(() => import('./BannerAdd'))
    const content = (
      <React.Suspense fallback="wait">
        <BannerAdd close={this.addBannerSuccess}></BannerAdd>
      </React.Suspense>
      
    )
    PopupboxManager.open({ content })
  }

  addBannerSuccess = () => {
    PopupboxManager.close()
    this.fetchBanner()
  }

  fetchBanner = async () => {
    let banner = await getBanner(this.props.user)
    this.setState({
      banner
    })
  }

  selectBanner = (event) => {
    if(event.currentTarget.dataset.id !== this.state.editDom) {
      this.setState({
        targetDom: event.currentTarget.dataset.id,
        editDom: '',
        editTitle: null,
        editContent: null
      })
    }
    
  }

  updateBanner = async () => {
    let updateTitle = this.state.editTitle
    let updateContent = this.state.editContent
    if (this.state.editDom && (updateTitle || updateContent)) {
      let newBannerAry = this.state.banner
      let idx = newBannerAry.findIndex(item => item.id * 1 === this.state.editDom * 1)
      if(!updateTitle || !updateContent) {
        updateTitle || (updateTitle = newBannerAry[idx].title)
        updateContent || (updateContent = newBannerAry[idx].content)
      }
      let result = await editBanner(this.props.user, {id : this.state.editDom, title: updateTitle, content: updateContent })
      if (result.res === 1) {
        
        newBannerAry[idx].title = updateTitle
        newBannerAry[idx].content = updateContent
        this.setState({
          editDom: '',
          editTitle: null,
          editContent: null,
          targetDom: ''
        })
      }
    } else {
      alert('請正確填寫資料')
    }
  }
  renderBannerStyleCard = (active) => {
    let returnClass = { width: '100%', margin: '0 5px 5px 0', position: 'relative', transformStyle: 'preserve-3d', transition: 'all 1s', boxSixing: 'border-box'}
    if (active) {
      returnClass.transform = 'rotateY(180deg)'
    }
    return returnClass
  }
  renderBannerStyle = (active, st, id = '') => {
    let returnClass = st
    returnClass.transition = 'none'
    returnClass.overflow = 'hidden'
    returnClass.transition = 'opacity 1s'
    if (active) {
      returnClass.opacity = '.3'
    }
    if (id * 1 === this.state.editDom * 1) {
      returnClass.transform = 'rotateY(-180deg)'
      
    }
    return returnClass
    // return {}

  }

  editClick = (event) => {
    event.stopPropagation()
    this.setState({
      editDom: this.state.targetDom,
      targetDom: '',
      editTitle: null,
      editContent: null
    })
  }

  delClick = async () => {
    if (window.confirm('確定刪除嗎')) {
      await delBanner(this.props.user, this.state.targetDom)
      let banner = this.state.banner
      banner = banner.filter(ele => ele.id !== this.state.targetDom)
      this.setState({
        editDom: '',
        targetDom: '',
        banner
      })

    }
  }

  componentDidMount() {
    
    this.fetchBanner()
    this.setState({
      showAddBtn: true,
    })
  }


  render(){
    
    return (
      <>
        
        <div className="container-wrap ">
          
          { this.state.banner.map((v, k) => (
            <Card key={v.id} style={this.renderBannerStyleCard(v.id === this.state.editDom)} onClick={this.selectBanner} data-id={v.id} className=" col-md-5 p-0">
              <Card.Img variant="top" src={v.url} style={ this.renderBannerStyle(v.id === this.state.targetDom, {width: '100%', overflow: 'hidden'}, v.id) }/>
              <Card.Body style={this.renderBannerStyle(v.id === this.state.targetDom, { }, v.id)}>
                <Card.Title>
                  {
                    (v.id === this.state.editDom) ? 
                    <input type="text" value={this.state.editTitle !== null ? this.state.editTitle : v.title} style={{ width: '100%'}} onInput={this.titleUpdateInput}/>
                    : v.title
                  }
                </Card.Title>
                <Card.Text >
                  {
                    (v.id === this.state.editDom) ?
                    <textarea value={this.state.editContent !== null ?  this.state.editContent : v.content} rows="8" style={ {width: '100%'} } onInput={this.contentUpdateInput}></textarea>
                    : (
                      <ScrollArea 
                        speed={0.4}
                        className="scroll-wrap"
                        contentClassName="content"
                        vertical={true}
                        verticalScrollbarStyle = {{width: 2, marginLeft: 6}}
                        smoothScrolling={true}
                        stopScrollPropagation = {true}
                      >
                        <span>{ v.content }</span>
                      </ScrollArea>
                    )
                  }
                  
                </Card.Text>
                {
                  (v.id === this.state.editDom) && <Button variant="info" className="mr-1 modify-btn" onClick={this.updateBanner}>確認修改</Button>
                }
              </Card.Body>
              { 
                v.id === this.state.targetDom && 
                <div >
                  <div style={
                    { position: 'absolute', top: '50%',
                      left: '30%',
                      width: '60px',
                      height: '60px',
                      transform: 'translate(-50%, -50%)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      background: 'linear-gradient(45deg, rgba(11, 10, 10, 0.65), rgba(0, 0, 0, 0.55))',
                      borderRadius: '50%',
                      color: '#fff'
                    }
                  }
                  onClick={this.editClick}
                  >
                    <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
                  </div>
                  <div style={
                    { position: 'absolute', top: '50%',
                      left: '70%',
                      width: '60px',
                      height: '60px',
                      transform: 'translate(-50%, -50%)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      background: 'linear-gradient(45deg, rgba(11, 10, 10, 0.65), rgba(0, 0, 0, 0.55))',
                      borderRadius: '50%',
                      color: '#fff'
                    }
                  }
                  onClick={this.delClick}
                  >
                    <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                  </div>
                </div> 
              }
              
            </Card>
          ))
          }
          
          
        </div>
        {
          this.state.showAddBtn && <Button variant="info" className="mr-1 add-btn" onClick={this.openPopupbox}>新增</Button>
        }


        {/* popup */}
        <PopupboxContainer titleBar={ {enable: true, text: '新增banner', className: 'popup-title'} } overlayClose={false} className="popup-wrap" content={ {className: 'popup-content'}}></PopupboxContainer>

       

      </>
    )
  }
}
let mapStateToProps = (state) => ({
  user: state.user
})
let mapDispatchToProps = (dispatch) => ({
 
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Banner))