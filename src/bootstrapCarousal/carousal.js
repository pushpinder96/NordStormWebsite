import React from 'react';
import '../bootstrapCarousal/carousal.css';
import Carousel from 'react-bootstrap/Carousel';
const Carousal =(props)=>{
  
  
    return(
        <div>
            <div className='bootstrapSlide'>
               <Carousel fade nextLabel = '' prevLabel= ''>
                 
  <Carousel.Item>
    <img
      className="d-block w-100 "
      src={props.Image1}
      alt="First slide"
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100"
      src={props.Image2}
      alt="Second slide"
    />
  </Carousel.Item>
  <Carousel.Item>
    <img
      className="d-block w-100 "
      src={props.Image3}
      alt="Third slide"
    />

  </Carousel.Item>
</Carousel>
               </div>
        </div>
    );
}

export default Carousal;