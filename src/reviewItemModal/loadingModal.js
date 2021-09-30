import React from 'react';
import {Button,Modal,Spinner} from 'react-bootstrap';
export default function LoadingModal(props) {
  
  
    return (
      <>
        
        <Modal show={true} fullscreen={true} >
          
            <Modal.Title>
                <Spinner animation="border" role="status">
             <span className="visually-hidden">Loading...</span>
             </Spinner>
             </Modal.Title>
          <Modal.Body>{props.description}</Modal.Body>
        </Modal>
      </>
    );
  }