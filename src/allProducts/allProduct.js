import React,{ Component} from 'react';
import Styles from '../allProducts/allProducts.module.css';
import SingleProduct from '../landingMainPage/singleProductComponent/singleProduct';
import { MyContext } from '../contextApi/context';
import MydModalWithGrid from '../reviewItemModal/modal';
class AllProducts extends Component{

    static contextType = MyContext;
    state={
        ShowCaseImages:[],
        arrOfImages:[],
        ShowTitle:['Altheory','NetPlay','Tommy','Armani','Charlie'],
        modalShow:false,
        modalShow1:false,
        MainImage:null,
        arrOfImages1:[],
        showPrice:[19.90,12.99,22.50,10.99,15.99],
        showPrice1:[14.90,15.99,20.00,25.99,19.99]
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
//new arrivals
  clicked=(e)=>{
    this.setState({modalShow:true});
    let target =e.target.parentElement.parentElement.childNodes[1].src;

        const objectToArray= 
              Object.entries(this.context.data.TakeRequestNewArrivals).
                     map(([key,value])=>{
                          return Object.entries(this.context.data.TakeRequestNewArrivals[key])
   })

  const LoopingThroughArray= objectToArray.map(post1=>{
    return post1;
  })
  
  for(let i=0;i<LoopingThroughArray.length;i++){
    for(let j=0;j<LoopingThroughArray[i].length;j++){
      for(let p=1;p<LoopingThroughArray[i][j].length;p++){
      // console.log(target);
      console.log(LoopingThroughArray[i][1][1]);
      if(LoopingThroughArray[i][1][1].includes(target)){
        
        this.state.arrOfImages.push(LoopingThroughArray[i][j][1]);
       
    }
  else{
    console.log('whatever');
  }
}}}}

  hideFunc=()=>{
    this.setState({modalShow:false});
    this.setState({modalShow1:false});
    
     this.setState({arrOfImages:[]});
     this.setState({arrOfImages1:[]})
     this.setState({MainImage:null})
  }

  //normal shirts

  clicked1=(e)=>{
    this.setState({modalShow1:true});
    
    let target =e.target.parentElement.parentElement.childNodes[1].src;
  
        const objectToArray1= 
              Object.entries(this.context.data.TakeRequestShirts).
                     map(([key,value])=>{
                          return Object.entries(this.context.data.TakeRequestShirts[key])
   })

  const LoopingThroughArray1= objectToArray1.map(post1=>{ return post1;})
  
  for(let i=0;i<LoopingThroughArray1.length;i++){
    for(let j=0;j<LoopingThroughArray1[i].length;j++){
      for(let p=1;p<LoopingThroughArray1[i][j].length;p++){
          if(LoopingThroughArray1[i][0][1].includes(target)){
        
        this.state.arrOfImages1.push(LoopingThroughArray1[i][j][1]);
       
    }
  else{
    console.log('whatever');
  }
}}}}

BuyNow=(e)=>{
  const ImageSrc=e.target.parentElement.parentElement.parentElement.firstChild.lastChild.src;
  const Title=e.target.parentElement.parentElement.parentElement.childNodes[1].firstChild.innerHTML;
  const PriceOfItem=e.target.parentElement.parentElement.parentElement.childNodes[1].lastChild.innerHTML;
  const arr=[ImageSrc,Title,PriceOfItem]
  this.context.data.BuyNowArray.push(ImageSrc,Title,PriceOfItem);
  this.BuyNowFunction(arr);
}

BuyNowFunction =(value)=>{
  this.context.BuyNowFunction(value)
}


    
render(){
//new arrivals
    const objectToArray= Object.entries(this.context.data.TakeRequestNewArrivals).map(([key,value])=>{
        return Object.entries(this.context.data.TakeRequestNewArrivals[key])
       })
   const positionOfArray = objectToArray.map(post=>{
    return post[1];
   })
   const renderingComponent =positionOfArray.map((post,index)=>{  
      return <SingleProduct
               BuyNow={this.BuyNow}
               imageIndex={index} 
               image={post[1]}
               title={this.state.ShowTitle[index]}
               ImageID='image'
               price={parseFloat(this.state.showPrice1[index]).toFixed(2)}
               clicked={this.clicked}
               AddToCart={(e,counter,name)=>this.AddToCart(e,counter,name)}
               />
   })

   const objectToArray1= Object.entries(this.context.data.TakeRequestShirts).map(([key,value])=>{
    return Object.entries(this.context.data.TakeRequestShirts[key]);
})

const positionOfArray1 = objectToArray1.map(post=>{
    return post[0];
})
const renderingModal=positionOfArray.map(post=>{
    
    return <MydModalWithGrid 
    show={this.state.modalShow} 
    onHide={this.hideFunc}
    imageSwapper={this.imageSwapperFunc}
    Title={this.state.arrOfImages[0]}
    price={parseFloat(this.state.arrOfImages[5]).toFixed(2)}
    image={
          (this.state.MainImage==null) ? 
          this.state.arrOfImages[1]    :
          this.state.MainImage}
    image1={this.state.arrOfImages[1]}
    image2={this.state.arrOfImages[2]}
    image3={this.state.arrOfImages[3]}
    image4={this.state.arrOfImages[4]}
    />
  })


//normal shirts

const renderingComponent1 =positionOfArray1.map((post,index)=>{ 
return   <SingleProduct
   BuyNow={this.BuyNow}
   imageIndex={index} 
   ref={this.MeRef}
    image={post[1]}
    title={post[0]}
   price={parseFloat(this.state.showPrice[index]).toFixed(2)}
    ImageID='image'
    clicked={this.clicked1}
    AddToCart={(e,counter,name)=>this.AddToCart(e,counter,name)}
    />
})

const renderingModal1=positionOfArray1.map(post=>{
    return <MydModalWithGrid 
    show={this.state.modalShow1} 
    onHide={this.hideFunc}
    imageSwapper={this.imageSwapperFunc}
    Title={this.state.arrOfImages1[1]}
    price={this.state.arrOfImages1[5]}
    image={
          (this.state.MainImage==null) ? 
          this.state.arrOfImages1[0]    :
          this.state.MainImage}
    image1={this.state.arrOfImages1[0]}
    image2={this.state.arrOfImages1[2]}
    image3={this.state.arrOfImages1[3]}
    image4={this.state.arrOfImages1[4]}
    />
  })

   
    return(<div className={Styles.outerDiv}>
        <div className={Styles.innerDiv}>
        {renderingComponent1}
           {renderingModal1}
           {renderingComponent}
           {renderingModal}
          
           </div>
    </div>);
}
}
export default AllProducts;