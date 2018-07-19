import React from 'react';
import styled from 'styled-components';
import { Modal, Button,Spin } from 'antd';
import Room from './RoomList';
import BookOption from '../BackLog/BookOption';
import { makeSelectRoom,makeSelectLoadSpinRoom } from '../App/selectors';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
 class BackLog extends React.Component {
  constructor(props) {
    super(props);
    this.state = { roomtype: '', datecheckin: '', datecheckout: '', numofroom: '' };
  }
  state = {
    visible: false,
  }
  showModal = () => {
    this.props.listallroom()
    console.log(this.props)
    this.setState({
      visible: true,
    });
  }
  handleCancel = () => {
    this.setState({ visible: false });
  }
  // handleDateChange(date, dateString) {
  //   this.setState({ datecheckin: dateString[0], datecheckout: dateString[1] });
  // }
  // handleRoomChange(value) {
  //   this.setState({ numofroom: value });
  // }
  // handleClick() {
  //   console.log(this.state);
  // }
  render() {
    const { visible } = this.state;
    return (
      <div>
          <VDButton onClick={this.showModal}><Span> VIEW DEAL</Span></VDButton>
          <Modal
              visible={visible}
              width="80%"
              title={this.props.hotelname}
              onCancel={this.handleCancel}
              footer={[
                  // <Button key="back" onClick={this.handleCancel}>Return</Button>,
                ]}
            >
              <BookOption
                  // handleDateChange={this.handleDateChange}
                  // handleRoomChange={this.handleRoomChange}
                />
              <Spin spinning={this.props.loadspinroom}>
                <Room 
                  hotelname={this.props.name} 
                  hotelid={this.props.hotelid} 
                  handleClick={this.handleClick}
                  hotel={this.props.hotel}
                />
              </Spin>
            </Modal>
        </div>
    );
  }
}
// const DialogTitle=styled.div`
//   text-align:center;
//   font-weight:800;
// `
const VDButton = styled.button`
  border-radius: 3px;
  background-color: #f33426d1;
  border: none;
  color: #FFFFFF;
  font-size: 13px;
  padding: 10px;
  width: 140px;
  text-align: center;
  transition: all 0.5s;
  cursor: pointer;
  font-weight: 800;
  &:hover ${Span}
  {
    padding-right: 50px;
  }
  &:hover ${Span}:after{
    opacity: 1;
    right: 2;
  }
`;
const Span = styled.span`
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
  &:after {
    content: ' >>';
    position: absolute;
    opacity: 0;
    top: 0;
    right: -30px;
    transition: 0.5s;
  }
`;
export function mapDispatchToProps(dispatch) { 
    return {
      // listallroom:(hotelid)=> dispatch({type:"LOAD_ROOM",hotelid}),
      // chooseroom: (price) => dispatch({type:"CHOOSE_ROOM",price}),
      // book: (bookedroom) => dispatch({type:"BOOK_ROOM",bookedroom})
    };
  }
  
  const mapStateToProps = createStructuredSelector({
        // isLogin: makeSelectLogin(),
        listroom: makeSelectRoom(),
        // datecheckin: makeSelectdateCI(),
        // datecheckout: makeSelectdateCO(),
        // numofroom: makeSelectnumofroom(),
        // roomprice: makeSelectroomprice()
        loadspinroom: makeSelectLoadSpinRoom()

      
  });
  const withConnect = connect(mapStateToProps,mapDispatchToProps);
  
  export default compose(
    // withReducer,
    // withSaga,
    withConnect,
  )(BackLog);