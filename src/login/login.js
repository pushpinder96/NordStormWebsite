import React,{useState,useContext} from  'react';
import {Link} from 'react-router-dom';
import Styles from '../login/login.module.css';
import {Form,Row,InputGroup,Button,Col,Alert} from 'react-bootstrap';
import {useRef} from 'react';
import {MyContext} from '../contextApi/context';

function Login() {
    const [validated, setValidated] = useState(false);
    const passwordRef=useRef();
    const EmailRef=useRef();
    const NameRef=useRef();
    const context=useContext(MyContext);


    const handleSubmit = async(event) => {
      
      
      const form = event.currentTarget;
      if (form.checkValidity() === true) {
        event.preventDefault();
        event.stopPropagation();
        
      }
      setValidated(true);
      try{
        console.log('form submitted');
        console.log();
        await context.signInUser(EmailRef.current.value,passwordRef.current.value)
        
      }catch{
         return <Alert variant='danger'>
         Something Went wrong!!
       </Alert>
      }


    };

  
    return (
      <div>
        <div className={Styles.outerdiv}>
          <div className={Styles.innerdiv}>
      <Form  validated={validated} onSubmit={handleSubmit} >
      <h1>Login</h1>
      <h4>To Access More Features</h4>
        <div 
        style={{
          marginTop:'2%'
        }}>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" >
            <Form.Label
            style={
              {
                position:'relative',
                left:'37%',
                width:'40%',
                }}
            >E-Mail:</Form.Label>
            <Form.Control style={
              {
                position:'relative',
                left:'83%',
                width:'40%',
                }} ref={EmailRef} type="email" placeholder="E-Mail" required />

          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6">
            <Form.Label
            style={
              {
                position:'relative',
                left:'37%',
                width:'40%',
                }}>Password:</Form.Label>
            <Form.Control 
            style={
              {
                position:'relative',
                left:'83%',
                width:'40%',
                }}
            id= 'passwordRef'
            ref={passwordRef} 
            type="Password"
            placeholder="Password"
             />
          </Form.Group>
        </Row>
       <Link to='/'>
        <Button
        onClick={handleSubmit} 
        className={Styles.button} 
        type="submit">Login
        </Button>
        </Link>
        </div>
      </Form>
      </div>
      </div>
        </div>
    );
  }

  export default Login;