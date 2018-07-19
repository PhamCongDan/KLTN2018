/*
 * FeaturePage
 *
 * List all the features
 */
import React from 'react';
import styled from 'styled-components';
import { stringify } from 'querystring';
import HotelFilter from './../HotelFilter';
import FontIcon from 'material-ui/FontIcon';
import browserHistory from 'react-router-redux';
import BackLog from '../BackLog';
import Avatar from '../../components/Avatar';
import { Icon, Rate,Spin,List} from 'antd';
import {callAPI} from 'utils/callAPI'
import reducer from '../../containers/App/reducer';
import saga from './saga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectHotel, makeSelectLogin, makeSelectLoadSpin } from '../App/selectors';
import HotelRecommend from '../HotelRecomendation'
import PropTypes from 'prop-types'
import { LARGE } from 'material-ui/utils/withWidth';
import CarouselSlider from '../../components/Carousel'
import Panel from '../../components/Panel'
import hotelicon from '../../images/building.svg'
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
import Advertisement from '../../components/Advertisement'
 class HotelListPage extends React.Component {
    constructor(props){
      super(props)
      this.LoadRoom=this.LoadRoom.bind(this)
      this.Rating=this.Rating.bind(this)
      this.Filter=this.Filter.bind(this)
      this.RecommendHotel=this.RecommendHotel.bind(this)
    }
  // Since state and props are static,
  // there's no need to re-render this component
  componentDidMount( ){
    this.props.loadhotel()
  }
  LoadRoom(hotelid){
    this.props.listallroom(hotelid)
  
  }
  Rating(data){
    this.props.rate(data)
  }
  Filter(data){ 
    this.props.filter(data)
  }
  RecommendHotel(){
    this.props.recommend()
  }
  render() {
    const hotels=this.props.listhotel
    const intro=['https://www.silverlandhotels.com/uploads/slide/2016-12-08-13-12-48-newwebsite-hotel-bigbanner_general-001.jpg',
  'https://www.silverlandhotels.com/uploads/slide/2017-03-03-15-03-58-newwebsite-hotel-themystonSilverland-004-SereneCorner.jpg',
  'https://www.silverlandhotels.com/uploads/slide/2018-05-02-10-05-32-webDSC_9796.jpg',
  'https://www.silverlandhotels.com/uploads/slide/2017-03-03-16-03-05-newwebsite-hotel-bigbanner-_0000s_0006s_0003_grand_rooftop_swimmingpool.jpg'
  ]
    return (
    <HotelListPageWrapper >
       <CarouselSlider/>
      <HotelListPageContainer>
        <SideBox>
          <HotelFilterBox>
            <HotelFilter filter={(data)=>this.Filter(data)}/>
          </HotelFilterBox>
          <Advertisement/>
        </SideBox>
    
        <HotelList>
        <Spin 
          spinning={this.props.loadspin} 
          indicator={<Icon type='loading' spin 
          style={{fontSize:30}}/>}
          >
          {this.props.isLogin?(<HotelRecommend 
          handleReccommend={this.RecommendHotel}
          listroom={(hotelid)=>this.LoadRoom(hotelid)}
          rate={(data)=>this.Rating(data)}
          />):(<div></div>)}
            <Panel
              src={hotelicon}
              title='We have all thing you want'
              subtitle='We live and love to take care of you'
            />
            {hotels.length?(
            <List
            dataSource={hotels}
            size='large'
            pagination={{
              pageSize:7
            }}
            renderItem={
              item=>(
                <List.Item key={item._id}>
                    <Hotel
                      hotelname={item.name}
                      hotelclass={item.star}
                      hotellocation={item.address}
                      hotelrating={item.hotelrating}
                      hotelprice={item.avgPrice}
                      linkimage={item.coverImage}
                      hotelid={item._id}
                      rating={item.ratingSum}
                      listroom={()=>this.LoadRoom(item._id)}
                      rate={(data)=>this.Rating(data)}
                      hotel={item}
                    ></Hotel>
                </List.Item>
              )
            }
          />
          ):(<div>NO RESULT</div>)
          
          }
          </Spin>
        </HotelList>
      </HotelListPageContainer>
    </HotelListPageWrapper>
    );
  }
}

