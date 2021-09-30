import { useState } from 'react';
import React from 'react';
import Styles from '../decrease/incDec.module.css';

const AddRemoveItem=React.forwardRef((props,ref)=>{
    const [count,changeCount]=useState(1);

   function AddNewItemHandler(e){
    changeCount(count+1);
    props.AddNewItemHandler(e,count);
   }
  function removeNewItemHandler(e){
      props.removeNewItemHandler(e);
  }

    return(
        <div>
            <div className={Styles.addRemoveItem}> 
                   <button ref={ref} onClick={removeNewItemHandler}>-</button>
                   <span 
                   style={props.styleNumber}
                  className={Styles.itemsNumber}>{props.item}</span>
                   <button onClick={AddNewItemHandler}>+</button>
                   </div>
                 
        </div>
    );
})
export default AddRemoveItem;