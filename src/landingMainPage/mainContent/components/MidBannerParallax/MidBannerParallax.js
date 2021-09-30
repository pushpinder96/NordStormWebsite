import React,{Component} from 'react';
import image from '../../../../assets/midParallaxBanner/midBanner1.jpg';
import Styles from '../MidBannerParallax/MidBannerParallax.module.css';

const MidBanner=(props)=>{
return(
    <div>
     <div data-aos="fade-up"
          data-aos-duration='800'
      style={{opacity:props.opacity}} className={Styles.imageDiv}>
         <img 
         className={Styles.image}
         src={image}/>
     </div>
    </div>
);
}
export default MidBanner;