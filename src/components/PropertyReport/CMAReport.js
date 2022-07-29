import React, { useState, useEffect } from "react";
import '../../styles/PropertyReport.css'
import CMAReportScreen from '../../assets/images/cma-report.png'
import PaymentConfirmationPopup from "../PaymentConfirmationPopup";
import axios from 'axios'
import generateSideBySidePayload from "../../functionalities/CMAPayloadGenerator";

const CMAReport = (props) => {
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [errMsg, setErrMsg] = useState('')
  function purchaseCMAInCredits() {
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
      var sideBySidePayload = generateSideBySidePayload();
    console.log("vx: tralalala1", sideBySidePayload);
    var pika = JSON.parse(window.sessionStorage.getItem("CMA")).array;
    var cmaPayloadVar = {};
    cmaPayloadVar.user_id = "512";
    cmaPayloadVar.mode = "multiple";
    //   cmaPayloadVar.report_data_list = []
    cmaPayloadVar.report_data_list = sideBySidePayload.slice();
    //   cmaPayloadVar.report_data_list.concat(sideBySidePayload)
    console.log("vx: tralalala2", cmaPayloadVar.report_data_list);
    for (let x = 0; x < pika.length; x++) {
      delete pika[x].user_id;
      cmaPayloadVar.report_data_list.push(pika[x]);
    }
    console.log("vx: tralalala3", cmaPayloadVar.report_data_list);
    console.log("[INFO] Start generating PDF report......");
    fetch("https://api.honely.com/util/reports/pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cmaPayloadVar),
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
        window.location.href = '/reports'
      })
      .catch((err) => {
        console.log("PDF Request Failed", err);
      });
    })
  }
  function purchaseCMAInDollars() {
    window.location.href = '/paymentcheckout?mode=cma-purchase'
  }
  return (
    <div className='property-report-container'>
      {showPaymentPopup && (
        <PaymentConfirmationPopup
          setShowPaymentPopup={setShowPaymentPopup}
          confirmAction={purchaseCMAInCredits}
          reportFlag={false}
          CMAFlag={true}
        />
      )}
      <h1>Generate a Property Report</h1>
      <div className='property-report-wrapper'>
        <span class="mdi mdi-close" onClick={() => {window.location.href = '/reports'}}></span>
        <p className='title'>Purchase CMA report</p>
        {/* vx: need to construct actual address */}
        {/* <p className='address'>10905 Caminito Arcada, San Diego, CA. 92131</p> */}
        <p className='address'>{JSON.parse(window.sessionStorage.getItem("CMA")).array[0].ADDRESS_1.data + ' ' + JSON.parse(window.sessionStorage.getItem("CMA")).array[0].CITY.data + ' ' + JSON.parse(window.sessionStorage.getItem("CMA")).array[0].STATE.data + ' ' + JSON.parse(window.sessionStorage.getItem("CMA")).array[0].ZIP.data}</p>
        <div className='report-screen'>
          {/* <img src={CMAReportScreen} alt='' /> */}
          <img style={{boxShadow: 'none'}} src="cmareports.png"></img>
        </div>
        <p style={{color: 'red', fontWeight: '600'}}>{errMsg}</p>
        {/* credit section */}
        {/* if sufficient credits */}
        {
          props.userProfile.credits > 1 &&
          <div className='property-report-button-container'>
          <button className='continue-btn' onClick={() => { 
            setErrMsg('')
            setShowPaymentPopup(true) 
            }}>
            Use Credit
          </button>
          <div className="property-report-cost-container">
              <p style={{marginTop: '20px'}}>2 credits each report</p>
          </div>
          </div>
        }
        {/* credits Section */}
        {/* if insuffient credits */}
        {
          props.userProfile.credits < 2 && 
          <div className='property-report-button-container'>
          <button className='continue-btn' onClick={() => { 
            window.location.href = '/paymentcheckout?mode=bulk-credit-purchase'
            }}>
            Buy Credits
          </button>
          <div className="property-report-cost-container">
              <p>2 credits each report</p>
              <p>(You have insufficient balance)</p>
          </div>
          </div>
        }
        {/* dollars section */}
        {
          props.userProfile.credits < 2 && // insuffient credits
          <div className='property-report-button-container'>
          <button className='continue-btn' onClick={() => { 
            if (!props.userProfile.default_payment_method) {
              setErrMsg('No Payment Method present. Please add a payment method in Account Management Section.')
            } else {
              setErrMsg('')
              purchaseCMAInDollars() 
            }
            }}>
            Continue with payment
          </button>
          <div className="property-report-cost-container">
            <p>$1.00 each report</p>
          </div>
          </div>
        }
        {/* <button className='continue-btn' onClick={() => {
          setErrMsg('')
          purchaseCMAInDollars() 
        }}>
          Continue with payment
        </button>
        <button className='continue-btn'>
          Continue with credit
        </button> */}
      </div>
    </div>
  )
}

export default CMAReport
