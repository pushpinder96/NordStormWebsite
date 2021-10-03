import React,{useState,useContext,useEffect} from 'react';
import {Link} from 'react-router-dom';
import { MyContext } from '../../contextApi/context';
import Styles from '../singleProductComponent/singleProduct.module.css';
import { useSpring, animated } from "react-spring";
import Loading from '../../LoadingPage/loading';

const SingleProduct =React.forwardRef((props,ref)=>{

    const context = useContext(MyContext);
    const [counter,changeCounter]=useState(1);
    const [name,changeName]=useState(1);
    const [addtocart,setaddtocart]=useState(false);
    const [{ y, color,backgroundColor }, set] = useSpring(() => ({ y: 100, color: "#000" }));
  
function getQuantity(e){
changeName(name+1);
setTimeout(() => {
    setaddtocart(true);
}, 100);

setTimeout(() => {
    setaddtocart(false);
}, 2000);


if(context.data.currentAmount==0){
    changeCounter(1);
}


else if(context.data.currentAmount>0){

 changeCounter(counter+1);
}

props.AddToCart(e,counter,name);

    }
    /*
    useEffect(()=>{
        
    },[context.data.currentAmount])
*/
    return(
    <div>
{(addtocart==true)?
                     <div style={
                       {position:'fixed',top:'2%',left:'71%',zIndex:'100'}}>
                     <Loading 
                     title='Item'
                     description='Your Item is Added To Cart Successfully'/>
                     </div>:
                     null
                     }

       <div  ref={ref} d className={Styles.outerdiv} style={props.outerdiv} >
           <div className={Styles.imageDiv}
                style={props.imageDiv}>
           <div
               onMouseEnter={() => set({ y: 0, color:'#red' })}
               onMouseLeave={() => set({ y: 100, color: "#000" })}
               style={props.quickReview} 
               className={Styles.QuickReviewBUtton}>
           
            <animated.h4 style={{ color }} onClick={props.clicked}>
                 Quick Review
           </animated.h4>
           <animated.div
                  style={{ transform: y.interpolate(v => `translateY(${v}%`) }}
                  className="glance"
        />
               
           </div>
              <img 
             
               data-image={props.imageIndex } 
               src={props.image} 
               style={props.imageStyle} 
               className={props.ImageID}/>
               
        

           </div>
           <div className={Styles.titleDiv} style={props.titleDiv} >
               <h3 className={Styles.title}>{props.title}</h3>
               <i className={Styles.price}>Price:$</i><strong className={Styles.price}> {props.price}</strong>
           </div>
           <div className={Styles.buttonDiv} style={props.buttonDiv}>
              <Link to='/buynowpage' style={{color:'inherit'}}> 
              <button   
              onClick={props.BuyNow}
              style={props.button}>Buy Now
                      
            </button>
              </Link>
              <Link to='/' style={{color:'inherit'}}> 
              <button
                     onClick={getQuantity}
                     style={props.button}>Add To Cart
             </button>
              </Link>
           </div>
       </div>
    
    </div>);
}
)
export default SingleProduct;