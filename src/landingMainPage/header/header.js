import React, { Component } from 'react';
import Cartlogo from '../../assets/shoppingcart/cart.svg';
import Deletelogo from '../../assets/shoppingcart/trash.svg';
import {MyContext} from '../../contextApi/context';
import Styles from './header.module.css';
import {Link,Route,Switch} from 'react-router-dom';
import Logout from '../../assets/login logo/logout.png';
import Media from 'react-media';
import Navbar from './navbar/navbar';
import Login from '../../assets/login logo/login.svg';
import Responsive from './responsive header/responsive';
import AddRemoveItem from './increase/decrease/incDec';
import {Alert,Tooltip,OverlayTrigger} from 'react-bootstrap';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
class Header extends Component{


  static contextType = MyContext;
  usernameRef = React.createRef();
  passwordRef= React.createRef();
 state={
   loginOpen:false,
   cartOpen:false,
   cartEmptyCopyArray:this.context.data.cartRendering,
   cart:false,
   empty:[],
   AddNewItem:1,
   zeroElement:0,
   localStr:null
  
 }
 ClearCart=()=>{
   if(this.context.data.cartRendering.length==0){
     console.log('array Is Empty');
   }
   else{
    this.context.data.cartRendering.splice(0,this.context.data.cartRendering.length);
   }
   this.getAmountOfElement(0);
   this.setState({cart:true})
 }

 deleteHandler=(e,index)=>{
   this.setState({cart:true});
  let target=this.context.data.cartRendering[index];
  this.context.data.cartRendering.splice(index,1);
 this.getAmountOfElement(0);
 this.props.passCounterFunction(target);
   }

   getAmountOfElement=(value)=>{
     {this.context.getAmountOfElement(value)}
   }

  LoginModalHandler=()=>{
      this.setState({loginOpen:!this.state.loginOpen})
  }
  cartModalHandler=()=>{
    this.setState({cartOpen:!this.state.cartOpen})
}


AddNewItemHandler=(e,counter)=>{


  let targetItem=e.target.parentElement.childNodes[1].innerHTML;
  let priceItem=e.target.parentElement.parentElement.parentElement.parentElement.childNodes[0].src;
  let convertToNumber=+targetItem;

  const FindIndexOfElement=
       this.context.data.cartRendering.findIndex(
        item=>{
          console.log(priceItem);
            return item[0]===priceItem;
           });
    let existingCartItem=this.context.data.cartRendering[FindIndexOfElement];
    let UpdatedCounter;
    let TotalAmount=+existingCartItem[2];

    if(existingCartItem){
 
      UpdatedCounter=1+convertToNumber;
      
      TotalAmount=(TotalAmount/(UpdatedCounter-1))+TotalAmount;
      let fixedAmount=TotalAmount.toFixed(2);
      
      existingCartItem.splice(3,1,UpdatedCounter);
      existingCartItem.splice(2,1,fixedAmount);
      //just to update the state nothing to do with logic;
      this.setState({AddNewItem:1})
      this.updateCounter(UpdatedCounter);
    }
    
}
updateCounter=(value)=>{
  {this.context.updateCounter(value)}
}


removeNewItemHandler=(e,index)=>{

  let targetItem=e.target.parentElement.childNodes[1].innerHTML;
  let priceItem=e.target.parentElement.parentElement.parentElement.parentElement.childNodes[0].src;
  let convertToNumber=+targetItem;
  
  const FindIndexOfElement=
       this.context.data.cartRendering.findIndex(
        item=>{
          
            return item[0]===priceItem;
           });
          
    let existingCartItem=this.context.data.cartRendering[FindIndexOfElement];
    let Amount=+existingCartItem[2];
    let UpdatedCounter, TotalAmount,calculatedAmount;
    if(existingCartItem){
 
      UpdatedCounter=convertToNumber-1;
      TotalAmount=Amount/(UpdatedCounter+1);
      calculatedAmount=TotalAmount*UpdatedCounter;
      
      
      let fixedAmount=calculatedAmount.toFixed(2);
      
      existingCartItem.splice(3,1,UpdatedCounter);
      existingCartItem.splice(2,1,fixedAmount);
      if(UpdatedCounter==0){
        this.context.data.cartRendering.splice(index,1)
  
      }
      //just to update the state nothing to do with logic;
      this.setState({AddNewItem:1})
      this.updateCounter(UpdatedCounter);
    }
}

handleSubmit = async() => {
      
  try{
  
   await this.context.signInUser(this.usernameRef.current.value,this.passwordRef.current.value)
    
  }catch{
     return <Alert variant='danger'>
     Something Went wrong!!
   </Alert>
  }

};

 NotifyUser=(value)=>{
  console.log('payment done');
  {this.context.NotifyUser(value)}
}

 NotifyUserError=(value)=>{
  console.log('payment done');
  {this.context.NotifyUserError(value)}
}


