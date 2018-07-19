import React from 'react';
import styled from 'styled-components';
import PricerFilter from './PricerFilter';
import HotelClassFilter from './HotelClassFilter';
import LocationFilter from './LocationFilter';
import { Button } from 'antd';
import Item from 'antd/lib/list/Item';
import index from '../BackLog';
import { makeSelectHotel } from '../App/selectors';
import reducer from '../../containers/App/reducer';
import IssuelIcon from '../../components/IssueIcon'
import moneyicon from '../../images/money-bag.png'
import staricon from '../../images/5-stars.png'
import locationicon from '../../images/location.png'
// import saga from './saga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
const plainOptions = ['1', '2', '3', '4', '5'];
const temp=[]
 class HotelFilter extends React.Component {
  constructor(props) {
    super(props);

    this.state = { avgPrice: 0,
      address: '',
      name: '',
      star: temp,
    };

    this.HandleClick = this.HandleClick.bind(this);
    this.PriceChange = this.PriceChange.bind(this);
    // this.CityChange = this.CityChange.bind(this);
    this.InputChange = this.InputChange.bind(this);
    this.ClassChange=this.ClassChange.bind(this)
    // this.DistanceChange = this.DistanceChange.bind(this);
  }
  ClassChange (event, checked){
    const value=event.target.value
    checked? temp.push(value):temp.splice(temp.indexOf(value),1)
    console.log(this.state)
  };
  HandleClick() {
    const array =this.state.star
    const star=array.map((item)=>{return Number(item)})
    const data= {
      avgPrice:this.state.avgPrice,
      star:star,
      address:this.state.address,
      name:this.state.name
    }
    const datafilter={}
    if(data.avgPrice!==0)
    {
      datafilter.avgPrice=data.avgPrice
    }
    if(star.length!==0)
    {
      datafilter.star=data.star
    }
    if(data.address!=='')
    {
      datafilter.address=data.address
    }
    if(data.name!==''){
      datafilter.name=data.name
    }
    this.props.filter(datafilter)
  }

  PriceChange(value) {
    this.setState({
      avgPrice: value,
    });
  }


  // CityChange(value) {
  //   console.log(this.state);
  //   this.setState({ city: value });
  // }

  InputChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // DistanceChange(value) {
  //   this.setState({ distance: value });
  // }

  render() {
    return (
      <div>
        <FilterOpt>
          <Title>
            <IssuelIcon src={moneyicon}/>
            PRICE</Title>
          <PricerFilter
            onChange={this.PriceChange}
            price={this.state.avgPrice}
          />
        </FilterOpt>
        <FilterOpt>
          <Title>
          <IssuelIcon src={staricon}/>
            CLASS</Title>
          <HotelClassFilter
              handleChange={this.ClassChange}
          />
        </FilterOpt>
        <FilterOpt>
          <Title>
          <IssuelIcon src={locationicon}/>
            LOCATION</Title>
          <LocationFilter
            // CityChange={this.CityChange}
            InputChange={this.InputChange}
            // DistanceChange={this.DistanceChange}
          />
        </FilterOpt>
        <ButtonWrapper>
          <Button
            type="primary"
            icon="search"
            onClick={this.HandleClick}
          >
            Search
          </Button>
        </ButtonWrapper>
      </div>
    );
  }
}

const FilterOpt = styled.div`
  padding: 15px 15px;
  margin-bottom:2px;
  border-bottom: solid 1px rgba(204, 206, 207, 0.7);

`;

const ButtonWrapper = styled.div`
  text-align: center;
  margin: 20px;
`;

const Title = styled.div`
  font-size: 15px;
  font-weight: 800;
  color: #607d8b;
  margin-bottom: 20px;
  text-align:center;
`;
export function mapDispatchToProps(dispatch) { 
  return {
    // filter:(datafilter)=> dispatch({type:"FILTER_HOTEL",datafilter}),
    // chooseroom: (price) => dispatch({type:"CHOOSE_ROOM",price}),
    // book: (bookedroom) => dispatch({type:"BOOK_ROOM",bookedroom})
  };
}

const mapStateToProps = createStructuredSelector({
      // isLogin: makeSelectLogin(),
      lishotel: makeSelectHotel(),
      // datecheckin: makeSelectdateCI(),
      // datecheckout: makeSelectdateCO(),
      // numofroom: makeSelectnumofroom(),
      // roomprice: makeSelectroomprice()
    
});
const withConnect = connect(mapStateToProps,mapDispatchToProps);

//   const withReducer = injectReducer({ key: 'listroom', reducer });
// const withSaga = injectSaga({ key: 'filter', saga});

export default compose(
  // withReducer,
  // withSaga,
  withConnect,
)(HotelFilter);