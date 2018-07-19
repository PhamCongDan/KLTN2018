import { call, put, select, takeLatest,takeEvery,cancel} from 'redux-saga/effects';
import {callAPI,callApiRequireAuth,pause} from 'utils/callAPI';
import {message,notification} from 'antd'
import {push} from 'react-router-redux'
import {verifytoken} from 'utils/verifytoken'
const url= "http://localhost:8000/api/";
//Create Booking
export function* Createbooking(actions){
    try {
      if(verifytoken())
        {
           const res= yield callApiRequireAuth(url+"booking","POST",localStorage.getItem('token'),actions.bookinginfo)
           if(res.code==200)
           {
             const bookingCode=res.bookingCode
              yield call(pause,1000)
              yield message.success(res.message)
              yield put({type:'CREATE_BOOKING_SUCCESS',bookingCode})
              
           }
           else{
              yield put({type:'CREATE_BOOKING_FAILED'})
              yield message.error(res.message)
           }
        }
        else{
            localStorage.clear()
            yield put({type:"TOKEN_EXPIRED"})
            message.error('token has expired , please login again')
        }
      
    } catch (error) {
          message.error(error)
      
    }
}
//Check Booking Status
export function* Checkbookingstatus(actions){
    try {
      if(verifytoken()){
        const res= yield callApiRequireAuth(url+'booking/'+actions.bookingid,'GET',localStorage.getItem('token'))
        let status=res.booking
        console.log(res)
        if(res.code==200){
          yield call(pause,1000)
          yield put({type:'CHECK_STATUS_SUCCESS',status})
                if(status[0].total>0)
                {
                    return (
                        notification['warning']({
                                    message: 'Booking Notification',
                                    description: 'You must pay '+ status[0].total+' $ to complete your booking !',
                                  })
                    )
                }
            if( status[0].refund>0){
                return (
                    notification['success']({
                        message: 'Booking Notification',
                        description: 'You Booking is success and your refund is '+ status[0].refund+' $ .Please come to the hotel to receive it!',
                      })
                )
            }
            if(status[0].total==0&&status[0].refund==0)
            {
              return (
                notification['success']({
                    message: 'Booking Notification',
                    description: 'You Booking is success !',
                  })
            )
            }
        }
        else{
          yield call(pause,1000)
          yield put({type:'CHECK_STATUS_FAILED'})
          message.error(res.message)
        }
      }
      else{
        localStorage.clear()
        yield put({type:"TOKEN_EXPIRED"})
        message.error('token has expired , please login again')
      }
    } catch (error) {
        message.error(error)
    }
}


export default function* rootSaga() {
    // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
    // By using `takeLatest` only the result of the latest API call is applied.
    // It returns task descriptor (just like fork) so we can continue execution
    // It will be cancelled automatically on component unmount);
    // yield takeEvery("LOGIN",Login)
     yield [
        takeLatest("CREATE_BOOKING",Createbooking),
        takeLatest("CHECK_STATUS",Checkbookingstatus)
        ]
  }