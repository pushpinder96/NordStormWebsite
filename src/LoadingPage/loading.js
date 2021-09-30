import React,{useState} from 'react';
import {Toast,Form} from 'react-bootstrap';
function Loading(props) {
    const [position, setPosition] = useState('top-end');
  
    return (
      <>
    
  
        <div
          aria-live="polite"
          aria-atomic="true"
          className="bg-dark position-relative"
          style={{ minHeight: '240px' }}
        >
          <div className="p-3" style={
              {position:'absolute',top:'20%',left:'72%'}}>
            <Toast>
              <Toast.Header closeButton={false}>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded me-2"
                  alt=""
                />
                <strong className="me-auto">{props.title}</strong>
                <small>{props.time}</small>
              </Toast.Header>
              <Toast.Body style={{fontSize:'15px',fontFamily:'Arial, Helvetica, sans-serif'}}>{props.description}</Toast.Body>
            </Toast>
          </div>
        </div>
      </>
    );
  }
export default Loading;