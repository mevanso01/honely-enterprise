import React, { useState, useEffect } from "react";
import axios from 'axios';
import '../styles/PaymentConfirmationPopup.css'
// import '../styles/paymentconfirmation.css'
import { TrinitySpinner } from 'loading-animations-react';

function PaymentConfirmationPopup(props) {
    // const [charge, setCharge] = useState('')
    const [showLoading, setShowLoading] = useState(false)
    useEffect(() => {
        // console.log('vx: gengar!', JSON.parse(window.sessionStorage.getItem('PaymentPopup')).creditAmount)
    })
    function removePaymentPopup() {
        // document.getElementById('paymentconfirmation-overlay').classList.remove('active')
        // window.sessionStorage.removeItem('PaymentPopup')
        props.setShowPaymentPopup(false)
    }
    return (
        <div className="paymentconfirmation-popup active" id="paymentconfirmation-overlay">
            <div className="paymentconfirmation-popup-container">
            <div className="paymentconfirmation-popup-header">
                <h2>Confirmation</h2>
                <div onClick={() => {removePaymentPopup()}}>
                    <i className="fa fa-times"/>
                </div>
            </div>
            <div className="paymentconfirmation-popup-body">
                {
                    props.reportFlag &&
                    <p>You will be charged <span>1 credit</span></p>
                }
                {
                    props.CMAFlag &&
                    <p>You will be charged <span>2 credits</span></p>
                }
                {/* {
                    (typeof props.creditsFlag === 'undefined' || props.creditsFlag === null || props.creditsFlag === false) &&
                    <p>You will be charged <span>${JSON.parse(window.sessionStorage.getItem('PaymentPopup')).dollarAmount}</span></p>
                }
                {
                    (props.creditsFlag === true) && 
                    <p>You will be charged <span>{JSON.parse(window.sessionStorage.getItem('PaymentPopup')).creditAmount} credit(s)</span></p>
                } */}
                {/* {
                    props.purchaseCreditsMode && typeof JSON.parse(window.sessionStorage.getItem('PaymentPopup')).dollarAmount !== 'undefined' &&
                    <p>You will be charged <span>${JSON.parse(window.sessionStorage.getItem('PaymentPopup')).dollarAmount}</span></p>
                }
                {
                    !props.purchaseCreditsMode && typeof JSON.parse(window.sessionStorage.getItem('PaymentPopup')).dollarAmount !== 'undefined' &&
                    <p>You will be charged <span>${JSON.parse(window.sessionStorage.getItem('PaymentPopup')).dollarAmount}</span></p>
                }
                {
                    !props.purchaseCreditsMode && typeof JSON.parse(window.sessionStorage.getItem('PaymentPopup')).creditAmount !== 'undefined' &&
                    <p>You will be charged <span>{JSON.parse(window.sessionStorage.getItem('PaymentPopup')).creditAmount} credit(s)</span></p>
                } */}
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
