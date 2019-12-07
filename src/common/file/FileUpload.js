import React from 'react'
import Dropzone from 'dropzone'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBackspace } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import './FileUpload.scss'
class FileUpload extends React.Component{
  static propTypes = {
    getFileList: PropTypes.func.isRequired,
    removeEvent: PropTypes.func
  }
  state = {
    files : []
  }
  componentDidMount() {
    let that = this
    this.myDropzone = new Dropzone("div#dropZoneWrap", { 
      url: "/controller.php",
      autoProcessQueue: false,
      addedfile: function (file) {
        that.setState({
          files: that.myDropzone.files
        })
      },
      thumbnail: function (file, dataUrl) {
        that.forceUpdate()
      }
    });
  }
  removeFile = (event) => {
    let index = event.currentTarget.dataset.index*1
    let {files} = this.state
    this.myDropzone.removeFile(files[index])
    files.splice(index, 1)
    this.setState({
      files: this.myDropzone.files
    })

    this.props.removeEvent && this.props.removeEvent()
  }
  componentDidUpdate() {
    this.myDropzone && this.props.getFileList(this.myDropzone)
  }
  render() {
    
    
    return (
      <div className="file-upload-wrap">
        <div id="dropZoneWrap">
          拖曳檔案或按一下上傳檔案
        </div>
        <div className="preview">
          { 
            this.state.files && this.state.files.map((file, k) => {
              return (
                <div className="dz-details" key={`uploadWrap${k}}`}>
                  { file.dataURL ? 
                  (
                    <>
                    <img data-dz-thumbnail alt="上傳預覽" src={file.dataURL} style={{"width": 200, opacity: '.6'}}/>
                    <div className="data-dz-remove" onClick={this.removeFile} data-index={k}>
                      <FontAwesomeIcon icon={faBackspace}></FontAwesomeIcon>
                    </div>
                    </>
                  ): 
                  (
                    <>
                      <div style={{"width": 200, opacity: '.6', background: 'rgba(0, 0, 0, 0.2901960784313726'}}>{ file.name} </div>
                      <div className="data-dz-remove" onClick={this.removeFile} data-index={k}>
                        <FontAwesomeIcon icon={faBackspace} />
                      </div>
                      
                    </>
                  )
                  }
                  
                </div>
              )
            }) 
          }
        </div>
      </div>
    )
  }
}

export default FileUpload

