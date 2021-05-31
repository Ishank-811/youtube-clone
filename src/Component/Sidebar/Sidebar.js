import React from 'react';
import "./_Sidebar.scss";
import {Link} from "react-router-dom"; 
import {
    MdSubscriptions,
    MdExitToApp,
    MdThumbUp,
    MdHistory,
    MdLibraryBooks,
    MdHome,
    MdSentimentDissatisfied,
 } from "react-icons/md"
 import {useDispatch} from "react-redux"; 
import { logout } from '../../Redux/actions/auth.actions';
 
const Sidebar = ({sidebar, handleToggleSidebar}) => {
   const dispatch = useDispatch()
   const logouthandler = ()=>{
      dispatch(logout()); 
   }
    return (
        <nav
           className={sidebar ? "sidebar open" : "sidebar"}
            // onClick={() => handleToggleSidebar(false)} 
         >
           <li>
              <MdHome size={23} />
              <span>Home</span>
           </li>
           <li>
           <Link  style={{color:"#b1bdb4"}} to="/feed/subscriptions">
           <MdSubscriptions size={23} />
              <span >Subscriptions</span>
           </Link>
             
           </li>
  
           <li>
              <MdThumbUp size={23} />
              <span>Liked Video</span>
           </li>
  
           <li>
              <MdHistory size={23} />
              <span>History</span>
           </li>
  
           <li>
              <MdLibraryBooks size={23} />
              <span>Library</span>
           </li>
           <li>
              <MdSentimentDissatisfied size={23} />
              <span>I don't Know</span>
           </li>
  
           <hr />
  
           <li onClick={logouthandler}>
              <MdExitToApp size={23} />
              <span>Log Out</span>
           </li>
  
           <hr />
        </nav>
     )
}

export default Sidebar
