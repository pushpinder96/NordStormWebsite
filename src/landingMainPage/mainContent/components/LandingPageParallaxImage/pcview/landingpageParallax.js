import React, { Component } from 'react';
import Styles from '../pcview/landingpageParallax.module.css'
import{Link}  from 'react-router-dom';

// Little helpers ...

class ParallaxEffect extends Component {
  
  render() {
    return (
      <div>
        <div
        style={{opacity:this.props.opacity,backgroundColor:this.props.background}}
        className={Styles.outerDiv}
        >
             <div className={Styles.galaxyDiv} style={this.props.galaxyDiv}>
             <p>Ready.</p>
             <p>Set.</p>
             <p>Shop.</p>
             <p>Stay in First Place With our Latest Styles.</p>
              <Link to='/casual'
              className={Styles.Btn}
              onClick={this.clicked}>
              
              <button style={this.props.btn} >Buy Now<span></span><span></span><span></span><span></span></button>
               </Link>
            
             </div>
        </div>
      </div>
    )
  }
}

export default ParallaxEffect;