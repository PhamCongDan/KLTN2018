import React from 'react';
import styled from 'styled-components';
import {makeSelectdateCI, makeSelectdateCO, makeSelectnumofroom, makeSelectroomprice, makeSelectroomid } from '../App/selectors';
import {Row,Col,Card,Rate,Form,Input,Button,Icon,message} from 'antd'
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

const Meta=Card.Meta
const FormItem=Form.Item
const chageDateformat= (d)=>{
    let d1=d.split("/")
    let da1=d1[2]+"/"+d1[1]+"/"+d1[0]
    return da1
}
class ConfirmBooking extends React.Component{
    constructor(props){
        super(props)
        this.state={}
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    handleSubmit(data){
        this.props.createbooking(data)
    }
    render(){
       
        const bookdetail=[
            {
                title:'Check-in',
                value:this.props.datecheckin
            },
            {
                title:'Check-out',
                value:this.props.datecheckout
            },
            {
                title:'Room type',
                value:this.props.roomtype
            },
            {
                title:'Room detail',
                value:this.props.roomdetail
            },
            {
                title:'Number of room',
                value:this.props.numofroom
            },
            {
                title:'Time to stay',
                value:this.props.sumprice.numday +" day"
            },
            {
                title:'Total summary price',
                value:this.props.sumprice.price +"$"
            }
        ]
        
        return(
            <Wrapper>
                <Row>
                    <Col span={13}>
                         <Card 
                            title={<div><Icon type="profile" style={{margin:'0px 10px'}}/> Your booking detail</div>} 
                            bordered={true} 
                            style={{ width: '100%',    boxShadow: 'rgba(158, 158, 158, 0.33) 4px 4px 20px' }} 
                             className="card-head">
                                    <Row>
                                        <Col span={12}>
                                            <Card
                                                hoverable
                                                title={this.props.bookedhotel.name}
                                                style={{ width:'calc(100% - 20px)' ,padding:10 ,boxShadow: 'rgba(158, 158, 158, 0.33) 4px 4px 20px'}}
                                                cover={<Img alt="example" src={this.props.bookedhotel.coverImage} />}
                                            >
                                                <Meta
                                                description={<div><Icon type="environment" /> {this.props.bookedhotel.address}</div>}
                                                title={<Rate disabled defaultValue={this.props.bookedhotel.ratingSum}/>}
                                                />
                                            </Card>
                                        </Col>
                                        <Col span={12}>
                                        <DetailWrapper>
                                            {
                                                bookdetail.map((item)=>(
                                                    <Bookingdetail>
                                                        <div>
                                                            <Title>{item.title} :</Title>
                                                            <Value>{item.value}</Value>
                                                        </div>
                                                    </Bookingdetail>
                                                ))
                                            }
                                        </DetailWrapper>
                                        </Col>
                                    </Row>
                         </Card>
                    </Col>
                    <Col span={11} >
                        <Card title={<div><Icon type="contacts" style={{margin:'0px 10px'}}/>Enter your infomation</div>} 
                            bordered={true}  
                            style={formstyle} 
                            className="card-head form">
                            <Logo src='https://cdn.worldvectorlogo.com/logos/homeaway-2.svg'/>
                            <UserInfo 
                                handleSubmit={(data)=>this.handleSubmit(data)}
                                datecheckin={this.props.datecheckin}
                                datecheckout={this.props.datecheckout}
                                roomid={this.props.roomid}
                                total={this.props.sumprice.price} />
                        </Card>
                    </Col>                    
                </Row>
            </Wrapper>
        )
    }
}

class InfoForm extends React.Component{
    constructor(props){
        super(props)
        this.state={
            username:'',
            email:'',
            phone:'',
            fromDate: chageDateformat(this.props.datecheckin),
            toDate: chageDateformat(this.props.datecheckout),
            roomId: this.props.roomid,
            total:this.props.total
        }
        super(props)
        this.handleChange=this.handleChange.bind(this)
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    handleChange(e){
        this.setState({[e.target.name]:e.target.value})
        console.log(this.state)
    }
    handleSubmit(e){
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
              this.props.handleSubmit(this.state)
          }
        });
        // console.log(this.props.form)
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="horizontal" onSubmit={this.handleSubmit} >
                                <FormItem labelCol={{span:5}} wrapperCol={{span:17}} label="Name">
                                    {getFieldDecorator('username', {
                                        rules: [{ required: true, message: 'Please input your name!' }],
                                    })(
                                        <Input name="username" onChange={this.handleChange}/>
                                    )}
                                </FormItem>
                                <FormItem labelCol={{span:5}} wrapperCol={{span:17}}  label="Mail">
                                    {getFieldDecorator('email', {
                                    rules: [{
                                    type: 'email', message: 'The input is not valid E-mail!',
                                    }, {
                                    required: true, message: 'Please input your E-mail!',
                                    }],
                                    })(
                                        <Input name="email"  onChange={this.handleChange} />
                                    )}
                                    <p style={{fontSize:12,fontStyle: 'oblique'}}>
                                        We will contact to your mail for sending confirmation and travel guide
                                    </p>                                    
                                </FormItem>
                                <FormItem labelCol={{span:5}} wrapperCol={{span:17}}  label="Phone">
                                    {getFieldDecorator('phone', {
                                        rules: [{ required: true, message: 'Please input your phone number!' }],
                                    })(
                                        <Input name="phone"  onChange={this.handleChange} />
                                    )}
                                   
                                </FormItem>
                                <FormItem>
                                     <Button type="primary" htmlType="submit">Next</Button>
                                </FormItem>
            </Form>
        )
    }
}
const UserInfo=Form.create()(InfoForm)
const Wrapper=styled.div`
    & ${'.card-head'}{
        & > ${'.ant-card-head'}{
            background: #1890ff;
            & ${'.ant-card-head-title'}{
                color:#fff;
                font-weight:bold;
            }
        }
    }
    & ${'.form'}{
        & ${'.ant-card-body'} {
            min-height:445px;
        }
    }
`
const Img=styled.img`
    height:200px;
`
const Bookingdetail=styled.div`
    text-align:left;
    margin:10px 0px;
   

`
const DetailWrapper=styled.div`
    padding: 15px;
    background: #00968814;
    border: 1px solid #2196f336;
    border-radius: 5px;
`
const Title=styled.b`
    margin-right:15px;
    font-size:15px;
`
const Value=styled.span`
    font-size:13px;
    font-style: italic;
    line-height:20px;
`
const Logo=styled.img`
    width:250px;
    margin:30px;
`
const formstyle={
    marginLeft:'30px',
    boxShadow: 'rgba(158, 158, 158, 0.33) 4px 4px 20px'
}
export function mapDispatchToProps(dispatch){
    return{
        createbooking: (bookinginfo)=>dispatch({type:'CREATE_BOOKING',bookinginfo})
    }
}
const mapStateToProps = createStructuredSelector({
    datecheckin:makeSelectdateCI(),
    datecheckout:makeSelectdateCO(),
    numofroom:makeSelectnumofroom(),
    roomprice:makeSelectroomprice(),
    roomid:makeSelectroomid(),
  });
const withconnect=connect(mapStateToProps,mapDispatchToProps)
export default compose(
    withconnect
)(ConfirmBooking)