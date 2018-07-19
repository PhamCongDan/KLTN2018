import React from 'react';
import styled from 'styled-components';
import { List, Card ,Pagination} from 'antd';
import Avatar from '../../components/Avatar';
import {Hotel} from '../HotelListPage'
import { makeSelectRecommend } from '../App/selectors';
import reducer from '../../containers/App/reducer';
// import saga from './saga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import PropTypes from 'prop-types'
import recommendicon from '../../images/quality.svg'
import Panel from '../../components/Panel';
class HotelRecommend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:this.props.recommendhotel
    };
  }
  componentWillMount(){
    this.props.handleReccommend()
  }
  render() {
    // const data= this.props.recommendhotel
    const data= this.props.recommendhotel
    console.log(this.props.listroom)
    console.log(data)
    return (
      <div>
        {
          data.length?(
            <RecomendWrapper>
        <Panel src={recommendicon} 
        title={"This might be an option for you"}
        subtitle={"Find the perfect property for your trip!"}
        />
        <div>
          <List
            dataSource={data}
            size='large'
            pagination={{
              pageSize:2
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
                      listroom={()=>this.props.listroom(item._id)}
                      rate={(data)=>this.props.rate(data)}
                      hotel={item}
                    ></Hotel>
                </List.Item>
              )
            }
          />
        </div>
      </RecomendWrapper>
          ):(<div></div>)
        }
      </div>
    );
  }
}
const RecomendWrapper = styled.div`
  margin-bottom:10px;
`;
HotelRecommend.PropTypes={
  recommendhotel:PropTypes.array
}
export function mapDispatchToProps(dispatch) { 
  return {
    // recommend:()=> dispatch({type:"RECOMMEND_HOTEL"})
    // restorerec: (rec) => dispatch({type:"RESTORE_REC",rec})
  };
}

const mapStateToProps = createStructuredSelector({
  recommendhotel: makeSelectRecommend()
});
const withConnect = connect(mapStateToProps,mapDispatchToProps);

// const withReducer = injectReducer({ key: 'global', reducer });
// const withSaga = injectSaga({ key: 'recommendhotel', saga });

export default compose(
  // withReducer,
  // withSaga,
  withConnect,
)(HotelRecommend);


