import React from 'react';
import Header from '../landingMainPage/header/header';
import Footer from '../landingMainPage/footer/footer';

const Layout =(props)=>{
    return(
        <div>
            <Header outerDiv={props.outerDiv}
                     passCounterFunction={(index)=>{props.passCounterFunction(index)}}
                     register={props.register}
                     HomeRegister={props.HomeRegister}
                     SignIn={props.SignIn}
                     Logout={props.Logout}
                     forgotPassword={props.forgotPassword}/>

              {props.children}
            <Footer />
        </div>
    );
}
export default Layout;