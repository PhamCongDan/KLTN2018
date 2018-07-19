/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { withRouter } from 'react-router-dom'

import { Switch, Route ,Redirect} from 'react-router-dom';
import 'antd/dist/antd.css';
import HomePage from 'containers/HomePage/Loadable';
import FacebookAuth from 'containers/FacebookAuth/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import OrderPage from 'containers/OrderPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Footer from 'components/Footer';
import HotelListPage from '../HotelListPage';
import BookingPage from '../BookingPage';
import LoadingPanel from '../../components/LoadingPanel'
import {Spin,Icon} from 'antd'
import { makeSelectLoading, makeSelectLogin, makeSelectisbookedroom } from './selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
const LoadingIcon = <Icon type="loading" style={{ fontSize: 50 ,
  margin: 'auto',
  position: 'fixed',
}} spin />;

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 700px;
  flex-direction: column;
  position:relative;
`;
const BodyWrapper = styled.div`
 
  min-height: 100vh;
  overflow: hidden;
  padding-bottom : 20px;
`;


class App extends React.Component{
    constructor(props){
      super(props)
    } 
  componentWillMount(){

  }
  render(){
    return (
    <div>
    { this.props.loading ?(<LoadingPanel/>):(<div></div>)}
    <AppWrapper>
      
      <Helmet
        titleTemplate="%s - React.js Boilerplate"
        defaultTitle="React.js Boilerplate"
      >
        <meta name="description" content="A React.js Boilerplate application" />
      </Helmet>
      <Header />
      <BodyWrapper>
        <Switch>
          <Route exact path="/execute_facebook_auth" component={FacebookAuth} />
          <Route exact path="/" component={HotelListPage} />
          {!this.props.isLogin?(<Redirect to='/'/>):( <Route path="/booking" component={BookingPage} />)}
          {!this.props.isbooked?(<Redirect to='/'/>):( <Route path="/booking" component={BookingPage} />)}
          <Route path="/features" component={FeaturePage} />
          <Route path="/order" component={OrderPage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      </BodyWrapper>
      <Footer />
    </AppWrapper>
    </div>
  );
}}
export function mapDispatchToProps(dispatch) {
  return {
 
  };
}

const mapStateToProps = createStructuredSelector({
  loading:makeSelectLoading(),
  isbooked:makeSelectisbookedroom(),
  isLogin:makeSelectLogin()
});
// const withConnect = connect(mapStateToProps,mapDispatchToProps);

// const withReducer = injectReducer({ key: 'gobal', reducer });
// const withSaga = injectSaga({ key: 'signup', saga,mode:DAEMON });

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App))

// export default withRouter(connect(mapStateToProps)(Something))