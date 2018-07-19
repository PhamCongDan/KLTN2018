import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import './index.css'
import reducer from '../../../App/reducer';
// import saga from './saga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { makeSelectLogin} from '../../../App/selectors';
const FormItem = Form.Item;

 class LoginForm extends React.Component {
   constructor(props){
     super(props)
     this.state={}
   }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleLogin(values)
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot" href="">Forgot password</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>        
        </FormItem>
      </Form>
    );
  }
}
export function mapDispatchToProps(dispatch) { 
  return {
    // login:(account)=> dispatch({type:"LOGIN",account}),
    recommend:()=> dispatch({type:"RECOMMEND_HOTEL"})
  };
}

const mapStateToProps = createStructuredSelector({
});
const withConnect = connect(mapStateToProps,mapDispatchToProps);

// const withReducer = injectReducer({ key: 'global', reducer });
// const withSaga = injectSaga({ key: 'login', saga });

export default compose(
  // withReducer,
  // withSaga,
  withConnect,
)(LoginForm);
