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
  import { useWindowSize } from '../hooks/useWindowSize'

  function Header(props) {
    var path = useLocation();
    const { width } = useWindowSize();

    useEffect(() => {
      if (typeof props !== 'undefined' && props!== null && typeof props.userProfile !== 'undefined' && props.userProfile !== null && props.userProfile.status !== 'ACTIVE') {
        var pika = document.getElementById('customize-widget-header-option')
        console.log('vx: pika from viridian', pika)
        pika.style = "display: none"
      }
    }, [path]);

    const SideBar = (props) => {
      const { width } = useWindowSize()
      const [isMenuOpen, setIsMenuOpen] = useState(false)
      const actionSidebar = (value) => {
        setIsMenuOpen(value)
        document.getElementById('sidebar_menu').style.width = value
          ? width > 489 ? '340px' : '100vw'
          : '0'
      }
      useEffect(() => {
        if (isMenuOpen) {
          if (width <= 489) {
            document.getElementById('sidebar_menu').style.width = '100vh'
          } else {
            document.getElementById('sidebar_menu').style.width = '340px'
          }
        }
      }, [width])

      return (
        <div>
          <button
            className="header-menu-btn"
            onClick={() => actionSidebar(true)}
          >
            <span className="mdi mdi-menu" />
          </button>
          <div id='sidebar_menu'>
            <button
              className="header-menu-btn close"
              onClick={() => actionSidebar(false)}
            >
              <span className="mdi mdi-close" />
            </button>
            <MainNenu {...props} />
          </div>
        </div>
      )
    }

    const MainNenu = (props) => {
      return (
        <div className="header-items-container">
          <nav>
            <ul className="header-items" >
              {/* <li> */}
            {/* <img onClick={() => {window.location.href = '/'}} src="logo_honely.png" style={{width:"100px", marginRight: "20px", display:"inline", cursor: "pointer"}}></img> */}

            {/* </li> */}
              {
                (props.authFlag || window.location.pathname === '/leadgen' || window.location.pathname === '/reports' ) && 
                <li className={`header-item ${(path.pathname === '/' || path.pathname === '/leadgen') ? 'active' : ''}`} >
                  <Link to="/leadgen">Lead Generation</Link>
                </li>
              }
              {
                (props.authFlag || window.location.pathname === '/leadgen' || window.location.pathname === '/reports' ) && 
                <li className={`header-item ${path.pathname === '/reports' ? 'active' : ''}`}>
                  <Link to="/reports">Reports</Link>
                </li>
              }
              {
                props.authFlag && 
                <li className={`header-item ${path.pathname === '/dashboard' ? 'active' : ''}`} style={{display: 'none'}}>
                <Link to="/dashboard">Dashboard</Link>
                </li>
              }
              {
                props.authFlag && 
                <li className={`header-item ${path.pathname === '/account-management' ? 'active' : ''}`} style={{display: 'none'}}>
                  <Link to="/account-management">Account Management</Link>
                </li>
              }
              {
                props.authFlag && 
                <li className={`header-item ${path.pathname === '/customize-widget' ? 'active' : ''}`} style={{display: 'none'}} id="customize-widget-header-option">
                <Link to="/customize-widget">Customize Widget</Link>
                </li>
              }
            </ul>
          </nav>
        </div>
      )
    }
  
    return(
      <div className="header-container" style={{width: "100%"}}>
        <div className="logo-wrapper">
          {width <= 992 && (
            <SideBar {...props} />
          )}
          <svg onClick={() => {window.location.href = '/'}} style={{display:"inline", cursor: "pointer", minWidth: "180px"}} width="150" viewBox="0 0 418 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M113.512 54.856C113.512 59.5493 112.485 63.7147 110.432 67.352C108.379 70.9307 105.592 73.7467 102.072 75.8C98.552 77.8533 94.592 78.88 90.192 78.88C85.792 78.88 81.832 77.8533 78.312 75.8C74.792 73.7467 71.976 70.9307 69.864 67.352C67.8107 63.7147 66.784 59.5493 66.784 54.856C66.784 50.104 67.8107 45.9387 69.864 42.36C71.976 38.7227 74.792 35.8773 78.312 33.824C81.832 31.712 85.792 30.656 90.192 30.656C94.592 30.656 98.552 31.712 102.072 33.824C105.592 35.8773 108.379 38.7227 110.432 42.36C112.485 45.9387 113.512 50.104 113.512 54.856ZM104.712 54.856C104.712 51.6293 104.067 48.8427 102.776 46.496C101.485 44.0907 99.7253 42.2133 97.496 40.864C95.3253 39.456 92.8907 38.752 90.192 38.752C87.4933 38.752 85.0293 39.456 82.8 40.864C80.5707 42.2133 78.8107 44.0907 77.52 46.496C76.2293 48.8427 75.584 51.6293 75.584 54.856C75.584 57.9653 76.2293 60.7227 77.52 63.128C78.8107 65.5333 80.5707 67.4107 82.8 68.76C85.0293 70.1093 87.4933 70.784 90.192 70.784C92.8907 70.784 95.3253 70.1093 97.496 68.76C99.7253 67.4107 101.485 65.5333 102.776 63.128C104.067 60.7227 104.712 57.9653 104.712 54.856ZM142.041 30.656C146.206 30.656 149.433 31.536 151.721 33.296C154.009 34.9973 155.593 37.3147 156.473 40.248C157.411 43.1227 157.881 46.3493 157.881 49.928V73.512C157.881 74.8027 157.441 75.888 156.561 76.768C155.739 77.5893 154.713 78 153.481 78C152.19 78 151.134 77.5893 150.313 76.768C149.491 75.888 149.081 74.8027 149.081 73.512V50.016C149.081 47.904 148.787 46.0267 148.201 44.384C147.614 42.6827 146.587 41.3333 145.121 40.336C143.713 39.28 141.718 38.752 139.137 38.752C136.731 38.752 134.619 39.28 132.801 40.336C130.982 41.3333 129.545 42.6827 128.489 44.384C127.491 46.0267 126.993 47.904 126.993 50.016V73.512C126.993 74.8027 126.553 75.888 125.673 76.768C124.851 77.5893 123.825 78 122.593 78C121.302 78 120.246 77.5893 119.425 76.768C118.603 75.888 118.193 74.8027 118.193 73.512V36.2C118.193 34.9093 118.603 33.8533 119.425 33.032C120.246 32.152 121.302 31.712 122.593 31.712C123.825 31.712 124.851 32.152 125.673 33.032C126.553 33.8533 126.993 34.9093 126.993 36.2V41.128L125.409 42.008C125.819 40.7173 126.523 39.4267 127.521 38.136C128.577 36.7867 129.838 35.5547 131.305 34.44C132.771 33.2667 134.414 32.3573 136.233 31.712C138.051 31.008 139.987 30.656 142.041 30.656ZM186.379 78.88C181.509 78.88 177.285 77.8827 173.707 75.888C170.128 73.8347 167.341 71.048 165.347 67.528C163.411 63.9493 162.443 59.872 162.443 55.296C162.443 50.1333 163.469 45.7333 165.523 42.096C167.635 38.4 170.363 35.584 173.707 33.648C177.051 31.6533 180.6 30.656 184.355 30.656C187.229 30.656 189.957 31.2427 192.539 32.416C195.12 33.5307 197.408 35.1147 199.403 37.168C201.456 39.1627 203.069 41.5387 204.243 44.296C205.416 46.9947 206.032 49.9573 206.091 53.184C206.032 54.3573 205.563 55.3253 204.683 56.088C203.803 56.8507 202.776 57.232 201.603 57.232H167.371L165.259 49.752H198.347L196.675 51.336V49.136C196.557 47.0827 195.883 45.2933 194.651 43.768C193.419 42.184 191.893 40.9813 190.075 40.16C188.256 39.28 186.349 38.84 184.355 38.84C182.595 38.84 180.893 39.1333 179.251 39.72C177.667 40.248 176.229 41.128 174.939 42.36C173.707 43.592 172.709 45.2347 171.947 47.288C171.243 49.2827 170.891 51.776 170.891 54.768C170.891 57.9947 171.565 60.8107 172.915 63.216C174.264 65.6213 176.083 67.4987 178.371 68.848C180.659 70.1387 183.181 70.784 185.939 70.784C188.109 70.784 189.899 70.5787 191.307 70.168C192.715 69.6987 193.888 69.1413 194.827 68.496C195.765 67.8507 196.587 67.2347 197.291 66.648C198.171 66.12 199.051 65.856 199.931 65.856C200.987 65.856 201.867 66.2373 202.571 67C203.275 67.704 203.627 68.5547 203.627 69.552C203.627 70.8427 202.981 72.016 201.691 73.072C200.107 74.5973 197.907 75.9467 195.091 77.12C192.333 78.2933 189.429 78.88 186.379 78.88ZM220.262 73.512C220.262 74.8027 219.822 75.888 218.942 76.768C218.12 77.5893 217.094 78 215.862 78C214.63 78 213.574 77.5893 212.694 76.768C211.872 75.888 211.462 74.8027 211.462 73.512V17.368C211.462 16.0773 211.902 15.0213 212.782 14.2C213.662 13.32 214.718 12.88 215.95 12.88C217.24 12.88 218.267 13.32 219.03 14.2C219.851 15.0213 220.262 16.0773 220.262 17.368V73.512ZM261.198 31.36C262.489 31.36 263.545 31.8 264.366 32.68C265.187 33.5013 265.598 34.5573 265.598 35.848V73.688C265.598 78.8507 264.601 83.0453 262.606 86.272C260.67 89.4987 258.03 91.8453 254.686 93.312C251.401 94.8373 247.675 95.6 243.51 95.6C241.398 95.6 239.286 95.3947 237.174 94.984C235.062 94.632 233.331 94.104 231.982 93.4C230.574 92.7547 229.577 91.9627 228.99 91.024C228.403 90.0853 228.315 89.0587 228.726 87.944C229.137 86.536 229.841 85.568 230.838 85.04C231.835 84.5707 232.862 84.5413 233.918 84.952C234.915 85.3627 236.235 85.8907 237.878 86.536C239.521 87.1813 241.398 87.504 243.51 87.504C246.385 87.504 248.819 87.0347 250.814 86.096C252.809 85.1573 254.305 83.6907 255.302 81.696C256.358 79.7013 256.886 77.12 256.886 73.952V67.88L258.294 69.992C257.355 71.928 256.123 73.5413 254.598 74.832C253.073 76.1227 251.254 77.12 249.142 77.824C247.089 78.528 244.801 78.88 242.278 78.88C239.051 78.88 236.265 78.176 233.918 76.768C231.63 75.3013 229.87 73.3067 228.638 70.784C227.406 68.2027 226.79 65.2693 226.79 61.984V35.848C226.79 34.5573 227.201 33.5013 228.022 32.68C228.843 31.8 229.899 31.36 231.19 31.36C232.422 31.36 233.449 31.8 234.27 32.68C235.15 33.5013 235.59 34.5573 235.59 35.848V59.608C235.59 63.48 236.441 66.3253 238.142 68.144C239.843 69.904 242.366 70.784 245.71 70.784C247.939 70.784 249.875 70.3147 251.518 69.376C253.161 68.4373 254.451 67.1467 255.39 65.504C256.329 63.8027 256.798 61.8373 256.798 59.608V35.848C256.798 34.5573 257.209 33.5013 258.03 32.68C258.91 31.8 259.966 31.36 261.198 31.36Z" fill="#E4A14E"/>
          <path d="M17.845 1.479C21.6476 2.07881 25.5369 5.08388 26 9.71561C20.3242 4.33547 15.1579 10.8881 10.5181 10.9959C5.13795 11.121 0.752149 8.37756 0 0C3.11741 3.79125 6.0777 4.90879 10.5174 2.68548C12.7793 1.55277 14.4962 0.950779 17.845 1.479Z" fill="#E4A14E"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M26 15.5C28.4853 15.5 30.5 17.5147 30.5 20V76C30.5 78.4853 28.4853 80.5 26 80.5C23.5147 80.5 21.5 78.4853 21.5 76V20C21.5 17.5147 23.5147 15.5 26 15.5ZM56.4646 37.385C58.9499 37.385 60.9646 39.3997 60.9646 41.885V76C60.9646 78.4853 58.9499 80.5 56.4646 80.5C53.9793 80.5 51.9646 78.4853 51.9646 76V41.885C51.9646 39.3997 53.9793 37.385 56.4646 37.385Z" fill="#E4A14E"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M19.1719 45.7726L17.0007 41.831C14.8296 37.8894 14.83 37.8891 14.83 37.8891L15.0793 37.7523C15.2401 37.6641 15.4753 37.5354 15.775 37.3719C16.3744 37.045 17.2325 36.5789 18.2712 36.0199C20.3467 34.9028 23.152 33.41 26.0584 31.9143C28.954 30.4241 31.9974 28.9065 34.5347 27.7524C35.7973 27.1781 36.9972 26.6651 38.0223 26.2867C38.5332 26.0982 39.0588 25.9213 39.5626 25.7863C39.9924 25.6711 40.711 25.5 41.5007 25.5C42.316 25.5 43.0401 25.681 43.4841 25.809C43.9909 25.9551 44.5035 26.1444 44.9867 26.3414C45.9548 26.7362 47.0557 27.2653 48.1865 27.8469C50.4606 29.0165 53.1431 30.5479 55.6694 32.0426C58.2082 33.5446 60.6449 35.0427 62.4432 36.1627C63.3435 36.7235 64.0864 37.1911 64.6053 37.5193C64.8649 37.6834 65.0685 37.8127 65.208 37.9015L65.4243 38.0394L65.4252 38.04C65.4252 38.04 65.4257 38.0403 63.0007 41.831L65.4252 38.04C67.5188 39.3793 68.1307 42.1624 66.7914 44.256C65.4521 46.3495 62.6693 46.961 60.5757 45.6217L60.3766 45.4947C60.2437 45.4102 60.0471 45.2853 59.795 45.1259C59.2909 44.8071 58.5655 44.3505 57.685 43.8021C55.9217 42.7038 53.5471 41.2441 51.0866 39.7884C48.6137 38.3253 46.1091 36.899 44.0701 35.8503C43.0443 35.3227 42.2072 34.9275 41.5886 34.6753C41.5389 34.655 41.4922 34.6364 41.4485 34.6192C41.3567 34.6508 41.2536 34.6875 41.1386 34.73C40.4107 34.9986 39.4369 35.4099 38.261 35.9448C35.9212 37.009 33.0284 38.4492 30.1768 39.9167C27.3359 41.3787 24.5828 42.8436 22.5366 43.9449C21.5145 44.495 20.6711 44.9532 20.084 45.2733C19.7906 45.4334 19.5613 45.5588 19.406 45.644L19.1719 45.7726ZM41.9818 34.4581C41.9818 34.4581 41.9702 34.4612 41.9491 34.465C41.9716 34.4596 41.9818 34.4581 41.9818 34.4581ZM40.9745 34.4521C40.953 34.4475 40.9413 34.4439 40.9413 34.4439C40.9413 34.4439 40.9517 34.4458 40.9745 34.4521ZM13.0591 44.0021C11.86 41.8253 12.6532 39.0882 14.83 37.8891L17.0007 41.831L19.1719 45.7726C16.995 46.9717 14.2582 46.179 13.0591 44.0021Z" fill="#E4A14E"/>
          </svg>
        </div>
        {width > 992 && (
          <MainNenu {...props} />
        )}
      <div className="header-right-items" style={{minWidth: '110px', marginRight: '20px'}}>
        {/* <div className="header-signout" onClick={() => {window.location.href = 'https://www.honely.com'}}><span className="mdi mdi-arrow-top-right" />Honely.com</div>
        <div className="header-signout" onClick={() => {window.location.href = 'https://volkov-alex.github.io/honely-external-api-docs'}}><span className="mdi mdi-file-document" />API</div> */}
        {
          props.authFlag && 
          <div className="header-signout" onClick={props.signOut}><span className="mdi mdi-power" />Sign out</div>
        }
        {
          !props.authFlag && 
          <div className="header-signout" onClick={() => {window.location.href = '/signin'}}><span className="mdi mdi-power" />Sign in</div>
        }
      </div>
      {/* {
        props.authFlag && 
        <div className="header-right-items">
        <div className="header-signout" onClick={() => {window.location.href = 'https://www.honely.com'}}><span className="mdi mdi-arrow-top-right" />Go to Honely.com</div>
        <div className="header-signout" onClick={() => {window.location.href = 'https://volkov-alex.github.io/honely-external-api-docs'}}><span className="mdi mdi-file-document" />API Documentation</div>
        <div className="header-signout" onClick={props.signOut}><span className="mdi mdi-power" />Sign out</div>
        </div>
      }
      {
        !props.authFlag && 
        <div className="header-right-items">
        <div className="header-signout" onClick={() => {window.location.href = '/signin'}}><span className="mdi mdi-power" />Sign in</div>
        </div>
      } */}
        </div>
    )
  }

  export default Header;