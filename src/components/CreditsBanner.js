//REACT
import React from "react";

//STYLES
import "../styles/CreditsBanner.css";

export default function CreditsBanner({ availableCredits }) {
  return (
    <div className="credits-banner">
      <div className="credits">
        <p className="credit">Available Credits</p>
        <div className="credit-box">
          <p className="credit-number">{availableCredits}</p>
        </div>
      </div>
      <div className="credits-btn-container">
        <div className="credits-btn">Buy Credits</div>
      </div>
    </div>
  );
}
