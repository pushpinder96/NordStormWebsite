import React from  'react';
import {Link} from 'react-router-dom';
import Styles from '../reviewItemModal/modal.module.css'
import {Modal,Button,Container} from 'react-bootstrap';
import { Component } from 'react';
class MydModalWithGrid extends Component {
 
 

  render(){
    return (
      <Modal {...this.props} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header >
          <Modal.Title id="contained-modal-title-vcenter">
            {this.props.Title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            <div style={{display:'flex',flexDirection:'column',position:'absolute',top:'0%'}}>
            <img id='nestedImage1'onClick={this.props.imageSwapper} style={{width:'80px',height:'100px',padding:'7px',cursor:'pointer'}} src={this.props.image1}/>
            <img id='nestedImage2'onClick={this.props.imageSwapper} style={{width:'80px',height:'100px',padding:'7px',cursor:'pointer'}} src={this.props.image2}/>
            <img id='nestedImage3'onClick={this.props.imageSwapper} style={{width:'80px',height:'100px',padding:'7px',cursor:'pointer'}} src={this.props.image3}/>
            <img id='nestedImage4'onClick={this.props.imageSwapper} style={{width:'80px',height:'100px',padding:'7px',cursor:'pointer'}} src={this.props.image4}/>
            </div>
           
           <div style={{display:'flex',flexDirection:'column',position:'relative',top:'10%',left:'20%'}}>
                <img
                 id='mainImage'
                 src={this.props.image}
                 style={{width:'300px',height:'450px'}} />
              </div>
              <div>
              <span>Price:</span><span style={{fontSize:'25px'}}>$</span> <span className={Styles.price}>{this.props.price}</span>
              </div>
              <div className={Styles.buttonDiv} style={this.props.buttonDiv}>
              <Link to='/buynowpage'  style={{color:'inherit'}}> 
              <button onClick={this.props.BuyNowModal} style={this.props.button}>Buy Now</button>
              </Link>
              
           </div>
              
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
  export default MydModalWithGrid;