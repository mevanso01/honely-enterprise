import React, { useState, useEffect } from "react";
import '../styles/HomePage.css'
import axios from "axios";
import PromoCodePrompt from "./PromoCodePrompt"

function HomePage(props) {
    const [stripeUrl, setStripeUrl] = useState(null)
    const [promoCodeFlag, setPromoCodeFlag] = useState(false)
    const [promoCodeErrMsg, setPromoCodeErrMsg] = useState('')
    function getStripeUrl() {
        let config = {
          headers: {
            Authorization: "Bearer " + props.jwt,
          },
        };
        axios
          .post(
            "https://developers.honely.com/create-stripe-session?source=SUBSCRIPTION",
            {},
            config
          )
          .then((response) => {
            setStripeUrl(response.data.data.url)
          })
          .catch((error) => {
            if (error.message === "Request failed with status code 401") {
              props.doSignOut();
            }
          });
      }
      function promoCodeContinueAction() {
        var promoCode = document.getElementById('promo-code').value
        if (promoCode !== null && promoCode !== '' && promoCode !== 'HONELY20') {
            setPromoCodeErrMsg('Invalid Promo Code')
        } else {
            setPromoCodeErrMsg('')
            if (props.userProfile.default_payment_method) {
                generateApiKey()
            } else {
                if (stripeUrl !== null) {
                    var pcObject = {
                        promoCode: promoCode
                    }
                    window.sessionStorage.setItem(
                        "PromoCode",
                        JSON.stringify(pcObject)
                      );
                    setTimeout(() => {
                        window.location.href = stripeUrl
                    }, 500)
                }
            }
        }
      }
      function generateApiKey() {
        if (props.userProfile.default_payment_type !== null) {
          var promoCode = JSON.parse(window.sessionStorage.getItem('PromoCode')).promoCode
          if (document.getElementById('promo-code') !== null) {
            promoCode = document.getElementById('promo-code').value
          }
          let config = {
            headers: {
              Authorization: "Bearer " + props.jwt,
            },
          };
          axios
            .post(
              "https://developers.honely.com/dashboard/api-key",
              {
                payment_type: "HONELY_API_BASIC_PLAN",
                promo_code: promoCode
              },
              config
            )
            .then((response) => {
              console.log("vx: generate api key wala response", response);
              window.sessionStorage.removeItem('PromoCode')
              setTimeout(() => {
                window.location.href = '/account-management/subscription'
              }, 500)
            })
            .catch((error) => {
              if (error.message === "Request failed with status code 401") {
                window.sessionStorage.removeItem('PromoCode')
                setTimeout(() => {
                    props.doSignOut();
                }, 500)
              }
            });
        } else {
          window.location.href = stripeUrl;
        }
      }
    useEffect(() => {
        // if (window.location.pathname !== '/') {
        //     window.location.href = '/'
        // }
        if (props.authFlag) {
            getStripeUrl();
        }
    }, [])
    return (
        <div className="homepage-container">
            <div className="homepage-subblock">
                <div className="homepage-subblock-upper-left">
                    <div>
                        <h1>Lead Capture</h1>
                        <p>Generate more leads and improve your site engagement by integrating Honely's predictive analytics onto your website!</p>
                        <button onClick={() => {
                            window.location.href = '/leadgen'
                        }}>Get Started</button>
                    </div>
                </div>
                <div className="homepage-subblock-upper-right">
                    <img src="homepage-top-right.png"></img>
                </div>
            </div>
            <div className="homepage-widget-steps-parent">
                <h1>Easily add to it to your website and start receiving leads.</h1>
            <div  className="homepage-widget-steps">
                <div>
                    <div className="homepage-numeric">1</div>
                    <br></br><br></br>
                    <h2>Add Widget Code</h2>
                    <p>Enter the widget code to your Wordpress or Wix website. If you used an agent website builder, simply send them the code and ask them to add it to the site’s code.</p>
                </div>
                <div>
                <div className="homepage-numeric">2</div>
                    <br></br><br></br>
                    <h2>Style Your Widget</h2>
                    <p>Customize your color scheme, font attributes, and choose the lead form questions that you wish to include.</p>
                </div>
                <div>
                <div className="homepage-numeric">3</div>
                    <br></br><br></br>
                    <h2>Receive Leads</h2>
                    <p>Begin receiving quality leads! Honely’s Lead Gen is proven to drive site traffic, bring in more leads, and serve as an effective marketing tool.</p>
                </div>
            </div>
            </div>
            {/* vx: if not logged in or status !== active */}
            {
                (props.authFlag === false || (!(props.userProfile.status === 'ACTIVE' || props.userProfile.status === 'INACTIVE'))) && 
                <div className="homepage-widgetpricing">
                <h1>Widget Pricing</h1>
                <p>This montly rate equips your website with a premier lead capture tool and a competitive advantage. </p>
                <p><span style={{fontWeight: '600'}}>$19.99/mo*</span>  <span style={{textDecoration: 'line-through'}}>$24.99/mo</span></p>
                <p>Save 30% by taking advantage of this special offer.</p>
                {
                    promoCodeFlag && 
                    <PromoCodePrompt promoCodeContinueAction={promoCodeContinueAction}/>
                }
                {
                    promoCodeFlag && 
                    <p style={{color: 'red', fontWeight: '600'}}>{promoCodeErrMsg}</p>
                }
                {
                    !promoCodeFlag && 
                    <button onClick={() => { 
                        if (props.authFlag === false) {
                            window.location.href = '/signin'
                        } else {
                            setPromoCodeFlag(true)
                            // if (props.userProfile.default_payment_method) {
                            //     generateApiKey()
                            // } else {
                            //     if (stripeUrl !== null) {
                            //         window.location.href = stripeUrl
                            //     }
                            // }
                        }
                        }}>Buy now</button>
                }
                </div>
            }
            <div className="homepage-cma-reports">
                <div className="homepage-cma-reports-left">
                    <img src="reports.png"></img>
                </div>
                <div className="homepage-cma-reports-right">
                    <h1>CMA's and Property Reports</h1>
                    <p>Differentiate yourself through data. Quickly generate branded property or CMA reports powered by data that you won't find anywhere else.</p>
                    <button onClick={() => {window.location.href = '/reports'}}>Get Started</button>
                </div>
            </div>
            <div className="homepage-report-features">
                <h1>What Do You Get with Honely’s Reporting Software?</h1>
                <br></br>
                <ul>
                    <li>
                        <div>
                            <i className="mdi mdi-checkbox-marked-circle" />
                        </div>
                        <div>
                            <p>Standard MLS data</p><p>(Beds, baths, sqft, etc.)</p>
                        </div>
                    </li>
                    <li>
                        <div>
                        <i className="mdi mdi-checkbox-marked-circle" />
                        </div>
                        <div>
                            <p>Property Value Estimates and Forecasts</p><p>(Current, 3 month, 1, 2, 3 years)</p>
                        </div>
                    </li>
                    <li>
                        <div>
                        <i className="mdi mdi-checkbox-marked-circle" />
                        </div>
                        <div>
                        <p>Predictive Neighborhood Analysis</p><p>(Price appreciation, migration trends, rankings, etc.)</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="homepage-reportspricing">
                <h1>Reports Pricing</h1>
                <p>Save 50% when you pay with report credits.</p>
                <br></br>
                <div className="homepage-reportspricing-inner">
                    <div style={{paddingBottom: '50px'}}>
                        <h2>Pay per use</h2>
                        <br></br><br></br>
                        <div style={{display: 'flex'}}>
                        <img style={{width: '20px', height: '20px', marginRight: '5px'}} src="single-report.png"></img>
                        <p>$ 0.50 for each single report.</p>
                        </div>
                        <div style={{display: 'flex'}}>
                        <img style={{width: '20px', height: '20px', marginRight: '5px'}} src="sma-report.png"></img>
                        <p>$ 1.00 for each CMA report.</p>
                        </div>
                        <div className="homepage-reportspricing-spacer">
                        <br></br><br></br><br></br><br></br>
                        </div>
                        <br></br>
                        <button onClick={() => {
                            if (props.authFlag === false) {
                                window.location.href = '/signin'
                            } else {
                                window.location.href = '/reports'
                            }
                        }}>Buy Report</button>
                    </div>
                    <div style={{paddingBottom: '50px'}}>
                        <h2>Purchase Credits</h2>
                        <br></br><br></br>
                        <p>20 Credits for $9.99</p>
                        <p>50 Credits for $22.49 (save 10%)</p>
                        <p>100 Credits for $39.99 (save 20%)</p>
                        <p>200 Credits for $74.99 (save 25%)</p>
                        <br></br>
                        <button onClick={() => {
                            if (props.authFlag === false) {
                                window.location.href = '/signin'
                            } else {
                                window.location.href = '/paymentcheckout?mode=bulk-credit-purchase'
                            }
                        }}>Buy Credits</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default HomePage;