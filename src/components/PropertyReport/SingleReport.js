import React, { useState, useEffect } from "react";
import '../../styles/PropertyReport.css'
import SingleReportScreen from '../../assets/images/single-report.png'
import PaymentConfirmationPopup from "../PaymentConfirmationPopup";
import axios from 'axios'

const SingleReport = (props) => {
  // vx: need to do pyment method presence/insufficient credits check
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [errMsg, setErrMsg] = useState('')
  function purchaseReportInCredits() {
    let config = {
      headers: {
          'Authorization': 'Bearer ' + props.jwt
      }
  }
  var payload = {
      'credit-amount': 1
  }
  axios.post('https://developers.honely.com/user/buy-report', payload, config)
  .then(() => {
          // vx: download single property report and redirect to /reports
          var pika = JSON.parse(window.sessionStorage.getItem("SinglePropertyReport")).array;
          console.log("[INFO] Start generating PDF report......");
          fetch("https://api.honely.com/util/reports/pdf", {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(pika[0]),
          // body: JSON.stringify(raichu),
          })
          .then(function (response) {
              // console.log(response)
              return response.blob();
          })
          .then(function (blob) {
              var url = window.URL.createObjectURL(blob);
              var a = document.createElement("a");
              a.href = url;
              a.download = "honely_report.pdf";
              document.body.appendChild(a);
              a.click();
              a.remove();
              console.log("[INFO] Finished generating PDF report......");
              window.sessionStorage.removeItem("SinglePropertyReport")
              window.location.href = "/reports";
          })
          .catch((err) => {
              console.log("PDF Request Failed", err);
          });
  }).catch((error) => {
      if (error.message === 'Request failed with status code 401') {
        props.doSignOut()
      } else {
        console.log('vx: error purchasing credits', error.message)
      }
  })
  }
  function purchaseReportInDollars() {
    window.location.href = '/paymentcheckout?mode=single-property-report-purchase'
  }
  return (
    <div className='property-report-container'>
      {showPaymentPopup && (
        <PaymentConfirmationPopup
          setShowPaymentPopup={setShowPaymentPopup}
          confirmAction={purchaseReportInCredits}
          reportFlag={true}
          CMAFlag={false}
        />
      )}
      <h1>Generate a Property Report</h1>
      <div className='property-report-wrapper'>
        <span class="mdi mdi-close" onClick={() => {window.location.href = '/reports'}}></span>
        <p className='title'>Purchase a single report</p>
        <p className='address'>{JSON.parse(window.sessionStorage.getItem("SinglePropertyReport")).array[0].ADDRESS_1.data + ' ' + JSON.parse(window.sessionStorage.getItem("SinglePropertyReport")).array[0].CITY.data + ' ' + JSON.parse(window.sessionStorage.getItem("SinglePropertyReport")).array[0].STATE.data + ' ' + JSON.parse(window.sessionStorage.getItem("SinglePropertyReport")).array[0].ZIP.data}</p>
        <div className='report-screen'>
          {/* <img src={SingleReportScreen} alt='' /> */}
          <img src="reports.png"></img>
        </div>
        <p style={{color: 'red', fontWeight: '600'}}>{errMsg}</p>
        {/* credit section */}
        {/* if sufficient credits */}
        {
          props.userProfile.credits > 0 &&
          <div className='property-report-button-container'>
          <button className='continue-btn' onClick={() => { 
            setErrMsg('')
            setShowPaymentPopup(true) 
            }}>
            Use Credit
          </button>
          <div className="property-report-cost-container">
              <p style={{marginTop: '20px'}}>1 credit each report</p>
          </div>
          </div>
        }
        {/* credits Section */}
        {/* if insuffient credits */}
          {
            props.userProfile.credits <= 0 && 
            <div className='property-report-button-container'>
            <button className='continue-btn' onClick={() => { 
              window.location.href = '/paymentcheckout?mode=bulk-credit-purchase'
              }}>
              Buy Credits
            </button>
            <div className="property-report-cost-container">
                <p>1 credit each report</p>
                <p>(You have insufficient balance)</p>
            </div>
            </div>
          }
        {/* dollars section */}
        {
          props.userProfile.credits <= 0 && // insuffient credits
          <div className='property-report-button-container'>
          <button className='continue-btn' onClick={() => { 
            if (!props.userProfile.default_payment_method) {
              setErrMsg('No Payment Method present. Please add a payment method in Account Management Section.')
            } else {
              setErrMsg('')
              purchaseReportInDollars() 
            }
            }}>
            Continue with payment
          </button>
          <div className="property-report-cost-container">
            <p>$0.50 each report</p>
          </div>
          </div>
        }
      </div>
    </div>
  )
}

export default SingleReport
