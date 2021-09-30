import React,{Component} from 'react';
import SingleProductComponent from '../../../../singleProductComponent/singleProduct';
import Styles from '../pcView/PcViewBestSeller.module.css';
import axios from '../../../../../axios-orders';
import MydModalWithGrid from '../../../../../reviewItemModal/modal';
import {MyContext} from '../../../../../contextApi/context';
import {Spinner} from 'react-bootstrap';

class PcViewBestSeller extends Component{
  
  static contextType = MyContext;
  MeRef = React.createRef();


  state={
    cartItems:[],
    ShowCaseImages:[],
    arrOfImages:[],
    modalShow:false,
    MainImage:null,
    showPrice:[19.90,12.99,22.50,10.99,15.99],
    amountCounter:0,
    loading:false,
    updateState:0
  }

componentDidMount(){
     this.loadingSpinner();
  }
  
//add to cart function
loadingSpinner= async()=>{

    const data= await axios.get(`https://cloth-shop-7c0c4-default-rtdb.firebaseio.com/shirts.json`).
     then(response=>{
      this.setState({ShowCaseImages:response.data})
      this.setState({loading:true})
      this.TakeRequestShirts(this.state.ShowCaseImages) 
    }).catch(error=>{
       console.log(error);
     })  

}

TakeRequestShirts=(value)=>{
  {this.context.TakeRequestShirts(value)}
}

modalAddToCart=(e)=>{
  
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
    
    

//imageswapper
  imageSwapperFunc=(e)=>{this.setState({MainImage:e.target.src});}
//quick review function

  clicked=(e)=>{
    this.setState({modalShow:true});
    
    let target =e.target.parentElement.parentElement.childNodes[1].src;
  
        const objectToArray= 
              Object.entries(this.state.ShowCaseImages).
                     map(([key,value])=>{
                          return Object.entries(this.state.ShowCaseImages[key])
   })

  const LoopingThroughArray= objectToArray.map(post1=>{ return post1;})
  
  for(let i=0;i<LoopingThroughArray.length;i++){
    for(let j=0;j<LoopingThroughArray[i].length;j++){
      for(let p=1;p<LoopingThroughArray[i][j].length;p++){
          if(LoopingThroughArray[i][0][1].includes(target)){
        
        this.state.arrOfImages.push(LoopingThroughArray[i][j][1]);
       
    }
  else{
    console.log('whatever');
  }
}}}}
//BuyNow
BuyNow=(e)=>{
  const ImageSrc=e.target.parentElement.parentElement.parentElement.firstChild.lastChild.src;
  const Title=e.target.parentElement.parentElement.parentElement.childNodes[1].firstChild.innerHTML;
  const PriceOfItem=e.target.parentElement.parentElement.parentElement.childNodes[1].lastChild.innerHTML;
  const arr=[ImageSrc,Title,PriceOfItem]
  this.context.data.BuyNowArray.push(ImageSrc,Title,PriceOfItem);
  this.BuyNowFunction(arr);
  this.pageSticky();
}
pageSticky=()=>{
  this.context.navbarSticky();
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



//hide function
  hideFunc=()=>{
    this.setState({modalShow:false});
     this.setState({arrOfImages:[]});
     this.setState({MainImage:null});
  }

  render(){
  
    // this.props.GetCounter();
       const objectToArray= Object.entries(this.state.ShowCaseImages).map(([key,value])=>{
              return Object.entries(this.state.ShowCaseImages[key]);
      })

         const positionOfArray = objectToArray.map(post=>{
              return post[0];
  })
  
  const renderingComponent =positionOfArray.map((post,index)=>{ 
     return   <SingleProductComponent
              imageIndex={index} 
              BuyNow={this.BuyNow}
              ref={this.MeRef}
              image={post[1]}
              title={post[0]}
              price={parseFloat(this.state.showPrice[index]).toFixed(2)}
              ImageID='image'
              clicked={this.clicked}
              AddToCart={(e,counter,name)=>this.AddToCart(e,counter,name)}
              />
  })

 const renderingModal=positionOfArray.map(post=>{
   return <MydModalWithGrid 
   BuyNowModal={this.BuyNowModal}
   AddToCart={this.modalAddToCart}
   show={this.state.modalShow} 
   onHide={this.hideFunc}
   imageSwapper={this.imageSwapperFunc}
   Title={this.state.arrOfImages[1]}
   price={this.state.arrOfImages[5]}
   image={
         (this.state.MainImage==null) ? 
         this.state.arrOfImages[0]    :
         this.state.MainImage}
   image1={this.state.arrOfImages[0]}
   image2={this.state.arrOfImages[2]}
   image3={this.state.arrOfImages[3]}
   image4={this.state.arrOfImages[4]}
   />
 })
 
        return(
            <div>
              <div  className={Styles.outerdiv}>
              <div className={Styles.innerdiv}> 
              <p className={Styles.Ptag}>Shirts</p>
            
                 {  this.state.loading ==true? renderingComponent:
                 <Spinner style={{position:'absolute',top:'100%',zIndex:'20'}} animation="border" role="status">
                  <span  className="visually-hidden">Loading...</span>
                 </Spinner>}
                    {renderingModal}

              </div>
            
            </div>
            </div>
        );
}
}
export default PcViewBestSeller;