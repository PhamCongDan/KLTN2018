import React from 'react';
import styled from 'styled-components';
import { Modal,Button} from 'antd';
import { Form} from 'antd';
import LoginForm from './LoginForm'
const FormItem = Form.Item;
const WrappedNormalLoginForm = Form.create()(LoginForm);
export default class LoginPage extends React.Component{
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
            <LoginWrapper>
                <Button type='primary'  
                onClick={this.showModal} 
                icon='login'>Login</Button>
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
              <WrappedNormalLoginForm handleLogin={this.props.handleLogin}/>
        </Modal> 
            </LoginWrapper>
       ) 
    }
}
const LoginWrapper=styled.div`
    width:fit-content;
    float:right;
    margin:20px;
`