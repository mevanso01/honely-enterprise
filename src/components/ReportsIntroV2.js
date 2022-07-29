import React, { useState, useEffect } from "react";
import "../styles/ReportsIntroV2.css";
import ReportIntroLoggedInV2 from "./ReportIntroLoggedInV2";
function ReportsIntroV2(props) {
  if(props.authFlag){
    return (
      <ReportIntroLoggedInV2 userProfile={props.userProfile}/>
    );
  }else{
    return (
      <div className="section">
        <div className="reports-intro-v2-white-container">
          <div className="section-wrapper">
            <div className="reports-intro-v2-section-column">
              <p className="text-exlarge reports-intro-v2-header">
                Increase your brand awareness with beautiful reports
              </p>
              <p className="text-medium reports-intro-v2-subheader">
                Choose between single or CMA reports, available with your company
                logo, with suggested comparables and customizable fields for
                updated information.
              </p>
              <div className="reports-intro-v2-report-types">
                <div className="reports-intro-v2-report-type">
                  <img src="reports.png"></img>
                  <p className="reports-intro-v2-big-text reports-intro-v2-subsection-big-text">
                    Branded single property report
                  </p>
                  <p>
                    Differentiate yourself through data. Quickly generate branded
                    property or CMA reports powered by data that you won't find
                    anywhere else.
                  </p>
                  <p>Property Report - 1 Credit or $0.50</p>
                  <button onClick={() => {
                      window.location.href = '/signin'
                  }} className="reports-intro-v2-subsection-btn">
                    Get Started
                  </button>
                </div>
                <div className="reports-intro-v2-report-type">
                  <img style={{maxWidth: '280px', boxShadow: 'none'}} src="cmareports.png"></img>
                  <p className="reports-intro-v2-big-text reports-intro-v2-subsection-big-text-2">
                    Intelligent CMA reports
                  </p>
                  <p>
                    Differentiate yourself through data. Quickly generate branded
                    property or CMA reports powered by data that you won't find
                    anywhere else.
                  </p>
                  <p>CMA - 2 Credits or $1.00</p>
                  <button onClick={() => {
                      window.location.href = '/signin'
                  }}className="reports-intro-v2-subsection-btn">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="reports-intro-v2-grey-container">
          <div className="section-wrapper">
            <div className="reports-intro-v2-section-column">
              <p className="reports-intro-v2-big-text">
                Easily access and share custom reports.
              </p>
              <div className="reports-intro-v2-reports-cards">
                <div className="reports-intro-v2-card">
                  <div className="reports-intro-v2-circle">
                    <p className="reports-intro-v2-number">1</p>
                  </div>
                  <p className="reports-intro-v2-card-header">
                    Enter a property address
                  </p>
                  <p className="reports-intro-v2-card-content">
                    Enter the address of the property that you are basing your
                    report on.
                  </p>
                </div>
                <div className="reports-intro-v2-card">
                  <div className="reports-intro-v2-circle">
                    <p className="reports-intro-v2-number">2</p>
                  </div>
                  <p className="reports-intro-v2-card-header">
                    Choose report type
                  </p>
                  <p className="reports-intro-v2-card-content">
                    Choose whether you want to purchase a report on a single
                    property or a CMA with multiple.
                  </p>
                </div>
                <div className="reports-intro-v2-card">
                  <div className="reports-intro-v2-circle">
                    <p className="reports-intro-v2-number">3</p>
                  </div>
                  <p className="reports-intro-v2-card-header">
                    Select comparables
                  </p>
                  <p className="reports-intro-v2-card-content">
                    CMA reports have suggested properties you can choose from or
                    enter your own properties to compare with. Finally, you can
                    easily download the report and share with your clients.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="reports-intro-v2-reportspricing">
            <p className="reports-intro-v2-big-text reports-intro-v2-big-text-reportpricing">
              Pricing
            </p>
            <p>Save 50% when you pay with report credits.</p>
            <div className="reports-intro-v2-reportspricing-inner">
              <div style={{ paddingBottom: "50px" }}>
                <h2>Pay per use</h2>
                <br></br>
                <br></br>
                <div style={{ display: "flex" }}>
                  <img
                    style={{ width: "20px", height: "20px", marginRight: "5px" }}
                    src="single-report.png"
                  ></img>
                  <p>$ 0.50 for each single report.</p>
                </div>
                <div style={{ display: "flex" }}>
                  <img
                    style={{ width: "20px", height: "20px", marginRight: "5px" }}
                    src="sma-report.png"
                  ></img>
                  <p>$ 1.00 for each CMA report.</p>
                </div>
                <div className="reports-intro-v2-reportspricing-spacer">
                  <br></br>
                  <br></br>
                  <br></br>
                  <br></br>
                </div>
                <br></br>
                <button onClick={() => {
                    window.location.href = '/signin'
                }}>Buy Report</button>
              </div>
              <div style={{ paddingBottom: "50px" }}>
                <h2>Purchase Credits</h2>
                <br></br>
                <br></br>
                <p>20 Credits for $9.99</p>
                <p>50 Credits for $22.49 (save 10%)</p>
                <p>100 Credits for $39.99 (save 20%)</p>
                <p>200 Credits for $74.99 (save 25%)</p>
                <br></br>
                <button onClick={() => {
                    window.location.href = '/signin'
                }}>Buy Credits</button>
              </div>
            </div>
          </div>
        </div>
        <div className="homepage-report-features">
                <h1>What Do You Get with Honely’s Reporting Software?</h1>
                <br></br>
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
                </ul>
            </div>
      </div>
    );
  }
}
export default ReportsIntroV2;
