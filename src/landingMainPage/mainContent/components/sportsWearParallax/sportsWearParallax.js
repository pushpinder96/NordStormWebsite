import React, { Component } from 'react';
import Styles from '../sportsWearParallax/sportsWearParallax.module.css';
import{Link}  from 'react-router-dom';
import Carousal from '../../../../bootstrapCarousal/carousal'; 
import SportsWear1 from '../../../../assets/sportsWear/sports6/sports1.webp';
import SportsWear2 from '../../../../assets/sportsWear/sports5/sports3-2.jpg';
import SportsWear3 from '../../../../assets/sportsWear/sports1/sport1.jpg';
// Little helpers ...

class sportsWearParallax extends Component {
  
  render() {
    return (
      <div>
          
        <div className={Styles.outerDiv}>
        <div className={Styles.CollectionDiv}>
          <p>
              Sports Wear
          </p>
          <p>
              Collection
          </p>
          </div>
         <div className={Styles.galaxyDiv} style={this.props.galaxyDiv}>
         
          <div className={Styles.quotesDiv}>
              <p>A Lot of Times People Look at the Negative Side of What They Feel THey Can't Do.</p>
            <p>  I Always Look on the Positive Side Of What I Can DO.
                 Get Your Sports Merch. </p>
             
              </div>
              <div>
              <Link to='/sport'
              className={Styles.Btn}
              onClick={this.clicked}>
             <button style={this.props.btn} >Buy Now</button>
               </Link>
               </div>
               <div className={Styles.Carousal}>
               
               <Carousal 
              
               Image1={SportsWear1}
               Image2={SportsWear2}
               Image3={SportsWear3} />
               
               </div>   
             </div>
        </div>
      </div>
    )
  }
}

export default sportsWearParallax;