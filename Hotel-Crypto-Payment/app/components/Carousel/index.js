import React from 'react';
import styled from 'styled-components';
import {Carousel} from 'react-responsive-carousel'
export default class CarouselSlider extends React.Component{
    render(){
        const intro=[{img:'https://www.silverlandhotels.com/uploads/slide/2016-12-08-13-12-48-newwebsite-hotel-bigbanner_general-001.jpg'
        ,introtext:'SILVERLAND HOTELS & SPAS,02 NIGHTS STAY & FREE AIRPORT PICKUP'},
        {img:'https://www.silverlandhotels.com/uploads/slide/2017-03-03-15-03-58-newwebsite-hotel-themystonSilverland-004-SereneCorner.jpg'
        ,introtext:'SILVERLAND HOTELS & SPAS,02 NIGHTS STAY & FREE AIRPORT PICKUP'},
        {img: 'https://www.silverlandhotels.com/uploads/slide/2017-03-03-16-03-05-newwebsite-hotel-bigbanner-_0000s_0006s_0003_grand_rooftop_swimmingpool.jpg'
        ,introtext:'SILVERLAND HOTELS & SPAS,02 NIGHTS STAY & FREE AIRPORT PICKUP'},
        {img: 'https://www.silverlandhotels.com/uploads/slide/2017-03-03-16-03-00-newwebsite-hotel-bigbanner-_0000s_0005s_0000_sakyo-exe-room-suites-004.jpg'
        ,introtext:'SILVERLAND HOTELS & SPAS,02 NIGHTS STAY & FREE AIRPORT PICKUP'},
        ]
        
        return(
            <CarouselWrapper>
                
                <Carousel
                    infiniteLoop
                    showStatus={false}
                    autoPlay
                    transitionTime={800}
                    emulateTouch
                    showThumbs={false}
                    >
                    {
                        intro.map((item)=>(
                        <div>
                            <img src={item.img} />
                            <CarouselIntro className="legend">
                                {item.introtext}
                            </CarouselIntro>
                        </div>
                        ))
                    }
                </Carousel>  
            </CarouselWrapper>
        )
    }
}
const CarouselWrapper=styled.div`
    position:relative;
    cursor:pointer;
`
const CarouselIntro=styled.div`
    padding:25px!important;
    background:#00000082!important;
`