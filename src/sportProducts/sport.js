import React,{ Component} from 'react';
import Styles from '../sportProducts/sport.module.css';
import SingleProduct from '../landingMainPage/singleProductComponent/singleProduct';
import { MyContext } from '../contextApi/context';
import MydModalWithGrid from '../reviewItemModal/modal';
import axios from 'axios';
import {Spinner} from 'react-bootstrap';

class Sport extends Component{

    static contextType = MyContext;
    state={
        ShowCaseImages:[],
        arrOfImages:[],
        ShowTitle:['Adidas','Nike','Jordan','Tracer','Nike','Nike'],
        modalShow:false,
        MainImage:null,
        showPrice:[29.99,19.99,49.99,15.00,25.99,59.99],
        loading:false,
    }

componentDidMount(){

    this.loadingSpinner();
    
   }

   loadingSpinner= async()=>{

    const data= await axios.get(`https://cloth-shop-7c0c4-default-rtdb.firebaseio.com/sport.json`).
    then(response=>{
      this.setState({ShowCaseImages:response.data})
      this.setState({loading:true})
    }).catch(error=>{
       console.log(error);
     })  
 
 }
 
 
   AddToCart=(e,counter,name)=>{
 
     let imageSrc= e.target.parentElement.parentElement.parentElement.childNodes[0].lastChild.src;
      let description= e.target.parentElement.parentElement.parentElement.childNodes[1].firstChild.innerHTML;
      let Price =e.target.parentElement.parentElement.parentElement.childNodes[1].childNodes[2].innerHTML; 
      
      let arrayOfComponents=[imageSrc,description,Price,counter];
      
       const FindIndexOfElement=
        this.context.data.cartRendering.findIndex(
         item=>{
             return item[0]===imageSrc;
            });
      let existingCartItem=this.context.data.cartRendering[FindIndexOfElement];
      let updatedItem=[];
      let updatedItems;
      let TotalAmount=0; 
          
       if(existingCartItem){ 
         
         TotalAmount=counter*Price;
        let fixedAmount= TotalAmount.toFixed(2);
         
        updatedItem=[
           ...existingCartItem,counter
           ];
         updatedItem.splice(3,2,counter);
         updatedItem.splice(2,1,fixedAmount);
   
         updatedItems=JSON.parse(JSON.stringify(this.context.data.cartRendering));
         updatedItems[FindIndexOfElement]=updatedItem;
   
       }
       else{
         let copiedArray=this.context.data.cartRendering.concat([arrayOfComponents]);
        updatedItems=JSON.parse(JSON.stringify(copiedArray))
        
       }
     
     this.changeAddToCartState(updatedItems,counter);
     this.getAmountOfElement(name);
 }
 getAmountOfElement=(value)=>{
   {this.context.getAmountOfElement(value)};
 }
     changeAddToCartState =(value,counter)=>{
       this.context.changeState(value,counter)
     }
 
   imageSwapperFunc=(e)=>{this.setState({MainImage:e.target.src});}
 
   clicked=(e)=>{
     this.setState({modalShow:true});
     
     let target =e.target.parentElement.parentElement.childNodes[1].src;

         const objectToArray= 
               Object.entries(this.state.ShowCaseImages).
                      map(([key,value])=>{
                           return Object.entries(this.state.ShowCaseImages[key])
    })
 
   const LoopingThroughArray= objectToArray.map(post1=>{
   
     return post1;
   })
   
   for(let i=0;i<LoopingThroughArray.length;i++){
     for(let j=0;j<LoopingThroughArray[i].length;j++){
       for(let p=1;p<LoopingThroughArray[i][j].length;p++){

       if(LoopingThroughArray[i][2][1].includes(target)){
         this.state.arrOfImages.push(LoopingThroughArray[i][j][1]);
     }
   else{
     console.log('whatever');
   }
 }}}}
 
   hideFunc=()=>{
     this.setState({modalShow:false});
      this.setState({arrOfImages:[]});
      this.setState({MainImage:null})
   }
 
   BuyNow=(e,counter)=>{
     const ImageSrc=e.target.parentElement.parentElement.parentElement.firstChild.lastChild.src;
     const Title=e.target.parentElement.parentElement.parentElement.childNodes[1].firstChild.innerHTML;
     const PriceOfItem=e.target.parentElement.parentElement.parentElement.childNodes[1].lastChild.innerHTML;
     const arr=[ImageSrc,Title,PriceOfItem]
     this.context.data.BuyNowArray.push(ImageSrc,Title,PriceOfItem);
     this.BuyNowFunction(arr);

     const FindIndexOfElement=
       this.context.data.cartRendering.findIndex(
        item=>{
            return item[0]===ImageSrc;
           });
     let existingCartItem=this.context.data.cartRendering[FindIndexOfElement];
     let updatedItem=[];
     let updatedItems;
     let TotalAmount=0; 
         
      if(existingCartItem){ 
        
        TotalAmount=counter*PriceOfItem;
       let fixedAmount= TotalAmount.toFixed(2);
        
       updatedItem=[
          ...existingCartItem,counter
          ];
        updatedItem.splice(3,2,counter);
        updatedItem.splice(2,1,fixedAmount);
  
        updatedItems=JSON.parse(JSON.stringify(this.context.data.cartRendering));
        updatedItems[FindIndexOfElement]=updatedItem;
        this.pageSticky();
      }

     }
   
