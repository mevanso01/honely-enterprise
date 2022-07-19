import React, { useState, useEffect } from "react";
import '../styles/HomePage.css'

function HomePage() {
    useEffect(() => {
        if (window.location.pathname !== '/') {
            window.location.href = '/'
        }
    })
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
                <div className="homepage-subblock-upper-right" style={{padding: '5%'}}>
                    <img src="homepage-top-right.png"></img>
                </div>
            </div>
            <div className="homepage-subblock">
                <div className="homepage-subblock-lower-left">
                    <img src="reportsplaceholder.png"></img>
                </div>
                <div className="homepage-subblock-lower-right">
                    <div>
                        <h1>CMA's and Property Reports</h1>
                        <p>Differentiate yourselves through data! Give your clients a look into the future through your reporting.</p>
                        <button onClick={() => {
                            window.location.href = '/reports'
                        }}>Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default HomePage;