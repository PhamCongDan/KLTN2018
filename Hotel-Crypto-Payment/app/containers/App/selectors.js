/**
 * The global state selectors
 */

import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const selectRoute = (state) => state.get('route');

const makeSelectCurrentUser = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('currentUser')
);

const makeSelectLoading = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loading')
);

const makeSelectError = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('error')
);

const makeSelectRepos = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['userData', 'repositories'])
);

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);
const makeSelectLogin =() => createSelector(
  selectGlobal,
  (globalState) => globalState.get('isLogin')
)
const makeSelectFilter = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('filteropt') 
)
const makeSelectHotel = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('listhotel')
)
const makeSelectRoom = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('listroom')
)
const makeSelectdateCI = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['bookedroom','datecheckin'])
)
const makeSelectdateCO = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['bookedroom','datecheckout'])
)
const makeSelectnumofroom = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['bookedroom','numofroom'])
)
const makeSelectroomtype = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['bookedroom','roomtype'])
)
const makeSelectroomprice = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['bookedroom','roomprice'])
)
const makeSelectroomdetail= () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['bookedroom','roomdetail'])
)
const makeSelectroomid = () => createSelector(
  selectGlobal,
  (globalState) => globalState.getIn(['bookedroom','roomid'])
)
const makeSelectRecommend = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('recommendhotel')
)
const makeSelectLoadSpin = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loadspin') 
)
const makeSelectLoadSpinRoom = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('loadspinroom') 
)
const makeSelectBookedHotel= () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('bookedhotel') 
)
const makeSelectisbookedroom= () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('isbooked') 
)
const makeSelectcurrentbookingpage = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('currentbookingpage') 
)
const makeSelectbookingCode = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('bookingCode') 
)
const makeSelectbookingstatus = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('bookingstatus') 
)
const makeSelectcheckingspin = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('checkingspin') 
)
export {
  selectGlobal,
  makeSelectCurrentUser,
  makeSelectLoading,
//Load hotel animation
  makeSelectLoadSpin,
//
  makeSelectError,
  makeSelectRepos,
  makeSelectLocation,
//Login status
  makeSelectLogin,
//Filter Hotel
  makeSelectFilter,
//List Hotel
  makeSelectHotel,
//List Room
  makeSelectRoom,
//Booked room
  makeSelectdateCI,
  makeSelectdateCO,
  makeSelectnumofroom,
  makeSelectroomtype,
  makeSelectroomprice,
  makeSelectroomdetail,
  makeSelectroomid,
  makeSelectisbookedroom,
  //Create Booking
  makeSelectcurrentbookingpage,
  makeSelectbookingCode,
  //Booking status
  makeSelectbookingstatus,
//Recommendation hotel
  makeSelectRecommend,
//Load room animation
  makeSelectLoadSpinRoom,
//Booked Hotel
  makeSelectBookedHotel,
//Check booking status
makeSelectcheckingspin
};
