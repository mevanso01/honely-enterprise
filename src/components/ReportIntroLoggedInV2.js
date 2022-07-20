//REACT
import React, { useState, useEffect } from "react";

//STYLES
import "../styles/ReportIntroLoggedInV2.css";

//IMAGES
import OrangeCheckmark from "../assets/images/orange-checkmark.png";
import File from "../assets/images/file.png";
import Files from "../assets/images/files.png";

//COMPONENTS
import CreditsBanner from "./CreditsBanner";
import ReportSearch from "./CustomizeWidget/ReportSearch";

export default function ReportIntroLoggedInV2() {
  useEffect(() => {
    window.sessionStorage.removeItem('subjectForecastDetails')
    window.sessionStorage.removeItem('subjectPropertyDetails')
  })
  return (
    <div className="section">
      <CreditsBanner availableCredits={35} />
      <div className="report-loggedin-content start-page">
        <div className="section-wrapper">
          <p className="text-exlarge">Generate a Property Report</p>
          <div className="search-box">
            {/* <div className="search-input-container"> */}
              <ReportSearch />
            {/* </div> */}
            {/* <button className="search-box-btn">Continue</button> */}
          </div>
        </div>
      </div>

      <div className="report-loggedin-content grey">
        <div className="section-wrapper">
          <p className="report-loggedin-medium-text">
            Easily access and share custom reports.
          </p>
          <div className="lead-intro-v2-lead-cards">
            <div className="lead-intro-v2-card">
              <div className="lead-intro-v2-circle">
                <p className="lead-intro-v2-number">1</p>
              </div>
              <p className="lead-intro-v2-card-header">
                Enter a property address
              </p>
              <p className="lead-intro-v2-card-content">
                Enter the address of the property that you are basing your
                report on.
              </p>
            </div>
            <div className="lead-intro-v2-card">
              <div className="lead-intro-v2-circle">
                <p className="lead-intro-v2-number">2</p>
              </div>
              <p className="lead-intro-v2-card-header">Choose report type</p>
              <p className="lead-intro-v2-card-content">
                Choose whether you want to purchase a report on a single
                property or a CMA with multiple.
              </p>
            </div>
            <div className="lead-intro-v2-card">
              <div className="lead-intro-v2-circle">
                <p className="lead-intro-v2-number">3</p>
              </div>
              <p className="lead-intro-v2-card-header">Select comparables</p>
              <p className="lead-intro-v2-card-content">
                CMA reports have suggested properties you can choose from or
                enter your own properties to compare with. Finally, you can
                easily download the report and share with your clients.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="report-loggedin-content">
        <div className="section-wrapper">
          <p className="report-loggedin-medium-text">
            What do you get with Honely’s reporting software?
          </p>
          <div className="report-loggedin-lists">
            <div className="report-loggedin-row">
              <img src={OrangeCheckmark} className="orange-checkmark" />
              <div className="report-loggedin-row-value">
                <p className="report-loggedin-value">Standard MLS data</p>
                <p className="report-loggedin-label">
                  (Beds, baths, sqft, etc.)
                </p>
              </div>
            </div>
            <div className="report-loggedin-row">
              <img src={OrangeCheckmark} className="orange-checkmark" />
              <div className="report-loggedin-row-value">
                <p className="report-loggedin-value">
                  Property Value Estimates and Forecasts{" "}
                </p>
                <p className="report-loggedin-label">
                  (Current, 3 month, 1, 2, 3 years)
                </p>
              </div>
            </div>
            <div className="report-loggedin-row">
              <img src={OrangeCheckmark} className="orange-checkmark" />
              <div className="report-loggedin-row-value">
                <p className="report-loggedin-value">
                  Predictive Neighborhood Analysis{" "}
                </p>
                <p className="report-loggedin-label">
                  (Price appreciation, migration trends, rankings, etc.)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="report-loggedin-content grey">
        <div className="section-wrapper">
          <p className="report-loggedin-medium-text">Purchase credits</p>
          <div className="report-loggedin-credits">
            <div className="report-loggedin-credits-row">
              <div className="report-loggedin-credits-left">
                <img src={File} className="file" />
                <div className="credits-row-data">
                  <p className="report-loggedin-value">
                    Single Property report
                  </p>
                  <p className="report-loggedin-label">
                    Data on any property that your client won't find anywhere
                    else.
                  </p>
                  <p className="report-loggedin-label space-top">
                    1 credit/$0.50
                  </p>
                </div>
              </div>
              <div className="report-loggedin-credits-right">
                <button className="credits-right-btn">Continue</button>
              </div>
            </div>
            <div className="report-loggedin-credits-row">
              <div className="report-loggedin-credits-left">
                <img src={Files} className="file" />
                <div className="credits-row-data">
                  <p className="report-loggedin-value">CMA report</p>
                  <p className="report-loggedin-label">
                    Instantly generate the most thorough and analytical CMA on
                    the market.
                  </p>
                  <p className="report-loggedin-label space-top">
                    2 credits / $1.00
                  </p>
                </div>
              </div>
              <div className="report-loggedin-credits-right">
                <button className="credits-right-btn">Continue</button>
              </div>
            </div>
            <div className="report-loggedin-credits-row">
              <div className="report-loggedin-credits-left">
                <img src={OrangeCheckmark} className="file" />
                <div className="credits-row-data">
                  <p className="report-loggedin-value">Purchase credits</p>
                  <p className="report-loggedin-label">
                    Save up to 25% by buying credits in bulk
                  </p>
                </div>
              </div>
              <div className="report-loggedin-credits-right">
                <button className="credits-right-btn">Continue</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
