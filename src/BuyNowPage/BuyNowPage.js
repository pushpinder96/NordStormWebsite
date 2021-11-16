import React, { useState,useContext } from "react";
import Styles from '../BuyNowPage/BuyNowPage.module.css';
import AddRemoveItem from "../landingMainPage/header/increase/decrease/incDec";
import StripeCheckout from "react-stripe-checkout";
import { Link,useHistory } from "react-router-dom";
import {MyContext} from '../contextApi/context';
import axios from "axios";
const BuyNowPage=(props)=> {
    const [TotalPrice,setTotalPrice]=useState();
    const [counter,setcounter]=useState(1);
    const context=useContext(MyContext);
    const history=useHistory();

   const checkout=()=>{ history.push('/login')};

  const NotifyUser=(value)=>{
    console.log('payment done');
    {context.NotifyUser(value)};
  }
  
  const NotifyUserError=(value)=>{
    console.log('payment done');
    {context.NotifyUserError(value)};
  }
  
  

  const handleToken= async(token)=>{
    const product={name:'Your Shopping Cart',price:TotalPrice};
    const chargePaymentRequest=
     await axios.post('http://localhost:8080/checkoutserve',
  {
     product,
      token
  });
  
  if(chargePaymentRequest.data.status=='success'){
  setTimeout(NotifyUser, 1000);
  history.push('/');
  }
  else{
  setTimeout(NotifyUserError, 1000);
  history.push('/');
  }
  
  }
  


  
 const AddNewItemHandler=()=>{
  setcounter(counter+1);
 }
 const removeNewItemHandler=()=>{
     if(counter>1){
    setcounter(counter-1);
     }
 }
   
 
    
        return(<div>
            <div className={Styles.outerdiv}>
                <div className={Styles.innerdiv}>
                    <div className={Styles.imagediv}>
                        <img src={props.image} />
                    </div>
                    <div className={Styles.descriptionDiv}>
                        <div className={Styles.title}>
                            <p>{props.title}</p>
                        </div>
                        <div className={Styles.pricediv}>
                            <p>$<span>{props.price}</span></p>

                        </div>
                        <div
                        style={{fontSize:'30px'}}
                         className={Styles.increase}>
                        <AddRemoveItem
                         styleNumber={{fontSize:'20px'}} 
                         item={counter}
                         AddNewItemHandler={(e)=>AddNewItemHandler(e)}
                         removeNewItemHandler={(e)=>removeNewItemHandler(e)}
                        />

                        </div>
                    </div>
                    <div className={Styles.ButtonDiv}>
                   <Link to='/'>
                   <button className={Styles.continuePurchasing}>Continue Purchasing</button>
                   </Link>

                   {!context.data.currentUser?
                    <button
                     className={Styles.Proceed}
                     onClick={checkout}>Proceed To Checkout</button>:
                     <StripeCheckout
                    label='Proceed To checkout'
                    stripeKey='pk_test_51JRwvSEfdMNMhmC9FdtMz2h2Ho3myGYOYmtLpRLp8x7DvUHMdxVfzD2fYo6YLS8RZeXC4HWAsgacoGSrUapiEorS00S7BxW8CB'
                    token={handleToken}
                    billingAddress
                    shippingAddress
                   amount={TotalPrice*100}
                    name='Your Shopping Cart'></StripeCheckout>
                   }
                      </div>
                    <div className={Styles.underscore}>
                        _____________
                    </div>
               <div className={Styles.totalPrice}>
               <p>Total=$<strong>{(props.price*counter).toFixed(2)}</strong></p>
               </div>

         </div>
            </div>
        </div>);
    


}

export default BuyNowPage;