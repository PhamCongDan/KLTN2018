import jwt_decode from 'jwt-decode'
export function verifytoken(){
    var decoded=jwt_decode(localStorage.getItem('token'))
    console.log(decoded)
    console.log(new Date().getTime()/1000)
    if(decoded.exp > new Date().getTime()/1000)
        return true
    else
        return false
}