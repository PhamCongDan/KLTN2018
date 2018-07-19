import React from 'react';
import styled from 'styled-components';
import {Carousel} from 'react-responsive-carousel'
const IMG=[
    'https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.15752-9/36031365_2243675342510956_2568172645216419840_n.jpg?_nc_cat=0&_nc_eui2=AeH7Hg_iDfr90bqyRmUTg1AigOOodD5s52AafVngKvGFDJqx5q8S-yGhDw3tlIo5nfy7xYBXnb9XjuFmIZImfhwQB0dddc5um3iQTzkyjLtvIQ&oh=c65e7a9769977b54071fbb9c8c7e3455&oe=5BE81003',
    'https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.15752-9/35987574_2243678759177281_192171684524982272_n.jpg?_nc_cat=0&_nc_eui2=AeHkSECT4qJAyiIhf9HfTUOcup-PIiuCVUg8AcQlMhhUnGQkFUZFtJTxORTA242XyiACNGYrcOF5nwHmGm9PlFKejwFUdVHjwk0aQVH8SdgYyg&oh=fee57b25649de23b3daa0d96c2bf7dbc&oe=5BE6B5CF',
    'https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.15752-9/36087470_2243678102510680_4067987190758506496_n.jpg?_nc_cat=0&_nc_eui2=AeEyDOulYoHDgzY96FaWKPsdH3Z3Z6Z6GxnoaPDVaBq96vlHipP1kPIAOKMDydbfCcz94XKL8V2h-BngOs1xgfCuxvEAT_bV3ZmzMtukCp1rWQ&oh=dc13e030c43900241e69def1ab1a7dc7&oe=5BB95E55',
    'https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.15752-9/35920416_2243676862510804_7805956795368734720_n.jpg?_nc_cat=0&_nc_eui2=AeGx399cZAVp_L3NBQS7gFtiUrlCBsIuQyut2JGeb8dc5oajxouxYMw_cEc3UcLF36xDvSyaa2Wj79HJYtHLTvLrKddBOqBONrGhm95adg08-Q&oh=37f3c4b7ce7135e9d0ed157abb43279f&oe=5BA0E7F1',
    'https://scontent.fsgn2-4.fna.fbcdn.net/v/t1.15752-9/35162229_2243675972510893_1154133638867058688_n.jpg?_nc_cat=0&_nc_eui2=AeFedDkLbvmObE5T1fPR6dXLDLxW-EOm3WQKQGcDwSjLm0WySgBzj9U7BDc1d3yXiQQZ4jQHL-LrZZLgmrWhB1_xBctOzaS8qrVz_-b9l99Hmw&oh=21ffff51e2425e03564fd2d90bc1f43b&oe=5BBA16C2',
    
    // 'http://chefjob.vn/images/tin-tuc/nha-hang-khach-san/tim-hieu-ve-reservation-trong-khach-san.jpg',
    // 'https://www.sotc.in/images/hotel/hotel-banner.jpg',
    // 'http://www.ronghuhotel.info/wp-content/uploads/2017/12/online-hotels-booking-how-to-build-a-better-hotel-booking-website-to-increase-direct.jpg',
    // 'http://www.ronghuhotel.info/wp-content/uploads/2017/12/online-hotels-booking-surprising-risks-of-booking-a-hotel-through-an-online-travel-site-free.jpg'
]
const Advertisement=(props)=>(
    <AdWrapper>
        <Carousel
            showThumbs={false}
            autoPlay
            infiniteLoop
            showArrows={false}
            showIndicators={false}
            dynamicHeight
            showStatus={false}
            width="275px"
        >
        {
            IMG.map((item)=>(
                <div>
                    <img src={item} height="1350px" width="100%"/>
                </div>
            ))
        }
        </Carousel>
    </AdWrapper>
)
const AdWrapper=styled.div`
    width: 275px;
    height: 1350px;
    word-break: break-word;  
    margin-top:20px;
    cursor:pointer;
`
export default Advertisement