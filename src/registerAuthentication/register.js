import React,{useState,useContext} from  'react';
import Styles from '../registerAuthentication/register.module.css';
import {Form,Row,InputGroup,Button,Col,Alert} from 'react-bootstrap';
import {useRef} from 'react';
import {MyContext} from '../contextApi/context';
import AllProducts from '../allProducts/allProduct';
import Loading from '../LoadingPage/loading';

function RegisterAuth() {
    const [validated, setValidated] = useState(false);
    const [loading,setloading]=useState(false);
    const [emailexists,setemailexists]=useState(false);
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
      
        setloading(true);
       await context.createUser(EmailRef.current.value,passwordRef.current.value,NameRef.current.value)
        if(context.data.EmailVerification===true){
       console.log('yes its true')
        }   
      }catch{
        
       const timer= setTimeout(() => {
           setemailexists(true);
         }, 100);

         setTimeout(() => {
           setemailexists(false);
         }, 2500);
          
      }
      setloading(false);

    };

    const confirmPassword= ()=>{
   let pass=document.getElementById('passwordRef');
   let passConfirm=document.getElementById('passwordConfirmRef');

   
  
    if(pass.value!==passConfirm.value){
     passConfirm.setCustomValidity("Passwords Don't Match");
     setValidated(true);
    }
    else{
      passConfirm.setCustomValidity('');}
    
    }
  
    return (
      <div>
        <div className={Styles.outerdiv}>
          <div className={Styles.innerdiv}>

          {
                          emailexists==true?
                          <div style={
                            {position:'absolute',top:'2%',left:'71%',zIndex:'100'}}>
                          <Loading 
                          title='Email'
                          description='Email Already In Use!!.Please Try With New E-Mail Address.'/>
                          </div>:null
                       }


      <Form  validated={validated} onSubmit={handleSubmit} >
      <h1>SignUp</h1>
      <h4>It's Fast And Simple</h4>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>First name</Form.Label>
            <Form.Control 
             ref={NameRef} 
              required
              type="text"
              placeholder="First name"
              
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          </Row>
          <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Last name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Last name"
          
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <Form.Label>Username</Form.Label>
            <InputGroup hasValidation>
              <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>E-Mail:</Form.Label>
            <Form.Control ref={EmailRef} type="email" placeholder="E-Mail" required />
            <Form.Control.Feedback type="invalid">
              Please Provide Valid E-Mail Address
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom04">
            <Form.Label>Password:</Form.Label>
            <Form.Control 
            id= 'passwordRef'
            ref={passwordRef} 
            type="Password"
            placeholder="Password"
            required
            minLength='8'
            maxLength='15'
             />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom05">
            <Form.Label>Password Confirmation:</Form.Label>
            <Form.Control 
            id='passwordConfirmRef'
            size='sm' 
            type="password" 
            placeholder="confirm the Password"
            required
            minLength='8'
            maxLength='15'
            onChange={confirmPassword} />
            <Form.Control.Feedback  type="invalid">
              Please confirm Both Password
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
          />
        </Form.Group>
        <Button disabled={loading} className={Styles.button} type="submit">SignUp</Button>
      </Form>

      </div>
      </div>
        </div>
    );
  }

  export default RegisterAuth;