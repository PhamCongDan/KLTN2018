// import { call, put, select, takeLatest,takeEvery,cancel} from 'redux-saga/effects';
// import {callAPI,callApiRequireAuth,pause} from 'utils/callAPI';
// import {message} from 'antd'
// //LOGIN 
// export function* Login(action){
//                  console.log('login')
    
//     let account={
//          email:action.account.userName,
//          password:action.account.password
//      }
//      try { yield put({type:"LOGIN_SUCCESS"})
//         let res= yield callAPI("http://localhost:8000/api/auth/login","POST",account)
//         if(res.token)
//             {
//                 localStorage.setItem('token',res.token);
//                 localStorage.setItem('isLogin',true)
//                 yield put({type:"RECOMMEND_HOTEL"})
//                 yield call(pause,1000)
//                 yield put({type:"LOGIN_SUCCESS"})
//                 yield message.success('Login success')
               
                
//             }
//         else{
//             yield put ({type:"LOGIN_FAILED"})
//             message.error(res.message)
//         }
        
//      } catch (error) {
//          message.error(error) 
//      }
    
//  //    console.log(res)
//  }
// //RECOMMEND 
//  export function* Recommendhotel(){
//     console.log('recommend')
     
//     try {
//         const res = yield callApiRequireAuth('http://localhost:8000/api/rating','GET',localStorage.getItem('token'))
//         if(res)
//         {
//             const recommendhotel=res;
//             localStorage.setItem('recommendhotel',JSON.stringify(recommendhotel))
//             yield put({type:"RECOMMEND_SUCCESS",recommendhotel})
           
//         }
//         console.log(res)
//     } catch (error) {
//        console.log(error)
//     }
   
// }
//  export default function* rootSaga() {
//     // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
//     // By using `takeLatest` only the result of the latest API call is applied.
//     // It returns task descriptor (just like fork) so we can continue execution
//     // It will be cancelled automatically on component unmount);
//     // yield takeEvery("LOGIN",Login)
//      yield [
//          takeEvery("LOGIN",Login),
//          takeEvery("RECOMMEND_HOTEL",Recommendhotel)
//         ]
//   }