import React from 'react';
import styled from 'styled-components';
import { Modal, Button,Table,Card,Col,Row,Carousel,Icon,Alert,Spin,notification} from 'antd';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { makeSelectbookingCode, makeSelectbookingstatus, makeSelectcheckingspin } from '../App/selectors';
import PropTypes from 'prop-types';
const images=[
    'https://designedbyccc.files.wordpress.com/2014/08/home-away-services_logo-1.jpg',
    'http://talkative.pro/wp-content/uploads/2017/07/home-away-from-home.jpg',

]
const columns=[
    {
        title:'Total',
        key:'total',
        dataIndex:'total'
    },
    {
        title:'Refund',
        key:'refund',
        dataIndex:'refund'
    },
    {
        title:'Status',
        key:'status',
        dataIndex:'status',
        render: (text)=>(
        <div key={text}>
            {text==1?
                (<span style={{color:'red'}}><Icon type="close-circle" style={{marginRight:10}}/> none active</span>)
                :(<span style={{color:'green'}}><Icon type="check-circle" style={{marginRight:10}} /> active</span>)}
        </div>)
    }

]
const infocolumns=[
    {
        title: 'Total price',
        key:'totalprice',
        dataIndex:'totalprice'
     },
     {
         title:'Hotel Stellar Address',
         key:'hoteladdress',
         dataIndex:'hoteladdress'
     },
     {
         title:'Memo',
         key:'memo',
         dataIndex:'memo'
     }
]

class PaymentGuide extends React.Component{
    constructor(props){
        super(props)
        this.state={
            visible:false
        }
        this.handleClick=this.handleClick.bind(this)
    }
    componentWillMount(){
        this.props.checkstatus(this.props.bookingCode)
    }
    handleClick(){
        const status=this.props.bookingstatus
        this.props.checkstatus(this.props.bookingCode)

        // return (
        //     notification[type]({
        //         message: 'Booking Notification',
        //         description: 'You must pay '+ status[0].total+' $ to complete your booking !',
        //       })
        // )
    }
    render(){
        const statusdata= this.props.bookingstatus
        const infodata=[
            {
                totalprice: this.props.sumprice.price+'$',
                hoteladdress:'GCIL5PHLXUSHRTRWNKPTZOXJEDSGG75QB647QQ77ND2D7GLVTPJGK63P',
                memo: this.props.bookingCode
            }
        ]
        return(
            <Wrapper>
                <Row gutter={20}>
                    <Col span={9}>
                    <Card  
                    style={{marginBottom:10}}
                    title={<span><Icon type="info-circle"  style={{marginRight: 10,fontSize:18}} /> Your Booking Status</span>}>
                        <TableWrapper>
                            <Spin spinning={this.props.checkingspin} style={{width:'fit-content', margin:'20px 0px'}}>
                                <Table columns={columns} dataSource={statusdata} pagination={false} />
                            </Spin>
                        </TableWrapper>
                    </Card>
                       <Carousel autoplay >
                           {images.map((item)=><Img src={item}/>)}
                       </Carousel>
                       
                    </Col>
                    <Col span={14}>
                        <Card 
                            title={<span><Icon type="book"  style={{marginRight: 10,fontSize:18}} /> Your Payment Detail</span>}
                        >
                            <div>
                                <Alert
                                    message="You can pay for you booking with link : "
                                    description={ <span style={{fontSize:20}}>
                                        <a target="_blank" href="https://portal.willet.io/">https://portal.willet.io/</a>
                                    </span>}
                                    type="info"
                                    showIcon
                                />
                            </div>
                            <TableWrapper>
                                 <Table columns={infocolumns} dataSource={infodata} pagination={false} bordered={true}/>
                            </TableWrapper>
                            <div>
                            <Button 
                            type='primary' onClick={this.handleClick}
                            loading={this.props.checkingspin}
                            style={{margin:'25px 0px'}}
                            >Check Your Booking Status</Button>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Wrapper>
        )
    }
}
PaymentGuide.propTypes = {
   bookingstatus:PropTypes.array
  };
  
export function mapDispatchToProps(dispatch){
    return{
      checkstatus:(bookingid)=>dispatch({type: 'CHECK_STATUS',bookingid})
    }
}
const mapStateToProps = createStructuredSelector({
   bookingCode:makeSelectbookingCode(),
   bookingstatus:makeSelectbookingstatus(),
   checkingspin:makeSelectcheckingspin()
  });
const withconnect=connect(mapStateToProps,mapDispatchToProps)
export default compose(
    withconnect
)(PaymentGuide)

const Img=styled.img`
    width:100%;
    height:200px
`
const Wrapper=styled.div`
    &  ${'.ant-card-head'}{
        background: #40a9ff;
        & ${'.ant-card-head-title'}{
            color:#fff;
            
        }
    }
`
const TableWrapper=styled.div`
    margin:20px 0px;
    background:#fff;
`
const Title=styled.div`
    text-align:center;
`

