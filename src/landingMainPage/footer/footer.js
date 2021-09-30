import React from 'react';
import Styles from '../footer/footer.module.css';
import Facebook from '../../assets/socialmediaIcon/facebook.svg';
import Twitter from '../../assets/socialmediaIcon/twitter.svg';
import Instagram from '../../assets/socialmediaIcon/instagram.svg';
import { Link } from 'react-router-dom';


const footer=(props)=>{
    return(<div>
        <div className={Styles.outerDiv}>
            <div className={Styles.textDiv}>
              
            <Link to='/casual'  style={{textDecoration: 'none',color:'inherit'}}>
                <li>Shirts</li>
                </Link>
              <Link to='/contact'style={{textDecoration: 'none',color:'inherit'}}>
                  <li>Contact us</li>
                  </Link>
              <Link  style={{textDecoration: 'none',color:'inherit'}}>
              <li>Delivery Info.</li>
              
              </Link>

            </div>
            <h6>Follow us on:</h6>
            <div className={Styles.SocialMediaIcons}>
                
                <li><a href='https://www.facebook.com/princeandsaini' target="_blank" rel="noopener noreferrer"> <img src= {Facebook} /></a></li>
                <li><a href='https://www.instagram.com/princesingh.96/' target="_blank" rel="noopener noreferrer"><img src= {Instagram} /></a></li>
                <li><a href='https://www.twitter.com/' target="_blank" rel="noopener noreferrer"><img src= {Twitter} /></a></li>

            </div>
        </div>

    </div>);
}

export default footer;