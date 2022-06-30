import React, { useState, useEffect } from "react";
import '../styles/AccountManagement.css'
import UserProfile from "./UserProfile";
import Subscription from "./Subscription";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useMatch,
    useParams,
    useNavigate,
    useLocation,
    Outlet
  } from "react-router-dom";
//   const location = window.location.pathname;
function AccountManagement(props) {
    var path = useLocation();
    function selectAccIndexSection(index) {
        const x = document.getElementsByClassName('accountmanagement-index-item')
        var y = null
        for (let i = 0; i < x.length; i++) {
            if (index == i) {
              x[i].classList.add('active')
              y=x[i]
            } else {
              x[i].classList.remove('active')
            }
          }
          y.firstChild.click()
    }
    function setActiveStyle() {
        const location = window.location.pathname;
        // console.log('vx: setActiveStyle function called')
        // console.log('vx: current path from account management', location);
        var headerItems = document.getElementsByClassName('accountmanagement-index-item')
        for (let x=0;x<headerItems.length;x++) {
            headerItems[x].classList.remove('active')
        }
        if (location === '/account-management/user-profile' || location === '/account-management/' || location === '/account-management') {
            headerItems[0].classList.add('active')
        }
        if (location === '/account-management/subscription') {
            headerItems[1].classList.add('active')
        }
        if (location === '/account-management/change-password') {
            headerItems[2].classList.add('active')
        }
        // if (location === '/account-management/future-value-config') {
        //     headerItems[3].classList.add('active')
        // }
        // if (location === '/account-management/payment-history') {
        //     headerItems[3].classList.add('active')
        // }
        if (location === '/account-management/customize-widget') {
          headerItems[3].classList.add('active')
      }
    }
    useEffect(() => {
        setActiveStyle()
        if (typeof props !== 'undefined' && props!== null && typeof props.userProfile !== 'undefined' && props.userProfile !== null && props.userProfile.status !== 'ACTIVE') {
          var pika = document.getElementById('customize-widget-sidebar-option')
          pika.style = "display: none"
        }
      }, [path]);
    return (
        <div>
        {/* <UserProfile /> */}
        {/* <Router> */}
      <div className='accountmanagement-container'>
          <div className="accountmanagement-index">
        <nav>
          <ul>
            <li className="accountmanagement-index-item" style={{display:'none'}} onClick={() => {selectAccIndexSection(0)}}>
              <Link to={`user-profile`}>Edit User Info</Link>
            </li>
            <li className="accountmanagement-index-item" onClick={() => {selectAccIndexSection(1)}}>
              <Link to={`subscription`}>Subscription and API Key</Link>
            </li>
            <li className="accountmanagement-index-item" style={{display:'none'}} onClick={() => {selectAccIndexSection(2)}}>
              <Link to={`change-password`}>Change Password</Link>
            </li>
            {/* <li className="accountmanagement-index-item" onClick={() => {selectAccIndexSection(3)}}>
              <Link to={`future-value-config`}>Future Value Config</Link>
            </li> */}
            {/* <li className="accountmanagement-index-item" onClick={() => {selectAccIndexSection(3)}}>
              <Link to={`payment-history`}>Payment History</Link>
            </li> */}
            <li className="accountmanagement-index-item" id="customize-widget-sidebar-option" onClick={() => {selectAccIndexSection(3)}}>
              <Link to={`customize-widget`}>Customize Widget</Link>
            </li>
          </ul>
        </nav>
        </div>
        <Outlet />
        {/* <Routes>
          <Route path={`/`} element={<UserProfile />} />
          <Route path={`/subscription`} element={<Subscription />} />
        </Routes> */}
      </div>
      {/* </Router> */}
        </div>
    )
}

export default AccountManagement;