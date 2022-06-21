import React, { useState, useEffect } from "react";
import '../styles/LeadGenIntro.css'

function LeadGenIntro() {
    return (
        <div className="leadgenintro-container">
            <div className="leadgenintro-upper">
                <div  className="leadgenintro-steps">
                    <div>
                        <h1>Upload your Logo</h1>
                        <p>Generate more leads and improve your site engagement by integrating Honely's predictive analytics onto your website!</p>
                    </div>
                    <div>
                        <h1>Connect to your site</h1>
                        <p>Choose the color scheme and fonts that most properly aligns with your website's identity</p>
                    </div>
                    <div>
                        <h1>Generate Leads</h1>
                        <p>Generate more leads and improve your site engagement by integrating Honely's predictive analytics onto your website!</p>
                    </div>
                </div>
                <div  className="leadgenintro-prompt">
                    <h1>$24.99 to start per month</h1>
                    <p>This subscription package provides you all the tools you need to start using the Honely lead capture on your own website. Get started with a monthly rate. Each additional API is $1.</p>
                    <button>Register</button>
                </div>
            </div>
            <div className="leadgenintro-lower">
                <div>
                    <div className="leadgenintro-lower-text">
                        <h1>Honely APIs</h1>
                        <p>Enterprise platforms and realtors can connect directly to our API's using easy to use code.</p>
                    </div>
                    <div>that icon</div>
                </div>
                <div className="leadgenintro-lower-code-snippet">// that code snippet</div>
            </div>
        </div>
    )
}
export default LeadGenIntro;