 handleToken= async(token)=>{
  const product={name:'Your Shopping Cart',price:this.TotalPrice}
  const chargePaymentRequest=
   await axios.post('http://localhost:8080/checkoutserve',
{
   product,
    token
})

if(chargePaymentRequest.data.status=='success'){
setTimeout(this.NotifyUser, 1000);
 

console.log(chargePaymentRequest.data);
}
else{
setTimeout(this.NotifyUserError, 1000);
//history.push('/');
}

}


render(){

  const badgeNumber=
     this.context.data.cartRendering.reduce((currentNumber,item)=>{
     let target=parseInt(item[3]);
         return currentNumber+target;
  },0)

  const TotalPrice=
  this.context.data.cartRendering.reduce((currentNumber,item)=>{
  let target=parseFloat(item[2]);
      return currentNumber+target;
},0)


  const render =  
     this.context.data.cartRendering.map(
        (post,index)=>{
          
        return <div> 
                <div className={Styles.product}>
                 <img className={Styles.pic} src={post[0]} />
                 <p className={Styles.description}>{post[1]}</p>
                 <div>
                   <AddRemoveItem 
                   
                   key={index==index?index*11:index}
                   item={post[3]}
                   ref={this.MyRef}
                   AddNewItemHandler={(e,counter)=>this.AddNewItemHandler(e,counter)}
                   removeNewItemHandler={(e)=>this.removeNewItemHandler(e,index)} /> 
                   </div>
                 
                 <p className={Styles.price}>{post[2]}</p>
                 <img 
                      className={Styles.delete} 
                      src={Deletelogo} 
                      onClick={(e)=>this.deleteHandler(e,index)}/>
    
  </div> 
  </div>
  })

return(
  <div>
    <div style={this.props.outerDiv} className={Styles.outerDiv}>
        <div className={Styles.innerDiv}>
        
         <Media query='(max-width:600px)'>
                <Responsive />  
                           
         </Media>

            <div className={Styles.logoDiv}>
            <Link to='/' style={{textDecoration: 'none',color:'inherit'}}> 
            <h1 onClick={this.props.HomeRegister} className={Styles.logoHeader} style={{color:'whitesmoke'}}>
              NordStrom</h1>
              </Link>
              </div>
            <div>
            <Navbar register={this.props.register} />
            </div>
             <div className={Styles.cartDiv}>
            
            
              <img 
              src={Login} 
              className={Styles.LoginLogo} 
              onClick={this.LoginModalHandler}/>
              

             <img 
             className={Styles.cartlogo} 
             src={Cartlogo}
             onClick={this.cartModalHandler} />

             <p className={Styles.cartNumber}>{badgeNumber}</p>
          
            </div>
            </div>

            <div className={Styles.LoginModal}
                 style={
                   (this.state.loginOpen==true)?
                   {display:'block'}:{display:'none'}
                   } >
            { (this.context.data.currentUser)?
              <div style={{backgroundColor:'white'}}>
               <p style={{color:'black'}}>
                welcome,
                <strong style={{color:'black'}}>
                  {this.context.data.currentUserName?
                  this.context.data.currentUserName:
                  this.context.data.currentUser.displayName}
                  </strong></p>
                
                    <button onClick={this.props.Logout} >
                    <img style={{width:'30px',padding:'3px'}} src={Logout} />
                     Logout
                    </button>
                
                 
                       
            </div>
            :<div>
                 <input ref={this.usernameRef} type='text' placeholder='UserName' style={{color:'black'}}/>
                 <input ref={this.passwordRef} type='password' placeholder='password' style={{color:'black'}}/>
                 
                  <button onClick={this.handleSubmit} >
                    <img src={Login} /> LogIn
                    </button>
                  
                 <Link to='/register'>
                    <button onClick={this.props.register} style={{color:'#4eb5f1',backgroundColor:'white'}}>
                       Register
                       </button>
                       </Link>
                       </div>}

            </div>
            
            <div className={Styles.CartModal}
                 style={
                   (this.state.cartOpen==true)?
                   {display:'block'}:
                   {display:'none'}}>
               <div className={Styles.cartOuterDiv}>
             
              {this.context.data.cartRendering.length==0?
              <p  className={Styles.cartEmpty}
              style={{color:'black'}}>
                 Your Cart is Empty
                 </p>:
                 render}

                 <div className={Styles.underline}>
                 <h3>_______________________</h3>
                </div>
              
                 <div className={Styles.TotalAmountDiv}>
              
                   <h4>TotalAmount:</h4>
                   <h5>${TotalPrice.toFixed(2)}</h5>
              
                 </div>
                 
                 <div className={Styles.buttonDiv}>
                    
                     <button className={Styles.clearCart} onClick={this.ClearCart}>Clear Cart</button>
                   
                   <Link to='/' onClick={this.props.register}>
                     <div 
                     style={
                       this.context.data.cartRendering.length==0?
                       {display:'none'}:{display:'inline-block'}
                     }>

                    </div>
                     </Link>
                     
                    {(this.context.data.currentUser)?
                     
                  <StripeCheckout
                    onClick={this.hello}
                    label='checkout'
                    stripeKey='pk_test_51JRwvSEfdMNMhmC9FdtMz2h2Ho3myGYOYmtLpRLp8x7DvUHMdxVfzD2fYo6YLS8RZeXC4HWAsgacoGSrUapiEorS00S7BxW8CB'
                    token={this.handleToken}
                    billingAddress
                    shippingAddress
                    amount={TotalPrice*100}
                    name='Your Shopping Cart'
                    >
               </StripeCheckout>
                    :
                 <Link to='/login' onClick={this.props.register}>
              
{                 <OverlayTrigger
                    key={'yoo'}
                    placement='bottom'
                    overlay={
                      <Tooltip id={`tooltip-bottom`}>
                        Login First To Access <strong>{'Checkout'}</strong>.
                      </Tooltip>
                    }>

                  <button className={Styles.loginBtn}>Login</button> 
                      </OverlayTrigger>
  }

                    </Link>}
                   </div>
                   
               </div>
              </div>
            </div>
            <div> 
            </div>
            </div>
);
}
}
export default Header;