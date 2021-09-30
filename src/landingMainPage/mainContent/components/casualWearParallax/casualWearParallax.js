import React, { Component } from 'react';
import Styles from '../casualWearParallax/casualWearParallax.module.css';
import{Link}  from 'react-router-dom';
import Carousal from '../../../../bootstrapCarousal/carousal'; 
import CasualWear1 from '../../../../assets/singleProductImages/blueTshirt/blueTshirt1'
import CasualWear2 from '../../../../assets/casualWear/tinified (2)/casual2.jpg';
import CasualWear3 from '../../../../assets/casualWear/tinified (2)/casual3';

// Little helpers ...

class CasualWearParallax extends Component {
  
  render() {
    return (
      <div>
          
        <div className={Styles.outerDiv}>
        <div className={Styles.CollectionDiv}>
          <p>
              Casual Wear
          </p>
          <p>
              Collection
          </p>
          </div>
         <div className={Styles.galaxyDiv} style={this.props.galaxyDiv}>
          
          <div className={Styles.quotesDiv}>
              <p><h1>Fashion</h1> is what you adopt when you don’t know who you are. </p>
              </div>  
              <div className={Styles.ButtonDiv}>
              <Link to='/casual'
              className={Styles.Btn}
              onClick={this.clicked}>
              
              <button style={this.props.btn} >Buy Now</button>
               </Link>
               </div>
               <div className={Styles.Carousal}>
               
               <Carousal
               Image1={CasualWear1}
               Image2={CasualWear2}
               Image3={CasualWear3}
                />
               
               </div>   
             </div>
        </div>
      </div>
    )
  }
}

export default CasualWearParallax;