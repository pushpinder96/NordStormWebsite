import React, { Component } from 'react';
import SportsWearParallax from '../mainContent/components/sportsWearParallax/sportsWearParallax';
import MidBannerParallax from '../mainContent/components/MidBannerParallax/MidBannerParallax';
import BestSellerContainer from '../mainContent/components/shirts/container/container';
import LandingPage from '../mainContent/components/LandingPageParallaxImage/container/container';
import NewArrivalsContainer from '../mainContent/components/newArrivals/container';
import CasualWearParallax from '../mainContent/components/casualWearParallax/casualWearParallax';

class MainPage extends Component{
   

    render(){
        return(
            <div >
                <div >
                    <LandingPage/>
                    <BestSellerContainer />
                    <MidBannerParallax />
                    <NewArrivalsContainer />
                    <SportsWearParallax /> 
                    <CasualWearParallax />
                  
             </div>
            </div>
        );
    }
}
export default MainPage;