   BuyNowFunction =(value)=>{
     this.context.BuyNowFunction(value)
   }

  BuyNowModal=(e)=>{
    const ImageSrc=e.target.parentElement.parentElement.parentElement.childNodes[1].firstChild.src;
    const Title=e.target.parentElement.parentElement.parentElement.parentElement.parentElement.childNodes[0].firstChild.innerHTML;
    const PriceOfItem=e.target.parentElement.parentElement.parentElement.childNodes[2].lastChild.innerHTML;
    const arr=[ImageSrc,Title,PriceOfItem]
    this.context.data.BuyNowArray.push(ImageSrc,Title,PriceOfItem);
    this.BuyNowFunction(arr);
   this.pageSticky();
  }
  pageSticky=()=>{
    this.context.navbarSticky();
  }
   

   AddToCart=(e,counter,name)=>{

    let imageSrc= e.target.parentElement.parentElement.firstChild.childNodes[1].src;
     let description= e.target.parentElement.parentElement.childNodes[1].firstChild.innerHTML;
     let Price =e.target.parentElement.parentElement.childNodes[1].childNodes[2].innerHTML; 

     let arrayOfComponents=[imageSrc,description,Price,counter];
     
      const FindIndexOfElement=
       this.context.data.cartRendering.findIndex(
        item=>{
            return item[0]===imageSrc;
           });
     let existingCartItem=this.context.data.cartRendering[FindIndexOfElement];
     let updatedItem=[];
     let updatedItems;
     let TotalAmount=0; 
         
      if(existingCartItem){ 
        
        TotalAmount=counter*Price;
       let fixedAmount= TotalAmount.toFixed(2);
        
       updatedItem=[
          ...existingCartItem,counter
          ];
        updatedItem.splice(3,2,counter);
        updatedItem.splice(2,1,fixedAmount);
  
        updatedItems=JSON.parse(JSON.stringify(this.context.data.cartRendering));
        updatedItems[FindIndexOfElement]=updatedItem;
  
      }
      else{
        let copiedArray=this.context.data.cartRendering.concat([arrayOfComponents]);
       updatedItems=JSON.parse(JSON.stringify(copiedArray))
       
      }
    
    this.changeAddToCartState(updatedItems,counter);
    this.getAmountOfElement(name);
}
getAmountOfElement=(value)=>{
  {this.context.getAmountOfElement(value)};
}
    changeAddToCartState =(value,counter)=>{
      this.context.changeState(value,counter)
    }
    
    

 
   render(){
      
        const objectToArray= Object.entries(this.state.ShowCaseImages).map(([key,value])=>{
        return Object.entries(this.state.ShowCaseImages[key])
       })
   const positionOfArray = objectToArray.map(post=>{
      
    return post[2];
   })
   const renderingComponent =positionOfArray.map((post,index)=>{  
      return <SingleProduct
               key={index.toString()}
               BuyNow={(e,counter)=> this.BuyNow(e,counter)}
               imageIndex={index} 
               image={post[1]}
               title={this.state.ShowTitle[index]}
               price={parseFloat(this.state.showPrice[index]).toFixed(2)}
               ImageID='image'
               clicked={this.clicked}
               AddToCart={(e,counter,name)=>this.AddToCart(e,counter,name)}
               />
   })
 
  const renderingModal=positionOfArray.map((post,index)=>{
    
    return <MydModalWithGrid 
    key={index.toString()}
    BuyNowModal={this.BuyNowModal}
    show={this.state.modalShow} 
    onHide={this.hideFunc}
    imageSwapper={this.imageSwapperFunc}
    Title={this.state.arrOfImages[1]}
    price={parseFloat(this.state.arrOfImages[0]).toFixed(2)}
    image={
          (this.state.MainImage==null) ? 
          this.state.arrOfImages[2]    :
          this.state.MainImage}
    image1={this.state.arrOfImages[2]}
    image2={this.state.arrOfImages[3]}
    image3={this.state.arrOfImages[4]}
    image4={this.state.arrOfImages[5]}
    />
  })
 
         return(
             <div>
               <div
                className={Styles.outerdiv}>
               <div className={Styles.innerdiv}> 
               <p className={Styles.Ptag}>Sport Section</p>
             

               {  this.state.loading ==true? renderingComponent:
                 <Spinner style={{position:'absolute',top:'20%',left:'50%',zIndex:'100'}} animation="border" variant="warning" >
                  <span  className="visually-hidden">Loading...</span>
                 </Spinner>}
                
                  {renderingModal}
               </div>
             
             </div>
             </div>
         );
     }
 
}
export default Sport;