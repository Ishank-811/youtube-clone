import React , {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"; 
import './_Loginscreen.scss'
import {login} from "../../Redux/actions/auth.actions";
import { useHistory } from 'react-router';
const LoginScreen = () => {
   const dispatch = useDispatch(); 
    const accessToken = useSelector(state => state.auth.accessToken); 

   const handlesubmit = ()=>{
      dispatch(login());
   }
   const history = useHistory(); 
   useEffect(() => {
   if(accessToken){
history.push("/"); 
   }
   }, [accessToken , history])
   return (
      <div className='login'>
         <div className='login__container'>
            <h2>Youtube Clone</h2>
            <img
               src='http://pngimg.com/uploads/youtube/youtube_PNG2.png'
               alt=''
            />
            <button onClick={handlesubmit}>Login With google</button>
            <p>This Project is made using YOUTUBE DATA API</p>
         </div>
      </div>
   )
}

export default LoginScreen 