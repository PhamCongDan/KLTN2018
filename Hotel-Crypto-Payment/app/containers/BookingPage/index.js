import React from 'react';
import styled from 'styled-components';
import { Steps, Button, message,Icon } from 'antd';
import ConfirmBooking from './ConfirmBooking'
import PaymentGuide from './PaymentGuide'
import { makeSelectLogin,makeSelectdateCI, makeSelectdateCO, makeSelectnumofroom, makeSelectroomtype, makeSelectroomprice, makeSelectBookedHotel, makeSelectroomdetail, makeSelectroomid, makeSelectcurrentbookingpage } from '../App/selectors';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import saga from './saga'
import {summaryprice} from 'utils/summaryprice'
const Step = Steps.Step;

class BookingPage extends React.Component{
    constructor(props){
        super(props)
       
    }
    
    render(){
        const sumprice=summaryprice(
            this.props.datecheckin,
            this.props.datecheckout,
            this.props.roomprice,
            this.props.numofroom
        )

        const steps = [{
            title: 'Choose room',
            content:'',
            icon:'home'
          }, {
            title: 'Confirm',
            content: <ConfirmBooking 
                        datecheckin={this.props.datecheckin}
                        datecheckout={this.props.datecheckout}
                        numofroom={this.props.numofroom}
                        roomprice={this.props.roomprice}
                        roomtype={this.props.roomtype}
                        roomdetail={this.props.roomdetail}
                        roomid={this.props.roomid}
                        bookedhotel={this.props.bookedhotel}
                        sumprice={sumprice}
                    />,
            icon:'solution'
          }, {
            title: 'Pay',
            content: <PaymentGuide sumprice={sumprice} roomid={this.props.roomid}/>,
            icon:'shopping-cart'
          }];
        return(
            <StepWrapper>
                <Steps current={this.props.current}>
                    {steps.map(item => <Step key={item.title} title={item.title} icon={<Icon type={item.icon}/>}/>)}
                </Steps>
                <Stepcontent>{steps[this.props.current].content}
                    {/* <Stepaction>
                        {
                            this.state.current < steps.length - 1
                            &&
                            <Button type="primary" onClick={() => this.next()}>Next</Button>
                        }
                        {
                            this.state.current === steps.length - 1
                            &&
                            <Button type="primary" onClick={() => message.success('Processing complete!')}>Done</Button>
                        }
                        {
                            this.state.current > 1
                            &&
                            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                            Previous
                            </Button>
                        }
                    </Stepaction> */}
                </Stepcontent>
            </StepWrapper>
                )
            }
}
const Stepcontent =styled.div`
    margin-top: 5px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #9e9e9e17;
    height:fit-content;
    text-align: center;
    padding:20px;
    position :relative;
`  
  
const Stepaction=styled.div`
    float: right;
    position: absolute;
    right: 19%;
    bottom: 55px;  
`
const StepWrapper=styled.div`
    margin: 100px 50px;
    padding: 10px;
`
export function mapDispatchToProps(dispatch){
    return{
      
    }
}
const mapStateToProps = createStructuredSelector({
    isLogin:makeSelectLogin(),
    datecheckin:makeSelectdateCI(),
    datecheckout:makeSelectdateCO(),
    numofroom:makeSelectnumofroom(),
    roomtype:makeSelectroomtype(),
    roomprice:makeSelectroomprice(),
    roomdetail:makeSelectroomdetail(),
    roomid:makeSelectroomid(),
    bookedhotel:makeSelectBookedHotel(),
    current:makeSelectcurrentbookingpage()
  
  });
const withSaga = injectSaga({ key: 'createbooking', saga });
const withconnect=connect(mapStateToProps,mapDispatchToProps)
export default compose(
    withSaga,
    withconnect
)(BookingPage)