export class Hotel extends React.Component {
  constructor(props) {  
    super(props);
  }
  render() {
    return (
      <HotelItemContainer>
        <Avatar
          src={this.props.linkimage}
          title={this.props.hotelname}
          subtitle={this.props.hotelclass}
          rating={this.props.rating}
          hotelid={this.props.hotelid}
          rate={this.props.rate}
        />
        <HotelDesc>
          <HotelName>{this.props.hotelname}</HotelName>
          <HotelDetail>
            <div>
              <Rate defaultValue={this.props.hotelclass} disabled/>
            </div>
          </HotelDetail>
          <HotelDetail>
            <Icon style={iconstyle} type="environment" />
            <div>{this.props.hotellocation}</div>
          </HotelDetail>
          <HotelDetail>
            <RatingTitle>Rating:</RatingTitle>
            <RatingPoint>
              <div>{this.props.rating}/5</div>
            </RatingPoint>
          </HotelDetail>
        </HotelDesc>
        <HotelPrice>
          <HotelPriceNumber>
            {this.props.hotelprice}$ /Night
          </HotelPriceNumber>
          <BackLog
            hotelname={this.props.hotelname}
            hotelid={this.props.hotelid}
            listallroom={this.props.listroom}
            hotel={this.props.hotel}
          />
        </HotelPrice>
      </HotelItemContainer>
    );
  }
}


const HotelName = styled.div`
  white-space: nowrap;
  font-size: 20px;
  color: #37454d;
  font-weight: 700;
  font-family: Arial,Helvetica,Sans,Sans-Serif,Sans Serif;
`;

const HotelPriceNumber = styled.div`
  text-align: center;
  font-size: 20px;
  line-height: 20px;
  color: #F44336;
  font-weight: 800;
  padding: 10px;
  font-family: Arial,Helvetica,Sans,Sans-Serif,Sans Serif;
`;
const HotelListPageContainer = styled.div`
  padding : 0px 50px;
`;

const HotelFilterBox = styled.div`
  display: inline-block;
  width: 275px;
  vertical-align: top;
  margin-top: 15px;
  padding:5px;
  box-shadow: 0 1px 4px rgba(41,51,57,.5);
  margin-left: 2px;
  background: white;
`;


const HotelList = styled.div`
  padding-bottom: 50px;
  display: inline-block;
  width : calc(100% - 300px);
  padding-left : 15px;
  margin-top:15px;
`
const HotelDetail = styled.div`
  margin:15px 0px;
`;
const HotelPrice = styled.div`
  position: absolute;
  width : 200px;
  height : fit-content;
  display : inline-block;
  margin-top: 40px;
  text-align: center;
  
`;

const HotelDesc = styled.div`
  width: calc(100% - 460px);
  height: 100%;
  display: inline-block;
  vertical-align: top;
  padding-left: 40px;
 
`;

const HotelItemContainer = styled.div`
  height: 200px;
  box-shadow: 0 1px 4px rgba(41,51,57,.5);
  width: calc(100% - 5px);
  position : relative;
  padding : 10px;
  background:#9e9e9e2b;
`;
const RatingPoint = styled.div`
  padding:6px;
  background-color:#F44336;
  color:#fff;
  width: fit-content;
  font-size: 13px;
  font-weight: 800;
  border-radius: 3px;
  float :left;
`;
const RatingTitle = styled.div`
  float: left;
  margin: 5px;
  margin-left:2px;
  font-weight: 800;
`;
const HotelListTitle = styled.div`
  padding: 10px;
  background: #37454d;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  text-align:center;
`;
const ListAllHotelTitle=styled.div`
  padding: 10px;
  text-align:center;
  background: #37454d;
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`
const HotelListPageWrapper=styled.div`
 
`
const SideBox=styled.div`
  width: fit-content;
  float: left;
  margin-bottom: 70px;
`
const iconstyle = {
  float: 'left',
  fontSize: '20px',
  marginRight: '10px',
  color:'rgb(55, 69, 77)'
};
HotelListPage.propTypes = {
  listhotel: PropTypes.any

};
export function mapDispatchToProps(dispatch) { 
  return {
    login:(account)=> dispatch({type:"LOGIN",account}),
    loadhotel:()=> dispatch({type:"LOAD_HOTEL"}),
    listallroom:(hotelid)=> dispatch({type:"LOAD_ROOM",hotelid}),
    rate:(data)=> dispatch({type:"RATING",data}),
    filter:(datafilter)=> dispatch({type:"FILTER_HOTEL",datafilter}),
    recommend:()=> dispatch({type:"RECOMMEND_HOTEL"})
  };
}

const mapStateToProps = createStructuredSelector({
  isLogin:makeSelectLogin(),
  listhotel:makeSelectHotel(),
  loadspin:makeSelectLoadSpin()

});
const withConnect = connect(mapStateToProps,mapDispatchToProps);

// const withReducer = injectReducer({ key: 'global', reducer });
const withSaga = injectSaga({ key: 'loadhotel', saga });

export default compose(
  // withReducer,
  withSaga,
  withConnect,
)(HotelListPage);

