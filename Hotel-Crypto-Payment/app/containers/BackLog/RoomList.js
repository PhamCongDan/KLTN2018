import React from 'react';
import styled from 'styled-components';
import Avatar from '../../components/Avatar'
import RoomImageSlider from './RoomImageSlider'
import {Button,Table,message} from 'antd'
import { makeSelectRoom, makeSelectdateCI, makeSelectdateCO, makeSelectnumofroom, makeSelectroomtype,makeSelectroomprice, makeSelectLogin, makeSelectBookedHotel, makeSelectroomdetail, makeSelectroomid } from '../App/selectors';
import reducer from '../../containers/App/reducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import PropTypes from 'prop-types';
class Room extends React.Component{
    constructor(props){
        super(props)
        this.state=this.props.state
    }
    componentWillReceiveProps(){
        // const hotelid=this.props.hotelid
        // this.props.listallroom(hotelid)
    }
        render(){
            const rooms=this.props.listroom
            let self = this;
            return(
            <div>
                <Table dataSource={rooms}
                columns={RowXXX(self)} 
                bordered size='small'
               
                rowKey="uid"
                onRow={(record)=>{
                    return{
                        onMouseEnter:()=>{
                           this.props.chooseroom(record)
                        }
                    }
                }}
                />
            </div>
        )}
} 
var RowXXX = function(rootDoom){
 return [{
    title: 'Room Type',
    key: 'roomtype',
    render:(record)=>(<RoomImageSlider roomtype={record} key={record}/> )
         
  }, {
    title: 'Room Detail',
    dataIndex:'description',
    key: 'description',
    render:(text)=>(
        <div style={{'padding':'10px','width':'250px'}} key={text}>
            {text}
        </div>
    )
  }, {
    title: 'Price/Night ( $ )',
    dataIndex: 'price',
    key: 'price',
  },
  {
    key:'id',
    title: '',
    dataIndex:'roomtype',
    onCell:()=>{},
    render:(record)=>{
        
        return (
        <Button type='primary' onClick={()=>{
            const bookedroom={
                datecheckin: rootDoom.props.datecheckin,
                datecheckout:rootDoom.props.datecheckout,
                numofroom:rootDoom.props.numofroom,
                roomtype:rootDoom.props.roomtype,
                roomprice:rootDoom.props.roomprice,
                roomdetail:rootDoom.props.roomdetail,
                roomid:rootDoom.props.roomid,
                hotel:rootDoom.props.hotel
            }
            if(rootDoom.props.isLogin)
                { 
                    if(bookedroom.datecheckin&&bookedroom.datecheckout&&bookedroom.numofroom)
                        {
                            rootDoom.props.book(bookedroom)
                        }
                    else
                    {
                        message.warning('Check date check in and date check out or number of room to book your room!') 
                    }
            }
            else{
                     message.warning('You must login to book your room !')
            }
    }} >BOOK</Button>
    )
}
}]
} 
Room.PropTypes={
    rooms:PropTypes.oneOfType([PropTypes.array,PropTypes.bool])
}
export function mapDispatchToProps(dispatch) { 
    return {
    //   listallroom:(hotelid)=> dispatch({type:"LOAD_ROOM",hotelid}),
      chooseroom: (record) => dispatch({type:"CHOOSE_ROOM",record}),
      book: (bookedroom) => dispatch({type:"BOOK_ROOM",bookedroom})
    };
  }
  
  const mapStateToProps = createStructuredSelector({
        isLogin: makeSelectLogin(),
        listroom: makeSelectRoom(),
        datecheckin: makeSelectdateCI(),
        datecheckout: makeSelectdateCO(),
        numofroom: makeSelectnumofroom(),
        roomtype:makeSelectroomtype(),
        roomprice:makeSelectroomprice(),
        roomdetail:makeSelectroomdetail(),
        roomid:makeSelectroomid(),
        bookedhotel:makeSelectBookedHotel()
  });
  const withConnect = connect(mapStateToProps,mapDispatchToProps);
  
  const withReducer = injectReducer({ key: 'listroom', reducer });
//   const withSaga = injectSaga({ key: 'listroom', saga });
  
  export default compose(
    // withReducer,
    // withSaga,
    withConnect,
  )(Room);

