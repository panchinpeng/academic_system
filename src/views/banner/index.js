import React, {Component} from 'react'
import Card from 'react-bootstrap/Card'
import { withRouter } from 'react-router-dom'
import './index.scss'

class Banner extends React.PureComponent{
  
  render(){
    
    return (
      <div className="container-wrap">
        { [1,2,3,4,5,6,7].map((v, k) => (
          <Card key={v} style={{ width: '100%', maxWidth: 400, margin: '0 5px 5px 0'}}>
            <Card.Img variant="top" src="data:image/jpeg;base64,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" style={{ width: 100}}/>
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of
                the card's content.
              </Card.Text>
              
            </Card.Body>
          </Card>
        ))
        }
        
        
      </div>
    )
  }
}

export default withRouter(Banner)