import React from 'react';
import styled from 'styled-components';
// import { Carousel } from 'antd';
import {Carousel} from 'react-responsive-carousel'
import './RIS.css'
const RoomImageSlider=(props)=>{
    let Img=[];
    Img=props.roomtype.images;
    const ImgList=Img.map((img)=>(
        <div key={img}>
            <img src={img} style={{'width':'450px','height':'300px'}}/>
        </div>
    ))
    return(
        <CarouselWrapper>
            <RoomType>{props.roomtype.introduction}</RoomType>
            <Carousel 
              infiniteLoop
              showStatus={false}
              autoPlay
              transitionTime={800}
              emulateTouch
              showThumbs={false}  
            >
                {ImgList}
            </Carousel>
        </CarouselWrapper>
    )
}
export default RoomImageSlider
const RoomType=styled.div`
    width:98%;
    position:absolute;
    z-index: 1;
    font-size: 18px;
    color: #fff;
    background-color: #1f1a1a80;
    padding: 15px;
    font-weight:bold;
`
const CarouselWrapper=styled.div`
    width:450px;
    padding:5px;
    position:relative;
    background:#fff;
    border-radius:5px;
    height:310px;
    border:1px dotted ;
    margin:auto;
`


// const PrevButton=styled.div`
//     background: url('https://lapinchinois.tuziwo.info/content/images/2016/06/fa-chevron-left.png');
//     background-size:cover;
//     background-repeat:no-repeat;
//     width: 25px;
//     height: 25px;
//     position: absolute;
//     top: 50%;
//     background-color:#fff;
//     cursor:pointer;
// `
// const NextButton=styled.div`
//     background: url('https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/Chevron_right_font_awesome.svg/512px-Chevron_right_font_awesome.svg.png');
//     background-size:cover;
//     background-repeat:no-repeat;
//     width: 25px;
//     height: 25px;
//     position: absolute;
//     right: 10px;
//     top: 50%;
//     background-color:#fff;
//     cursor:pointer;
// `