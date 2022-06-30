import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../styles/PaymentConfirmationPopup.css'
// import '../styles/paymentconfirmation.css'
import { TrinitySpinner } from 'loading-animations-react';

function PaymentConfirmationPopup(props) {
    // const [charge, setCharge] = useState('')
    const [showLoading, setShowLoading] = useState(false)
    useEffect(() => {
        console.log('vx: gengar!', props.creditsFlag)
    })
    function removePaymentPopup() {
        // document.getElementById('paymentconfirmation-overlay').classList.remove('active')
        window.sessionStorage.removeItem('PaymentPopup')
        props.setShowPaymentPopup(false)
    }
    // function Charge() {
    //         var radioElements =  document.getElementsByName('noOfCreditsToBuy')
    //         var ans = null
    //         for (let x=0; x< radioElements.length; x++) {
    //             if(radioElements !== null && typeof radioElements !== 'undefined') {
    //                 if(radioElements[x].checked === true) {
    //                     ans = radioElements[x].value
    //                     break
    //                 }
    //             }
    //         }
    //         var creditAmount = ans
    //         if (creditAmount == 10) {
    //             return (
    //                 // <span>{'$' + 9.99}</span>
    //                 <span>{'$' + props.charge}</span>
    //             )
    //         }
    // }
    return (
        <div className="paymentconfirmation-popup active" id="paymentconfirmation-overlay">
            <div className="paymentconfirmation-popup-container">
            <div className="paymentconfirmation-popup-header">
                <h1>Confirmation</h1>
                <div onClick={() => {removePaymentPopup()}}>
                    <i className="fa fa-times"/>
                </div>
            </div>
            <div className="paymentconfirmation-popup-body">
                {
                    (typeof props.creditsFlag === 'undefined' || props.creditsFlag === null || props.creditsFlag === false) &&
                    <p>You will be charged <span>${JSON.parse(window.sessionStorage.getItem('PaymentPopup')).dollarAmount}</span></p>
                }
                {
                    (props.creditsFlag === true) && 
                    <p>You will be charged <span>{JSON.parse(window.sessionStorage.getItem('PaymentPopup')).creditAmount} credit(s)</span></p>
                }
                {
                    !showLoading &&
                    <button onClick={() => {
                        setShowLoading(true)
                        props.confirmAction()
                    }}>Confirm</button>
                }
                {
                    showLoading && 
                    <div style={{width: '50px'}}>
                    <TrinitySpinner color="#24cb43" width="10"/>
                    </div>
                }
            </div>
            </div>
        </div>
    )
}

export default PaymentConfirmationPopup;
