import React, { useState, useEffect } from "react";
import '../styles/LeadGenIntro.css'
import axios from 'axios';
import Amplify, { Auth } from 'aws-amplify'
import config from '../configs/aws-exports'
Amplify.configure(config)

function LeadGenIntro(props) {  //vx : can presence or absence of props convey auth state??
    const [stripeUrl, setStripeUrl] = useState(null)
    // const [isLoggedIn, setIsLoggedIn] = useState(false)
    useEffect(() => {
        // Auth.currentAuthenticatedUser()
        // .then(() => {
        //     setIsLoggedIn(true)
        // })
        // .catch(() => {
        //     setIsLoggedIn(false)
        // })
        if (Object.keys(props).length !== 0) { //logged in
            if (typeof props !== 'undefined' && props!== null && typeof props.userProfile !== 'undefined' && props.userProfile !== null && ( props.userProfile.status === 'ACTIVE')) { // subscribed
                //go to accountmanagement/subscription
                window.location.href = '/account-management/subscription'
            } else {
                getStripeUrl()
            }
        }
        if (window.location.pathname !== '/' && window.location.pathname !== '/leadgen') {
            window.location.href = '/'
        }
    }, [])

    function getStripeUrl() {
        let config = {
            headers: {
              'Authorization': 'Bearer ' + props.jwt
            }
          }
          console.log('vx: config from hoenn region', config)
          axios.post( 
              'https://developers.honely.com/create-stripe-session', {},
              config
            )
            .then( ( response ) => {
              console.log( 'vx: stripe url from subscription', response.data.data.url )
              setStripeUrl(response.data.data.url)
              console.log('vx: url set to state', stripeUrl)
            } )
            .catch((error) => {
              if (error.message === 'Request failed with status code 401') {
                props.doSignOut()
              }
            })
    }

    function registerAction() {
        if (Object.keys(props).length !== 0) {      // logged in
            /*
            steps: add card details; generate api key

            if not given card details: take him to stripe page (how do i know that he hasnt submitted card details?? -> user status)

            if given card details but doesn't have api key, goto subscription page button

            -----

            getting stuff thru props vs getting stuff right here from server

            in old one Subscription route wasn't even available on logged out state; here it is...
            */

            if (typeof props !== 'undefined' && props!== null && typeof props.userProfile !== 'undefined' && props.userProfile !== null && props.userProfile.status === 'CONFIRMED') {  // logged in; hasn't given card details..
                window.location.href = stripeUrl
            } else {
                window.location.href = '/account-management/subscription'
            }
            // if (typeof props !== 'undefined' && props!== null && typeof props.userProfile !== 'undefined' && props.userProfile !== null && ( props.userProfile.status === 'INACTIVE' || props.userProfile.status === 'COMPLETED')) {    //needs to generate api key
            //     window.location.href = '/account-management/subscription'
            // }
        } else {
            window.location.href = '/signup'
        }
    }

    if(Object.keys(props).length === 0 || !(typeof props !== 'undefined' && props!== null && typeof props.userProfile !== 'undefined' && props.userProfile !== null && ( props.userProfile.status === 'ACTIVE'))) {
    return (
        <div className="leadgenintro-container">
            <div className="leadgenintro-upper">
                <div className="leadgenintro-header">
                    <h1>Increase Lead Capture with our Future Value Widget! </h1>
                    <div className="leadgenintro-subblock">
                <div className="leadgenintro-subblock-upper-left">
                    <p>Generate more leads and improve your site engagement by integrating Honely's predictive analytics onto your website!</p>
                </div>
                <div className="leadgenintro-subblock-upper-right">
                    <img src="homepage-top-right.png"></img>
                </div>
            </div>
                    {/* <div className="leadgenintro-header-interior">
                        <div>
                            <p>
                            Generate more leads and improve your site engagement by integrating Honely’s predictive analytics onto your website!
                            </p>
                        </div>
                        <div>
                            <img src="https://picsum.photos/100"></img>
                        </div>
                    </div> */}
                </div>
                {
                    (typeof props !== 'undefined' && props!== null && typeof props.userProfile !== 'undefined' && props.userProfile !== null && props.userProfile.status === 'CONFIRMED' || Object.keys(props).length === 0) &&
                    <div  className="leadgenintro-prompt">
                    <h1>$24.99 per month</h1>
                    <p>This affordable monthly rate equips your website with a premier lead capture tool and a competitive advantage. Each additional API call is $1.</p>
                    <button onClick={() => {
                        registerAction()
                    }}>Register</button>
                </div>
                }
                {
                   typeof props !== 'undefined' && props!== null && typeof props.userProfile !== 'undefined' && props.userProfile !== null && ( props.userProfile.status === 'INACTIVE' || props.userProfile.status === 'COMPLETED') && 
                   <div  className="leadgenintro-prompt">
                   <h1>$24.99 to start per month</h1>
                   <p>Your subscription package provides you all the tools you need to start using the Honely lead capture on your own website. Generate an API key on subscription page to get started</p>
                   <button onClick={() => {
                       registerAction()
                   }}>Go to subscription page</button>
                   </div>
                }
                {
                   typeof props !== 'undefined' && props!== null && typeof props.userProfile !== 'undefined' && props.userProfile !== null && ( props.userProfile.status === 'ACTIVE') && 
                   <div  className="leadgenintro-prompt">
                   {/* <h1>$24.99 to start per month</h1> */}
                   {/* <p>This subscription package provides you all the tools you need to start using the Honely lead capture on your own website. Get started with a monthly rate. Each additional API is $1. Generate an API key on subscription page to get started</p> */}
                   <button onClick={() => {
                       window.location.href = '/dashboard'
                   }}>Go to dashboard</button>
                   </div>
                }
                <br></br><br></br><br></br>
                <div  className="leadgenintro-steps">
                    <div>
                        <span style={{fontSize: '70px', color: 'black'}}className="mdi mdi-numeric-1-circle" />
                        <br></br><br></br>
                        <h1>Add Widget Code</h1>
                        <p>Easily add the widget code to your Wordpress or Wix website. If you used an agent website builder, simply send them the code and ask them to add it to the site’s code.</p>
                    </div>
                    <div>
                    <span style={{fontSize: '70px', color: 'black'}}className="mdi mdi-numeric-2-circle" />
                        <br></br><br></br>
                        <h1>Style Your Widget</h1>
                        <p>Customize your color scheme, font attributes, and choose the lead form questions that you wish to include.</p>
                    </div>
                    <div>
                    <span style={{fontSize: '70px', color: 'black'}}className="mdi mdi-numeric-3-circle" />
                        <br></br><br></br>
                        <h1>Generate Leads</h1>
                        <p>Begin receiving quality leads! Honely’s Lead Gen is proven to drive site traffic, bring in more leads, and serve as an effective marketing tool.</p>
                    </div>
                </div>
            </div>
            <div className="leadgenintro-lower">
                <div>
                    <div className="leadgenintro-lower-text">
                        <h1>Easily Implementable</h1>
                        <p>Enterprise platforms and realtors can connect directly to our API's using easy to use code.</p>
                    </div>
                    {/* <div>that icon</div> */}
                </div>
                <div className="leadgenintro-lower-code-snippet">{"<script>https://developers.honely.com/widget/load-script?api-key=XXX-XXX-XXXX</script>"}</div>
            </div>
        </div>
    )
            }
}
export default LeadGenIntro;