import logo from "./logo.svg";
import "./App.css";
import "./styles/Main.css";
// import './styles/Auth.css';
import Chart from "react-apexcharts";
import Amplify, { Auth } from "aws-amplify";
import config from "./configs/aws-exports";
import React, { useState, useEffect } from "react";
import TestComponent from "./components/TestComponent";
import AuthPage from "./components/AuthPage";
import Dashboard from "./components/Dashboard";
import AccountManagement from "./components/AccountManagement";
import UserProfile from "./components/UserProfile";
import Subscription from "./components/Subscription";
import Header from "./components/Header";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import LeadGenIntro from "./components/LeadGenIntro";
import ReportsIntro from "./components/ReportsIntro";
import ReportsIntroV2 from "./components/ReportsIntroV2";
import CustomizeWidget from "./components/CustomizeWidget";
import axios from "axios";
import { TrinitySpinner } from "loading-animations-react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Link,
} from "react-router-dom";
import ChangePassword from "./components/ChangePassword";
import PaymentHistory from "./components/PaymentHistory";
import FutureValueConfig from "./components/FutureValueConfig";
import CMA from "./components/CMA";
import Signup from "./components/Signup";
import Signin from "./components/SignIn";
import LeadGenIntroV2 from "./components/LeadGenIntroV2";
import ReportIntroLoggedInV2 from "./components/ReportIntroLoggedInV2";
import Leads from "./components/Leads";
import WordPressGuide from "./components/WordPressGuide";
import WixGuide from "./components/WixGuide";
import ReportFormV2 from "./components/ReportFormV2";
import LeadsList from "./components/LeadsList"
Amplify.configure(config);
function App() {
  var [data, setData] = useState({
    authFlag: null,
    user: null,
    jwt: null,
    userProfile: null,
  });
  var [jwtExpiry, setJwtExpiry] = useState(null);
  async function doSignOut() {
    await Auth.signOut();
    updateAuthState();
    window.location.href = "/";
  }
  function updateAuthState() {
    Auth.currentAuthenticatedUser()
      .then(async (user) => {
        // console.log('vx: current authenticated user', user)
        // console.log('vx: expriation time exact', user.signInUserSession.accessToken.payload.exp * 1000)
        // console.log('vx: curr time in millis type', typeof Date.now())
        // console.log('vx: caterpie data.authFlag', data.authFlag)
        // console.log('vx: caterpie data.jwt', data.jwt)
        await new Promise((resolve) => {
          resolve(
            (() => {
              if (
                data.authFlag === false ||
                data.authFlag === null ||
                data.jwt === null ||
                Date.now() > jwtExpiry
              ) {
                var p = data.userProfile;
                data = {
                  authFlag: true,
                  user: user,
                  jwt: user.signInUserSession.accessToken.jwtToken,
                  userProfile: null,
                };
                setJwtExpiry(() => {
                  return user.signInUserSession.accessToken.payload.exp * 1000;
                });
                console.log(
                  "vx: jwt expiry set in state.. It is",
                  user.signInUserSession.accessToken.payload.exp * 1000
                );
                var rabbit =
                  user.signInUserSession.accessToken.payload.exp * 1000;
                setTimeout(() => {
                  updateAuthState();
                }, rabbit - Date.now());
              }
            })()
          );
        });

        if (data.userProfile === null && data.jwt !== null) {
          if (false) {
            updateAuthState();
          } else {
            // console.log('vx: for user profile api jwt set as', data.jwt)
            let config = {
              headers: {
                Authorization: "Bearer " + data.jwt,
              },
            };
            // console.log('vx: going to call get user profile api.. config is', config)
            axios
              .get("https://developers.honely.com/user", config)
              .then((response) => {
                // console.log('vx: userProfile being set in app.js state as', response.data.data)
                // console.log('vx: userprofile is', response.data)
                setData((prevValue) => {
                  return {
                    authFlag: true,
                    user: prevValue.user,
                    jwt: user.signInUserSession.accessToken.jwtToken,
                    userProfile: response.data.data,
                  };
                });
                if (
                  response.data.data.status === "COMPLETED" &&
                  response.data.data.api_key === null
                ) {
                  generateApiKey()
                  window.location.reload()
                }
              })
              .catch((error) => {
                if (error.message === "Request failed with status code 401") {
                  doSignOut();
                }
              });
          }
        }
        if (
          data.userProfile !== null &&
          data.userProfile.status === "COMPLETED" &&
          data.userProfile.api_key === null
        ) {
          console.log("vx: london bridge entered");
          generateApiKey()
          window.location.reload()
        }
      })
      .catch(() => {
        console.log("vx: userProfile being set in app.js state as null");
        setData((prevValue) => {
          return {
            authFlag: false,
            user: null,
            jwt: null,
            userProfile: null,
          };
        });
      });
  }
  useEffect(() => {
    updateAuthState();
    async function setState() {
      await new Promise((resolve) => {
        resolve(updateAuthState());
      });
      updateAuthState();
    }
    async function setStateAgain() {
      await new Promise((resolve) => {
        resolve(setState());
      });
      updateAuthState();
    }
    // setStateAgain()
    // console.log('vx: current jwt', data.jwt)
  }, []);
  function enterCardInfo() {
    // console.log(data.jwt)
    let config = {
      headers: {
        Authorization: "Bearer " + data.jwt,
      },
    };
    axios
      .post("https://developers.honely.com/create-stripe-session", {}, config)
      .then((response) => {
        // console.log( response.data.data.url )
        window.open(response.data.data.url, "_blank");
      })
      .catch();
  }
  function generateApiKey() {
    // vx: jwt check
    let config = {
      headers: {
        Authorization: "Bearer " + data.jwt,
      },
    };
    axios
      .post(
        "https://developers.honely.com/dashboard/api-key",
        {
          payment_type: "HONELY_API_BASIC_PLAN",
        },
        config
      )
      .then((response) => {
        console.log("vx: generate api key wala response", response);
        updateAuthState();
      })
      .catch();
  }
  function generateStats() {
    console.log(data.jwt);
    let config = {
      headers: {
        Authorization: "Bearer " + data.jwt,
      },
    };
    axios
      .get(
        "https://developers.honely.com/dashboard/statistics?date_range=three_months",
        config
      )
      .then((response) => {
        console.log(response);
      })
      .catch();
  }
  function updateUserProfile(newUserProfile) {
    setData((prevValue) => {
      return {
        authFlag: true,
        user: prevValue.user,
        jwt: prevValue.jwt,
        userProfile: newUserProfile,
      };
    });
  }
  function LoadingPage() {
    return (
      <div className="loading-animation">
        {/* <p>Hold tight.. Loading..</p> */}
        <TrinitySpinner color="#24cb43" />
      </div>
    );
  }
  console.log("tatatata", data.authFlag);
  if (window.location.pathname === "/login") {
    return (
      <Router>
        <div className="section">
          <Header signOut={doSignOut} authFlag={false} />
          <div className="section-wrapper">
            <Routes>
              <Route
                path="/login"
                element={
                  <Login
                    authFlag={data.authFlag}
                    jwt={data.jwt}
                    doSignOut={doSignOut}
                  />
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    );
  } else if (data.authFlag === true) {
    return (
      <div>
        <Router>
          <div className="section">
            <Header
              signOut={doSignOut}
              authFlag={true}
              userProfile={data.userProfile}
            />
            {/* <div className="section-wrapper"> */}
            <Routes>
              <Route
                path="/"
                element={<HomePage authFlag={true} jwt={data.jwt} doSignOut={doSignOut}/>}
              />
              <Route
                path="/leadgen"
                element={
                  <LeadGenIntroV2
                    userProfile={data.userProfile}
                    jwt={data.jwt}
                    authFlag = {true}
                    doSignOut={doSignOut}
                    updateUserProfile={updateUserProfile}
                  />
                }
              />
              <Route
                path="/reports"
                element={
                  <ReportsIntroV2
                    userProfile={data.userProfile}
                    jwt={data.jwt}
                    doSignOut={doSignOut}
                    updateAuthState={updateAuthState}
                    authFlag={true}
                  />
                }
              />
              <Route
                path="/dashboard"
                element={
                  <Dashboard
                    userProfile={data.userProfile}
                    jwt={data.jwt}
                    doSignOut={doSignOut}
                  />
                }
              />
              <Route
                path="/account-management"
                element={<AccountManagement userProfile={data.userProfile} />}
              >
                <Route
                  index
                  element={
                    <CustomizeWidget jwt={data.jwt} doSignOut={doSignOut} />
                  }
                />
                {/* <Route index element={<UserProfile userProfile={data.userProfile} jwt={data.jwt} updateUserProfile={updateUserProfile} doSignOut={doSignOut} />} /> */}
                <Route
                  path="user-profile"
                  element={
                    <UserProfile
                      userProfile={data.userProfile}
                      jwt={data.jwt}
                      updateUserProfile={updateUserProfile}
                      doSignOut={doSignOut}
                    />
                  }
                />
                <Route path="leads" element={<Leads />}>
                  <Route path="wordpress-guide" element={<WordPressGuide />} />
                  <Route path="wix-guide" element={<WixGuide />} />
                </Route>
                <Route
                  path="subscription"
                  element={
                    <Subscription
                      userProfile={data.userProfile}
                      jwt={data.jwt}
                      doSignOut={doSignOut}
                      updateUserProfile={updateUserProfile}
                    />
                  }
                />
                <Route
                  path="change-password"
                  element={
                    <ChangePassword
                      jwt={data.jwt}
                      auth={Auth}
                      doSignOut={doSignOut}
                    />
                  }
                />
                <Route
                  path="payment-history"
                  element={
                    <PaymentHistory jwt={data.jwt} doSignOut={doSignOut} />
                  }
                />
                <Route
                  path="future-value-config"
                  element={
                    <FutureValueConfig
                      userProfile={data.userProfile}
                      jwt={data.jwt}
                      doSignOut={doSignOut}
                    />
                  }
                />
                <Route
                  path="customize-widget"
                  element={
                    <CustomizeWidget jwt={data.jwt} doSignOut={doSignOut} />
                  }
                />
              </Route>
              <Route
                path="/cma"
                element={
                  <CMA
                    userProfile={data.userProfile}
                    jwt={data.jwt}
                    doSignOut={doSignOut}
                    updateUserProfile={updateUserProfile}
                  />
                }
              />
              {/* <Route path="/customize-widget" element={<CustomizeWidget jwt={data.jwt} doSignOut={doSignOut} />} /> */}
              <Route
                path="*"
                element={
                  <LeadGenIntroV2
                    userProfile={data.userProfile}
                    jwt={data.jwt}
                    doSignOut={doSignOut}
                    updateUserProfile={updateUserProfile}
                  />
                }
              />
            </Routes>
          </div>
          {/* </div> */}
        </Router>
      </div>
    );
  } else if (data.authFlag === false) {
    const location = window.location.pathname;
    // else {
    return (
      // <AuthPage updateAuthState={updateAuthState}/>
      <Router>
        <div className="section">
          <Header signOut={doSignOut} authFlag={data.authFlag} />
          {/* <div className="section-wrapper"> */}
          <Routes>
            <Route path="/" element={<HomePage authFlag={false}/>} />
            {/* <Route path="/" element={<LeadGenIntro />} />
              <Route path="/leadgen" element={<LeadGenIntro />} />
              <Route path="/reports" element={<ReportsIntro />} />
              <Route path="/signup" element={<Signup updateAuthState={updateAuthState}/>} />
              <Route path="/signin" element={<Signin updateAuthState={updateAuthState}/>} />
              <Route path="*"  element={<HomePage />} /> */}
            <Route path="/leadgen" element={<LeadGenIntroV2 />} />
            <Route
              path="/reports"
              element={<ReportsIntroV2 authFlag={data.authFlag} />}
            />
            <Route
              path="/signup"
              element={<Signup updateAuthState={updateAuthState} />}
            />
            <Route
              path="/signin"
              element={<Signin updateAuthState={updateAuthState} />}
            />
            <Route path="/reportform" element={<ReportFormV2 />} />
          </Routes>
          {/* </div> */}
        </div>
      </Router>
      // <LeadGenIntro />
      // <ReportsIntro />
      // <CMA />
      // <Signup updateAuthState={updateAuthState}/>
      // <Signin />
    );
    // }
  } else {
    return <LoadingPage />;
  }
}

export default App;
