import React, { useState, useEffect } from "react";
import '../styles/HomePage.css'

function HomePage() {
    return (
        <div className="homepage-container">
            <div className="homepage-subblock">
                <div className="homepage-subblock-upper-left">
                    <h1>Lead Capture</h1>
                    <p>Generate more leads and improve your site engagement by integrating Honely's predictive analytics into your website!</p>
                    <button>Get Started</button>
                </div>
                <div className="homepage-subblock-upper-right">
                    <img src="https://picsum.photos/1000"></img>
                </div>
            </div>
            <div className="homepage-subblock">
                <div className="homepage-subblock-lower-left">
                    <img src="https://picsum.photos/1000"></img>
                </div>
                <div className="homepage-subblock-lower-right">
                    <h1>CMA's and Property Reports</h1>
                    <p>Differentiate yourselves through data! Give your clients a look into the future through your reporting.</p>
                    <button>Get Started</button>
                </div>
            </div>
        </div>
    )
}
export default HomePage;