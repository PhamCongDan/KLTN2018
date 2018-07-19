import React from 'react';
import styled from 'styled-components';
import { Modal,Button} from 'antd';
import { Form} from 'antd';
import SignupForm from './SignupForm'
const FormItem = Form.Item;
const WrappedNormalSignupForm = Form.create()(SignupForm);
export default class SignupPage extends React.Component{
    constructor(props){
        super(props)
        this.state={
            visible: false,
        } 
    }
      showModal = () => {
        this.setState({
          visible: true,
        });
      }
      handleCancel = () => {
        this.setState({ visible: false });
      }
    render(){
       return(
            <SignupWrapper>
                <Button type='primary'
                onClick={this.showModal}
                icon='user-add'
                >SIGNUP</Button>
                <Modal
                visible={this.state.visible}
                width='fit-content'
                title={this.props.hotelname}
                onCancel={this.handleCancel}
                footer={[
                //   <Button key="back" onClick={this.handleCancel}>Thoát</Button>,
                //   <Button key="submit" type="primary" onClick={this.handleCancel}>Đăng Nhập</Button>,
                ]}
              > 
              <WrappedNormalSignupForm handleSignup={this.props.handleSignup}/>
        </Modal> 
            </SignupWrapper>
       ) 
    }
}
const SignupWrapper=styled.div`
    width:fit-content;
    float:right;
    margin:20px;
`