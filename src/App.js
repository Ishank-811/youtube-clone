import React , {useState, useEffect} from 'react'
import Header from "./Component/Header/Header"; 
import Sidebar from './Component/Sidebar/Sidebar';
import Homescreen from './Screens/Homescreen/Homescreen';
import{Container} from "react-bootstrap";
import "./_app.scss";
import {useSelector} from "react-redux"; 
import LoginScreen from './Screens/LoginScreen/Loginscreen';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom'
import WatchScreen from './Screens/Watchscreen/Watchsreen';
import SearchScreen from './Screens/SearchScreen';
import SubscriptionSreen from './Screens/SubscriptionScreen/SubscriptionSreen';
import ChannelScreen from './Screens/ChannelScreen/ChannelScreen';
const Layout = ({ children }) => {
  const [sidebar, toggleSidebar] = useState(false)

  const handleToggleSidebar = () => toggleSidebar(value => !value)

  return (
     <>
     <Header handleToggleSidebar={handleToggleSidebar}></Header>
    <div className="app__container">
      <Sidebar  sidebar={sidebar}/>
      <Container fluid className="app_main">
      {children}
      </Container>
    </div>
     </>
  )
}


export const App = () => {
   const history = useHistory(); 
   const {accessToken , loading} = useSelector(state => state.auth); 
   console.log(accessToken); 
   useEffect(() => {
   if(!loading && !accessToken){
      history.push('/auth')
   }
   }, [accessToken , loading, history])
  return (
    
    <Switch>
       <Route path='/' exact>
          <Layout>
             <Homescreen />
          </Layout>
       </Route>

       <Route path='/auth'>
          <LoginScreen />
       </Route>

       <Route path='/search/:query'>
          <Layout>
          <SearchScreen/>
          </Layout>
       </Route>
       <Route path='/watch/:id'>
          <Layout>
             <WatchScreen></WatchScreen>
          </Layout>
       </Route>
       <Route path='/feed/subscriptions'>
          <Layout>
            <SubscriptionSreen></SubscriptionSreen>
          </Layout>
       </Route>
       <Route path='/channel/:channelId'>
          <Layout>
            <ChannelScreen></ChannelScreen>
          </Layout>
       </Route>

       <Route>
          <Redirect to='/' />
       </Route>
    </Switch>
    
 )
}
export default App;
