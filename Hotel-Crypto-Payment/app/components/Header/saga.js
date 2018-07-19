import { call, put, select, takeLatest,takeEvery,cancel, take} from 'redux-saga/effects';
import {callAPI,callApiRequireAuth,pause} from 'utils/callAPI';
import {message} from 'antd'
import {verifytoken} from 'utils/verifytoken'
const url= "http://localhost:8000/api/";
//LOGIN 
export function* Login(action){
                 console.log('login')
    
    let account={
         email:action.account.userName,
         password:action.account.password
     }
     try { 
        let res= yield callAPI(url+"auth/login","POST",account)
        if(res.token)
            {
                localStorage.setItem('token',res.token);
                yield call(pause,200)
                yield put({type:"LOGIN_SUCCESS"})
                yield message.success('Login success')
               
                
            }
        else{
            yield put ({type:"LOGIN_FAILED"})
            message.error(res.message)
        }
        
     } catch (error) {
         yield put({type:"LOGIN_FAILED"})
         message.error(error) 
     }
    }
//SIGNUP
export function* Signup(action){
    let signupacc={
        email: action.account.email,
        password: action.account.password,
        username: action.account.nickname
      };
      try {
        let res= yield callAPI(url+"auth/signup","POST",signupacc)
        if(res.code==200)
        {
            yield put({type:"SIGNUP_SUCCESS"})
            yield message.success('Signup success ! Check your email to active account !')
        }
        else{
            yield put({type:"SIGNUP_FAILED"})
            message.error(res.message)
        }
      } catch (error) {
            yield put({type:"SIGNUP_FAILED"})
            message.error(error)
      }
    
   console.log('11111')
}
//LOGOUT
export function* Logout(){
    try {
        if(verifytoken()){
            let res= yield callApiRequireAuth(url+"auth/logout","GET",localStorage.getItem('token'))
            if(res.code==200)
                {
                    localStorage.clear()
                    yield call(pause,200)
                    yield message.success('logout success')
                    yield put({type:"LOGOUT_SUCCESS"})
                }
                else{
                    yield call(pause,200)
                    yield put({type:"LOGOUT_FAILED"})
                    yield message.error(res.message)
                }
        }
        else{
            yield message.error('token has expired , please login again')
            yield put({type:"TOKEN_EXPIRED"})
        }
    } catch (error) {
        yield put({type:"LOGOUT_FAILED"})
        message.error(error) 
    }
    

}
//VERIFY TOKEN
export function* Verifytoken(action){
        if(verifytoken())
            yield put({type:"VERIFY_TOKEN_SUCCESS"})
        else{
            localStorage.clear()
        }
    // console.log(decoded)
}

export default function* rootSaga() {
    // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
    // By using `takeLatest` only the result of the latest API call is applied.
    // It returns task descriptor (just like fork) so we can continue execution
    // It will be cancelled automatically on component unmount);
    // yield takeEvery("LOGIN",Login)
     yield takeEvery("LOGOUT",Logout),
     yield takeEvery("LOGIN",Login),
     yield takeEvery("SIGNUP",Signup),
     yield takeEvery('VERIFY_TOKEN',Verifytoken)
  }