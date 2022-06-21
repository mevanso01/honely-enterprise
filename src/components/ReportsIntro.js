import React, { useState, useEffect } from "react";
import '../styles/ReportsIntro.css'
import './HonelySearchSimple'
import HonelySearchSimple from "./HonelySearchSimple";

function ReportsIntro() {
    return (
        <div className="reportsintro-container">
            <div className="reportsintro-popup">
                <div className="reportsintro-popup-container">
                    <div className="reportsintro-popup-header">
                        <h1>Make a selection</h1>
                    </div>
                    <div className="reportsintro-popup-options">
                        <div className="reportsintro-popup-option">
                            <div className="reportsintro-popup-option-left">
                                <div>
                                    <i className="mdi mdi-checkbox-marked-circle" />
                                </div>
                                <div>
                                    <p>CMA Report - $1</p>
                                    <p>Short description - what you get</p>
                                </div>
                            </div>
                            <div>
                                <button>Continue</button>
                            </div>
                        </div>
                        <div className="reportsintro-popup-option">
                            <div className="reportsintro-popup-option-left">
                                <div>
                                    <i className="mdi mdi-checkbox-marked-circle" />
                                </div>
                                <div>
                                    <p>Single Property - $0.50</p>
                                    <p>Short description - what you get</p>
                                </div>
                            </div>
                            <div>
                                <button>Continue</button>
                            </div>
                        </div>
                        <div className="reportsintro-popup-option">
                            <div className="reportsintro-popup-option-left">
                                <div>
                                    <i className="mdi mdi-checkbox-marked-circle" />
                                </div>
                                <div>
                                    <p>Use Your Credits - $1</p>
                                    <p>Short description - what you get</p>
                                </div>
                            </div>
                            <div>
                                <button>Continue</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="reportsintro-upper">
                    <div className="reportsintro-searchbar">
                    <p>Search property Address for a Honely Property Report</p>
                    <HonelySearchSimple />
                    <div>
                    </div>
                    </div>
                    <div className="reportsintro-features">
                    <h1>What Do You Get with Honely's Reporting Software?</h1>
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
                        <li>
                            <div>
                            <i className="mdi mdi-checkbox-marked-circle" />
                            </div>
                            <div>
                            <p>Build CMAs with Honely's comparable algorithm</p><p>(on up to 10 comparable properties)</p>
                            </div>
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
            <div className="reportsintro-report-credits">
                <img src="honely_report_credits.png"></img>
            </div>
        </div>
    )
}
export default ReportsIntro;