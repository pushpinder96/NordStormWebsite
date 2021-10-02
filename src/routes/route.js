import React, { Component } from 'react';
import Login from '../login/login';
import Layout from '../layoutHeaderFooter/layoutheadfoot'; 
import MainPage from '../landingMainPage/container/MainPage';
import Loading from '../LoadingPage/loading';
import LoadingModal from '../reviewItemModal/loadingModal';
import {Provider} from '../contextApi/context';
import Auth from '../firebase/firebase';
import RegisterAuth from '../registerAuthentication/register';
import {Route,Redirect, Router} from 'react-router-dom';
import contact from '../contact/contact';
import AllProducts from '../allProducts/allProduct';
import BuyNowPage from '../BuyNowPage/BuyNowPage';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';
import Sport from '../sportProducts/sport';
class Routes extends Component{
   state={
    BuyNowArray:[],
    TakeRequestNewArrivals:[],
    TakeRequestShirts:[], 
    cartRendering:[],
    currentAmount:1 ,
    index:[], 
    email:'',
    password:'', 
    register:null,
    currentUser:'',
    name:'',
    EmailVerification:null,
    currentUserName:'',
    NotifyUser:false,
    NotifyUserError:false,
    LoginToMainpage:null,
    NotifyUserSubmitContact:false,
    updateState:0,
    emailExists:false
  }

componentDidUpdate(prev,state){

      localStorage.setItem('cart',JSON.stringify(this.state.cartRendering));
  
    }
componentDidMount(){
 
  Auth.auth().onAuthStateChanged(async (user)=>{
  if (user) {
  
   this.setState({currentUser:user})
  this.setState({EmailVerification:false});

if(user.emailVerified==false){
    await user.sendEmailVerification();
}
    const onIdTokenChangedUnsubscribe = Auth.auth().onIdTokenChanged((user) => {
      if (user && user.emailVerified) {
       
        this.setState({EmailVerification:true})
        return onIdTokenChangedUnsubscribe(); //unsubscribe
      }
      setTimeout(() => {
        
        Auth.auth().currentUser.reload();
        Auth.auth().currentUser.getIdToken(/* forceRefresh */ true);
      }, 10000);
    });
  }
 
 })


  let local=JSON.parse(localStorage.getItem('cart'));
  if(local!==''){
    this.setState({cartRendering:local})
  }

}
  changeStateHandler=(value)=>{
      this.setState({cartRendering:value});
  }

  BuyNowFunction=(value)=>{
    this.setState({BuyNowArray:value});
}
    passCounterFunction=(value)=>{
     this.state.index.push(value);
      }
      NotifyUser=()=>{
        this.setState({NotifyUser:true});
        setTimeout(()=>{
          this.setState({NotifyUser:false})
      
        },6000)
        
      }

      NotifyUserSubmitContact=()=>{
        this.setState({NotifyUserSubmitContact:true});
        setTimeout(()=>{
          this.setState({NotifyUserSubmitContact:false})
        },6000)
        
      }

      NotifyUserError=()=>{
        this.setState({NotifyUserError:true});
        setTimeout(()=>{
          this.setState({NotifyUserError:false})
       },10000)
       
      }
    getAmountOfElement=(value)=>{
      this.setState({currentAmount:value})       
    }
    updateCounter=(counter)=>{
      this.setState({updatecounter:counter})
    }
    register=()=>{
      this.setState({register:true});
      
    }
    navbarSticky=()=>{
      this.setState({register:true});
       
    }
    HomeRegister=()=>{
      this.setState({register:false})
    }
    createUser=(email,password,name)=>{
  
     return Auth.auth().createUserWithEmailAndPassword(email,password)
     .then((result)=>{
           this.setState({email:email});
           this.setState({password:password})
           
           return result.user.updateProfile({
            displayName: name
          })
          
     })
     
    .catch(function(error) {
      console.log(error);
      this.setState({emailExists:true})
    });
    }

