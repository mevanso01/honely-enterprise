import React, { useState, useEffect } from "react";
import '../styles/ReportsIntro.css'
import HonelySearchSimple from "./HonelySearchSimple";
import ReportForm from './ReportForm'
import axios from 'axios';

function ReportsIntro(props) {
    const [subjectProperty, setSubjectProperty] = useState('')
    const [forecast, setForecast] = useState(null)
    const [property, setProperty] = useState(null)
    const [errMsg, setErrMsg] = useState('')
    const [optionLists, setOptionLists] = useState({})
    // const [forCMA, setForCMA] = useState(null)
    // var forCMA = null
    // const [walkScore, setWalkScore] = useState(null)
    const [creditsFlag, setCreditsFlag] = useState(false)
    function handleCreditsFlag () {
        setCreditsFlag(document.getElementById('creditsFlag').checked)
    }
    // function handleInputChange(e) {
    //     setCollectionInfo({
    //         ...collectionInfo,
    //         [e.target.name]: e.target.value,
    //       });
    //       console.log('vx:', collectionInfo)
    // }
    useEffect(() => {
        window.sessionStorage.removeItem('CMA')
        window.sessionStorage.removeItem('CMASubjectPropertyId')
        axios.get('https://api.honely.com/lookup/drop_down')
        .then((response) => {
            if (response.data) {
                setOptionLists(response.data)
            }
        })
    }, [])
    function ReportFormContainer() {
        if (forecast !== null && property !== null) {
            return (
                <ReportForm user={user} optionLists={optionLists} forecast={forecast} property={property} inCMA={false} creditsFlag={creditsFlag} jwt={props.jwt} updateAuthState={props.updateAuthState}/>
            )
        }
    }
    function setPopupDisplay(value) {
        if (value === true) {
            document.getElementById('reportsintro-overlay').classList.add('active')
            window.dispatchEvent(new Event('resize'))
        }
        if (value === false) {
            document.getElementById('reportsintro-overlay').classList.remove('active')
        }
        return
    }
    function showReportForm(cmaflag) {
        // setForCMA(cmaflag)
        // forCMA = cmaflag
        setPopupDisplay(false)
        document.getElementById('report-form-overlay').classList.add('active')
        if (!cmaflag) {
            document.getElementById('btn_doDownloadReport').style = "display : inline-block"
            document.getElementById('btn_doDownloadReport_mobile').style = "display : inline-block"
            document.getElementById('btn_doDownloadReportCMA').style = "display : none"
            document.getElementById('btn_doDownloadReport_mobileCMA').style = "display : none"
        } else {
            document.getElementById('btn_doDownloadReport').style = "display : none"
            document.getElementById('btn_doDownloadReport_mobile').style = "display : none"
            document.getElementById('btn_doDownloadReportCMA').style = "display : inline-block"
            document.getElementById('btn_doDownloadReport_mobileCMA').style = "display : inline-block"
        }
        document.getElementById('report-form-overlay').classList.add('active')
        window.dispatchEvent(new Event('resize'))
    }
    var user = {
        name : props.userProfile.full_name,
        email: props.userProfile.email,
        phone: props.userProfile.phone_number,
        user_id: '512',
    }
    // var property = {
    //     "status": "Sold",
    //     "confidence_score": "5.5",
    //     "rental_estimate": null,
    //     "address": {
    //     "property_id": "85691865",
    //     "fips": "34017",
    //     "apn": "04  00044-0000-00028-  02",
    //     "street_number": "746",
    //     "street_pre_direction": null,
    //     "street_name": "HARRISON",
    //     "street_suffix": "AVE",
    //     "street_post_direction": null,
    //     "unit_type": null,
    //     "unit_number": null,
    //     "full_address": "746 Harrison Ave Harrison NJ 07029",
    //     "city": "HARRISON",
    //     "state": "NJ",
    //     "zip_code": "07029",
    //     "zip_plus_four_code": "1909",
    //     "latitude": "40.747871",
    //     "longitude": "-74.148703",
    //     "geocoding_accuracy": "-74.148703",
    //     "census_tract": "013500",
    //     "carrier_code": "C012"
    //     },
    //     "tax": [
    //     {
    //     "year": "2021",
    //     "property_tax": 10652.01,
    //     "land": "200000.0",
    //     "additions": "274900.0",
    //     "rate_code_area": null,
    //     "assessed_value": "474900.0"
    //     }
    //     ],
    //     "valuation": {
    //     "assessed_value": "474900.0",
    //     "appraisal": "594281.0355081952",
    //     "list_price": "590000.0",
    //     "date": "2021"
    //     },
    //     "structure": {
    //     "year_built": "1960",
    //     "effective_year_built": "1960",
    //     "rooms_count": "0.0",
    //     "beds_count": "6.0",
    //     "baths": "2.0",
    //     "partial_baths_count": "0.0",
    //     "units_count": null,
    //     "total_area_sq_ft": "1938.0",
    //     "stories": "2 Stories",
    //     "plumbing_fixtures": null,
    //     "air_conditioning_type": null,
    //     "amenities": null,
    //     "architecture_type": null,
    //     "basement_type": null,
    //     "condition": null,
    //     "construction_type": "Frame",
    //     "exterior_features": null,
    //     "exterior_wall_type": null,
    //     "flooring_types": null,
    //     "heating_type": "Gas",
    //     "heating_fuel_type": null,
    //     "interior_wall_type": null,
    //     "other_rooms": null,
    //     "parking_type": "Attached Garage",
    //     "accessor_parking_type": null,
    //     "listing_parking_type": "ATTACHED GARAGE",
    //     "garage_type": null,
    //     "parking_spaces_count": "0",
    //     "pool_type": null,
    //     "roof_material_type": null,
    //     "roof_style_type": null,
    //     "sewer_type": null,
    //     "water_type": null
    //     },
    //     "sale_history": [],
    //     "is_blocked": "YES"
    //     }
    // var forecast = {
    //     "zipcode": "07029",
    //     "city": "HARRISON",
    //     "state": "NJ",
    //     "zip_code_listing_statistics": {
    //     "average_rental_income": 2491,
    //     "total_listing_on_marker": 3,
    //     "sold_properties_last_month": null,
    //     "average_sqft": 257.32,
    //     "median_days_on_market": 1.5,
    //     "great_school_rating": null,
    //     "median_sold_price": 508000,
    //     "median_listings_price": 569000
    //     },
    //     "property_forecast": {
    //     "property_id": "85691865",
    //     "rental_estimate": null,
    //     "confidence_score": "5.5",
    //     "fips": "34017",
    //     "apn": "04  00044-0000-00028-  02",
    //     "address": "746 Harrison Ave Harrison NJ 07029",
    //     "latitude": "40.747871",
    //     "longitude": "-74.148703",
    //     "list_price": "590000.0",
    //     "appraisal": "594281.0355081952",
    //     "appraisal_low": "443868.50542107096",
    //     "appraisal_high": "744693.5655953193",
    //     "assessed_value": "474900.0",
    //     "beds_count": "6.0",
    //     "baths": "2.0",
    //     "realtor": "",
    //     "property_status": "Sold",
    //     "total_area_sq_ft": "1938.0",
    //     "posted_date": "2021-07-10",
    //     "percentage_change_forecasts": [
    //     {
    //     "year": "May 2022",
    //     "change": null
    //     },
    //     {
    //     "year": "August 2022",
    //     "change": "0.93"
    //     },
    //     {
    //     "year": "May 2023",
    //     "change": "4.63"
    //     },
    //     {
    //     "year": "May 2024",
    //     "change": "14.54"
    //     },
    //     {
    //     "year": "May 2025",
    //     "change": "24.84"
    //     }
    //     ],
    //     "value_change_forecasts": [
    //     {
    //     "year": "May 2022",
    //     "change": null
    //     },
    //     {
    //     "year": "August 2022",
    //     "change": "599824.25"
    //     },
    //     {
    //     "year": "May 2023",
    //     "change": "621778.22"
    //     },
    //     {
    //     "year": "May 2024",
    //     "change": "680672.27"
    //     },
    //     {
    //     "year": "May 2025",
    //     "change": "741925.99"
    //     }
    //     ],
    //     "average_zip_code_value": "535017.4920109232",
    //     "property_valued_compared_to_zipcode": "11.08"
    //     },
    //     "neighborhood": {
    //     "percentage_change_forecasts": [
    //     {
    //     "year": "May 2022",
    //     "change": null
    //     },
    //     {
    //     "year": "August 2022",
    //     "change": "1.12"
    //     },
    //     {
    //     "year": "May 2023",
    //     "change": "5.45"
    //     },
    //     {
    //     "year": "May 2024",
    //     "change": "16.31"
    //     },
    //     {
    //     "year": "May 2025",
    //     "change": "27.67"
    //     }
    //     ],
    //     "value_change_forecasts": [
    //     {
    //     "year": "May 2022",
    //     "change": null
    //     },
    //     {
    //     "year": "August 2022",
    //     "change": "541023.21"
    //     },
    //     {
    //     "year": "May 2023",
    //     "change": "564158.28"
    //     },
    //     {
    //     "year": "May 2024",
    //     "change": "622277.37"
    //     },
    //     {
    //     "year": "May 2025",
    //     "change": "683070.86"
    //     }
    //     ],
    //     "past_percentage_change": [
    //     {
    //     "year": "May 2021",
    //     "change": null
    //     },
    //     {
    //     "year": "May 2020",
    //     "change": null
    //     },
    //     {
    //     "year": "May 2019",
    //     "change": null
    //     }
    //     ],
    //     "zipcode_growth_state_ranking_forecasts": [
    //     {
    //     "year": "May 2022",
    //     "change": null
    //     },
    //     {
    //     "year": "August 2022",
    //     "change": "387"
    //     },
    //     {
    //     "year": "May 2023",
    //     "change": "330"
    //     },
    //     {
    //     "year": "May 2024",
    //     "change": "327"
    //     },
    //     {
    //     "year": "May 2025",
    //     "change": "276"
    //     }
    //     ],
    //     "zipcode_growth_national_ranking_forecasts": [
    //     {
    //     "year": "May 2022",
    //     "change": null
    //     },
    //     {
    //     "year": "August 2022",
    //     "change": "17590"
    //     },
    //     {
    //     "year": "May 2023",
    //     "change": "20623"
    //     },
    //     {
    //     "year": "May 2024",
    //     "change": "18812"
    //     },
    //     {
    //     "year": "May 2025",
    //     "change": "14115"
    //     }
    //     ],
    //     "avg_value_state_ranking_forecasts": [
    //     {
    //     "year": "May 2022",
    //     "change": "278"
    //     },
    //     {
    //     "year": "August 2022",
    //     "change": "283"
    //     },
    //     {
    //     "year": "May 2023",
    //     "change": "282"
    //     },
    //     {
    //     "year": "May 2024",
    //     "change": "276"
    //     },
    //     {
    //     "year": "May 2025",
    //     "change": "271"
    //     }
    //     ],
    //     "avg_value_national_ranking_forecasts": [
    //     {
    //     "year": "May 2022",
    //     "change": "5467"
    //     },
    //     {
    //     "year": "August 2022",
    //     "change": "5550"
    //     },
    //     {
    //     "year": "May 2023",
    //     "change": "5897"
    //     },
    //     {
    //     "year": "May 2024",
    //     "change": "5786"
    //     },
    //     {
    //     "year": "May 2025",
    //     "change": "5508"
    //     }
    //     ],
    //     "total_state_rank": "595",
    //     "total_national_rank": "32966",
    //     "competitive_score": null,
    //     "competition_statements": "1|2|3|4",
    //     "current_value": "535017.49"
    //     },
    //     "surrounding_zipcode": {
    //     "null": "NO",
    //     "percentage_change_forecasts": [
    //     {
    //     "year": "May 2022",
    //     "change": null
    //     },
    //     {
    //     "year": "August 2022",
    //     "change": "2.96"
    //     },
    //     {
    //     "year": "May 2023",
    //     "change": "12.93"
    //     },
    //     {
    //     "year": "May 2024",
    //     "change": "29.90"
    //     },
    //     {
    //     "year": "May 2025",
    //     "change": "45.29"
    //     }
    //     ]
    //     },
    //     "state_statistics": {
    //     "average_rental_income": 2284,
    //     "total_listing_on_marker": 5505,
    //     "sold_properties_last_month": 2236,
    //     "average_sqft": 257.5,
    //     "median_days_on_market": 2,
    //     "great_school_rating": null,
    //     "median_sold_price": 400000,
    //     "median_listings_price": 549000,
    //     "percentage_change_forecasts": [
    //     {
    //     "year": "May 2022",
    //     "change": null
    //     },
    //     {
    //     "year": "August 2022",
    //     "change": "2.85"
    //     },
    //     {
    //     "year": "May 2023",
    //     "change": "12.71"
    //     },
    //     {
    //     "year": "May 2024",
    //     "change": "29.14"
    //     },
    //     {
    //     "year": "May 2025",
    //     "change": "43.81"
    //     }
    //     ]
    //     },
    //     "moving_trends": {
    //     "null": "NO",
    //     "total_state_rank": "593",
    //     "total_country_rank": "38108",
    //     "net_in": [
    //     {
    //     "year": "May 2022",
    //     "change": -0.23
    //     },
    //     {
    //     "year": "August 2022",
    //     "change": 0.34
    //     },
    //     {
    //     "year": "May 2023",
    //     "change": 0.05
    //     },
    //     {
    //     "year": "May 2024",
    //     "change": 0.2
    //     },
    //     {
    //     "year": "May 2025",
    //     "change": 0.34
    //     }
    //     ],
    //     "move_in_percentage_change_forecast": [
    //     {
    //     "year": "May 2022",
    //     "change": 0.32
    //     },
    //     {
    //     "year": "August 2022",
    //     "change": 0.7
    //     },
    //     {
    //     "year": "May 2023",
    //     "change": 0.67
    //     },
    //     {
    //     "year": "May 2024",
    //     "change": 0.8
    //     },
    //     {
    //     "year": "May 2025",
    //     "change": 0.92
    //     }
    //     ],
    //     "move_out_percentage_change_forecast": [
    //     {
    //     "year": "May 2022",
    //     "change": 0.55
    //     },
    //     {
    //     "year": "August 2022",
    //     "change": 0.36
    //     },
    //     {
    //     "year": "May 2023",
    //     "change": 0.62
    //     },
    //     {
    //     "year": "May 2024",
    //     "change": 0.6
    //     },
    //     {
    //     "year": "May 2025",
    //     "change": 0.58
    //     }
    //     ],
    //     "state_rankings": [
    //     {
    //     "year": "May 2022",
    //     "rank": "549"
    //     },
    //     {
    //     "year": "August 2022",
    //     "rank": "25"
    //     },
    //     {
    //     "year": "May 2023",
    //     "rank": "215"
    //     },
    //     {
    //     "year": "May 2024",
    //     "rank": "65"
    //     },
    //     {
    //     "year": "May 2025",
    //     "rank": "25"
    //     }
    //     ],
    //     "country_rankings": [
    //     {
    //     "year": "May 2022",
    //     "rank": "34588"
    //     },
    //     {
    //     "year": "August 2022",
    //     "rank": "4570"
    //     },
    //     {
    //     "year": "May 2023",
    //     "rank": "15372"
    //     },
    //     {
    //     "year": "May 2024",
    //     "rank": "7332"
    //     },
    //     {
    //     "year": "May 2025",
    //     "rank": "4570"
    //     }
    //     ]
    //     },
    //     "is_blocked": "NO"
    //     }
    return (
        <div className="reportsintro-container">
            <div className="reportsintro-popup" id="reportsintro-overlay">
                <div className="reportsintro-popup-container">
                    <div className="reportsintro-popup-header">
                        <h1>Make a selection</h1>
                        <div onClick={() => {setPopupDisplay(false)}}>
                            <i className="fa fa-times"/>
                        </div>
                    </div>
                    <div className="reportsintro-popup-options">
                        {
                            Object.keys(props).length !== 0 &&
                            <div className="reportsintro-popup-options">
                            <p style={{color: 'red', fontWeight: '600'}}>{errMsg}</p>
                            <input type='checkbox' id="creditsFlag" onChange={() => handleCreditsFlag()}></input>
                            <label>Use credits for report generation- Available: {props.userProfile.credits}</label>
                            </div>
                        }

                        <div className="reportsintro-popup-option">
                            
                            <div className="reportsintro-popup-option-left">
                                <div>
                                    <i className="mdi mdi-checkbox-marked-circle" />
                                </div>
                                <div>
                                    {/* <p>CMA Report - $1</p> */}
                                    <p>CMA Report - {
                                        creditsFlag &&
                                        <span>2 credits</span>
                                    }
                                    {
                                         !creditsFlag &&
                                         <span>$1</span>
                                    }
                                    </p>
                                    <p>Instantly generate the most thorough and analytical CMA on the market</p>
                                </div>
                            </div>
                            <div>
                                <button onClick={() => {
                                    if (Object.keys(props).length === 0) {
                                        window.location.href='/signup?mode=reports'
                                    } else {
                                        var pika = props.userProfile.credits - 2
                                        // if chose credits and they insuffient
                                        if (creditsFlag && (pika < 0)) {
                                            setErrMsg('Insufficient credits. Please go to account management section to purchase credits!')
                                        } else if (!creditsFlag && props.userProfile !== null && props.userProfile.status !== 'ACTIVE') {
                                            setErrMsg('Payment method not set up. Please go to account management section to setup Payment method')
                                        } else {
                                            showReportForm(true)
                                        }
                                    }
                                    }}>Continue</button>
                            </div>
                        </div>
                        <div className="reportsintro-popup-option">
                            <div className="reportsintro-popup-option-left">
                                <div>
                                    <i className="mdi mdi-checkbox-marked-circle" />
                                </div>
                                <div>
                                    {/* <p>Single Property - $0.50</p> */}
                                    <p>Single Property - {
                                        creditsFlag &&
                                        <span>1 credit</span>
                                    }
                                    {
                                         !creditsFlag &&
                                         <span>$0.50</span>
                                    }
                                    </p>
                                    <p>Data on any property that your client won't find anywhere else</p>
                                </div>
                            </div>
                            <div>
                                <button onClick={() => {
                                    // user not logged in
                                    if (Object.keys(props).length === 0) {
                                        window.location.href='/signup?mode=reports'
                                    } else {
                                        var pika = props.userProfile.credits - 2
                                        // if chose credits and they insuffient
                                        if (creditsFlag && (pika < 0)) {
                                            setErrMsg('Insufficient credits. Please go to account management section to purchase credits!')
                                        } else if (!creditsFlag && props.userProfile !== null && props.userProfile.status !== 'ACTIVE') {
                                            setErrMsg('Payment method not set up. Please go to account management section to setup Payment method')
                                        } else {
                                            showReportForm(false)
                                        }
                                    }
                                }}>Continue</button>
                            </div>
                        </div>
                        <div className="reportsintro-popup-option">
                            <div className="reportsintro-popup-option-left">
                                <div>
                                    <i className="mdi mdi-checkbox-marked-circle" />
                                </div>
                                <div>
                                    <p>Purchase Credits</p>
                                    <p>Save money by buying credits and getting reports in bulk</p>
                                </div>
                            </div>
                            <div>
                                <button onClick={() => {
                                   if(Object.keys(props).length === 0) {
                                       window.location.href='/signup?mode=reports'
                                   } else {
                                    window.location.href='/account-management/subscription'
                                   }
                                }}>Continue</button>
                            </div>
                        </div>
                        {/* {
                            Object.keys(props).length !== 0 &&
                            <div>
                            <p style={{color: 'red', fontWeight: '600'}}>{errMsg}</p>
                            <input type='checkbox' id="creditsFlag" onChange={() => handleCreditsFlag()}></input><label>Use credits for report generation- Available: {props.userProfile.credits}</label>
                            </div>
                        } */}
                    </div>
                </div>
            </div>
            <ReportFormContainer />
            {
                props.userProfile && 
                <div>
                    <div className="reportsintro-upper">
                        <div className="reportsintro-searchbar">
                        {/* <Spearow />
                        <Spearow />
                        <Spearow /> */}
                        {/* <input
                        name="charmander"
                        onChange={(e) => handleInputChange(e)}
                        value={collectionInfo.charmander}
                        placeholder="Charmander"
                        ></input> */}
                        <p>Search property Address for a Honely Property Report</p>
                        <HonelySearchSimple inCma={false} setPopupDisplay={setPopupDisplay} setForecast={setForecast} setProperty={setProperty}/>
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
            }
            
            {
                !props.userProfile && <div>
                    <div className="homepage-subblock">
                        <div className="homepage-subblock-lower-left">
                            <img src="reports.png"></img>
                        </div>
                        <div className="homepage-subblock-lower-right">
                            <h1>CMA's and Property Reports</h1>
                            <p>Download informative and sophisticated property reports to procure and impress clients!  </p>
                            <button onClick={() => {
                                window.location.href = '/signup'
                            }}>Get Started</button>
                        </div>
                    </div>
                    
                    {/* Pricing */}
                    <div className="reportsintro-report-credits">
                        {/* <img src="honely_report_credits.png"></img> */}
                        <div>
                            <h1>Pricing</h1>
                            <p>Save 50% when you pay with report credits.</p>
                        </div>

                        <div className="reportsintro-report-credits pricing">
                            <div className="left-side">
                                <h2>Pay per use</h2>
                                <div className="reportsintro-report-credits pricing line">
                                    <img src="single-report.png"></img>
                                    <p>$0.50 for each single report.</p>
                                </div>
                                <div className="reportsintro-report-credits pricing line">
                                    <img src="sma-report.png"></img>
                                    <p>$1.00 for each CMA report.</p>
                                </div>
                            </div>

                            <div className="right-side">
                                <h2>Purchase Credits</h2>
                                <p>10 Credits for $10</p>
                                <p>25 Credits for $22.50 (save 10%)</p>
                                <p>50 Credits for $40 (save 20%)</p>
                                <p>100 Credits for $75 (save 25%)</p>
                            </div>
                        </div>
                    </div>
                    
                    <div  className="leadgenintro-steps">
                        <div>
                            <span style={{fontSize: '70px', color: 'black'}}className="mdi mdi-numeric-1-circle" />
                            
                            <h1>Enter Your Subject Property</h1>
                            <p>Enter the address of the  property that you are basing your report on.</p>
                        </div>
                        <div>
                            <span style={{fontSize: '70px', color: 'black'}}className="mdi mdi-numeric-2-circle" />
                                
                                <h1>Choose Singular or CMA Report</h1>
                                <p>Choose whether you want to purchase a report on a single property or a CMA with multiple. </p>
                        </div>
                        <div>
                            <span style={{fontSize: '70px', color: 'black'}}className="mdi mdi-numeric-3-circle" />
                            
                            <h1>Select Comparables</h1>
                            <p>If you chose a CMA, either use our suggested properties or eneter your own. After, download the report to show your clients! </p>
                        </div>
                    </div>
                </div>
            }
            
        </div>
    )
}
export default ReportsIntro;