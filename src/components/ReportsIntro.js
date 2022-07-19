import React, { useState, useEffect } from "react";
import '../styles/ReportsIntro.css'
import HonelySearchSimple from "./HonelySearchSimple";
import ReportForm from './ReportForm'
import axios from 'axios';
import PaymentConfirmationPopup from './PaymentConfirmationPopup'

function ReportsIntro(props) {
    const [subjectProperty, setSubjectProperty] = useState('')
    const [forecast, setForecast] = useState(null)
    const [property, setProperty] = useState(null)
    const [errMsg, setErrMsg] = useState('')
    const [optionLists, setOptionLists] = useState({})
    const [showPaymentPopup, setShowPaymentPopup] = useState(false)
    const [stripeUrl, setStripeUrl] = useState(null)
    // const [forCMA, setForCMA] = useState(null)
    // var forCMA = null
    // const [walkScore, setWalkScore] = useState(null)
    const [creditsFlag, setCreditsFlag] = useState(false)
    function handleCreditsFlag () {
        setCreditsFlag(document.getElementById('creditsFlag').checked)
    }
    // function handleInputChange(e) {
    //     setCollectionInfo({
    //         ...collectionInfo,
    //         [e.target.name]: e.target.value,
    //       });
    //       console.log('vx:', collectionInfo)
    // }
    useEffect(() => {
        if (Object.keys(props).length !== 0) { //logged in
            getStripeUrl()
        }
        window.sessionStorage.removeItem('CMA')
        window.sessionStorage.removeItem('CMASubjectPropertyId')
        window.sessionStorage.removeItem('CMAComparableHomes')
        axios.get('https://api.honely.com/lookup/drop_down')
        .then((response) => {
            if (response.data) {
                setOptionLists(response.data)
            }
        })
    }, [])
    function ReportFormContainer() {
        if (forecast !== null && property !== null) {
            return (
                <ReportForm user={user} optionLists={optionLists} forecast={forecast} property={property} inCMA={false} creditsFlag={creditsFlag} jwt={props.jwt} updateAuthState={props.updateAuthState}/>
            )
        }
    }
    function setPopupDisplay(value) {
        if (value === true) {
            document.getElementById('reportsintro-overlay').classList.add('active')
            window.dispatchEvent(new Event('resize'))
        }
        if (value === false) {
            document.getElementById('reportsintro-overlay').classList.remove('active')
        }
        return
    }
    function showReportForm(cmaflag) {
        /*
        user
        optionLists
        forecast
        property
        inCMA
        creditsFlag
        jwt
        updateAuthState
        */
        console.log('vx: user', user)
        console.log('vx: optionLists', optionLists)
        console.log('vx: forecast', forecast)
        console.log('vx: property', property)
        // setForCMA(cmaflag)
        // forCMA = cmaflag
        setPopupDisplay(false)
        document.getElementById('report-form-overlay').classList.add('active')
        if (!cmaflag) {
            document.getElementById('btn_doDownloadReport').style = "display : inline-block"
            document.getElementById('btn_doDownloadReport_mobile').style = "display : inline-block"
            document.getElementById('btn_doDownloadReportCMA').style = "display : none"
            document.getElementById('btn_doDownloadReport_mobileCMA').style = "display : none"
        } else {
            document.getElementById('btn_doDownloadReport').style = "display : none"
            document.getElementById('btn_doDownloadReport_mobile').style = "display : none"
            document.getElementById('btn_doDownloadReportCMA').style = "display : inline-block"
            document.getElementById('btn_doDownloadReport_mobileCMA').style = "display : inline-block"
        }
        document.getElementById('report-form-overlay').classList.add('active')
        window.dispatchEvent(new Event('resize'))
    }
    function askPaymentConfirmation () {
        var radioElements =  document.getElementsByName('noOfCreditsToBuy')
        var ans = null
        for (let x=0; x< radioElements.length; x++) {
          if(radioElements[x].checked === true) {
            ans = radioElements[x].value
            console.log(ans);
            break
          }
        }
        if (ans !== null) {
            setShowPaymentPopup(true)
        }
    }
    function getStripeUrl() {
        let config = {
            headers: {
              'Authorization': 'Bearer ' + props.jwt
            }
          }
          console.log('vx: config from hoenn region', config)
          axios.post( 
              'https://developers.honely.com/create-stripe-session?source=REPORT', {},
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
    function CreditsSection () {
        return (
          <div>
            {
              showPaymentPopup && 
              <PaymentConfirmationPopup setShowPaymentPopup ={setShowPaymentPopup} confirmAction={buyCredits} creditsFlag={null} purchaseCreditsMode={true} />
            }
            <br></br>
            <h3>Report Credits</h3>
            <br></br><br></br><br></br>
            <div className="reportsintro-credits-subsection">
            {/* <p>Available credits: {props.userProfile.credits}</p> */}
            <h2>How many credits would you like to purchase?</h2>
            <br></br>
            <h4>(Available credits: {props.userProfile.credits})</h4>
            <br></br><br></br>
            <div>
            <input type="radio" id={10} value={10} onChange={() => {
              // setCreditAmount(10);
              var pika = {
                creditAmount: 10,
                dollarAmount: 9.99
              }
              window.sessionStorage.removeItem('PaymentPopup')
              window.sessionStorage.setItem('PaymentPopup', JSON.stringify(pika))
              }} name="noOfCreditsToBuy"></input><label>10 credits for $9.99</label>
            <br></br><br></br>
            <input type="radio" id={25} value={25} onChange={() => {
              var pika = {
                creditAmount: 25,
                dollarAmount: 19.99
              }
              window.sessionStorage.removeItem('PaymentPopup')
              window.sessionStorage.setItem('PaymentPopup', JSON.stringify(pika))
            }} name="noOfCreditsToBuy"></input><label>25 credits for $19.99</label>
            <br></br><br></br>
            <input type="radio" id={50} value={50} onChange={() => {
              var pika = {
                creditAmount: 50,
                dollarAmount: 39.99
              }
              window.sessionStorage.removeItem('PaymentPopup')
              window.sessionStorage.setItem('PaymentPopup', JSON.stringify(pika))
            }} name="noOfCreditsToBuy"></input><label>50 credits for $39.99</label>
            <br></br><br></br>
            <input type="radio" id={100} value={100} onChange={() => {
              var pika = {
                creditAmount: 100,
                dollarAmount: 74.99
              }
              window.sessionStorage.removeItem('PaymentPopup')
              window.sessionStorage.setItem('PaymentPopup', JSON.stringify(pika))
            }} name="noOfCreditsToBuy"></input><label>100 credits for $74.99</label>
            </div>
            <br></br><br></br><br></br>
            {
              (typeof props !== 'undefined' && props!== null && typeof props.userProfile !== 'undefined' && props.userProfile !== null && props.userProfile.status === 'CONFIRMED') &&
              <button onClick={() => {
                var radioElements =  document.getElementsByName('noOfCreditsToBuy')
                var ans = null
                for (let x=0; x< radioElements.length; x++) {
                  if(radioElements[x].checked === true) {
                    ans = radioElements[x].value
                    console.log(ans);
                    break
                  }
                }
                if (ans !== null) {
                    window.location.href=stripeUrl
                }
                }}>Buy</button>
            }
            {
              !(typeof props !== 'undefined' && props!== null && typeof props.userProfile !== 'undefined' && props.userProfile !== null && props.userProfile.status === 'CONFIRMED') &&
              <button onClick={() => {askPaymentConfirmation()}}>Buy</button>
            }
            </div>
            <br></br><br></br><br></br><br></br>
          </div>
        )
      }
      function buyCredits() {
        let config = {
          headers: {
            'Authorization': 'Bearer ' + props.jwt
          }
        }
        var body = {
          "credit-amount": JSON.parse(window.sessionStorage.getItem('PaymentPopup')).creditAmount,
          "dollar-amount": JSON.parse(window.sessionStorage.getItem('PaymentPopup')).dollarAmount,
        }
        axios.post('https://developers.honely.com/user/dollar-exchange', body, config)
        .then((response) => {
          window.sessionStorage.removeItem('PaymentPopup')
          window.location.reload()
        })
        .catch((error) => {
          if (error.message === 'Request failed with status code 401') {
            props.doSignOut()
          } else {
            console.log('vx: error purchasing credits', error.message)
          }
        })
      }
    var user = {
        name : '',
        email: '',
        phone: '',
        user_id: '512',
    }
    if (Object.keys(props).length !== 0) {
        user = {
            name : props.userProfile.full_name,
            email: props.userProfile.email,
            phone: props.userProfile.phone_number,
            user_id: '512',
        }
    }
    return (
        <div className="reportsintro-container">
            <div className="reportsintro-popup" id="reportsintro-overlay">
                <div className="reportsintro-popup-container">
                    <div className="reportsintro-popup-header">
                        <h1>Make a selection</h1>
                        <div onClick={() => {setPopupDisplay(false)}}>
                            <i className="fa fa-times"/>
                        </div>
                    </div>
                    <div className="reportsintro-popup-options">
                        {
                            Object.keys(props).length !== 0 &&
                            <div className="reportsintro-popup-options">
                                <p style={{color: 'red', fontWeight: '600'}}>{errMsg}</p>
                                <div className="popup-option-header">
                                    <input type='checkbox' id="creditsFlag" onChange={() => handleCreditsFlag()}></input>
                                    <label>Use credits for report generation- Available: {props.userProfile.credits}</label>
                                </div>
                            </div>
                        }

                        <div className="reportsintro-popup-option">
                            
                            <div className="reportsintro-popup-option-left">
                                <div>
                                    <i className="mdi mdi-checkbox-marked-circle" />
                                </div>
                                <div>
                                    {/* <p>CMA Report - $1</p> */}
                                    <p>CMA Report - {
                                        creditsFlag &&
                                        <span>2 credits</span>
                                    }
                                    {
                                         !creditsFlag &&
                                         <span>$1</span>
                                    }
                                    </p>
                                    <p>Instantly generate the most thorough and analytical CMA on the market</p>
                                </div>
                            </div>
                            <div>
                                <button onClick={() => {
                                    if (Object.keys(props).length === 0) {
                                        window.location.href='/signup?mode=reports'
                                    } else {
                                        var pika = props.userProfile.credits - 2
                                        // if chose credits and they insuffient
                                        if (creditsFlag && (pika < 0)) {
                                            setErrMsg('Insufficient credits. Please purchase credits!')
                                        } else if (!creditsFlag && props.userProfile !== null && props.userProfile.default_payment_method === null) {
                                            window.location.href=stripeUrl
                                        } else {
                                            showReportForm(true)
                                        }
                                    }
                                    }}>Continue</button>
                            </div>
                        </div>
                        <div className="reportsintro-popup-option">
                            <div className="reportsintro-popup-option-left">
                                <div>
                                    <i className="mdi mdi-checkbox-marked-circle" />
                                </div>
                                <div>
                                    {/* <p>Single Property - $0.50</p> */}
                                    <p>Single Property - {
                                        creditsFlag &&
                                        <span>1 credit</span>
                                    }
                                    {
                                         !creditsFlag &&
                                         <span>$0.50</span>
                                    }
                                    </p>
                                    <p>Data on any property that your client won't find anywhere else</p>
                                </div>
                            </div>
                            <div>
                                <button onClick={() => {
                                    // user not logged in
                                    if (Object.keys(props).length === 0) {
                                        window.location.href='/signup?mode=reports'
                                    } else {
                                        var pika = props.userProfile.credits - 2
                                        // if chose credits and they insuffient
                                        if (creditsFlag && (pika < 0)) {
                                            setErrMsg('Insufficient credits. Please purchase credits!')
                                        } else if (!creditsFlag && props.userProfile !== null && props.userProfile.default_payment_method === null) {
                                            window.location.href=stripeUrl
                                        } else {
                                            showReportForm(false)
                                        }
                                    }
                                }}>Continue</button>
                            </div>
                        </div>
                        {/* <div className="reportsintro-popup-option">
                            <div className="reportsintro-popup-option-left">
                                <div>
                                    <i className="mdi mdi-checkbox-marked-circle" />
                                </div>
                                <div>
                                    <p>Purchase Credits</p>
                                    <p>Save money by buying credits and getting reports in bulk</p>
                                </div>
                            </div>
                            <div>
                                <button onClick={() => {
                                   if(Object.keys(props).length === 0) {
                                       window.location.href='/signup?mode=reports'
                                   } else {
                                    window.location.href='/account-management/subscription'
                                   }
                                }}>Continue</button>
                            </div>
                        </div> */}
                        {/* {
                            Object.keys(props).length !== 0 &&
                            <div>
                            <p style={{color: 'red', fontWeight: '600'}}>{errMsg}</p>
                            <input type='checkbox' id="creditsFlag" onChange={() => handleCreditsFlag()}></input><label>Use credits for report generation- Available: {props.userProfile.credits}</label>
                            </div>
                        } */}
                    </div>
                </div>
            </div>
            <ReportFormContainer />
            {
                props.userProfile && 
                <div>
                    <div className="reportsintro-upper">
                        <div className="reportsintro-searchbar">
                        {/* <Spearow />
                        <Spearow />
                        <Spearow /> */}
                        {/* <input
                        name="charmander"
                        onChange={(e) => handleInputChange(e)}
                        value={collectionInfo.charmander}
                        placeholder="Charmander"
                        ></input> */}
                        <p>Generate a Property Report</p>
                        <br></br><br></br>
                        <HonelySearchSimple inCma={false} setPopupDisplay={setPopupDisplay} setForecast={setForecast} setProperty={setProperty}/>
                        <br></br><br></br>
                        <div>
                        </div>
                        </div>
                        <div className="reportsintro-features">
                        <h1>What Do You Get with Honely's Reporting Software?</h1>
                        <br></br><br></br>
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
                            <li>
                                <div>
                                <i className="mdi mdi-checkbox-marked-circle" />
                                </div>
                                <div>
                                <p>Build CMAs with Honely's comparable algorithm</p><p>(on up to 10 comparable properties)</p>
                                </div>
                            </li>
                        </ul>
                        </div>
                        <br></br><br></br>
                        <div className="reportsintro-credits-section">
                        {
                            (props.userProfile.default_payment_type !== null) &&
                            <CreditsSection />
                        }
                        </div>
                    </div>
                </div>
            }
            
            {
                !props.userProfile && <div>
                    <div className="homepage-subblock">
                        <div className="homepage-subblock-lower-left">
                            <img src="reports.png"></img>
                        </div>
                        <div className="homepage-subblock-lower-right">
                            <h1>CMA's and Property Reports</h1>
                            <p>Download informative and sophisticated property reports to procure and impress clients!  </p>
                            <button onClick={() => {
                                window.location.href = '/signup'
                            }}>Get Started</button>
                        </div>
                    </div>
                    
                    {/* Pricing */}
                    <div className="reportsintro-report-credits">
                        {/* <img src="honely_report_credits.png"></img> */}
                        <div>
                            <h1>Pricing</h1>
                            <p>Save 50% when you pay with report credits.</p>
                        </div>

                        <div className="reportsintro-report-credits pricing">
                            <div className="left-side">
                                <h2>Pay per use</h2>
                                <div className="reportsintro-report-credits pricing line">
                                    <img src="single-report.png"></img>
                                    <p>$0.50 for each single report.</p>
                                </div>
                                <div className="reportsintro-report-credits pricing line">
                                    <img src="sma-report.png"></img>
                                    <p>$1.00 for each CMA report.</p>
                                </div>
                            </div>

                            <div className="right-side">
                                <h2>Purchase Credits</h2>
                                <p>10 Credits for $10</p>
                                <p>25 Credits for $22.50 (save 10%)</p>
                                <p>50 Credits for $40 (save 20%)</p>
                                <p>100 Credits for $75 (save 25%)</p>
                            </div>
                        </div>
                    </div>
                    
                    <div  className="leadgenintro-steps">
                        <div>
                            <span style={{fontSize: '70px', color: 'black'}}className="mdi mdi-numeric-1-circle" />
                            
                            <h1>Enter Your Subject Property</h1>
                            <p>Enter the address of the  property that you are basing your report on.</p>
                        </div>
                        <div>
                            <span style={{fontSize: '70px', color: 'black'}}className="mdi mdi-numeric-2-circle" />
                                
                                <h1>Choose Singular or CMA Report</h1>
                                <p>Choose whether you want to purchase a report on a single property or a CMA with multiple. </p>
                        </div>
                        <div>
                            <span style={{fontSize: '70px', color: 'black'}}className="mdi mdi-numeric-3-circle" />
                            
                            <h1>Select Comparables</h1>
                            <p>If you chose a CMA, either use our suggested properties or enter your own. After, download the report to show your clients! </p>
                        </div>
                    </div>
                </div>
            }
            
        </div>
    )
}
export default ReportsIntro;