    signInUser=(email,password)=>{
      return  Auth.auth().signInWithEmailAndPassword(email,password).
      then((user)=>{
        
        this.setState({LoginToMainpage:true})
       this.setState({EmailVerification:true})
        this.setState({currentUserName:Auth.auth().currentUser.displayName})
      })
    }
    Logout= async()=>{
      await Auth.auth().signOut().then(()=>{
        window.location.reload();
        this.setState({EmailVerification:null})
      })
    }

    TakeRequestNewArrivals=(value)=>{
      this.setState({TakeRequestNewArrivals:value}) 
    }
    TakeRequestShirts=(value)=>{
      this.setState({TakeRequestShirts:value}) 

    }


  render(){

      const ContextValues={
          data:this.state,
          navbarSticky:this.navbarSticky,
          changeState:this.changeStateHandler,
          getAmountOfElement:this.getAmountOfElement,
          createUser:this.createUser,
          signInUser:this.signInUser,
          updateCounter:this.updateCounter,
          NotifyUser:this.NotifyUser,
          NotifyUserError:this.NotifyUserError,
          TakeRequestNewArrivals:this.TakeRequestNewArrivals,
          TakeRequestShirts:this.TakeRequestShirts,
          NotifyUserSubmitContact:this.NotifyUserSubmitContact,
          BuyNowFunction:this.BuyNowFunction
      }

      return(
          <div >
              <div >
               <Provider 
                  value={ContextValues}>
               <Layout  
                  passCounterFunction={(index)=>{this.passCounterFunction(index)}}
                  register={this.register}
                  HomeRegister={this.HomeRegister}
                  SignIn={this.SignIn}
                  Logout={this.Logout}
                  forgotPassword={this.forgotPassword}
                  outerDiv={(this.state.register==true)?
                    {position:'sticky'}:{position:'fixed'}
                   }>


                     {(this.state.NotifyUser==true)?
                     <div style={
                       {position:'absolute',top:'2%',left:'71%',zIndex:'100'}}>
                     <Loading 
                     title='Payment'
                     description='Thank You For Purchasing.Transaction Completed Successfully!!'/>
                     </div>:
                     null
                     }

                   {(this.state.NotifyUserSubmitContact==true)?
                     <div style={
                       {position:'absolute',top:'2%',left:'71%',zIndex:'100'}}>
                     <Loading 
                     title='Contact'
                     description='Thank You For Your Request.We Will Contact You Soon!!'/>
                     </div>:
                     null
                     }


                     {(this.state.LoginToMainpage==true)?
                     <Redirect to='/'/>:null
                     }

                    <Route exact={true} path='/casual' component={AllProducts} />
                    <Route exact ={true} path='/buynowpage'>
                      <BuyNowPage 
                      image={this.state.BuyNowArray[0]}
                      title={this.state.BuyNowArray[1]}
                      price ={this.state.BuyNowArray[2]}
                      />
                    </Route>

                     {(this.state.NotifyUserError==true)?
                     <div style={
                       {position:'absolute',top:'2%',left:'71%',zIndex:'100'}}>
                     <Loading 
                     title='Payment'
                     description='Payment Transaction Failed !!'/>
                     </div>:
                     null
                     }

      
          <Route  path='/login' component={Login} />
          <Route path='/contact' component={contact} />
          <Route path='/sport' component={Sport} />
          <Route exact={true} path='/'>
                      <MainPage />
                    </Route>
                      

          {this.state.EmailVerification==true?
          <Redirect exact={true} to='/'/>:
           this.state.EmailVerification==false?
           <LoadingModal  description='please check your email account to verify'/>:
                <div>
                    
                    {(this.state.register==true)? 
                    <div 
                    style={{position:'relative',top:'5%',left:'6%'}}>
                     <Route path='/register' component={RegisterAuth} />
                     
                     </div>:
                     <div 
                    style={{position:'relative',top:'5%',left:'6%'}}>
                      <Route path='/register' component={RegisterAuth} />
                      </div>}
                    
                    </div>
                       }

                        </Layout>
  
                    </Provider>
             </div>
            </div>
        );
    }
}
export default Routes;