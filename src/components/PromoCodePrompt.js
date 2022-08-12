import React, { useState, useEffect } from "react";
import '../styles/PromoCodePrompt.css'

function PromoCodePrompt(props) {
    return (
        <div className="section promocode-container">
            <div className="signup-form promocode-form">
                <label>Enter Promo Code (if applicable)</label>
                <input id='promo-code' style={{textTransform: 'uppercase'}}></input>
                <br></br><br></br>
                <button onClick={() => {
                    props.promoCodeContinueAction()
                }}>Continue</button>
            </div>
        </div>
    )
}

export default PromoCodePrompt;