import { call, put, select, takeLatest,takeEvery,cancel} from 'redux-saga/effects';
import {callAPI,callApiRequireAuth,pause} from 'utils/callAPI';
import {message} from 'antd'
import {push} from 'react-router-redux'
import {verifytoken} from 'utils/verifytoken'
const url= "http://localhost:8000/api/";
//LOAD HOTEL
export function* Loadhotel(action){
    try {
            const res = yield callAPI(url+"hotel",'GET')
    if(res.code==200)
        {
            const hotels=res.hotel;
            yield call(pause,300)
            yield put({type:"LOAD_DATA_SUCCESS",hotels})
        }
    } catch (error) {
        yield put({type:"LOAD_HOTEL_FAILED"})
        message.error('' + error)
    }
    console.log('load hotel')
}
//LOAD ROOM
export function* Loadroom(action){
    console.log('load room saga')
    try {
        let res= yield callAPI(url+"room/"+action.hotelid,"GET")
        console.log(res)
        if(res.code==200)
            {
                const rooms=res.room
                yield call(pause,300)
                yield put({type:"LOAD_ROOM_SUCCESS",rooms})
            }
            
     
    } catch (error) {
        message.error(error)
    }
}
//RATING
function* Rating(action){
    try {
        if(verifytoken()){
            const ratingurl= action.data.hotelid+'/'+action.data.ratingpoint
            let res= yield callApiRequireAuth(url+"rating/"+ratingurl,
            "POST",
            localStorage.getItem('token')
        )
        console.log(res)
            yield put({type:"RECOMMEND_HOTEL"})
            yield put({type:"LOAD_HOTEL"})
            }
        else
            {
                localStorage.clear()
                yield put({type:"TOKEN_EXPIRED"})
                message.error('token has expired , please login again')
            }
    } catch (error) {
        message.error(error) 
    }
    
console.log('Rating')
}
//FILTER HOTEL
export function* Filterhotel(action){
    try {
        const res = yield callAPI(url+'hotel/find','POST',action.datafilter)
    if(res.code==200)
        {
            const filterhotel=res.hotel;
            yield call(pause,300)
            if(filterhotel.length)
                yield put({type:"FILTER_SUCCESS",filterhotel})
            else
                yield put ({type:"NO_RESULT"})
        }
    console.log(action.datafilter)
    console.log(res)
    } catch (error) {
        message.error('' + error)
    }
}
//RECOMMEND HOTEL
export function* Recommendhotel(actions){
    try {
        if(verifytoken()){
            const res = yield callApiRequireAuth(url+'rating','GET',localStorage.getItem('token'))
            const recommendhotel=res;
            yield put({type:"RECOMMEND_SUCCESS",recommendhotel})
            console.log(res)
        }
        else
        {
            localStorage.clear()
            yield put({type:"TOKEN_EXPIRED"})
            message.error('token has expired , please login again')
        }
    } catch (error) {
       console.log(error)
    }
    console.log('reccommend')
}
//BOOK ROOM
export function* Bookroom(){
    if(verifytoken()){
        yield put(push('/booking'))
    }
    else{
        localStorage.clear()
        yield put({type:"TOKEN_EXPIRED"})
        message.error('token has expired , please login again')
    }
    
}
   
export default function* rootSaga() {
    // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
    // By using `takeLatest` only the result of the latest API call is applied.
    // It returns task descriptor (just like fork) so we can continue execution
    // It will be cancelled automatically on component unmount);
    // yield takeEvery("LOGIN",Login)
     yield [
         takeLatest("LOAD_HOTEL",Loadhotel),
         takeLatest("LOAD_ROOM",Loadroom),
         takeLatest("RATING",Rating),
         takeLatest("FILTER_HOTEL",Filterhotel),
         takeLatest("RECOMMEND_HOTEL",Recommendhotel),
         takeLatest("BOOK_ROOM",Bookroom)
        ]
  }

  