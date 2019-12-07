import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import FileUpload from '../../common/file/FileUpload'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addBanner } from '../../ajax/banner'



class BannerAdd extends React.Component {
  state = {
    title: '',
    content: '',
  }

  change = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  successCb = () => {
    alert('新增文城');
  }

  submit = async event => {
    let form = event.target
    event.preventDefault()
    event.stopPropagation()
    if (form.title.value === '' || form.content.value === '' || !this.file) {
      alert('請正確填寫資料');
    } else {
      let responseResult = await addBanner({ title: form.title.value, content: form.content.value }, this.file, this.props.user)
      if(responseResult === 1) {
        this.props.close()

      } else {
        alert('新增失敗')
      }
    }

  }

  setFile = (f) => {
   this.file = f.files[0]
  } 

  clearFile = () => {
    this.file = ''
  }


  render() {
    return (
      <div>
        <Form encType="multipart/form-data" onSubmit={this.submit}>
          <Form.Group controlId="title">
            <Form.Label>標題</Form.Label>
            <Form.Control type="text" placeholder="請輸入標題" name="title" value={this.state.title} onChange={this.change} required/>
            <Form.Control.Feedback type="invalid">
              請輸入標題
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="content">
            <Form.Label>內容</Form.Label>
            <Form.Control as="textarea" rows="3" placeholder="請輸入內容" name="content" value={this.state.content} onChange={this.change} required/>
            <Form.Control.Feedback type="invalid">
              請輸入內容
            </Form.Control.Feedback>
          </Form.Group>

          banner圖片
          <FileUpload getFileList={this.setFile} removeEvent={this.clearFile}></FileUpload>

          <Button variant="primary" type="submit">
            確定新增
          </Button>
        </Form>
      </div>
    )
  }
}

let mapStateToProps = (state) => ({
  user: state.user
})
let mapDispatchToProps = (dispatch) => ({
 
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(BannerAdd))