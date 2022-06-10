import React, { useState, useEffect } from "react";
import '../styles/Header.css'
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
  function Header(props) {
    var path = useLocation();
    function selectHeaderSection(index) {
        const x = document.getElementsByClassName('header-item')
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
        console.log('vx: current path from header', location);
        var headerItems = document.getElementsByClassName('header-item')
        if (location === '/' || location === '/dashboard') {
            headerItems[0].classList.add('active')
            headerItems[1].classList.remove('active')
        }
        if (location.startsWith('/account-management')) {
            headerItems[0].classList.remove('active')
            headerItems[1].classList.add('active')
        }
    }
    useEffect(() => {
        setActiveStyle()
      }, [path]);
      return(
          <div className="header-container">
              <div className="header-items-container">
              <nav>
          <ul className="header-items">
            <li className="header-item" onClick={() => {selectHeaderSection(0)}}>
              <Link to="/">Dashboard</Link>
            </li>
            <li className="header-item" onClick={() => {selectHeaderSection(1)}}>
              <Link to="/account-management">Account Management</Link>
            </li>
          </ul>
        </nav>
        </div>
        <div className="header-right-items">
        <div className="header-signout" onClick={() => {window.location.href = 'https://www.honely.com'}}><span className="mdi mdi-arrow-top-right" />Go to Honely.com</div>
        <div className="header-signout" onClick={() => {window.location.href = 'https://volkov-alex.github.io/honely-external-api-docs'}}><span className="mdi mdi-file-document" />API Documentation</div>
        <div className="header-signout" onClick={props.signOut}><span className="mdi mdi-power" />Sign out</div>
        </div>
          </div>
      )
  }

  export default Header;