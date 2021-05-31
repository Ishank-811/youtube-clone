import firebase from "firebase/app"
import auth from "../../firebase"; 
import { LOGIN_FAIL, LOGIN_PROFILE, LOGIN_REQUEST, LOGIN_SUCCESS  , LOGOUT} from "../reducers/actionType";
export const login = ()=>async(dispatch)=>{
try{
    dispatch({
        type:LOGIN_REQUEST
    })
    const provider =new firebase.auth.GoogleAuthProvider(); 
    provider.addScope("https://www.googleapis.com/auth/youtube.force-ssl")
    const res = await  auth.signInWithPopup(provider);
  console.log(res); 
     const accessToken = res.credential.accessToken; 
    const profile={
        name:res.additionalUserInfo.profile.name,
         photoURL :res.additionalUserInfo.profile.picture
    }
    sessionStorage.setItem('ytc-access-token', accessToken)
    sessionStorage.setItem('ytc-user', JSON.stringify(profile))

    dispatch({
        type:LOGIN_SUCCESS,
        payload:accessToken
    })
    dispatch({
        type:LOGIN_PROFILE,
        payload:profile
    })
}catch(err){    
    console.log(err.message); 
dispatch({
    type:LOGIN_FAIL,
    payload:err.message
})
}
}

export const logout = ()=>async(dispatch)=>{
   await auth.signOut(); 
    dispatch(
     {  type:LOGOUT}
    )
    
   sessionStorage.removeItem('ytc-access-token')
   sessionStorage.removeItem('ytc-user')
}