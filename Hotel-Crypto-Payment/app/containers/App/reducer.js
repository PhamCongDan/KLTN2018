/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can change our
 * application state.
 * To add a new action, add it to the switch statement in the reducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';
import {
  LOAD_REPOS_SUCCESS,
  LOAD_REPOS,
  LOAD_REPOS_ERROR,
} from './constants';

// The initial state of the App
const initialState = fromJS({
  currentbookingpage:1,
  loading: false,
  loadspin: false,
  loadspinroom:false,
  error: false,
  isLogin:false,
  currentUser: false,
  userData: {
    repositories: false,
  },
  listhotel:[],
  listroom:[],
  recommendhotel:[],
  bookedroom:{
    datecheckin:'',
    datecheckout:'',
    numofroom:0,
    roomid :'',
    roomdetail:'',
    roomtype:'',
    roomprice:0
  },
  isbooked:false,
  bookedhotel:{},
  bookingCode:'',
  bookingstatus:[],
  checkingspin:false
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    // case LOAD_REPOS:
    //   return state
    //     .set('loading', true)
    //     .set('error', false)
    //     .setIn(['userData', 'repositories'], false);
    // case LOAD_REPOS_SUCCESS:
    //   return state
    //     .setIn(['userData', 'repositories'], action.repos)
    //     .set('loading', false)
    //     .set('currentUser', action.username);
    // case LOAD_REPOS_ERROR:
    //   return state
    //     .set('error', action.error)
    //     .set('loading', false);

//LOGIN    
    case "LOGIN":
      return state
        .set('loading',true)
    case "LOGIN_SUCCESS":
      return state
        .set('isLogin',true)
        .set('loading',false)
    case "LOGIN_FAILED":
      return state
        .set('loading',false)
//VERIFY TOKEN
    case "VERIFY_TOKEN_SUCCESS":
      return state
        .set('isLogin',true)
    case "TOKEN_EXPIRED":
      return state 
        .set('loading',false)
        .set('loadspin',false) 
        .set('isLogin',false)
//SIGNUP
    case "SIGNUP":
      return state
        .set('loading',true)
    case "SIGNUP_SUCCESS":
      return state
        .set('loading',false)
    case "SIGNUP_FAILED":
      return state
        .set('loading',false)
//LOGOUT
    case "LOGOUT":
      return state
        .set('loading',true)
    case "LOGOUT_SUCCESS":
      return state
        .set('isLogin',false)
        .set('loading',false)
    case "LOGOUT_FAILED":
      return state
        .set('loading',false)
//LOAD HOTEL
    case "LOAD_HOTEL":
      return state
        .set('loadspin',true)
    case "LOAD_DATA_SUCCESS":
      return state
        .set('loadspin',false)
        .set('listhotel',action.hotels)
    case "LOAD_HOTEL_FAILED":
      return state
        .set('loadspin',false)
//LOAD ROOM
    case "LOAD_ROOM":
      return state 
        .set('loadspinroom',true)
    case "LOAD_ROOM_SUCCESS":
      return state
        .set('loadspinroom',false)
        .set('listroom',action.rooms)
//CHOOSE OPTION FOR BOOKING
    case "CHOOSE_DATE":
      return state
        .setIn(['bookedroom','datecheckin'],action.date.datecheckin)
        .setIn(['bookedroom','datecheckout'],action.date.datecheckout)
    case "ROOM_NUM_CHANGE":
      return state  
        .setIn(['bookedroom','numofroom'],action.num)
    case "CHOOSE_ROOM":
      return state
        .setIn(['bookedroom','roomid'],action.record._id)
        .setIn(['bookedroom','roomtype'],action.record.introduction)
        .setIn(['bookedroom','roomprice'],action.record.price)
        .setIn(['bookedroom','roomdetail'],action.record.description)
// BOOK ROOM
    case "BOOK_ROOM":
        return state
      //     .setIn(['bookedroom','datecheckin',action.bookedroom.datecheckin])
      //     .setIn(['bookedroom','datecheckout'],action.bookedroom.datecheckout)
      //     .setIn(['bookedroom','numofroom'],action.bookedroom.numofroom)
      //     .setIn(['bookedroom','roomtype'],action.bookedroom.roomtype)
      //     .setIn(['bookedroom','roomprice'],action.bookedroom.roomprice)
      .set('currentbookingpage',1)
      .set('bookedhotel',action.bookedroom.hotel)
      .set('isbooked',true)
//RATING
    case "RATING":
      console.log('rating reducer')
//FILTER HOTEL
    case "FILTER_HOTEL":
      return state
        .set('loadspin',true)
    case "FILTER_SUCCESS":
      return state
        .set('loadspin',false)
        .set('listhotel',action.filterhotel)
    case "NO_RESULT":
      return state
        .set('listhotel',[])
        .set('loadspin',false)
//RECOMMEND HOTEL
    case "RECOMMEND_HOTEL":
      return state
        .set('recommendhotel',[])
    case "RECOMMEND_SUCCESS":
      return state
        .set('recommendhotel',action.recommendhotel)
//CREATE BOOKING
    case "CREATE_BOOKING":
      return state
        .set('loading',true)
    case "CREATE_BOOKING_SUCCESS":
      return state
        .set('loading',false)
        .set('bookingCode',action.bookingCode)
        .set('currentbookingpage',2)
    case "CREATE_BOOKING_FAILED":
      return state
        .set('loading',false)
//CHECK BOOKING STATUS
    case "CHECK_STATUS":
      return state
        .set('checkingspin',true)
    case "CHECK_STATUS_SUCCESS":
      return state
        .set('checkingspin',false)
        .set('bookingstatus',action.status) 
    default:
      return state;
  }
}

export default appReducer;
