import React,{Component} from 'react';
import SingleProductComponent from '../../../../landingMainPage/singleProductComponent/singleProduct';
import Styles from '../newArrivals/newArrivals.module.css';
import axios from '../../../../axios-orders';
import MydModalWithGrid from '../../../../reviewItemModal/modal';
import {MyContext} from '../../../../contextApi/context';
import {Spinner} from 'react-bootstrap';
class NewArrivals extends Component{

  static contextType = MyContext;
  MeRef = React.createRef();
  state={
    opacity:1,
    ShowCaseImages:[],
    arrOfImages:[],
    ShowTitle:['Altheory','NetPlay','Tommy','Armani','Charlie'],
    modalShow:false,
    MainImage:null,
    loading:false,
    showPrice:[14.90,15.99,20.00,25.99,19.99],
  }

  componentDidMount(){
    this.loadingSpinner();
 }
 
//add to cart function
loadingSpinner= async()=>{

   const data= await axios.get(`https://cloth-shop-7c0c4-default-rtdb.firebaseio.com/NewArrivals.json`).
    then(response=>{
     this.setState({ShowCaseImages:response.data})
     this.setState({loading:true})
     this.TakeRequestNewArrivals(this.state.ShowCaseImages);
   }).catch(error=>{
      console.log(error);
    })  

}
TakeRequestNewArrivals=(value)=>{
  {this.context.TakeRequestNewArrivals(value)}
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

  imageSwapperFunc=(e)=>{this.setState({MainImage:e.target.src});}

  clicked=(e)=>{
    this.setState({modalShow:true});
    
    let target =e.target.parentElement.parentElement.childNodes[1].src;
  console.log(target);
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
      console.log(LoopingThroughArray[i]);
      for(let p=1;p<LoopingThroughArray[i][j].length;p++){
       
      if(LoopingThroughArray[i][1][1].includes(target)){
        
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

  BuyNow=(e)=>{
    const ImageSrc=e.target.parentElement.parentElement.parentElement.firstChild.lastChild.src;
    const Title=e.target.parentElement.parentElement.parentElement.childNodes[1].firstChild.innerHTML;
    const PriceOfItem=e.target.parentElement.parentElement.parentElement.childNodes[1].lastChild.innerHTML;
    const arr=[ImageSrc,Title,PriceOfItem]
    this.context.data.BuyNowArray.push(ImageSrc,Title,PriceOfItem);
    this.BuyNowFunction(arr);
    this.pageSticky();
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

  render(){
       
       const objectToArray= Object.entries(this.state.ShowCaseImages).map(([key,value])=>{
       return Object.entries(this.state.ShowCaseImages[key])
      })
  const positionOfArray = objectToArray.map(post=>{
   return post[1];
  })
  const renderingComponent =positionOfArray.map((post,index)=>{  
     return <SingleProductComponent
              
              key={index}
              BuyNow={this.BuyNow}
              ref={this.MeRef}
              image={post[1]}
              title={this.state.ShowTitle[index]}
              price={parseFloat(this.state.showPrice[index]).toFixed(2)}
              ImageID='image'
              clicked={this.clicked}
              AddToCart={(e,counter,name)=>this.AddToCart(e,counter,name)}
              />
  })
//console.log(this.state.arrOfImages);
 const renderingModal=positionOfArray.map((post,index)=>{
   return <MydModalWithGrid 
   BuyNowModal={this.BuyNowModal}
   key={index*Math.random()}
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

        return(
            <div>
              <div
              data-aos="fade-up"
              style={{opacity:this.props.opacity}} className={Styles.outerdiv}>
              <div className={Styles.innerdiv}> 
              <p className={Styles.Ptag}>New Arrivals</p>
              
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
export default NewArrivals;