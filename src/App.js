import logo from './logo.svg';
import './App.css';
import './styles/Main.css';
// import './styles/Auth.css';
import Chart from "react-apexcharts";
import Amplify, { Auth } from 'aws-amplify'
import config from './configs/aws-exports'
import React, { useState, useEffect } from "react";
import TestComponent from './components/TestComponent';
import AuthPage from './components/AuthPage';
import Dashboard from './components/Dashboard';
import AccountManagement from './components/AccountManagement';
import UserProfile from "./components/UserProfile";
import Subscription from "./components/Subscription";
import Header from "./components/Header";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import LeadGenIntro from "./components/LeadGenIntro"
import ReportsIntro from "./components/ReportsIntro"
import axios from 'axios';
import { TrinitySpinner } from 'loading-animations-react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Link
} from "react-router-dom";
import ChangePassword from './components/ChangePassword';
import PaymentHistory from './components/PaymentHistory';
import FutureValueConfig from './components/FutureValueConfig';
import CMA from './components/CMA';
Amplify.configure(config)
function App() {
  var [data, setData] = useState({
    authFlag: null,
    user: null,
    jwt: null,
    userProfile: null,
  });
  var [jwtExpiry, setJwtExpiry] = useState(null)
  async function doSignOut () {
    await Auth.signOut();
    updateAuthState()
    window.location.href='/'
  }
  function updateAuthState () {
    Auth.currentAuthenticatedUser()
    .then(async (user) => {
      // console.log('vx: current authenticated user', user)
      // console.log('vx: expriation time exact', user.signInUserSession.accessToken.payload.exp * 1000)
      // console.log('vx: curr time in millis type', typeof Date.now())
      // console.log('vx: caterpie data.authFlag', data.authFlag)
      // console.log('vx: caterpie data.jwt', data.jwt)
      await new Promise ((resolve) => {
          resolve((()=>{
            if (data.authFlag === false || data.authFlag === null || data.jwt === null || (Date.now() > jwtExpiry)) {
              
              var p = data.userProfile
              data = {
                authFlag: true,
                user: user,
                jwt: user.signInUserSession.accessToken.jwtToken,
                userProfile: null
              }
              setJwtExpiry(() => {
                return user.signInUserSession.accessToken.payload.exp * 1000
              })
              console.log('vx: jwt expiry set in state.. It is', user.signInUserSession.accessToken.payload.exp * 1000)
              var rabbit = user.signInUserSession.accessToken.payload.exp * 1000
              setTimeout(() => {
                updateAuthState()
              }, rabbit - Date.now())
            }
          })())
      })
      
      if (data.userProfile === null && data.jwt !== null) {
        if (false) {
          updateAuthState()
        } else {
        // console.log('vx: for user profile api jwt set as', data.jwt)
        let config = {
          headers: {
            'Authorization': 'Bearer ' + data.jwt
          }
        }
        // console.log('vx: going to call get user profile api.. config is', config)
        axios.get('https://developers.honely.com/user', config)
        .then((response) => {
          // console.log('vx: userProfile being set in app.js state as', response.data.data)
          setData((prevValue) => {
            return {
              authFlag: true,
              user: prevValue.user,
              jwt: user.signInUserSession.accessToken.jwtToken,
              userProfile: response.data.data
            }
          })
        })
        .catch((error) => {
          if (error.message === 'Request failed with status code 401') {
            doSignOut()
          }
        })
      }
      }
      // console.log('vx: butterfree london bridge', data.userProfile)
      if (data.userProfile !== null && data.userProfile.status === 'COMPLETED' && data.userProfile.api_key === null) {
        console.log('vx: london bridge entered')
        // generateApiKey()
      }
    })
    .catch(() => {
      console.log('vx: userProfile being set in app.js state as null')
      setData((prevValue) => {
        return {
          authFlag: false,
          user: null,
          jwt: null,
          userProfile: null,
        }
      })
    })
  }
  useEffect(() => {
    updateAuthState()
    async function setState() {
      await new Promise((resolve)=>{
        resolve(updateAuthState())
      })
      updateAuthState()
    }
    async function setStateAgain() {
      await new Promise((resolve)=>{
        resolve(setState())
      })
      updateAuthState()
    }
    // setStateAgain()
    // console.log('vx: current jwt', data.jwt)
  },[]);
  function enterCardInfo () {
    // console.log(data.jwt)
    let config = {
      headers: {
        'Authorization': 'Bearer ' + data.jwt
      }
    }
    axios.post( 
        'https://developers.honely.com/create-stripe-session', {},
        config
      )
      .then( ( response ) => {
        // console.log( response.data.data.url )
        window.open(response.data.data.url, "_blank");
      } )
      .catch()
  }
  function generateApiKey () {
    // vx: jwt check
    let config = {
      headers: {
        'Authorization': 'Bearer ' + data.jwt
      }
    }
    axios.post( 
        'https://developers.honely.com/dashboard/api-key', {
          payment_type: 'HONELY_API_BASIC_PLAN'
        },
        config
      )
      .then( ( response ) => {
        console.log('vx: generate api key wala response', response)
        updateAuthState()
      } )
      .catch()
  }
  function generateStats () {
    console.log(data.jwt)
    let config = {
      headers: {
        'Authorization': 'Bearer ' + data.jwt
      }
    }
    axios.get( 
        'https://developers.honely.com/dashboard/statistics?date_range=three_months',
        config
      )
      .then( ( response ) => {
        console.log( response )
      } )
      .catch()
  }
  function updateUserProfile (newUserProfile) {
    setData((prevValue) => {
      return {
        authFlag: true,
        user: prevValue.user,
        jwt: prevValue.jwt,
        userProfile: newUserProfile
      }
    })
  }
  function LoadingPage () {
    return (
      <div className="loading-animation">
        {/* <p>Hold tight.. Loading..</p> */}
        <TrinitySpinner color="#24cb43" />
      </div>
    )
  }
  console.log('tatatata', data.authFlag)
  if (data.authFlag === true) {
    return (
      <div>
        {/* <button onClick={generateStats}>Generate Stats</button> */}
        {/* <Dashboard /> */}
        {/* <UserProfile /> */}
      {/* <div>
        <h3>Payment Section</h3>
        <p>Enter/update credit card info</p>
        <button onClick={enterCardInfo}>Submit card info</button>
      </div>
      <div>
        <h3>API Key Section</h3>
        <button onClick={() => {generateApiKey("SUBSCRIPTION")}}>Generate API key</button>
        <p id="api-key-display"></p>
      </div> */}
      <Router>
      <div className='section'>
        <Header signOut={doSignOut} />
        {/* <Routes>
        <Route path="/" element={<App />}>
          <Route exact index element={<Dashboard />} />
          <Route exact path="userprofile" element={<UserProfile />} />
        </Route>
        </Routes> */}
        <div className="section-wrapper">
        <Routes>
        <Route path="/" element={<Dashboard userProfile={data.userProfile} jwt={data.jwt} doSignOut={doSignOut}/>} />
          <Route path="/account-management" element={<AccountManagement />} >
            <Route index element={<UserProfile userProfile={data.userProfile} jwt={data.jwt} updateUserProfile={updateUserProfile} doSignOut={doSignOut} />} />
            <Route path="user-profile" element={<UserProfile userProfile={data.userProfile} jwt={data.jwt} updateUserProfile={updateUserProfile} doSignOut={doSignOut}/>} />
            <Route path="subscription" element={<Subscription userProfile={data.userProfile} jwt={data.jwt} doSignOut={doSignOut} updateUserProfile={updateUserProfile}/>} />
            <Route path="change-password" element={<ChangePassword jwt={data.jwt} auth={Auth} doSignOut={doSignOut}/>} />
            <Route path="payment-history" element={<PaymentHistory jwt={data.jwt} doSignOut={doSignOut}/>} />
            <Route path="future-value-config" element={<FutureValueConfig userProfile={data.userProfile} jwt={data.jwt} doSignOut={doSignOut}/>} />
          </Route>
          <Route path="cma" element={<CMA />} />
        </Routes>
        </div>
      </div>
      </Router>
      </div>
    );
  } else if (data.authFlag === false) {
    const location = window.location.pathname;
    if (location === '/login') {
      return (
        <Router>
        <Routes>
          <Route path="/login" element={<Login authFlag={data.authFlag} />} />
        </Routes>
        </Router>
      )
    } else {
      return (
        // <AuthPage updateAuthState={updateAuthState}/>
        // <HomePage />
        // <LeadGenIntro />
        <ReportsIntro />
      )
    }
  } else {
    return (
    <LoadingPage />
    )
  }
}

export default App;
