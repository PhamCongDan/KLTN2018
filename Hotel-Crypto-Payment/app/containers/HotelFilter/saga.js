// import { call, put, select, takeLatest,takeEvery,cancel} from 'redux-saga/effects';
// import {callAPI,callApiRequireAuth} from 'utils/callAPI';
// import {message} from 'antd'
// //FILTER HOTEL
// export function* Filterhotel(action){
//     try {
//             const res = yield callAPI('http://localhost:8000/api/hotel/find','POST',action.datafilter)
//     if(res.code==200)
//         {
//             const filterhotel=res.hotel;
//             yield put({type:"FILTER_SUCCESS",filterhotel})
//         }
//     console.log(action.datafilter)
//     console.log(res)
//     } catch (error) {
//         message.error('' + error)
//     }
// }
// export default function* rootSaga() {
//     // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
//     // By using `takeLatest` only the result of the latest API call is applied.
//     // It returns task descriptor (just like fork) so we can continue execution
//     // It will be cancelled automatically on component unmount);
//     // yield takeEvery("LOGIN",Login)
//      yield [
//          takeLatest("FILTER_HOTEL",Filterhotel),
//         ]
//   }