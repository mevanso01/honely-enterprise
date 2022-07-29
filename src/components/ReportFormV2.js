import React, { useState, useEffect, useRef } from "react";
import '../styles/ReportForm.css'
import axios from 'axios';
import Chart from "react-apexcharts";
import PaymentConfirmationPopup from "./PaymentConfirmationPopup"
import CreditsBanner from "./CreditsBanner";
import File from "../assets/images/file.png";
import Files from "../assets/images/files.png";
function ReportFormV2(props) {
    var [forecast, setForecast] = useState(
        JSON.parse(window.sessionStorage.getItem('reportFormForecast'))
    )
    var [property, setProperty] = useState(
        JSON.parse(window.sessionStorage.getItem('reportFormProperty'))
    )
    // var inCMA = false
    var [inCMA, setInCMA] = useState(false)
    var creditsFlag = false
    // var forecast = {
    //     "zipcode": "07029",
    //     "city": "HARRISON",
    //     "state": "NJ",
    //     "zip_code_listing_statistics": {
    //         "average_rental_income": 2491,
    //         "total_listing_on_marker": 3,
    //         "sold_properties_last_month": null,
    //         "average_sqft": 257.32,
    //         "median_days_on_market": 1.5,
    //         "great_school_rating": null,
    //         "median_sold_price": 508000,
    //         "median_listings_price": 569000
    //     },
    //     "property_forecast": {
    //         "property_id": "85691865",
    //         "rental_estimate": null,
    //         "confidence_score": "5.5",
    //         "fips": "34017",
    //         "apn": "04  00044-0000-00028-  02",
    //         "address": "746 Harrison Ave Harrison NJ 07029",
    //         "latitude": "40.747871",
    //         "longitude": "-74.148703",
    //         "list_price": "590000.0",
    //         "appraisal": "594281.0355081952",
    //         "appraisal_low": "443868.50542107096",
    //         "appraisal_high": "744693.5655953193",
    //         "assessed_value": "474900.0",
    //         "beds_count": "6.0",
    //         "baths": "2.0",
    //         "realtor": "",
    //         "property_status": "Sold",
    //         "total_area_sq_ft": "1938.0",
    //         "posted_date": "2021-07-10",
    //         "percentage_change_forecasts": [
    //             {
    //                 "year": "July 2022",
    //                 "change": null
    //             },
    //             {
    //                 "year": "October 2022",
    //                 "change": "0.93"
    //             },
    //             {
    //                 "year": "July 2023",
    //                 "change": "4.63"
    //             },
    //             {
    //                 "year": "July 2024",
    //                 "change": "14.54"
    //             },
    //             {
    //                 "year": "July 2025",
    //                 "change": "24.84"
    //             }
    //         ],
    //         "value_change_forecasts": [
    //             {
    //                 "year": "July 2022",
    //                 "change": null
    //             },
    //             {
    //                 "year": "October 2022",
    //                 "change": "599824.25"
    //             },
    //             {
    //                 "year": "July 2023",
    //                 "change": "621778.22"
    //             },
    //             {
    //                 "year": "July 2024",
    //                 "change": "680672.27"
    //             },
    //             {
    //                 "year": "July 2025",
    //                 "change": "741925.99"
    //             }
    //         ],
    //         "average_zip_code_value": "535017.4920109232",
    //         "property_valued_compared_to_zipcode": "11.08"
    //     },
    //     "neighborhood": {
    //         "percentage_change_forecasts": [
    //             {
    //                 "year": "July 2022",
    //                 "change": null
    //             },
    //             {
    //                 "year": "October 2022",
    //                 "change": "1.12"
    //             },
    //             {
    //                 "year": "July 2023",
    //                 "change": "5.45"
    //             },
    //             {
    //                 "year": "July 2024",
    //                 "change": "16.31"
    //             },
    //             {
    //                 "year": "July 2025",
    //                 "change": "27.67"
    //             }
    //         ],
    //         "value_change_forecasts": [
    //             {
    //                 "year": "July 2022",
    //                 "change": null
    //             },
    //             {
    //                 "year": "October 2022",
    //                 "change": "541023.21"
    //             },
    //             {
    //                 "year": "July 2023",
    //                 "change": "564158.28"
    //             },
    //             {
    //                 "year": "July 2024",
    //                 "change": "622277.37"
    //             },
    //             {
    //                 "year": "July 2025",
    //                 "change": "683070.86"
    //             }
    //         ],
    //         "past_percentage_change": [
    //             {
    //                 "year": "July 2021",
    //                 "change": null
    //             },
    //             {
    //                 "year": "July 2020",
    //                 "change": null
    //             },
    //             {
    //                 "year": "July 2019",
    //                 "change": null
    //             }
    //         ],
    //         "zipcode_growth_state_ranking_forecasts": [
    //             {
    //                 "year": "July 2022",
    //                 "change": null
    //             },
    //             {
    //                 "year": "October 2022",
    //                 "change": "387"
    //             },
    //             {
    //                 "year": "July 2023",
    //                 "change": "330"
    //             },
    //             {
    //                 "year": "July 2024",
    //                 "change": "327"
    //             },
    //             {
    //                 "year": "July 2025",
    //                 "change": "276"
    //             }
    //         ],
    //         "zipcode_growth_national_ranking_forecasts": [
    //             {
    //                 "year": "July 2022",
    //                 "change": null
    //             },
    //             {
    //                 "year": "October 2022",
    //                 "change": "17590"
    //             },
    //             {
    //                 "year": "July 2023",
    //                 "change": "20623"
    //             },
    //             {
    //                 "year": "July 2024",
    //                 "change": "18812"
    //             },
    //             {
    //                 "year": "July 2025",
    //                 "change": "14115"
    //             }
    //         ],
    //         "avg_value_state_ranking_forecasts": [
    //             {
    //                 "year": "July 2022",
    //                 "change": "278"
    //             },
    //             {
    //                 "year": "October 2022",
    //                 "change": "283"
    //             },
    //             {
    //                 "year": "July 2023",
    //                 "change": "282"
    //             },
    //             {
    //                 "year": "July 2024",
    //                 "change": "276"
    //             },
    //             {
    //                 "year": "July 2025",
    //                 "change": "271"
    //             }
    //         ],
    //         "avg_value_national_ranking_forecasts": [
    //             {
    //                 "year": "July 2022",
    //                 "change": "5467"
    //             },
    //             {
    //                 "year": "October 2022",
    //                 "change": "5550"
    //             },
    //             {
    //                 "year": "July 2023",
    //                 "change": "5897"
    //             },
    //             {
    //                 "year": "July 2024",
    //                 "change": "5786"
    //             },
    //             {
    //                 "year": "July 2025",
    //                 "change": "5508"
    //             }
    //         ],
    //         "total_state_rank": "595",
    //         "total_national_rank": "32966",
    //         "competitive_score": null,
    //         "competition_statements": "1|2|3|4",
    //         "current_value": "535017.49"
    //     },
    //     "surrounding_zipcode": {
    //         "null": "NO",
    //         "percentage_change_forecasts": [
    //             {
    //                 "year": "July 2022",
    //                 "change": null
    //             },
    //             {
    //                 "year": "October 2022",
    //                 "change": "2.96"
    //             },
    //             {
    //                 "year": "July 2023",
    //                 "change": "12.93"
    //             },
    //             {
    //                 "year": "July 2024",
    //                 "change": "29.90"
    //             },
    //             {
    //                 "year": "July 2025",
    //                 "change": "45.29"
    //             }
    //         ]
    //     },
    //     "state_statistics": {
    //         "average_rental_income": 2284,
    //         "total_listing_on_marker": 5505,
    //         "sold_properties_last_month": 2236,
    //         "average_sqft": 257.5,
    //         "median_days_on_market": 2,
    //         "great_school_rating": 5.5,
    //         "median_sold_price": 400000,
    //         "median_listings_price": 549000,
    //         "percentage_change_forecasts": [
    //             {
    //                 "year": "July 2022",
    //                 "change": null
    //             },
    //             {
    //                 "year": "October 2022",
    //                 "change": "2.85"
    //             },
    //             {
    //                 "year": "July 2023",
    //                 "change": "12.71"
    //             },
    //             {
    //                 "year": "July 2024",
    //                 "change": "29.14"
    //             },
    //             {
    //                 "year": "July 2025",
    //                 "change": "43.81"
    //             }
    //         ]
    //     },
    //     "moving_trends": {
    //         "null": "NO",
    //         "total_state_rank": "593",
    //         "total_country_rank": "38108",
    //         "net_in": [
    //             {
    //                 "year": "July 2022",
    //                 "change": -0.23
    //             },
    //             {
    //                 "year": "October 2022",
    //                 "change": 0.34
    //             },
    //             {
    //                 "year": "July 2023",
    //                 "change": 0.05
    //             },
    //             {
    //                 "year": "July 2024",
    //                 "change": 0.2
    //             },
    //             {
    //                 "year": "July 2025",
    //                 "change": 0.34
    //             }
    //         ],
    //         "move_in_percentage_change_forecast": [
    //             {
    //                 "year": "July 2022",
    //                 "change": 0.32
    //             },
    //             {
    //                 "year": "October 2022",
    //                 "change": 0.7
    //             },
    //             {
    //                 "year": "July 2023",
    //                 "change": 0.67
    //             },
    //             {
    //                 "year": "July 2024",
    //                 "change": 0.8
    //             },
    //             {
    //                 "year": "July 2025",
    //                 "change": 0.92
    //             }
    //         ],
    //         "move_out_percentage_change_forecast": [
    //             {
    //                 "year": "July 2022",
    //                 "change": 0.55
    //             },
    //             {
    //                 "year": "October 2022",
    //                 "change": 0.36
    //             },
    //             {
    //                 "year": "July 2023",
    //                 "change": 0.62
    //             },
    //             {
    //                 "year": "July 2024",
    //                 "change": 0.6
    //             },
    //             {
    //                 "year": "July 2025",
    //                 "change": 0.58
    //             }
    //         ],
    //         "state_rankings": [
    //             {
    //                 "year": "July 2022",
    //                 "rank": "549"
    //             },
    //             {
    //                 "year": "October 2022",
    //                 "rank": "25"
    //             },
    //             {
    //                 "year": "July 2023",
    //                 "rank": "215"
    //             },
    //             {
    //                 "year": "July 2024",
    //                 "rank": "65"
    //             },
    //             {
    //                 "year": "July 2025",
    //                 "rank": "25"
    //             }
    //         ],
    //         "country_rankings": [
    //             {
    //                 "year": "July 2022",
    //                 "rank": "34588"
    //             },
    //             {
    //                 "year": "October 2022",
    //                 "rank": "4570"
    //             },
    //             {
    //                 "year": "July 2023",
    //                 "rank": "15372"
    //             },
    //             {
    //                 "year": "July 2024",
    //                 "rank": "7332"
    //             },
    //             {
    //                 "year": "July 2025",
    //                 "rank": "4570"
    //             }
    //         ]
    //     },
    //     "is_blocked": "NO"
    // }
    var optionLists={
        "water_code": {
            "1": "Cistern",
            "2": "Municipal",
            "3": "None",
            "4": "Spring",
            "5": "Well",
            "6": "Yes"
        },
        "sewer_code": {
            "1": "Municipal",
            "2": "None",
            "3": "Storm",
            "4": "Septic",
            "5": "Yes"
        },
        "stories_code": {
            "100": "1 Story",
            "125": "1.25 Stories",
            "150": "1.5 Stories",
            "175": "1.75 Stories",
            "200": "2 Stories",
            "225": "2.25 Stories",
            "250": "2.5 Stories",
            "275": "2.75 Stories",
            "300": "3 Stories",
            "325": "3.25 Stories",
            "350": "3.5 Stories",
            "375": "3.75 Stories",
            "400": "4 Stories",
            "425": "4.25 Stories",
            "450": "4.5 Stories",
            "475": "4.75 Stories",
            "500": "5 Stories",
            "525": "5.25 Stories",
            "550": "5.5 Stories",
            "575": "5.75 Stories",
            "600": "6 Stories",
            "650": "6.5 Stories",
            "700": "7 Stories",
            "750": "7.5 Stories",
            "800": "8 Stories",
            "850": "8.5 Stories",
            "900": "9 Stories",
            "950": "9.5 Stories",
            "1000": "10 Stories",
            "1100": "11 Stories",
            "1200": "12 Stories",
            "1300": "13 Stories",
            "1400": "14 Stories",
            "1500": "15 Stories",
            "1600": "16 Stories",
            "1700": "17 Stories",
            "1800": "18 Stories",
            "1900": "19 Stories",
            "2000": "20 Stories",
            "2100": "21 Stories",
            "2200": "22 Stories",
            "2300": "23 Stories",
            "2400": "24 Stories",
            "2500": "25 Stories",
            "2600": "26 Stories",
            "2700": "27 Stories",
            "2800": "28 Stories",
            "2900": "29 Stories",
            "3000": "30 Stories",
            "3100": "31 Stories",
            "3200": "32 Stories",
            "3300": "33 Stories",
            "3400": "34 Stories",
            "3500": "35 Stories",
            "3600": "36 Stories",
            "3700": "37 Stories",
            "3800": "38 Stories",
            "3900": "39 Stories",
            "4000": "40 Stories",
            "4100": "41 Stories",
            "4200": "42 Stories",
            "4300": "43 Stories",
            "4400": "44 Stories",
            "4500": "45 Stories",
            "4600": "46 Stories",
            "4700": "47 Stories",
            "4800": "48 Stories",
            "4900": "49 Stories",
            "5000": "50 Stories",
            "5100": "51 Stories",
            "5200": "52 Stories",
            "5300": "53 Stories",
            "5400": "54 Stories",
            "5500": "55 Stories",
            "5600": "56 Stories",
            "5700": "57 Stories",
            "5800": "58 Stories",
            "5900": "59 Stories",
            "6000": "60 Stories",
            "6100": "61 Stories",
            "6200": "62 Stories",
            "6300": "63 Stories",
            "6400": "64 Stories",
            "6500": "65 Stories",
            "6600": "66 Stories",
            "6700": "67 Stories",
            "6800": "68 Stories",
            "6900": "69 Stories",
            "7000": "70 Stories",
            "7100": "71 Stories",
            "7200": "72 Stories",
            "7300": "73 Stories",
            "7400": "74 Stories",
            "7500": "75 Stories",
            "7600": "76 Stories",
            "7700": "77 Stories",
            "7800": "78 Stories",
            "7900": "79 Stories",
            "8000": "80 Stories",
            "8100": "81 Stories",
            "8200": "82 Stories",
            "8300": "83 Stories",
            "8400": "84 Stories",
            "8500": "85 Stories",
            "8700": "87 Stories",
            "8800": "88 Stories",
            "8900": "89 Stories",
            "9000": "90 Stories",
            "9100": "91 Stories",
            "9200": "92 Stories",
            "9300": "93 Stories",
            "9400": "94 Stories",
            "9500": "95 Stories",
            "9600": "96 Stories",
            "9700": "97 Stories",
            "9800": "98 Stories",
            "9900": "99 Stories",
            "10000": "100 Stories",
            "10400": "104 Stories",
            "10500": "105 Stories",
            "11200": "112 Stories",
            "11400": "114 Stories",
            "11900": "119 Stories",
            "12500": "125 Stories"
        },
        "roof_cover_code": {
            "1": "Asbestos",
            "2": "Built-up",
            "3": "Composition Shingle",
            "4": "Concrete",
            "5": "Metal",
            "6": "Slate",
            "7": "Rock / Gravel",
            "8": "Tar & Gravel",
            "9": "Bermuda",
            "10": "Masonite/ Cement Shake",
            "11": "Fiberglass",
            "12": "Aluminum",
            "13": "Wood Shake/ Shingles",
            "14": "Other",
            "15": "Asphalt",
            "16": "Roll Composition",
            "17": "Steel",
            "18": "Tile",
            "19": "Urethane",
            "20": "Shingle (Not Wood)",
            "21": "Wood",
            "22": "Gypsum",
            "23": "Ceramic tile",
            "24": "Clay tile",
            "25": "Concrete tile",
            "26": "Copper",
            "27": "Tin",
            "28": "Solar"
        },
        "roof_type_code": {
            "1": "Gable",
            "2": "Bowstring Truss",
            "3": "Re-inforced Concrete",
            "4": "Dome",
            "5": "Steel Frm/Truss",
            "6": "Flat",
            "7": "Gable or Hip",
            "8": "Hip",
            "9": "IRR/Cathedral",
            "10": "Gambrel",
            "11": "Mansard",
            "12": "Prestress Concrete",
            "13": "Rigid Frm Bar JT",
            "14": "Shed",
            "15": "Sawtooth",
            "16": "Wood Truss"
        },
        "interior_walls_code": {
            "1": "Brick",
            "2": "Concrete",
            "3": "Gypsum Board/Drywall/Sheetrock/Wallboard",
            "4": "Log",
            "5": "Cement Board",
            "6": "Plaster",
            "7": "Stone",
            "8": "Metal",
            "9": "Unfinished",
            "10": "Wood",
            "11": "Block",
            "12": "Glass",
            "13": "Finished/Painted",
            "14": "Decorative/Custom",
            "15": "Masonry",
            "16": "Composition",
            "17": "Other",
            "18": "Paneling",
            "19": "Vinyl",
            "20": "Plywood/Minimum"
        },
        "construction_type_code": {
            "1": "Adobe",
            "2": "Brick",
            "3": "Concrete",
            "4": "Concrete Block",
            "5": "Dome",
            "6": "Frame",
            "7": "Heavy",
            "8": "Light",
            "9": "Log",
            "10": "Manufactured",
            "11": "Other",
            "12": "Masonry",
            "13": "Metal",
            "14": "Steel",
            "15": "Stone",
            "16": "Tilt-up (pre-cast concrete)",
            "17": "Wood",
            "18": "Mixed"
        },
        "floor_cover_code": {
            "1": "Brick",
            "2": "Concrete",
            "3": "Covered",
            "4": "Floating Floor/laminate",
            "5": "Granite",
            "6": "Linoleum",
            "7": "Marble",
            "8": "Stone",
            "9": "Carpet",
            "10": "Parquet",
            "11": "Ceramic",
            "12": "Slate",
            "13": "Tile",
            "14": "Vinyl",
            "15": "Wood",
            "16": "Combination",
            "17": "Terrazzo",
            "18": "Asbestos",
            "19": "Dirt/Earth/Soil",
            "20": "Cork",
            "21": "Plywood",
            "22": "Faux Wood Tile",
            "23": "Softwood",
            "24": "Hardwood"
        },
        "exterior_walls_code": {
            "1": "Asbestos shingle",
            "2": "Brick",
            "3": "Brick veneer",
            "4": "Block",
            "5": "Composition/Composite",
            "6": "Concrete",
            "7": "Concrete Block",
            "8": "Glass",
            "9": "Log",
            "10": "Metal",
            "11": "Rock, Stone",
            "12": "Stucco",
            "13": "Tile",
            "14": "Tilt-up (pre-cast concrete)",
            "15": "Other",
            "16": "Wood Shingle",
            "17": "Wood",
            "18": "Wood Siding",
            "19": "Siding (Alum/Vinyl)",
            "20": "Adobe",
            "21": "Shingle (Not Wood)",
            "22": "Marble",
            "23": "Combination",
            "24": "Masonry",
            "25": "Siding Not (aluminum, vinyl, etc.)",
            "26": "EIFS / Synthetic Stucco",
            "27": "Fiber cement siding (Hardi-board/Hardi-plank)",
            "28": "Aluminum siding",
            "29": "Vinyl siding",
            "30": "Concrete tile",
            "31": "Clay tile",
            "32": "Ceramic tile"
        },
        "building_condition_code": {
            "1": "Excellent",
            "2": "Fair",
            "3": "Good",
            "4": "Poor",
            "5": "Unsound",
            "6": "Average",
            "7": "Very Good"
        },
        "geo_code_accuracy": {
            "5": "Record was coded to the 5-digit ZIP code centroid(U.S.) or the first 3-digit Postal Code Level(Canada)",
            "7": "Record was coded to the ZIP + 2 centroid",
            "9": "Record was coded to the ZIP + n4 centroid(U.S.) or the full 6-digit Postal COde Level(Canada)",
            "A": "Record was coded to interpolated rooftop level",
            "B": "Record was coded to the rooftop level",
            "X": "Record was not coded"
        },
        "basement_code": {
            "1": "Daylight, Full",
            "2": "Full Basement",
            "3": "Improved Basement(Finished)",
            "4": "Daylight, Partial",
            "5": "No Basement",
            "6": "Partial Basement",
            "7": "Unfinished Basement",
            "8": "Unspecified Basement",
            "9": "Unspecified Basement",
            "10": "Daylight/Walkout"
        },
        "style_code": {
            "1": "Traditional",
            "2": "A-Frame",
            "3": "Bungalow",
            "4": "Cape Cod",
            "5": "Colonial",
            "6": "English",
            "7": "French Provincial",
            "8": "Georgian",
            "9": "High-rise",
            "10": "Modern",
            "11": "Ranch/Rambler",
            "12": "Spanish",
            "13": "Tudor",
            "14": "Mediterranean",
            "15": "Conventional",
            "16": "Other",
            "17": "Prefab, Modular",
            "18": "Mansion",
            "19": "Raised Ranch",
            "20": "Dome",
            "21": "Contemporary",
            "22": "Unfinished/Under Construction",
            "23": "Victorian",
            "24": "Cottage",
            "25": "Custom",
            "26": "Log Cabin/Rustic",
            "27": "Historical",
            "28": "unknown",
            "29": "CONDO",
            "30": "Cluster",
            "31": "Duplex",
            "32": "Quadplex",
            "33": "Mobile Home",
            "34": "MultiFamily",
            "35": "TownHouse",
            "36": "Triplex",
            "37": "Patio Home",
            "38": "Row Home",
            "39": "Tri-Level",
            "40": "Bi-Level",
            "41": "Split Level",
            "42": "Split Foyer",
            "43": "Tiny House",
            "44": "European",
            "45": "Mobile/Manufactured"
        },
        "air_condition_code": {
            "1": "Central",
            "2": "Evaporative Cooler",
            "3": "Office Only",
            "4": "Packaged Unit",
            "5": "Window Unit",
            "6": "None",
            "7": "Other",
            "8": "Partial",
            "9": "Chilled Water",
            "10": "Refrigeration",
            "11": "Ventilation",
            "12": "Wall",
            "13": "Yes",
            "14": "Geo-Thermal"
        },
        "heating_fuel_code": {
            "1": "Coal",
            "2": "Electric",
            "3": "Gas",
            "4": "Geo-Thermal",
            "5": "None",
            "6": "Oil",
            "7": "Propane",
            "8": "Solar",
            "9": "Wood",
            "10": "Butane"
        },
        "garage_code": {
            "1": "Attached Garage",
            "2": "Built-in",
            "3": "Carport",
            "4": "Detached Garage",
            "5": "Pole",
            "6": "Offsite",
            "7": "Garage",
            "8": "Unimproved",
            "9": "Parking Lot",
            "10": "Mixed",
            "11": "None",
            "12": "Open",
            "13": "Paved/Surfaced",
            "14": "Ramp",
            "15": "Parking Structure",
            "16": "Tuckunder",
            "17": "Underground/Basement",
            "18": "Covered",
            "19": "Yes - Unspecified",
            "20": "Heated",
            "21": "Unfinished - Attached",
            "22": "Unfinished - Detached",
            "23": "Finished - Attached",
            "24": "Finished - Detached",
            "25": "Finished"
        },
        "heating_type": {
            "1": "Baseboard",
            "2": "Electric",
            "3": "Central",
            "4": "Forced air unit",
            "5": "Oil",
            "6": "Floor/Wall",
            "7": "Gravity",
            "8": "Heat Pump",
            "9": "Geo-thermal",
            "10": "Hot Water",
            "11": "Gas",
            "12": "Partial",
            "13": "Radiant",
            "14": "None",
            "15": "Other",
            "16": "Steam",
            "17": "Coal",
            "18": "Space/Suspended",
            "19": "Convection",
            "20": "Solar",
            "21": "Vent",
            "22": "Wood Burning",
            "23": "Propane",
            "24": "Yes",
            "25": "Zone"
        },
        "other_rooms": {
            "A": "Lanai",
            "B": "Breakfast Nook",
            "C": "Cellar",
            "D": "Mud room",
            "F": "Family Room/Den",
            "G": "Game / Recreation room",
            "H": "Hobby room",
            "I": "Sitting Room",
            "L": "Laundry Room",
            "M": "Media room/Home theater",
            "N": "Bonus Room",
            "O": "Home Office",
            "R": "Atrium",
            "S": "Sun, Solarium, Florida room",
            "T": "Great Room",
            "U": "Study/Library",
            "X": "Exercise/Home Gym",
            "Y": "Utility Room"
        },
        "pool": {
            "1": "Above ground pool",
            "2": "Pool & Spa (both)",
            "3": "Community Pool or Spa",
            "4": "Enclosed",
            "5": "Heated Pool",
            "6": "Indoor Swimming Pool",
            "7": "Solar Heated",
            "8": "Pool (yes)",
            "9": "Spa or Hot Tub (only)",
            "10": "Vinyl In-ground Pool",
            "11": "Pool, historical value",
            "12": "In-Ground Pool"
        },
        "amenities": {
            "1": "Arbor/Pergola",
            "2": "Mobile Home Hookup",
            "3": "Sauna/Steam Room",
            "A": "Alarm System",
            "B": "Boat Dock / Ramp",
            "C": "Club House",
            "D": "Wet Bar",
            "E": "Intercom System",
            "F": "Safe Room /Panic Room",
            "G": "Golf Course/Green",
            "H": "Audio Sound System",
            "I": "Fire Sprinkler",
            "J": "Boat Lift/Davits",
            "K": "Outdoor Kitchen/Fireplace",
            "L": "Storm or Tornado Shelter/Cellar",
            "N": "Wine Cellar",
            "O": "Basketball/Sport Court",
            "P": "Treehouse/Playhouse",
            "Q": "Handicap Ramp/Accessible",
            "R": "RV parking",
            "S": "Automatic Sprinkler System (lawn/irrigation)",
            "T": "Tennis Court",
            "U": "OVERHEAD DOOR",
            "V": "Central Vacuum System",
            "W": "Water Feature",
            "X": "Storm/Security Shutters",
            "Y": "Koi Pond",
            "M": "Smoke/Carbon Monoxide Detector"
        }
    }
    var user={
        "name": props.userProfile.full_name,
        "email": props.userProfile.email,
        "phone": props.userProfile.phone_number,
        "user_id": "512"
    }
    // var property={
    //     "status": "Sold",
    //     "confidence_score": "5.5",
    //     "rental_estimate": null,
    //     "address": {
    //         "property_id": "85691865",
    //         "fips": "34017",
    //         "apn": "04  00044-0000-00028-  02",
    //         "street_number": "746",
    //         "street_pre_direction": null,
    //         "street_name": "HARRISON",
    //         "street_suffix": "AVE",
    //         "street_post_direction": null,
    //         "unit_type": null,
    //         "unit_number": null,
    //         "full_address": "746 Harrison Ave Harrison NJ 07029",
    //         "city": "HARRISON",
    //         "state": "NJ",
    //         "zip_code": "07029",
    //         "zip_plus_four_code": "1909",
    //         "latitude": "40.747871",
    //         "longitude": "-74.148703",
    //         "geocoding_accuracy": "-74.148703",
    //         "census_tract": "013500",
    //         "carrier_code": "C012"
    //     },
    //     "tax": [
    //         {
    //             "year": "2021",
    //             "property_tax": 10652.01,
    //             "land": "200000.0",
    //             "additions": "274900.0",
    //             "rate_code_area": null,
    //             "assessed_value": "474900.0"
    //         }
    //     ],
    //     "valuation": {
    //         "assessed_value": "474900.0",
    //         "appraisal": "594281.0355081952",
    //         "list_price": "590000.0",
    //         "date": "2021"
    //     },
    //     "structure": {
    //         "year_built": "1960",
    //         "effective_year_built": "1960",
    //         "rooms_count": "0.0",
    //         "beds_count": "6.0",
    //         "baths": "2.0",
    //         "partial_baths_count": "0.0",
    //         "units_count": null,
    //         "total_area_sq_ft": "1938.0",
    //         "stories": "2 Stories",
    //         "plumbing_fixtures": null,
    //         "air_conditioning_type": null,
    //         "amenities": null,
    //         "architecture_type": null,
    //         "basement_type": null,
    //         "condition": null,
    //         "construction_type": "Frame",
    //         "exterior_features": null,
    //         "exterior_wall_type": null,
    //         "flooring_types": null,
    //         "heating_type": "Gas",
    //         "heating_fuel_type": null,
    //         "interior_wall_type": null,
    //         "other_rooms": null,
    //         "parking_type": "Attached Garage",
    //         "accessor_parking_type": null,
    //         "listing_parking_type": "ATTACHED GARAGE",
    //         "garage_type": null,
    //         "parking_spaces_count": "0",
    //         "pool_type": null,
    //         "roof_material_type": null,
    //         "roof_style_type": null,
    //         "sewer_type": null,
    //         "water_type": null
    //     },
    //     "sale_history": [],
    //     "is_blocked": "YES"
    // }
    const [showPaymentPopup, setShowPaymentPopup] = useState(false)
    const [initialRate, setInitialRate] = useState(1)
    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search)
        const params = Object.fromEntries(urlSearchParams.entries())
        // vx: if inCMA queryparam not present, redirect to /reports
        if (typeof params.inCMA === 'undefined') {
            window.location.href = '/reports'
        }
        // console.log('vx: inCMA queryparam', params.inCMA === 'false')
        else if (params.inCMA === 'true') {
            setInCMA(true)
        } else if (params.inCMA === 'false') {
            setInCMA(false)
        } else {
            window.location.href = '/reports'
        }
        doInitialEstimate()
        populateFields()
    }, [])
    function removeReportForm() {
        document.getElementById('report-form-overlay').classList.remove('active')
    }
    const chart3monthx = useRef()
    const chart1yearx = useRef()
    const chart2yearsx = useRef()
    const chart3yearsx = useRef()
    const chartMedianRentx = useRef()
    const chartCashFlowx = useRef()
    const chartRentalGrowthx = useRef()
    function lalala () {
        console.log('vx: mankey', chart3monthx.dataURI)
        // const chartExportOptions = {
        //     width: '300',
        //   }
        // chart3monthx.chart.dataURI(chartExportOptions).then(uri => {
        //     console.log('vx: mankey', uri)
        //   })
    }
    function populateField(id, value) {
       var x  = document.getElementById(id)
       x.value = value
    }
    function populateFields() {
        populateField("agent-name", user.name)
        populateField("agent-email", user.email)
        populateField("agent-phone", user.phone)
        populateField("year-built", getYearBuilt())
        populateField("county", getCounty())
        populateField("sqft", getSqft())
        populateField("num-beds", getNumBeds())
        populateField("num-baths", getNumBaths())
        populateField("num-partial-bath", getNumPartialBaths())
        populateField("room-count", getRoomCount())
        populateField("parking-spaces", getParkingSpaces())
        populateField("plumbing-count", getPlumbingCount())
        populateField("parking-type", getParkingType())
        populateField("sale-date", getMostRecentSaleDate())
        populateField("sale-price", getMostRecentSalePrice())
    }
    function readFile (file) {
        if (file) {
          return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = res => {
              resolve(res.target.result)
            }
            reader.onerror = err => reject(err)
            reader.readAsDataURL(file)
          })
        } else {
          // create custom promise resolve if file does not exist
          return new Promise((resolve, reject) => {
            resolve(0)
          })
        }
      }
    function doCMAAction () {
        doUpdateHonelyEstimate()
        var raichu = document.getElementById('reportFormZipCodeSection')
        raichu.style = {
            display: 'block'
        }
        setTimeout(() => {
            doGenerateReport(false, true)
        }, 500)
    }
    function doDownloadReport () {
        doUpdateHonelyEstimate()
        var raichu = document.getElementById('reportFormZipCodeSection')
        raichu.style = {
            display: 'block'
        }
        setTimeout(() => {
            doGenerateReport(false, false)
        }, 500)
      }
    function doGenerateReport (shareMode, cmaMode) {
        console.log('vx: doGenerateReport execution begins')
        // constants
        const chartExportOptions = {
          width: '300',
        }
        const chartExportOptionsLarge = {
          width: '400',
        }

        const timeFrame3lvls = ['current', '3 months', '1 year', '2 years', '3 years']
        const timeFrame4lvls = ['present', '3 months', '1 year', '2 years', '3 years']

        let chart3monthImg = null
        let chart1yearImg = null
        let chart2yearsImg = null
        let chart3yearsImg = null
        let chartMedianRentImg = null
        let chartCashFlowImg = null
        let chartGrowthImg = null
        let customLogoData = null

        // read custom logo file
        const customLogoFile = document.getElementById('agent-logo').files[0]
        Promise.all([
          // get chart image data
          chart3monthx.current.chart.dataURI(chartExportOptions).then(uri => {
            // console.log(uri)
            chart3monthImg = uri.imgURI
          }),
          chart1yearx.current.chart.dataURI(chartExportOptions).then(uri => {
            // console.log(uri)
            chart1yearImg = uri.imgURI
          }),
          chart2yearsx.current.chart.dataURI(chartExportOptions).then(uri => {
            // console.log(uri)
            chart2yearsImg = uri.imgURI
          }),
          chart3yearsx.current.chart.dataURI(chartExportOptions).then(uri => {
            // console.log(uri)
            chart3yearsImg = uri.imgURI
          }),
          chartMedianRentx.current.chart.dataURI(chartExportOptions).then(uri => {
            // console.log(uri)
            chartMedianRentImg = uri.imgURI
          }),
          chartCashFlowx.current.chart.dataURI(chartExportOptions).then(uri => {
            // console.log(uri)
            chartCashFlowImg = uri.imgURI
          }),
          chartRentalGrowthx.current.chart.dataURI(chartExportOptionsLarge).then(uri => {
            // console.log(uri)
            chartGrowthImg = uri.imgURI
          }),
          readFile(customLogoFile).then(data => {
            customLogoData = data
          }),
        ]).then(data => {
          // console.log(chart3monthImg)
          // console.log(chart1yearImg)
          // console.log(chart2yearsImg)
          // console.log(chart3yearsImg)
          // console.log(customLogoData)

          // get property image
          const propertyImg = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + property.address.latitude + '' + ',' + property.address.longitude + '+&fov=90&source=outdoor&key=AIzaSyClIFG-ONBwyXrn4_kaA4yMYHGpZD5EEko'

          // get all the inputs from user
          const agentName = document.getElementById('agent-name').value
          const agentEmail = document.getElementById('agent-email').value
          const agentPhone = document.getElementById('agent-phone').value
        //   let shareEmails = document.getElementById('share-emails').value
          let shareEmails = null
        //   let shareMessage = document.getElementById('share-message').value
          let shareMessage = null
          let appraisal = formatCurrency(property.valuation.appraisal)
          const appraisalAfter = document.getElementById('report-honey-value-after').innerText
          let apn = getAPN()
          let address1 = getAddress1()
          let address2 = getAddress2()
          let city = getCity()
          let state = getState()
          let zip = getZip()
          let county = getCounty()
          let yearBuilt = getYearBuilt()
          const stories = document.getElementById('stories').value
          const sqft = document.getElementById('sqft').value
          const numBeds = document.getElementById('num-beds').value
          const numBaths = document.getElementById('num-baths').value
          const numPartialBaths = document.getElementById('num-partial-bath').value
          const roomCount = document.getElementById('room-count').value
          let otherRooms = document.getElementById('other-rooms').value
          let acType = document.getElementById('ac-type').value
          let parkingSpaces = document.getElementById('parking-spaces').value
          let plumbingCount = document.getElementById('plumbing-count').value
          let parkingType = document.getElementById('parking-type').value
          let heatType = document.getElementById('heat-type').value
          let heatFuelType = document.getElementById('heat-fuel-type').value
          let pool = document.getElementById('pool').value
          let amenities = document.getElementById('amenities').value
          let condition = document.getElementById('condition').value
          let architecture = document.getElementById('architecture').value
          let construction = document.getElementById('construction').value
          let basementType = document.getElementById('basement-type').value
          let roofStyle = document.getElementById('roof-style').value
          let roofMaterial = document.getElementById('roof-material').value
          let exteriorWalls = document.getElementById('exterior-walls').value
          let interiorWalls = document.getElementById('interior-walls').value
          let flooring = document.getElementById('flooring').value
          let waterType = document.getElementById('water-type').value
          let sewerType = document.getElementById('sewer-type').value
          const brokerageLogo = document.getElementById('brokerage-logo').value
          let saleDate = document.getElementById('sale-date').value
          let salePrice = document.getElementById('sale-price').value

          // update data to default -----------------------------
          if (appraisalAfter && appraisalAfter !== '' && appraisalAfter !== '--') {
            appraisal = appraisalAfter
          }
          // check custom logo, if 0, use default
          if (customLogoData === 0) {
            if (brokerageLogo !== '--') {
              customLogoData = 'https://honely-files-public.s3.amazonaws.com/report/brokerages/logo-' + brokerageLogo + '.png'
            } else {
              customLogoData = 'https://honely-files-public.s3.amazonaws.com/report/logo_honely_report_default.png'
            }
          }
          // update null data
          if (apn || apn === '') {
            apn = ' '
          }
          if (address1 === null || address1 === '') {
            address1 = ' '
          }
          if (address2 === null || address2 === '') {
            address2 = ' '
          }
          if (city === null || city === '') {
            city = ' '
          }
          if (state === null || state === '') {
            state = ' '
          }
          if (zip === null || zip === '') {
            zip = ' '
          }
          if (county === null || county === '') {
            county = ' '
          }
          if (yearBuilt === null || yearBuilt === '') {
            yearBuilt = ' '
          } else {
            yearBuilt = yearBuilt.toString()
          }
          if (parkingSpaces === '') {
            parkingSpaces = ' '
          }
          if (plumbingCount === '') {
            plumbingCount = ' '
          }
          // update drop-down list default value
          if (otherRooms === '--') {
            otherRooms = ' '
          }
          if (acType === '--') {
            acType = ' '
          }
          if (parkingType && parkingType !== '') {
            parkingType = doTextConversionnHTML4(parkingType)
          } else {
            parkingType = ' '
          }
          if (heatType === '--') {
            heatType = ' '
          }
          if (heatFuelType === '--') {
            heatFuelType = ' '
          }
          if (pool === '--') {
            pool = ' '
          } else {
            pool = doTextConversionnHTML4(pool)
          }
          if (amenities === '--') {
            amenities = ' '
          }
          if (condition === '--') {
            condition = ' '
          }
          if (architecture === '--') {
            architecture = ' '
          }
          if (construction === '--') {
            construction = ' '
          }
          if (basementType === '--') {
            basementType = ' '
          }
          if (roofStyle === '--') {
            roofStyle = ' '
          }
          if (roofMaterial === '--') {
            roofMaterial = ' '
          } else {
            roofMaterial = doTextConversionnHTML4(roofMaterial)
          }
          if (exteriorWalls === '--') {
            exteriorWalls = ' '
          }
          if (interiorWalls === '--') {
            interiorWalls = ' '
          }
          if (flooring === '--') {
            flooring = ' '
          }
          if (waterType === '--') {
            waterType = ' '
          }
          if (sewerType === '--') {
            sewerType = ' '
          }

          // get additional data ---------------------------------
          // schools
          const schoolList = []
          // vx: todo: schools part...

          // walkscore
          const walkscoreList = []
          // vx: todo: walkscore part...

          // honely forecast
          const honelyForecast = []
          if (forecast && forecast.property_forecast.percentage_change_forecasts && forecast.property_forecast.value_change_forecasts) {
            let change = ''
            for (let i = 1; i < forecast.property_forecast.percentage_change_forecasts.length; i++) {
              if (forecast.property_forecast.percentage_change_forecasts[i].change >= 0) {
                change = '<span style="color: #07871c;">increase ' + forecast.property_forecast.percentage_change_forecasts[i].change + '%</span>'
              } else {
                change = '<span style="color: red;">decrease ' + forecast.property_forecast.percentage_change_forecasts[i].change + '%</span>'
              }
              honelyForecast.push([timeFrame4lvls[i], change, formatCurrency(forecast.property_forecast.value_change_forecasts[i].change)])
            }
          }

          // home value change zip
          const homeValueChangeZip = []
          if (forecast && forecast.neighborhood.percentage_change_forecasts) {
            let change = ''
            for (let i = 1; i < forecast.neighborhood.percentage_change_forecasts.length; i++) {
              if (forecast.neighborhood.percentage_change_forecasts[i].change >= 0) {
                change = '<span style="color: #07871c;">increase ' + forecast.neighborhood.percentage_change_forecasts[i].change + '%</span>'
              } else {
                change = '<span style="color: red;">decrease ' + forecast.neighborhood.percentage_change_forecasts[i].change + '%</span>'
              }
              homeValueChangeZip.push([timeFrame3lvls[i], change])
            }
          }

          // migration trends
          const migrationTrends = []
          if (forecast && forecast.moving_trends && forecast.moving_trends.move_in_percentage_change_forecast && forecast.moving_trends.move_out_percentage_change_forecast && forecast.moving_trends.net_in && forecast.moving_trends.state_rankings && forecast.moving_trends.country_rankings) {
            let inRateChange = ''
            let outRateChange = ''
            let migrationChange = ''

            for (let i = 0; i < forecast.moving_trends.move_in_percentage_change_forecast.length; i++) {
              if (forecast.moving_trends.move_in_percentage_change_forecast[i].change >= 0) {
                inRateChange = '<span style="color: #07871c;">' + forecast.moving_trends.move_in_percentage_change_forecast[i].change + '%</span>'
              } else {
                inRateChange = '<span style="color: red;">' + forecast.moving_trends.move_in_percentage_change_forecast[i].change + '%</span>'
              }
              if (forecast.moving_trends.move_out_percentage_change_forecast[i].change >= 0) {
                outRateChange = '<span style="color: #07871c;">' + forecast.moving_trends.move_out_percentage_change_forecast[i].change + '%</span>'
              } else {
                outRateChange = '<span style="color: red;">' + forecast.moving_trends.move_out_percentage_change_forecast[i].change + '%</span>'
              }
              if (forecast.moving_trends.net_in[i].change >= 0) {
                migrationChange = '<span style="color: #07871c;">' + forecast.moving_trends.net_in[i].change + '%</span>'
              } else {
                migrationChange = '<span style="color: red;">' + forecast.moving_trends.net_in[i].change + '%</span>'
              }
              migrationTrends.push([timeFrame4lvls[i], inRateChange, outRateChange, migrationChange, '#' + forecast.moving_trends.state_rankings[i].rank, '#' + forecast.moving_trends.country_rankings[i].rank])
            }
          }

          // comparsion to zip
          let propertyValueForecast = ''
          if (forecast && forecast.property_forecast.property_valued_compared_to_zipcode) {
            if (forecast.property_forecast.property_valued_compared_to_zipcode >= 0) {
              propertyValueForecast = '<span style="color: #07871c;">' + forecast.property_forecast.property_valued_compared_to_zipcode + '% higher</span>'
            } else {
              propertyValueForecast = '<span style="color: red;">' + forecast.property_forecast.property_valued_compared_to_zipcode + '% lower</span>'
            }
          }

          // check property status, only show list price if active
          // console.log(property)
          let listPrice = ' '
          if (property && property.status && property.status !== null) {
            if (property.status.toLowerCase() === 'active' || property.status.toLowerCase() === 'for sale') {
              if (property.valuation.list_price && property.valuation.list_price !== null) {
                listPrice = '<p style="font-size: 16px;">List Price: ' + formatCurrency(property.valuation.list_price) + '</p>'
              }
            }
          }
          // console.log(listPrice)
          // sale history
          if (saleDate === '') {
            saleDate = ' '
          }

          if (salePrice === '') {
            salePrice = ' '
          }

          /* if (property.sale_history && property.sale_history.length > 0) {
            saleDate = property.sale_history[0].date
            salePrice = formatCurrency(property.sale_history[0].price)
          } */

          // get rental trend data
          const rentalTrendss = []
        
            rentalTrendss.push(
              [
                'Zip Code',
                'N/A',
                'N/A',
                'N/A',
                'N/A',
                'N/A',
                'N/A',
              ],
            )
            rentalTrendss.push(
              [
                'State',
                'N/A',
                'N/A',
                'N/A',
                'N/A',
                'N/A',
                'N/A',
              ],
            )
            rentalTrendss.push(
              [
                'Metro',
                'N/A',
                'N/A',
                'N/A',
                'N/A',
                'N/A',
                'N/A',
              ],
            )
        //   }

          // prepare report request body
          const templateTest = 'template_honely_basic_test.html'
          const templateProd = 'template_honely_basic.html'

          const body = {
            user_id: user.user_id,
            // property_id: forecast.property_forecast.property_id,
            template: templateProd,
            DATE: {
              type: 'text',
              data: getToday(),
            },
            PROPERTY_URL: {
              type: 'text',
              data: 'https://www.honely.com/forecast/' + property.address.property_id,
            },
            IMG_LOCATION: {
              type: 'image',
              data: propertyImg,
            },
            ADDRESS_1: {
              type: 'text',
              data: address1,
            },
            ADDRESS_2: {
              type: 'text',
              data: address2,
            },
            CITY: {
              type: 'text',
              data: city,
            },
            STATE: {
              type: 'text',
              data: state,
            },
            ZIP: {
              type: 'text',
              data: zip,
            },
            AGENT_NAME: {
              type: 'text',
              data: agentName,
            },
            EMAIL: {
              type: 'text',
              data: agentEmail,
            },
            PHONE: {
              type: 'text',
              data: agentPhone,
            },
            CUSTOM_LOGO: {
              type: 'text',
              data: customLogoData,
            },
            LIST_PRICE: {
              type: 'text',
              data: listPrice,
            },
            VALUATION_PRICE: {
              type: 'text',
              data: appraisal,
            },
            NUM_BEDS: {
              type: 'text',
              data: numBeds,
            },
            NUM_BATHS: {
              type: 'text',
              data: numBaths,
            },
            SQFT: {
              type: 'text',
              data: sqft,
            },
            STORIES: {
              type: 'text',
              data: stories,
            },
            STYLE: {
              type: 'text',
              data: architecture,
            },
            YEAR_BUILT: {
              type: 'text',
              data: yearBuilt,
            },
            COUNTY: {
              type: 'text',
              data: county,
            },
            APN: {
              type: 'text',
              data: apn,
            },
            SALE_DATE: {
              type: 'text',
              data: saleDate,
            },
            SALE_PRICE: {
              type: 'text',
              data: salePrice,
            },
            LAND: {
              type: 'text',
              data: formatCurrency(property.tax[0].land),
            },
            ADDITIONS: {
              type: 'text',
              data: formatCurrency(property.tax[0].additions),
            },
            ASSESSED_VALUE: {
              type: 'text',
              data: formatCurrency(property.tax[0].assessed_value),
            },
            TAX_YEAR: {
              type: 'text',
              data: property.tax[0].year.toString(),
            },
            PROPERTY_TAX: {
              type: 'text',
              data: formatCurrency(property.tax[0].property_tax),
            },
            NUM_PART_BATHS: {
              type: 'text',
              data: numPartialBaths,
            },
            ROOM_COUNT: {
              type: 'text',
              data: roomCount,
            },
            OTHER_ROOMS: {
              type: 'text',
              data: otherRooms,
            },
            AC_TYPE: {
              type: 'text',
              data: acType,
            },
            HEATING_TYPE: {
              type: 'text',
              data: heatType,
            },
            HEATING_FUEL: {
              type: 'text',
              data: heatFuelType,
            },
            AMENITIES: {
              type: 'text',
              data: amenities,
            },
            PARKING_TYPE: {
              type: 'text',
              data: parkingType,
            },
            PARKING_COUNT: {
              type: 'text',
              data: parkingSpaces,
            },
            PLUMBING_COUNT: {
              type: 'text',
              data: plumbingCount,
            },
            POOL: {
              type: 'text',
              data: pool,
            },
            SCHOOLS: {
              type: 'array',
              data: {
                row_class: null,
                array: schoolList,
              },
            },
            WALKSCORE: {
              type: 'array',
              data: {
                row_class: null,
                array: walkscoreList,
              },
            },
            UNIT_COUNT: {
              type: 'text',
              data: roomCount,
            },
            ARCHITECTURE_TYPE: {
              type: 'text',
              data: architecture,
            },
            CONDITION: {
              type: 'text',
              data: condition,
            },
            EXTERIOR_WALLS: {
              type: 'text',
              data: exteriorWalls,
            },
            SEWER_TYPE: {
              type: 'text',
              data: sewerType,
            },
            WATER_TYPE: {
              type: 'text',
              data: waterType,
            },
            CONSTRUCTION_TYPE: {
              type: 'text',
              data: construction,
            },
            ROOF_STYLE: {
              type: 'text',
              data: roofStyle,
            },
            ROOF_MATERIAL: {
              type: 'text',
              data: roofMaterial,
            },
            INTERIOR_WALLS: {
              type: 'text',
              data: interiorWalls,
            },
            FLOORING: {
              type: 'text',
              data: flooring,
            },
            BASEMENT_TYPE: {
              type: 'text',
              data: basementType,
            },
            PROPERTY_VALUE_FORECAST: {
              type: 'text',
              data: propertyValueForecast,
            },
            HONELY_FORECAST: {
              type: 'array',
              data: {
                row_class: null,
                array: honelyForecast,
              },
            },
            HOME_VALUE_CHANGE_ZIP: {
              type: 'array',
              data: {
                row_class: null,
                array: homeValueChangeZip,
              },
            },
            STATE_RANKING_TOTAL: {
              type: 'text',
              data: forecast.moving_trends.total_state_rank,
            },
            NATIONAL_RANKING_TOTAL: {
              type: 'text',
              data: forecast.moving_trends.total_country_rank,
            },
            MONTH3_ZIP_STATE_RANK: {
              type: 'text',
              data: forecast.neighborhood.zipcode_growth_state_ranking_forecasts[1].change,
            },
            MONTH3_ZIP_NATIONAL_RANK: {
              type: 'text',
              data: forecast.neighborhood.zipcode_growth_national_ranking_forecasts[1].change,
            },
            MONTH3_VALUE_STATE_RANK: {
              type: 'text',
              data: forecast.neighborhood.avg_value_state_ranking_forecasts[1].change,
            },
            MONTH3_VALUE_NATIONAL_RANK: {
              type: 'text',
              data: forecast.neighborhood.avg_value_national_ranking_forecasts[1].change,
            },
            YEAR1_ZIP_STATE_RANK: {
              type: 'text',
              data: forecast.neighborhood.zipcode_growth_state_ranking_forecasts[2].change,
            },
            YEAR1_ZIP_NATIONAL_RANK: {
              type: 'text',
              data: forecast.neighborhood.zipcode_growth_national_ranking_forecasts[2].change,
            },
            YEAR1_VALUE_STATE_RANK: {
              type: 'text',
              data: forecast.neighborhood.avg_value_state_ranking_forecasts[2].change,
            },
            YEAR1_VALUE_NATIONAL_RANK: {
              type: 'text',
              data: forecast.neighborhood.avg_value_national_ranking_forecasts[2].change,
            },
            YEAR2_ZIP_STATE_RANK: {
              type: 'text',
              data: forecast.neighborhood.zipcode_growth_state_ranking_forecasts[3].change,
            },
            YEAR2_ZIP_NATIONAL_RANK: {
              type: 'text',
              data: forecast.neighborhood.zipcode_growth_national_ranking_forecasts[3].change,
            },
            YEAR2_VALUE_STATE_RANK: {
              type: 'text',
              data: forecast.neighborhood.avg_value_state_ranking_forecasts[3].change,
            },
            YEAR2_VALUE_NATIONAL_RANK: {
              type: 'text',
              data: forecast.neighborhood.avg_value_national_ranking_forecasts[3].change,
            },
            YEAR3_ZIP_STATE_RANK: {
              type: 'text',
              data: forecast.neighborhood.zipcode_growth_state_ranking_forecasts[4].change,
            },
            YEAR3_ZIP_NATIONAL_RANK: {
              type: 'text',
              data: forecast.neighborhood.zipcode_growth_national_ranking_forecasts[4].change,
            },
            YEAR3_VALUE_STATE_RANK: {
              type: 'text',
              data: forecast.neighborhood.avg_value_state_ranking_forecasts[4].change,
            },
            YEAR3_VALUE_NATIONAL_RANK: {
              type: 'text',
              data: forecast.neighborhood.avg_value_national_ranking_forecasts[4].change,
            },
            CHART_3MONTH: {
              type: 'text',
              data: chart3monthImg,
            },
            CHART_1YEAR: {
              type: 'text',
              data: chart1yearImg,
            },
            CHART_2YEAR: {
              type: 'text',
              data: chart2yearsImg,
            },
            CHART_3YEAR: {
              type: 'text',
              data: chart3yearsImg,
            },
            CHART_RENT: {
              type: 'text',
              data: chartMedianRentImg,
            },
            CHART_CASHFLOW: {
              type: 'text',
              data: chartCashFlowImg,
            },
            CHART_GROWTH: {
              type: 'text',
              data: chartGrowthImg,
            },
            MIGRATION_STATE_RANK: {
              type: 'text',
              data: forecast.moving_trends.total_state_rank,
            },
            MIGRATION_COUNTRY_RANK: {
              type: 'text',
              data: forecast.moving_trends.total_country_rank,
            },
            MIGRATION_TRENDS: {
              type: 'array',
              data: {
                row_class: null,
                array: migrationTrends,
              },
            },
            RENTAL_TRENDS: {
              type: 'array',
              data: {
                row_class: null,
                array: rentalTrendss,
              },
            },
          }

          // add share properties if share mode is true
          if (shareMode) {
            if (shareEmails) {
              shareEmails = shareEmails.trim().replace(' ', '')
              if (shareEmails !== '') {
                if (shareMessage) {
                  shareMessage = doTextConversionnHTML4(shareMessage.trim())

                  if (shareMessage === '') {
                    shareMessage = ' '
                  }
                }
                body.share = {
                  sender: agentName,
                  to: shareEmails,
                  message: shareMessage,
                }
              } else {
                shareMode = false
              }
            } else {
              shareMode = false
            }
          }

          // console.log(JSON.stringify(body))

          // send request
          let prodUrl = ''
          let localUrl = ''

          if (shareMode) {
            prodUrl = 'https://api.honely.com/util/reports/pdf/share'
            localUrl = 'http://localhost:8080/reports/pdf/share'
          } else {
            if (!cmaMode) {
              prodUrl = 'https://api.honely.com/util/reports/pdf'
              localUrl = 'http://localhost:8080/reports/pdf'
            //   vx: need to remove forecast and property for reportform from sessionStorage, done
              window.sessionStorage.removeItem('SinglePropertyReport')
              var pika = {array : []}
              pika.array.push(body)
              window.sessionStorage.setItem('SinglePropertyReport', JSON.stringify(pika))
              window.sessionStorage.removeItem('reportFormForecast')
              window.sessionStorage.removeItem('reportFormProperty')
            //   vx: need to redirect to single property report purchase page, done
                window.location.href = '/sppurchase'
                // window.location.href = '/paymentcheckout?mode=single-property-report-purchase' //vx: temporary
              return
            } else {
                var pika = {array : []}
                var pika2 = {array : []}
                if (!inCMA) {
                    // vx: generate cma button from reportintro page
                    window.sessionStorage.removeItem('CMA')
                    window.sessionStorage.removeItem('CMASubjectPropertyId')
                    pika.array.push(body)
                    window.sessionStorage.setItem('CMA', JSON.stringify(pika))
                    pika2.array.push(forecast.property_forecast.property_id)
                    window.sessionStorage.setItem('CMASubjectPropertyId',  JSON.stringify(pika2))
                    // vx: need to redirect
                    window.sessionStorage.removeItem('reportFormForecast')
                    window.sessionStorage.removeItem('reportFormProperty')
                    setTimeout(() => {
                        window.location.href = '/cma'
                    },500)
                } else {
                    // vx: generate cma button from cma page
                    /*
                    add to the table
                    add to the cma payload
                    */
                    pika = JSON.parse(window.sessionStorage.getItem('CMA'))
                    pika.array.push(body)
                    window.sessionStorage.setItem('CMA', JSON.stringify(pika))
                    var pika2 = JSON.parse(window.sessionStorage.getItem('CMASubjectPropertyId'))
                    pika2.array.push(forecast.property_forecast.property_id)
                    window.sessionStorage.setItem('CMASubjectPropertyId', JSON.stringify(pika2))
                    // removeReportForm()
                    // window.location.reload()
                    window.sessionStorage.removeItem('reportFormForecast')
                    window.sessionStorage.removeItem('reportFormProperty')
                    setTimeout(() => {
                        window.location.href = '/cma'
                    },500)
                }
                // if (!inCMA) {
                //     var pika = {}
                //     pika['0'] = body
                //     window.sessionStorage.setItem('CMA', JSON.stringify(pika))
                // } else {
                //     var pika = JSON.parse(window.sessionStorage.getItem('CMA'))
                //     pika[Object.keys(pika).length.toString()] = body
                //     window.sessionStorage.setItem('CMA', JSON.stringify(pika))
                //     window.location.reload()
                // }
                return
            }
          }

          // display loader and disable button
          // loading = true
          displayLoader()
          disableSubmitButton()
        //   const self = this

          console.log('[INFO] Start generating PDF report......')
          fetch(prodUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          }).then(function (response) {
            // console.log(response)
            return response.blob()
          }).then(function (blob) {
            if (!shareMode) {
              var url = window.URL.createObjectURL(blob)
              var a = document.createElement('a')
              a.href = url
              a.download = 'honely_report.pdf'
              document.body.appendChild(a)
              a.click()
              a.remove()
            }
            // self.loading = false
            hideLoder()
            enableSubmitButton()
            console.log('[INFO] Finished generating PDF report......')
            // freeReportsLeft--
            let config = {
                headers: {
                  'Authorization': 'Bearer ' + props.jwt
                }
              }
            var payload = null
            if (creditsFlag) {
                payload = {
                    'credit-amount': 1
                }
            } else {
                payload = {
                    'dollar-amount': 0.5
                }
            }
            axios.post('https://developers.honely.com/user/buy-report', payload, config)
            .then(() => {
                window.sessionStorage.removeItem('PaymentPopup')
                window.location.reload()
            })
          }).catch((err) => {
            // self.loading = false
            hideLoder()
            enableSubmitButton()
            console.log('PDF Request Failed', err)
          })
        })
      }
      function doInitialEstimate () {
        // TO DO WHEN API is ready
        // get all the inputs from user
        // console.log(property)
        if (property) {
          const propertyId = property.address.property_id
          const fips = property.address.fips
          let zip = property.address.zip_code
          let yearBuilt = property.structure.year_built
          let stories = property.structure.stories
          let sqft = property.structure.total_area_sq_ft
          let numBeds = property.structure.beds_count
          let numBaths = property.structure.baths
          let numPartialBaths = property.structure.partial_baths_count
          let roomCount = property.structure.rooms_count
          let parkingSpaces = property.structure.parking_spaces_count
          let plumbingCount = property.structure.plumbing_fixtures

          // check numerical inputs
          if (!validateNumericalInput(sqft)) {
            sqft = 0
          }
          if (!validateNumericalInput(numBeds)) {
            numBeds = 0
          }
          if (!validateNumericalInput(numBaths)) {
            numBaths = 0
          }
          if (!validateNumericalInput(numPartialBaths)) {
            numPartialBaths = 0
          }
          if (!validateNumericalInput(roomCount)) {
            roomCount = 0
          }
          if (!validateNumericalInput(parkingSpaces)) {
            parkingSpaces = 0
          }
          if (!validateNumericalInput(plumbingCount)) {
            plumbingCount = 0
          }

          // update null data
          if (zip === null || zip === '') {
            zip = null
          }
          if (yearBuilt !== null || yearBuilt !== '') {
            yearBuilt = yearBuilt.toString()
          }
          if (stories == null) {
            stories = 0
          } else {
            stories = doConvertDropdownToCode('stories', stories)
          }

          const body = {
            basic_info: {
              property_id: propertyId,
              fips: fips,
              zip: zip,
              year_build: yearBuilt,
            },
            numerical: {
              sqft: formatNumber(sqft),
              num_beds: numBeds,
              num_baths: numBaths,
              num_partial_baths: numPartialBaths,
              room_count: roomCount,
              parking_spaces: parkingSpaces,
              plumbing_count: plumbingCount,
            },
            category: {
              stories: stories,
              other_rooms: null,
              air_condition: null,
              heat_type: null,
              heat_fuel_type: null,
              pool_type: null,
              building_condition: null,
              architecture: null,
              construction: null,
              basement_type: null,
              roof_style: null,
              roof_material_type: null,
              exterior_walls: null,
              interior_walls: null,
              flooring: null,
              garage_type: null,
              water_type: null,
              sewer_type: null,
            },
          }
          // console.log(JSON.stringify(body))
        //   const self = this
          const apiURL = 'https://api.honely.com/calculator/honely_calculator'

          fetch(apiURL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          }).then(function (response) {
            // console.log(response)
            return response.json()
          }).then(function (data) {
            // console.log(data)
            if (data) {
              if (data.current_value) {
                // self.initialRate = data.current_value
                setInitialRate(data.current_value)
              }
            }
          }).catch((err) => {
            console.log('[ERROR] Honely calculator API failed =>', err)
          })
        }
      }
      function doGetForecastResult (data) {
        if (data) {
          // console.log('inital: ' + this.initialRate)
          console.log('vx: forecast.property_forecast.appraisal', forecast.property_forecast.appraisal)
          console.log('vx: data.current_value', data.current_value)
          console.log('vx: initialRate', initialRate)
          if (forecast.property_forecast.appraisal && data.current_value) {
            if (parseFloat(data.current_value) !== parseFloat(initialRate)) {
                console.log('vx: psyduck4', parseFloat(forecast.property_forecast.appraisal) * (parseFloat(data.current_value) / parseFloat(initialRate)))
              return parseFloat(forecast.property_forecast.appraisal) * (parseFloat(data.current_value) / parseFloat(initialRate))
            } else {
                console.log('vx: psyduck3', forecast.property_forecast.appraisal)
              return parseFloat(forecast.property_forecast.appraisal)
            }
          } else {
            console.log('vx: psyduck1')
            return null
          }
        } else {
            console.log('vx: psyduck2')
          return null
        }
      }
      function doUpdateCalculatorResult (data) {
        if (data) {
          document.getElementById('report-honey-value-after').innerHTML = formatCurrency(doGetForecastResult(data))
        } else {
          document.getElementById('report-honey-value-after').innerHTML = '--'
        }
      }
    function doConvertDropdownToCode (dropdown, option) {
        if (dropdown && option) {
          if (dropdown === 'stories') {
            const temp = option.replace('Stories', '').replace('Story', '').replace(' ', '')
            if (!isNaN(temp)) {
              return parseInt(parseFloat(temp) * 100)
            }
          } else {
            return null
          }
        } else {
          return null
        }
      }
    function validateNumericalInput (value) {
        if (value) {
          value = value.trim()

          if (value !== '') {
            if (isNaN(value)) {
              return false
            } else {
              if (parseFloat(value) < 0) {
                return false
              } else {
                return true
              }
            }
          } else {
            return false
          }
        } else {
          return false
        }
      }
    function displayLoader () {
        document.getElementById('report-loader').classList.add('active')
      }
    function doUpdateHonelyEstimate () {
        // TO DO WHEN API is ready
        // get all the inputs from user
        // console.log(property)
        if (property) {
          const propertyId = property.address.property_id
          const fips = property.address.fips
          let zip = property.address.zip_code
          let yearBuilt = property.structure.year_built
          // let stories = document.getElementById('stories').value
          let stories = property.structure.stories
          const sqft = document.getElementById('sqft').value
          const numBeds = document.getElementById('num-beds').value
          const numBaths = document.getElementById('num-baths').value
          let numPartialBaths = document.getElementById('num-partial-bath').value
          let roomCount = document.getElementById('room-count').value
          let parkingSpaces = document.getElementById('parking-spaces').value
          let plumbingCount = document.getElementById('plumbing-count').value

          // check numerical inputs
          if (!validateNumericalInput(sqft)) {
            document.getElementById('sqft').classList.add('error-input')
            alert('Please enter a valid number')
            return
          } else {
            document.getElementById('sqft').classList.remove('error-input')
          }
          if (!validateNumericalInput(numBeds)) {
            document.getElementById('num-beds').classList.add('error-input')
            alert('Please enter a valid number')
            return
          } else {
            document.getElementById('num-beds').classList.remove('error-input')
          }
          if (!validateNumericalInput(numBaths)) {
            document.getElementById('num-baths').classList.add('error-input')
            alert('Please enter a valid number')
            return
          } else {
            document.getElementById('num-baths').classList.remove('error-input')
          }
          if (!validateNumericalInput(numPartialBaths)) {
            numPartialBaths = 0
          }
          if (!validateNumericalInput(roomCount)) {
            roomCount = 0
          }
          if (!validateNumericalInput(parkingSpaces)) {
            parkingSpaces = 0
          }
          if (!validateNumericalInput(plumbingCount)) {
            plumbingCount = 0
          }

          // update null data
          if (zip === null || zip === '') {
            zip = null
          }
          if (yearBuilt !== null || yearBuilt !== '') {
            yearBuilt = yearBuilt.toString()
          }
          if (stories === '--') {
            stories = 0
          } else {
            stories = doConvertDropdownToCode('stories', stories)
          }

          const body = {
            basic_info: {
              property_id: propertyId,
              fips: fips,
              zip: zip,
              year_build: yearBuilt,
            },
            numerical: {
              sqft: sqft,
              num_beds: numBeds,
              num_baths: numBaths,
              num_partial_baths: numPartialBaths,
              room_count: roomCount,
              parking_spaces: parkingSpaces,
              plumbing_count: plumbingCount,
            },
            category: {
              stories: stories,
              other_rooms: null,
              air_condition: null,
              heat_type: null,
              heat_fuel_type: null,
              pool_type: null,
              building_condition: null,
              architecture: null,
              construction: null,
              basement_type: null,
              roof_style: null,
              roof_material_type: null,
              exterior_walls: null,
              interior_walls: null,
              flooring: null,
              garage_type: null,
              water_type: null,
              sewer_type: null,
            },
          }

          // console.log(JSON.stringify(body))

          // display loader and disable button
          // loading = true
          displayLoader()
        //   const self = this
          const apiURL = 'https://api.honely.com/calculator/honely_calculator'
          console.log('[INFO] Start Honely calculator......')

          fetch(apiURL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          }).then(function (response) {
            // console.log(response)
            return response.json()
          }).then(function (data) {
            // console.log(data)
            // self.loading = false
            hideLoder()

            // update component
            if (data) {
              // console.log(data.current_value)
              // document.getElementById('forecast-result-after').innerHTML = self.formatCurrency(self.doGetForecastResult(data))
              if (doGetForecastResult(data) && doGetForecastResult(data) != null) {
                doUpdateCalculatorResult(data)
              } else {
                doUpdateCalculatorResult(null)
              }
            }
            console.log('[INFO] Finished processing Honely calculator......')
          }).catch((err) => {
            // self.loading = false
            hideLoder()
            console.log('[ERROR] Honely calculator API failed =>', err)
          })
        }
      }
    function reportChartOptionsGrowth () {
        return {
          plotOptions: {
            bar: {
              distributed: false,
              dataLabels: {
                position: 'top',
              },
            },
          },
          xaxis: {
            categories: ['1 Year', '3 Years', '5 Years'],
            labels: {
              show: true,
            },
          },
          legend: {
            horizontalAlign: 'left',
          },
          chart: {
            toolbar: {
              show: false,
            },
          },
          colors: [
            '#24cb43', '#ff7d1f', '#f5da0f',
          ],
          dataLabels: {
            offsetY: -20,
            style: {
              colors: ['#434544'],
            },
            formatter: function (val, opts) {
              return val + '%'
            },
          },
        }
      }
    function reportChartOptionsCashFlow () {
        return {
          plotOptions: {
            bar: {
              distributed: true,
              dataLabels: {
                position: 'top',
              },
            },
          },
          xaxis: {
            categories: ['Zip', 'State', 'Metro'],
            labels: {
              show: false,
            },
          },
          legend: {
            horizontalAlign: 'left',
          },
          chart: {
            toolbar: {
              show: false,
            },
          },
          colors: [
            '#24cb43', '#ff7d1f', '#f5da0f',
          ],
          dataLabels: {
            offsetY: -20,
            style: {
              colors: ['#434544'],
            },
            formatter: function (val, opts) {
              return val + '%'
            },
          },
        }
      }
    function reportChartOptionsMedianRent () {
        return {
          plotOptions: {
            bar: {
              distributed: true,
              dataLabels: {
                position: 'top',
              },
            },
          },
          xaxis: {
            categories: ['Zip', 'State', 'Metro'],
            labels: {
              show: false,
            },
          },
          legend: {
            horizontalAlign: 'left',
          },
          chart: {
            toolbar: {
              show: false,
            },
          },
          colors: [
            '#24cb43', '#ff7d1f', '#f5da0f',
          ],
          dataLabels: {
            offsetY: -20,
            style: {
              colors: ['#434544'],
            },
            formatter: function (val, opts) {
              return '$' + val
            },
          },
        }
      }
    function reportChartOptions () {
        return {
          plotOptions: {
            bar: {
              distributed: true,
              dataLabels: {
                position: 'top',
              },
            },
          },
          xaxis: {
            categories: [forecast.zipcode, 'Surrounding 10 zip codes', 'State'],
            labels: {
              show: false,
            },
          },
          legend: {
            horizontalAlign: 'left',
          },
          chart: {
            toolbar: {
              show: false,
            },
          },
          colors: [
            '#24cb43', '#ff7d1f', '#f5da0f',
          ],
          dataLabels: {
            offsetY: -20,
            style: {
              colors: ['#434544'],
            },
            formatter: function (val, opts) {
              return val + '%'
            },
          },
        }
      }
    function chartMedianRent () {
        return [{
            name: 'Median Rent',
            data: [],
          }]
      }
    function chartCashFlow () {
        return [{
            name: 'Cash Flow',
            data: [],
          }]
      }
    function hideLoder () {
        document.getElementById('report-loader').classList.remove('active')
      }

    function chartRentalGrowth () {
        return [
            {
              name: 'Zip',
              data: [],
            },
            {
              name: 'State',
              data: [],
            },
            {
              name: 'Metro',
              data: [],
            },
          ]
      }
    function chart3month () {
        console.log('vx: chart3month run, forecast', forecast)
        if (forecast) {
          if (forecast.neighborhood.percentage_change_forecasts && forecast.surrounding_zipcode.percentage_change_forecasts && forecast.state_statistics.percentage_change_forecasts) {
              console.log('vx: 111111', [{
                name: 'Percent Change',
                data: [
                  forecast.neighborhood.percentage_change_forecasts[1].change,
                  forecast.surrounding_zipcode.percentage_change_forecasts[1].change,
                  forecast.state_statistics.percentage_change_forecasts[1].change,
                ],
              }])
            return [{
              name: 'Percent Change',
              data: [
                forecast.neighborhood.percentage_change_forecasts[1].change,
                forecast.surrounding_zipcode.percentage_change_forecasts[1].change,
                forecast.state_statistics.percentage_change_forecasts[1].change,
              ],
            }]
          } else {
            console.log('vx: 222222')
            return [{
              name: 'Percent Change',
              data: [],
            }]
          }
        } else {
            console.log('vx: 333333')
          return [{
            name: 'Percent Change',
            data: [],
          }]
        }
      }
    function chart1year () {
        if (forecast) {
          if (forecast.neighborhood.percentage_change_forecasts && forecast.surrounding_zipcode.percentage_change_forecasts && forecast.state_statistics.percentage_change_forecasts) {
            return [{
              name: 'Percent Change',
              data: [
                forecast.neighborhood.percentage_change_forecasts[2].change,
                forecast.surrounding_zipcode.percentage_change_forecasts[2].change,
                forecast.state_statistics.percentage_change_forecasts[2].change,
              ],
            }]
          } else {
            return [{
              name: 'Percent Change',
              data: [],
            }]
          }
        } else {
          return [{
            name: 'Percent Change',
            data: [],
          }]
        }
      }
    function chart2years () {
        if (forecast) {
          if (forecast.neighborhood.percentage_change_forecasts && forecast.surrounding_zipcode.percentage_change_forecasts && forecast.state_statistics.percentage_change_forecasts) {
            return [{
              name: 'Percent Change',
              data: [
                forecast.neighborhood.percentage_change_forecasts[3].change,
                forecast.surrounding_zipcode.percentage_change_forecasts[3].change,
                forecast.state_statistics.percentage_change_forecasts[3].change,
              ],
            }]
          } else {
            return [{
              name: 'Percent Change',
              data: [],
            }]
          }
        } else {
          return [{
            name: 'Percent Change',
            data: [],
          }]
        }
      }
    function chart3years () {
        if (forecast) {
          if (forecast.neighborhood.percentage_change_forecasts && forecast.surrounding_zipcode.percentage_change_forecasts && forecast.state_statistics.percentage_change_forecasts) {
            return [{
              name: 'Percent Change',
              data: [
                forecast.neighborhood.percentage_change_forecasts[3].change,
                forecast.surrounding_zipcode.percentage_change_forecasts[3].change,
                forecast.state_statistics.percentage_change_forecasts[3].change,
              ],
            }]
          } else {
            return [{
              name: 'Percent Change',
              data: [],
            }]
          }
        } else {
          return [{
            name: 'Percent Change',
            data: [],
          }]
        }
      }
    function GetHonelyAppraisal () {
        // console.log(property)
        if (property && property.valuation.appraisal) {
          return formatCurrency(property.valuation.appraisal)
        } else {
          return '--'
        }
      }
    function getMostRecentSaleDate () {
        if (property && property.sale_history) {
          if (property.sale_history != null && property.sale_history.length > 0) {
            if (property.sale_history[0].date && property.sale_history[0].date != null) {
              return property.sale_history[0].date
            } else {
              return ''
            }
          } else {
            return ''
          }
        } else {
          return ''
        }
      }
    function getMostRecentSalePrice () {
        if (property && property.sale_history) {
          if (property.sale_history != null && property.sale_history.length > 0) {
            if (property.sale_history[0].price && property.sale_history[0].price != null) {
              return property.sale_history[0].price
            } else {
              return ''
            }
          } else {
            return ''
          }
        } else {
          return ''
        }
      }
    function getParkingType () {
        if (property && property.structure) {
          if (property.structure.parking_type && property.structure.parking_type !== null) {
            return property.structure.parking_type
          } else {
            return ''
          }
        } else {
          return ''
        }
      }
    function getAirConditionCodes () {
        if (optionLists && optionLists.air_condition_code) {
          const options = []
          for (const key in optionLists.air_condition_code) {
            options.push(
              {
                id: key,
                name: optionLists.air_condition_code[key],
              },
            )
          }
          return options
        } else {
          return []
        }
      }
    function getACType () {
        if (property && property.structure) {
          if (property.structure.air_conditioning_type && property.structure.air_conditioning_type !== null) {
            return property.structure.air_conditioning_type
          } else {
            return '--'
          }
        } else {
          return '--'
        }
      }
    function AirConditionCodes() {
        var ans = []
        ans.push(<option value="--">--</option>)
        var pika = getAirConditionCodes()
        for (let x=0; x<pika.length; x++) {
            ans.push(
                <option
                    value={pika[x].name}
                    selected={getACType()==pika[x].name}
                  >
                  {pika[x].name}
                </option>
            )
        }
        return (
            <select name="ac-type" id="ac-type">
                {ans}
            </select>
        )
    }
    function getBuildingConditionCodes () {
        if (optionLists && optionLists.building_condition_code) {
          const options = []
          for (const key in optionLists.building_condition_code) {
            options.push(
              {
                id: key,
                name: optionLists.building_condition_code[key],
              },
            )
          }
          return options
        } else {
          return []
        }
      }
    function getCondition () {
        if (property && property.structure) {
          if (property.structure.condition && property.structure.condition !== null) {
            return property.structure.condition
          } else {
            return '--'
          }
        } else {
          return '--'
        }
      }
    function BuildingConditionCodes() {
        var ans = []
        ans.push(<option value="--">--</option>)
        var pika = getBuildingConditionCodes()
        for (let x=0; x<pika.length; x++) {
            ans.push(
                <option
                    value={pika[x].name}
                    selected={getCondition()==pika[x].name}
                  >
                  {pika[x].name}
                </option>
            )
        }
        return (
            <select name="condition" id="condition">
                {ans}
            </select>
        )
    }
    function getStyleCodes () {
        if (optionLists && optionLists.style_code) {
          const options = []
          for (const key in optionLists.style_code) {
            options.push(
              {
                id: key,
                name: optionLists.style_code[key],
              },
            )
          }
          return options
        } else {
          return []
        }
      }
    function getArchitecture () {
        if (property && property.structure) {
          if (property.structure.architecture_type && property.structure.architecture_type !== null) {
            return property.structure.architecture_type
          } else {
            return '--'
          }
        } else {
          return '--'
        }
      }
    function StyleCodes() {
        var ans = []
        ans.push(<option value="--">--</option>)
        var pika = getStyleCodes()
        for (let x=0; x<pika.length; x++) {
            ans.push(
                <option
                    value={pika[x].name}
                    selected={getArchitecture()==pika[x].name}
                  >
                  {pika[x].name}
                </option>
            )
        }
        return (
            <select name="architecture" id="architecture">
                {ans}
            </select>
        )
    }
    function getConstructionTypeCodes () {
        if (optionLists && optionLists.construction_type_code) {
          const options = []
          for (const key in optionLists.construction_type_code) {
            options.push(
              {
                id: key,
                name: optionLists.construction_type_code[key],
              },
            )
          }
          return options
        } else {
          return []
        }
      }
    function getConstructionType () {
        if (property && property.structure) {
          if (property.structure.construction_type && property.structure.construction_type !== null) {
            return property.structure.construction_type
          } else {
            return '--'
          }
        } else {
          return '--'
        }
      }
    function ConstructionTypeCodes() {
        var ans = []
        ans.push(<option value="--">--</option>)
        var pika = getConstructionTypeCodes()
        for (let x=0; x<pika.length; x++) {
            ans.push(
                <option
                    value={pika[x].name}
                    selected={getConstructionType()==pika[x].name}
                  >
                  {pika[x].name}
                </option>
            )
        }
        return (
            <select name="construction" id="construction">
                {ans}
            </select>
        )
    }
    function getBasementCodes () {
        if (optionLists && optionLists.basement_code) {
          const options = []
          for (const key in optionLists.basement_code) {
            options.push(
              {
                id: key,
                name: optionLists.basement_code[key],
              },
            )
          }
          return options
        } else {
          return []
        }
      }
    function getBasement () {
        if (property && property.structure) {
          if (property.structure.basement_type && property.structure.basement_type !== null) {
            return property.structure.basement_type
          } else {
            return '--'
          }
        } else {
          return '--'
        }
      }
    function BasementCodes() {
        var ans = []
        ans.push(<option value="--">--</option>)
        var pika = getBasementCodes()
        for (let x=0; x<pika.length; x++) {
            ans.push(
                <option
                    value={pika[x].name}
                    selected={getBasement()==pika[x].name}
                  >
                  {pika[x].name}
                </option>
            )
        }
        return (
            <select name="basement-type" id="basement-type">
                {ans}
            </select>
        )
    }
    function getRoofTypeCodes () {
        if (optionLists && optionLists.roof_type_code) {
          const options = []
          for (const key in optionLists.roof_type_code) {
            options.push(
              {
                id: key,
                name: optionLists.roof_type_code[key],
              },
            )
          }
          return options
        } else {
          return []
        }
      }
    function getRoofStyle () {
        if (property && property.structure) {
          if (property.structure.roof_style_type && property.structure.roof_style_type !== null) {
            return property.structure.roof_style_type
          } else {
            return '--'
          }
        } else {
          return '--'
        }
      }
    function RoofTypeCodes() {
        var ans = []
        ans.push(<option value="--">--</option>)
        var pika = getRoofTypeCodes()
        for (let x=0; x<pika.length; x++) {
            ans.push(
                <option
                    value={pika[x].name}
                    selected={getRoofStyle()==pika[x].name}
                  >
                  {pika[x].name}
                </option>
            )
        }
        return (
            <select name="roof-style" id="roof-style">
                {ans}
            </select>
        )
    }
    function getRoofCoverCodes () {
        if (optionLists && optionLists.roof_cover_code) {
          const options = []
          for (const key in optionLists.roof_cover_code) {
            options.push(
              {
                id: key,
                name: optionLists.roof_cover_code[key],
              },
            )
          }
          return options
        } else {
          return []
        }
      }
    function getRoofMaterial () {
        if (property && property.structure) {
          if (property.structure.roof_material_type && property.structure.roof_material_type !== null) {
            return property.structure.roof_material_type
          } else {
            return '--'
          }
        } else {
          return '--'
        }
      }
    function RoofCoverCodes() {
        var ans = []
        ans.push(<option value="--">--</option>)
        var pika = getRoofCoverCodes()
        for (let x=0; x<pika.length; x++) {
            ans.push(
                <option
                    value={pika[x].name}
                    selected={getRoofMaterial()==pika[x].name}
                  >
                  {pika[x].name}
                </option>
            )
        }
        return (
            <select name="roof-material" id="roof-material">
                {ans}
            </select>
        )
    }
    function getExteriorWallsCodes () {
        if (optionLists && optionLists.exterior_walls_code) {
          const options = []
          for (const key in optionLists.exterior_walls_code) {
            options.push(
              {
                id: key,
                name: optionLists.exterior_walls_code[key],
              },
            )
          }
          return options
        } else {
          return []
        }
      }
    function getExteriorWalls () {
        if (property && property.structure) {
          if (property.structure.exterior_wall_type && property.structure.exterior_wall_type !== null) {
            return property.structure.exterior_wall_type
          } else {
            return '--'
          }
        } else {
          return '--'
        }
      }
    function ExteriorWallsCodes() {
        var ans = []
        ans.push(<option value="--">--</option>)
        var pika = getExteriorWallsCodes()
        for (let x=0; x<pika.length; x++) {
            ans.push(
                <option
                    value={pika[x].name}
                    selected={getExteriorWalls()==pika[x].name}
                  >
                  {pika[x].name}
                </option>
            )
        }
        return (
            <select name="exterior-walls" id="exterior-walls">
                {ans}
            </select>
        )
    }
    function getInteriorWallsCodes () {
        if (optionLists && optionLists.interior_walls_code) {
          const options = []
          for (const key in optionLists.interior_walls_code) {
            options.push(
              {
                id: key,
                name: optionLists.interior_walls_code[key],
              },
            )
          }
          return options
        } else {
          return []
        }
      }
    function getInteriorWalls () {
        if (property && property.structure) {
          if (property.structure.interior_wall_type && property.structure.interior_wall_type !== null) {
            return property.structure.interior_wall_type
          } else {
            return '--'
          }
        } else {
          return '--'
        }
      }
    function InteriorWallsCodes() {
        var ans = []
        ans.push(<option value="--">--</option>)
        var pika = getInteriorWallsCodes()
        for (let x=0; x<pika.length; x++) {
            ans.push(
                <option
                    value={pika[x].name}
                    selected={getInteriorWalls()==pika[x].name}
                  >
                  {pika[x].name}
                </option>
            )
        }
        return (
            <select name="interior-walls" id="interior-walls">
                {ans}
            </select>
        )
    }
    function getFloorCoverCodes () {
        if (optionLists && optionLists.floor_cover_code) {
          const options = []
          for (const key in optionLists.floor_cover_code) {
            options.push(
              {
                id: key,
                name: optionLists.floor_cover_code[key],
              },
            )
          }
          return options
        } else {
          return []
        }
      }
    function getFlooring () {
        if (property && property.structure) {
          if (property.structure.flooring_types && property.structure.flooring_types !== null) {
            return property.structure.flooring_types
          } else {
            return '--'
          }
        } else {
          return '--'
        }
      }
    function FloorCoverCodes() {
        var ans = []
        ans.push(<option value="--">--</option>)
        var pika = getFloorCoverCodes()
        for (let x=0; x<pika.length; x++) {
            ans.push(
                <option
                    value={pika[x].name}
                    selected={getFlooring()==pika[x].name}
                  >
                  {pika[x].name}
                </option>
            )
        }
        return (
            <select name="flooring" id="flooring">
                {ans}
            </select>
        )
    }
    function getWaterCodes () {
        if (optionLists && optionLists.water_code) {
          const options = []
          for (const key in optionLists.water_code) {
            options.push(
              {
                id: key,
                name: optionLists.water_code[key],
              },
            )
          }
          return options
        } else {
          return []
        }
      }
    function getWaterType () {
        if (property && property.structure) {
          if (property.structure.water_type && property.structure.water_type !== null) {
            return property.structure.water_type
          } else {
            return '--'
          }
        } else {
          return '--'
        }
      }
    function WaterCodes() {
        var ans = []
        ans.push(<option value="--">--</option>)
        var pika = getWaterCodes()
        for (let x=0; x<pika.length; x++) {
            ans.push(
                <option
                    value={pika[x].name}
                    selected={getWaterType()==pika[x].name}
                  >
                  {pika[x].name}
                </option>
            )
        }
        return (
            <select name="water-type" id="water-type">
                {ans}
            </select>
        )
    }
    function getSewerCodes () {
        if (optionLists && optionLists.sewer_code) {
          const options = []
          for (const key in optionLists.sewer_code) {
            options.push(
              {
                id: key,
                name: optionLists.sewer_code[key],
              },
            )
          }
          return options
        } else {
          return []
        }
      }
    function getSewerType () {
        if (property && property.structure) {
          if (property.structure.sewer_type && property.structure.sewer_type !== null) {
            return property.structure.sewer_type
          } else {
            return '--'
          }
        } else {
          return '--'
        }
      }
    function SewerCodes() {
        var ans = []
        ans.push(<option value="--">--</option>)
        var pika = getSewerCodes()
        for (let x=0; x<pika.length; x++) {
            ans.push(
                <option
                    value={pika[x].name}
                    selected={getSewerType()==pika[x].name}
                  >
                  {pika[x].name}
                </option>
            )
        }
        return (
            <select name="sewer-type" id="sewer-type">
                {ans}
            </select>
        )
    }
    function getHeatType () {
        if (property && property.structure) {
          if (property.structure.heating_type && property.structure.heating_type !== null) {
            return property.structure.heating_type
          } else {
            return '--'
          }
        } else {
          return '--'
        }
      }
    function getHeatingTypeCodes () {
        if (optionLists && optionLists.heating_type) {
          const options = []
          for (const key in optionLists.heating_type) {
            options.push(
              {
                id: key,
                name: optionLists.heating_type[key],
              },
            )
          }
          return options
        } else {
          return []
        }
      }
    function HeatingTypeCodes() {
        var ans = []
        ans.push(<option value="--">--</option>)
        var pika = getHeatingTypeCodes()
        for (let x=0; x<pika.length; x++) {
            ans.push(
                <option
                    value={pika[x].name}
                    selected={getHeatType()==pika[x].name}
                  >
                  {pika[x].name}
                </option>
            )
        }
        return (
            <select name="heat-type" id="heat-type">
                {ans}
            </select>
        )
    }
    function getHeatFuelType () {
        if (property && property.structure) {
          if (property.structure.heating_fuel_type && property.structure.heating_fuel_type !== null) {
            return property.structure.heating_fuel_type
          } else {
            return '--'
          }
        } else {
          return '--'
        }
      }
    function getHeatingFuelCodes () {
        if (optionLists && optionLists.heating_fuel_code) {
          const options = []
          for (const key in optionLists.heating_fuel_code) {
            options.push(
              {
                id: key,
                name: optionLists.heating_fuel_code[key],
              },
            )
          }
          return options
        } else {
          return []
        }
      }
    function HeatingFuelCodes() {
        var ans = []
        ans.push(<option value="--">--</option>)
        var pika = getHeatingFuelCodes()
        for (let x=0; x<pika.length; x++) {
            ans.push(
                <option
                    value={pika[x].name}
                    selected={getHeatFuelType()==pika[x].name}
                  >
                  {pika[x].name}
                </option>
            )
        }
        return (
            <select name="heat-fuel-type" id="heat-fuel-type">
                {ans}
            </select>
        )
    }
    function getPool () {
        if (property && property.structure) {
          if (property.structure.pool_type && property.structure.pool_type !== null) {
            return property.structure.pool_type
          } else {
            return '--'
          }
        } else {
          return '--'
        }
      }
    function getPoolCodes () {
        if (optionLists && optionLists.pool) {
          const options = []
          for (const key in optionLists.pool) {
            options.push(
              {
                id: key,
                name: optionLists.pool[key],
              },
            )
          }
          return options
        } else {
          return []
        }
      }
    function PoolCodes() {
        var ans = []
        ans.push(<option value="--">--</option>)
        var pika = getPoolCodes()
        for (let x=0; x<pika.length; x++) {
            ans.push(
                <option
                    value={pika[x].name}
                    selected={getPool()==pika[x].name}
                  >
                  {pika[x].name}
                </option>
            )
        }
        return (
            <select name="pool" id="pool">
                {ans}
            </select>
        )
    }
    function getAmenities () {
        if (property && property.structure) {
          if (property.structure.amenities && property.structure.amenities !== null) {
            return property.structure.amenities
          } else {
            return '--'
          }
        } else {
          return '--'
        }
      }
    function getAmenitiesCodes () {
        if (optionLists && optionLists.amenities) {
          const options = []
          for (const key in optionLists.amenities) {
            options.push(
              {
                id: key,
                name: optionLists.amenities[key],
              },
            )
          }
          return options
        } else {
          return []
        }
      }
    function AmenitiesCodes() {
        var ans = []
        ans.push(<option value="--">--</option>)
        var pika = getAmenitiesCodes()
        for (let x=0; x<pika.length; x++) {
            ans.push(
                <option
                    value={pika[x].name}
                    selected={getAmenities()==pika[x].name}
                  >
                  {pika[x].name}
                </option>
            )
        }
        return (
            <select name="amenities" id="amenities">
                {ans}
            </select>
        )
    }
    function getParkingSpaces () {
        if (property && property.structure) {
          if (property.structure.parking_spaces_count && property.structure.parking_spaces_count !== null) {
            return property.structure.parking_spaces_count
          } else {
            return ''
          }
        } else {
          return ''
        }
      }
      function getPlumbingCount () {
        if (property && property.structure) {
          if (property.structure.plumbing_fixtures && property.structure.plumbing_fixtures !== null) {
            return property.structure.plumbing_fixtures
          } else {
            return ''
          }
        } else {
          return ''
        }
      }
    function formatCurrency (num) {
        // console.log(typeof (num))
        if (num && num !== null) {
            if (typeof (num) === 'number') {
              num = Math.round(num / 100) * 100
              return num.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })
            } else if (typeof (num) === 'string') {
              num = Math.round(parseFloat(num) / 100) * 100
              return parseInt(num).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })
            }
          } else {
            return ' '
          }
    }
    function GetFullAddress () {
        if (property && property.address) {
          return property.address.full_address
        } else {
          return ''
        }
      }
    function GetAPN () {
        if (property && property.address) {
          return property.address.apn
        } else {
          return ''
        }
    }
    function getAPN () {
        if (property && property.address) {
          return property.address.apn
        } else {
          return ''
        }
    }
    function getAddress1 () {
        if (property && property.address) {
          return property.address.street_number + ' ' + property.address.street_name + ' ' + property.address.street_suffix
        } else {
          return ''
        }
      }
    function getAddress2 () {
        if (property && property.address) {
          if (property.address.unit_type !== null && property.address.unit_number !== null) {
            return property.address.unit_type + ' ' + property.address.unit_number
          } else {
            return ''
          }
        } else {
          return ''
        }
      }
    function getCity () {
        if (property && property.address) {
          return property.address.city
        } else {
          return ''
        }
      }
    function getState () {
        if (property && property.address) {
          return property.address.state
        } else {
          return ''
        }
      }
    function getZip () {
        if (property && property.address) {
          return property.address.zip_code
        } else {
          return ''
        }
      }
    function getCounty () {
        if (property && property.address) {
          return property.address.fips
        } else {
          return ''
        }
      }
    function doTextConversionnHTML4 (text) {
        if (text !== null && text !== '') {
          // process HTML 4 entities conversion
          text = text.trim().replace('&Tab;', '&Tab;').replace('&NewLine;', '&NewLine;').replace('&excl;', '&excl;').replace('&quot;', '&quot;').replace('&num;', '&#35;').replace('&dollar;', '&#36;').replace('&percnt;', '&#37;')
            .replace('&amp;', '&#38;').replace('&', '&#38;').replace('&apos;', '&#39;').replace('&lpar;', '&#40;').replace('&rpar;', '&#41;').replace('&ast;', '&#42;').replace('&plus;', '&#43;').replace('&comma;', '&#44;')
            .replace('&period;', '&#46;').replace('&sol;', '&#47;').replace('/', '&#47;').replace('&lt;', '&#60;').replace('<', '&#60;').replace('&equals;', '&#61;').replace('=', '&#61;').replace('&gt;', '&#62;').replace('>', '&#62;')
            .replace('&quest;', '&#63;').replace('&commat;', '&#64;').replace('@', '&#64;').replace('&lsqb;', '&#91;').replace('[', '&#91;').replace('&bsol;', '&#92;').replace('\\', '&#92;').replace('&rsqb;', '&#93;')
            .replace(']', '&#93;').replace('&Hat;', '&#94;').replace('^', '&#94;').replace('&grave;', '&#96;').replace('`', '&#96;').replace('&lcub;', '&#123;').replace('{', '&#123;').replace('&verbar;', '&#124;').replace('|', '&#124;')
            .replace('&rcub;', '&#125;').replace('}', '&#125;').replace('&nbsp;', '&nbsp;').replace('&iexcl;', '&iexcl;').replace('¡', '&iexcl;').replace('&cent;', '&#162;').replace('¢', '&#162;').replace('&pound;', '&#163;')
            .replace('£', '&#163;').replace('&curren;', '&#164;').replace('¤', '&#164;').replace('&yen;', '&#165;').replace('¥', '&#165;').replace('&sect;', '&#167;').replace('§', '&#167;').replace('&copy;', '&#169;').replace('©', '&#169;')
            .replace('&reg;', '&#174;').replace('®', '&#174;').replace('&deg;', '&#176;').replace('°', '&#176;').replace('&acute;', '&#180;').replace('´', '&#180;').replace('&micro;', '&#181;').replace('µ', '&#181;').replace('&para;', '&#182;')
            .replace('¶', '&#182;').replace('&middot;', '&#183;').replace('·', '&#183;').replace('&iquest;', '&#191;').replace('¿', '&#191;').replace('&Agrave;', '&#192;').replace('À', '&#192;').replace('&Aacute;', '&#193;').replace('Á', '&#193;')
            .replace('&Acirc;', '&#194;').replace('Â', '&#194;').replace('&Atilde;', '&#195;').replace('Ã', '&#195;').replace('&Auml;', '&#196;').replace('Ä', '&#196;').replace('&Aring;', '&#197;').replace('Å', '&#197;').replace('&AElig;', '&#198')
            .replace('Æ', '&#198').replace('&Ccedil;', '&#199;').replace('Ç', '&#199;').replace('&Egrave;', '&#200;').replace('È', '&#200;').replace('&Eacute;', '&#201;').replace('É', '&#201;').replace('&Ecirc;', '&#202;').replace('Ê', '&#202;')
            .replace('Ë', '&#203;').replace('&Euml;', '&#203;').replace('Ì', '&#204;').replace('&Igrave;', '&#204;').replace('Í', '&#205;').replace('&Iacute;', '&#205;').replace('Î', '&#206;').replace('&Icirc;', '&#206;').replace('Ï', '&#207;').replace('&Iuml;', '&#207;')
            .replace('Ð', '&#208;').replace('&ETH;', '&#208;').replace('Ñ', '&#209;').replace('&Ntilde;', '&#209;').replace('Ò', '&#210;').replace('&Ograve;', '&#210;').replace('Ó', '&#211;').replace('&Oacute;', '&#211;').replace('Ô', '&#212;').replace('&Ocirc;', '&#212;')
            .replace('Õ', '&#213;').replace('&Otilde;', '&#213;').replace('Ö', '&#214;').replace('&Ouml;', '&#214;').replace('×', '&#215;').replace('&times;', '&#215;').replace('Ø', '&#216;').replace('&Oslash;', '&#216;').replace('Ù', '&#217;').replace('&Ugrave;', '&#217;')
            .replace('Ú', '&#218;').replace('&Uacute;', '&#218;').replace('Û', '&#219;').replace('&Ucirc;', '&#219;').replace('Ü', '&#220;').replace('&Uuml;', '&#220;').replace('Ý', '&#221;').replace('&Yacute;', '&#221;').replace('Þ', '&#222;').replace('&THORN;', '&#222;')
            .replace('ß', '&#223;').replace('&szlig;', '&#223;').replace('à', '&#224;').replace('&agrave;', '&#224;').replace('á', '&#225;').replace('&aacute;', '&#225;').replace('â', '&#226;').replace('&acirc;', '&#226;').replace('ã', '&#227;').replace('&atilde;', '&#227;')
            .replace('ä', '&#228;').replace('&auml;', '&#228;').replace('å', '&#229;').replace('&aring;', '&#229;').replace('æ', '&#230;').replace('&aelig;', '&#230;').replace('ç', '&#231;').replace('&ccedil;', '&#231;').replace('è', '&#232;').replace('&egrave;', '&#232;')
            .replace('é', '&#233;').replace('&eacute;', '&#233;').replace('ê', '&#234;').replace('&ecirc;', '&#234;').replace('ë', '&#235;').replace('&euml;', '&#235;').replace('ì', '&#236;').replace('&igrave;', '&#236;').replace('í', '&#237;').replace('&iacute;', '&#237;')
            .replace('î', '&#238;').replace('&icirc;', '&#238;').replace('ï', '&#239;').replace('&iuml;', '&#239;').replace('ð', '&#240;').replace('&eth;', '&#240;').replace('ñ', '&#241;').replace('&ntilde;', '&#241;').replace('ò', '&#242;').replace('&ograve;', '&#242;')
            .replace('ó', '&#243;').replace('&oacute;', '&#243;').replace('ô', '&#244;').replace('&ocirc;', '&#244;').replace('õ', '&#245;').replace('&otilde;', '&#245;').replace('ö', '&#246;').replace('&ouml;', '&#246;').replace('÷', '&#247;').replace('&divide; &div;', '&#247;')
            .replace('ø', '&#248;').replace('&oslash;', '&#248;').replace('ù', '&#249;').replace('&ugrave;', '&#249;').replace('ú', '&#250;').replace('&uacute;', '&#250;').replace('û', '&#251;').replace('&ucirc;', '&#251;').replace('ü', '&#252;').replace('&uuml;', '&#252;')
            .replace('ý', '&#253;').replace('&yacute;', '&#253;').replace('þ', '&#254;').replace('&thorn;', '&#254;').replace('ÿ', '&#255;').replace('&yuml;', '&#255;').replace('Ā', '&#256;').replace('&Amacr;', '&#256;').replace('ā', '&#257;').replace('&amacr;', '&#257;')
            .replace('Ă', '&#258;').replace('&Abreve;', '&#258;').replace('ă', '&#259;').replace('&abreve;', '&#259;').replace('Ą', '&#260;').replace('&Aogon;', '&#260;').replace('ą', '&#261;').replace('&aogon;', '&#261;').replace('Ć', '&#262;').replace('&Cacute;', '&#262;')
            .replace('ć', '&#263;').replace('&cacute;', '&#263;').replace('Ĉ', '&#264;').replace('&Ccirc;', '&#264;').replace('ĉ', '&#265;').replace('&ccirc;', '&#265;').replace('Ċ', '&#266;').replace('&Cdot;', '&#266;').replace('ċ', '&#267;').replace('&cdot;', '&#267;')
            .replace('Č', '&#268;').replace('&Ccaron;', '&#268;').replace('č', '&#269;').replace('&ccaron;', '&#269;').replace('Ď', '&#270;').replace('&Dcaron;', '&#270;').replace('ď', '&#271;').replace('&dcaron;', '&#271;').replace('Đ', '&#272;').replace('&Dstrok;', '&#272;')
            .replace('đ', '&#273;').replace('&dstrok;', '&#273;').replace('Ē', '&#274;').replace('&Emacr;', '&#274;').replace('ē', '&#275;').replace('&emacr;', '&#275;').replace('Ė', '&#278;').replace('&Edot;', '&#278;').replace('ė', '&#279;').replace('&edot;', '&#279;')
            .replace('Ę', '&#280;').replace('&Eogon;', '&#280;').replace('ę', '&#281;').replace('&eogon;', '&#281;').replace('Ě', '&#282;').replace('&Ecaron;', '&#282;').replace('ě', '&#283;').replace('&ecaron;', '&#283;').replace('Ĝ', '&#284;').replace('&Gcirc;', '&#284;')
            .replace('ĝ', '&#285;').replace('&gcirc;', '&#285;').replace('Ğ', '&#286;').replace('&Gbreve;', '&#286;').replace('ğ', '&#287;').replace('&gbreve;', '&#287;').replace('Ġ', '&#288;').replace('&Gdot;', '&#288;').replace('ġ', '&#289;').replace('&gdot;', '&#289;')
            .replace('Ģ', '&#290;').replace('&Gcedil;', '&#290;').replace('Ĥ', '&#292;').replace('&Hcirc;', '&#292;').replace('ĥ', '&#293;').replace('&hcirc;', '&#293;').replace('Ħ', '&#294;').replace('&Hstrok;', '&#294;').replace('ħ', '&#295;').replace('&hstrok;', '&#295;')
            .replace('Ĩ', '&#296;').replace('&Itilde;', '&#296;').replace('ĩ', '&#297;').replace('&itilde;', '&#297;').replace('Ī', '&#298;').replace('&Imacr;', '&#298;').replace('ī', '&#299;').replace('&imacr;', '&#299;').replace('Į', '&#302;').replace('&Iogon;', '&#302;')
            .replace('į', '&#303;').replace('&iogon;', '&#303;').replace('İ', '&#304;').replace('&Idot;', '&#304;').replace('ı', '&#305;').replace('&imath; &inodot;', '&#305;').replace('Ĳ', '&#306;').replace('&IJlig;', '&#306;').replace('ĳ', '&#307;').replace('&ijlig;', '&#307;')
            .replace('Ĵ', '&#308;').replace('&Jcirc;', '&#308;').replace('ĵ', '&#309;').replace('&jcirc;', '&#309;').replace('Ķ', '&#310;').replace('&Kcedil;', '&#310;').replace('ķ', '&#311;').replace('&kcedil;', '&#311;').replace('ĸ', '&#312;').replace('&kgreen;', '&#312;')
            .replace('Ĺ', '&#313;').replace('&Lacute;', '&#313;').replace('ĺ', '&#314;').replace('&lacute;', '&#314;').replace('Ļ', '&#315;').replace('&Lcedil;', '&#315;').replace('ļ', '&#316;').replace('&lcedil;', '&#316;').replace('Ľ', '&#317;').replace('&Lcaron;', '&#317;')
            .replace('ľ', '&#318;').replace('&lcaron;', '&#318;').replace('Ŀ', '&#319;').replace('&Lmidot;', '&#319;').replace('ŀ', '&#320;').replace('&lmidot;', '&#320;').replace('Ł', '&#321;').replace('&Lstrok;', '&#321;').replace('ł', '&#322;').replace('&lstrok;', '&#322;')
            .replace('Ń', '&#323;').replace('&Nacute;', '&#323;').replace('ń', '&#324;').replace('&nacute;', '&#324;').replace('Ņ', '&#325;').replace('&Ncedil;', '&#325;').replace('ņ', '&#326;').replace('&ncedil;', '&#326;').replace('Ň', '&#327;').replace('&Ncaron;', '&#327;')
            .replace('ň', '&#328;').replace('&ncaron;', '&#328;').replace('ŉ', '&#329;').replace('&napos;', '&#329;').replace('Ŋ', '&#330;').replace('&ENG;', '&#330;').replace('ŋ', '&#331;').replace('&eng;', '&#331;').replace('Ō', '&#332;').replace('&Omacr;', '&#332;')
            .replace('ō', '&#333;').replace('&omacr;', '&#333;').replace('Ő', '&#336;').replace('&Odblac;', '&#336;').replace('ő', '&#337;').replace('&odblac;', '&#337;').replace('Œ', '&#338;').replace('&OElig;', '&#338;').replace('œ', '&#339;').replace('&oelig;', '&#339;')
            .replace('Ŕ', '&#340;').replace('&Racute;', '&#340;').replace('ŕ', '&#341;').replace('&racute;', '&#341;').replace('Ŗ', '&#342;').replace('&Rcedil;', '&#342;').replace('ŗ', '&#343;').replace('&rcedil;', '&#343;').replace('Ř', '&#344;').replace('&Rcaron;', '&#344;')
            .replace('ř', '&#345;').replace('&rcaron;', '&#345;').replace('Ś', '&#346;').replace('&Sacute;', '&#346;').replace('ś', '&#347;').replace('&sacute;', '&#347;').replace('Ŝ', '&#348;').replace('&Scirc;', '&#348;').replace('ŝ', '&#349;').replace('&scirc;', '&#349;')
            .replace('Ş', '&#350;').replace('&Scedil;', '&#350;').replace('ş', '&#351;').replace('&scedil;', '&#351;').replace('Š', '&#352;').replace('&Scaron;', '&#352;').replace('š', '&#353;').replace('&scaron;', '&#353;').replace('Ţ', '&#354;').replace('&Tcedil;', '&#354;')
            .replace('ţ', '&#355;').replace('&tcedil;', '&#355;').replace('Ť', '&#356;').replace('&Tcaron;', '&#356;').replace('ť', '&#357;').replace('&tcaron;', '&#357;').replace('Ŧ', '&#358;').replace('&Tstrok;', '&#358;').replace('ŧ', '&#359;').replace('&tstrok;', '&#359;')
            .replace('Ũ', '&#360;').replace('&Utilde;', '&#360;').replace('ũ', '&#361;').replace('&utilde;', '&#361;').replace('Ū', '&#362;').replace('&Umacr;', '&#362;').replace('ū', '&#363;').replace('&umacr;', '&#363;').replace('Ŭ', '&#364;').replace('&Ubreve;', '&#364;')
            .replace('ŭ', '&#365;').replace('&ubreve;', '&#365;').replace('Ů', '&#366;').replace('&Uring;', '&#366;').replace('ů', '&#367;').replace('&uring;', '&#367;').replace('Ű', '&#368;').replace('&Udblac;', '&#368;').replace('ű', '&#369;').replace('&udblac;', '&#369;')
            .replace('Ų', '&#370;').replace('&Uogon;', '&#370;').replace('ų', '&#371;').replace('&uogon;', '&#371;').replace('Ŵ', '&#372;').replace('&Wcirc;', '&#372;').replace('ŵ', '&#373;').replace('&wcirc;', '&#373;').replace('Ŷ', '&#374;').replace('&Ycirc;', '&#374;')
            .replace('ŷ', '&#375;').replace('&ycirc;', '&#375;').replace('Ÿ', '&#376;').replace('&Yuml;', '&#376;').replace('Ź', '&#377;').replace('&Zacute;', '&#377;').replace('ź', '&#378;').replace('&zacute;', '&#378;').replace('Ż', '&#379;').replace('&Zdot;', '&#379;')
            .replace('ż', '&#380;').replace('&zdot;', '&#380;').replace('Ž', '&#381;').replace('&Zcaron;', '&#381;').replace('ž', '&#382;').replace('&zcaron;', '&#382;').replace('ƒ', '&#402;').replace('&fnof;', '&#402;').replace('Ƶ', '&#437;').replace('&imped;', '&#437;')
            .replace('ǵ', '&#501;').replace('&gacute;', '&#501;').replace('&lsquo;', '&#8216;').replace('‘', '&#8216;').replace('&rsquo;', '&#8217;').replace('’', '&#8217;').replace('&ldquo;', '&#8220;').replace('“', '&#8220;').replace('&rdquo;', '&#8221;').replace('”', '&#8221;')

          // console.log(text)
          return text
        } else {
          return ''
        }
      }
    function getToday () {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const today = new Date()
        const todayString = monthNames[today.getMonth()] + ' ' + today.getDate() + ', ' + today.getFullYear()
        return todayString
      }
    function displayLoader () {
        document.getElementById('report-loader').classList.add('active')
      }
    function disableSubmitButton () {
        // document.getElementById('btn_doShareReport').disabled = true
        // document.getElementById('btn_doShareReport_mobile').disabled = true
        document.getElementById('btn_doDownloadReport').disabled = true
        document.getElementById('btn_doDownloadReport_mobile').disabled = true
        // document.getElementById('btn_doUpdateEstimate').disabled = true
        // document.getElementById('btn_doUpdateEstimate_mobile').disabled = true
      }
    function enableSubmitButton () {
        // document.getElementById('btn_doShareReport').disabled = false
        // document.getElementById('btn_doShareReport_mobile').disabled = false
        document.getElementById('btn_doDownloadReport').disabled = false
        document.getElementById('btn_doDownloadReport_mobile').disabled = false
        // document.getElementById('btn_doUpdateEstimate').disabled = false
        // document.getElementById('btn_doUpdateEstimate_mobile').disabled = false
      }
    function doReportTextColorCode (num, before, after) {
        if (num) {
          if (num != null && num !== '') {
            if (!isNaN(num)) {
              const temp = parseFloat(num)
              if (temp >= 0) {
                if (before != null && after === null) {
                  return '<span style="color: #07871c;">' + before + num + '</span>'
                } else if (before === null && after !== null) {
                  return '<span style="color: #07871c;">' + num + after + '</span>'
                } else {
                  return '<span style="color: #07871c;">' + num + '</span>'
                }
              } else {
                if (before !== null && after === null) {
                  return '<span style="color: red;">' + before + num + '</span>'
                } else if (before === null && after !== null) {
                  return '<span style="color: red;">' + num + after + '</span>'
                } else {
                  return '<span style="color: red;">' + num + '</span>'
                }
              }
            } else {
              return num
            }
          } else {
            return num
          }
        } else {
          return num
        }
      }
    function formatNumberWithComma (num) {
        if (num && num !== null) {
          if (typeof (num) === 'number') {
            return parseInt(num).toLocaleString('en-US')
          } else if (typeof (num) === 'string') {
            return parseInt(num).toLocaleString('en-US')
          }
        } else {
          return '--'
        }
      }
    function getYearBuilt () {
        if (property && property.structure) {
          if (property.structure.year_built && property.structure.year_built !== null) {
            return property.structure.year_built
          } else {
            return ''
          }
        } else {
          return ''
        }
      }
      function getCounty () {
        if (property && property.address) {
          return property.address.fips
        } else {
          return ''
        }
      }
      function getStoriesCodes () {
        if (optionLists && optionLists.stories_code) {
          const options = []
          for (const key in optionLists.stories_code) {
            options.push(
              {
                id: key,
                name: optionLists.stories_code[key],
              },
            )
          }
          return options
        } else {
          return []
        }
      }
      function getStories () {
        if (property && property.structure) {
            if (property.structure.stories && property.structure.stories != null) {
              return property.structure.stories
            } else {
              return ''
            }
          } else {
            return ''
          }
      }
      function Stories () {
          var pika = getStoriesCodes()
          var ans = []
          ans.push(<option value="--">--</option>)
          for (let x = 0; x<pika.length; x++) {
            ans.push(
                <option
                    value={pika[x].name}
                    selected={getStories()==pika[x].name}
                  >
                  {pika[x].name}
                </option>
            )
          }
          return (
            <select name="stories" id="stories">
                {ans}
            </select>
          )
      }
      function formatNumber (num) {
        if (num && num !== null) {
            if (typeof (num) === 'number') {
              return parseInt(num)
            } else if (typeof (num) === 'string') {
              return parseInt(num)
            }
          } else {
            return '0'
          } 
      }
      function getSqft () {
        if (property && property.structure) {
          if (property.structure.total_area_sq_ft && property.structure.total_area_sq_ft !== null) {
            return formatNumber(property.structure.total_area_sq_ft)
          } else {
            return ''
          }
        } else {
          return ''
        }
      }
      function getNumBeds () {
        if (property && property.structure) {
          if (property.structure.beds_count && property.structure.beds_count !== null) {
            return property.structure.beds_count
          } else {
            return ''
          }
        } else {
          return ''
        }
      }
      function getNumBaths () {
        if (property && property.structure) {
          if (property.structure.baths && property.structure.baths !== null) {
            return property.structure.baths
          } else {
            return ''
          }
        } else {
          return ''
        }
      }
      function getNumPartialBaths () {
        if (property && property.structure) {
          if (property.structure.partial_baths_count && property.structure.partial_baths_count !== null) {
            return property.structure.partial_baths_count
          } else {
            return ''
          }
        } else {
          return ''
        }
      }
      function getRoomCount () {
        if (property && property.structure) {
          if (property.structure.rooms_count && property.structure.rooms_count !== null) {
            return property.structure.rooms_count
          } else {
            return ''
          }
        } else {
          return ''
        }
      }
      function doShowBrokerageLogo () {
        const brokerageSelect = document.getElementById('brokerage-logo')
        if (brokerageSelect) {
          const selected = brokerageSelect.value
          const img = document.getElementById('logo-display')
          let logoURI = ''
          if (selected !== '--') {
            logoURI = 'https://honely-files-public.s3.amazonaws.com/report/brokerages/logo-' + selected + '.png'
          } else {
            // hide
            logoURI = 'https://honely-files-public.s3.amazonaws.com/report/logo_honely_report_default.png'
          }
          img.src = logoURI
        }
      }
      function getOtherRoomCodes () {
        if (optionLists && optionLists.other_rooms) {
          const options = []
          for (const key in optionLists.other_rooms) {
            options.push(
              {
                id: key,
                name: optionLists.other_rooms[key],
              },
            )
          }
          return options
        } else {
          return []
        }
      }
      function getOtherRooms () {
        if (property && property.structure) {
          if (property.structure.other_rooms && property.structure.other_rooms !== null) {
            return property.structure.other_rooms
          } else {
            return '--'
          }
        } else {
          return '--'
        }
      }
      function OtherRoomCodes() {
          var ans = []
          ans.push(<option value="--">--</option>)
          var pika = getOtherRoomCodes()
          for (let x=0;x<pika.length;x++) {
            ans.push(
                <option
                    value={pika[x].name}
                    selected={getOtherRooms()==pika[x].name}
                  >
                  {pika[x].name}
                </option>
            )
          }
          return (
            <select name="other-rooms" id="other-rooms">
                {ans}
            </select>
          )
      }
    return (
        <div className="section" id="report-form-overlay">
            <CreditsBanner availableCredits={props.userProfile.credits} />
            <div className="report-form-header">
                <p className="text-exlarge">Review Property Report</p>
                <p>Update this report with any available data if applicable</p>
            </div>
            {/* <div className="report-form-changes-action">
                <div className="report-form-changes-action-btns">
                <button>Save</button>
                <button>Cancel</button>
                </div>
                <p>You have unsaved changes</p>
                <div className="report-form-changes-action-empty">
                </div>
            </div> */}
            <div className="report-form-subject-property-block">
                <p className="report-form-subject-property-heading">Address</p>
                <div className="report-form-subject-property-address">
                <p><GetFullAddress /></p>
                <button onClick={() => {
                    window.location.href = '/reports'
                }}>CHANGE</button>
                </div>
            </div>
            {
                showPaymentPopup && 
                <PaymentConfirmationPopup setShowPaymentPopup ={setShowPaymentPopup} confirmAction={doDownloadReport} creditsFlag={creditsFlag} purchaseCreditsMode={false}/>
            }
            <div className="forecast-form-container">
            {/* <div className="forecast-form-title-bar">
                <span>Property Report</span>
                <i className="fa fa-times-thin fa-2x" aria-hidden="true" onClick={() => {removeReportForm()}}></i>
            </div> */}
            <div className="forecast-form-wrapper custom-scrollbar">

            <div className="section-loader-overlay manual withBackground" id="report-loader">
            <div className="section-loader-wrapper">
                <span className='mdi mdi-loading mdi-spin spin'></span>
            </div>
            </div>

                <div className="forecast-form">
                    {/* vx: insert here */}
                    <div className="form-section" style={{display: 'none'}} id="reportFormZipCodeSection">
            <p className="form-section-title"><span><i className="fas fa-chart-line"></i> Neighborhood Forecast</span></p>
            <div className="charts-row">
            <div className="chart-container">
                <Chart
                  ref={chart3monthx}
                  type="bar"
                  height="300"
                  width="100%"
                  options={reportChartOptions()}
                  series={chart3month()}
                />
                <p>3 Months</p>
              </div>
              <div className="chart-container">
                <Chart
                  ref={chart1yearx}
                  type="bar"
                  height="300"
                  width="100%"
                  options={reportChartOptions()}
                  series={chart1year()}
                />
                <p>1 Year</p>
              </div>
              <div className="chart-container">
                <Chart
                  ref={chart2yearsx}
                  type="bar"
                  height="300"
                  width="100%"
                  options={reportChartOptions()}
                  series={chart2years()}
                />
                <p>2 Years</p>
              </div>
              <div className="chart-container">
                <Chart
                  ref={chart3yearsx}
                  type="bar"
                  height="300"
                  width="100%"
                  options={reportChartOptions()}
                  series={chart3years()}
                />
                <p>3 Years</p>
              </div>
            </div>
            </div>
                    <div className="form-section">
                    <p className="form-section-title"><span><i className="fas fa-user-circle"></i> Agent Information</span></p>
                    <div className="form-row-flex-3cols">
                    <p>
                        <label>Name</label>
                        <input type="text" name="agent-name" id="agent-name"></input>
                    </p>
                    <p>
                        <label>Email</label>
                        <input type="text" name="agent-email" id="agent-email"></input>
                    </p>
                    <p>
                        <label>Phone</label>
                        <input type="text" name="agent-phone" id="agent-phone"></input>
                    </p>
                    </div>
                    <div className="form-row-flex-2cols">
              <p>
                <label>Brokerage Logo</label>
                <select name="brokerage-logo" id="brokerage-logo" onChange={ () => { doShowBrokerageLogo() }}>
                  <option value="--">Default</option>
                  <option value="ben-bay-realty">Ben Bay Realty</option>
                  <option value="berkshire-hathaway-homeservices">Berkshire Hathaway HomeServices</option>
                  <option value="brown-harris-stevens">Brown Harris Stevens</option>
                  <option value="century-21">Century 21</option>
                  <option value="christies-international-real-estate">Christie's International Real Estate</option>
                  <option value="coldwell-banker-real-estate">Coldwell Banker Real Estate</option>
                  <option value="compass">Compass</option>
                  <option value="corcoran-group">Corcoran Group</option>
                  <option value="core">Core</option>
                  <option value="douglas-elliman">Douglas Elliman</option>
                  <option value="elegran-real-estate-and-development">Elegran Real Estate and Development</option>
                  <option value="engel-volkers">Engel &amp; V&#214;lkers</option>
                  <option value="exit-realty">EXIT Realty</option>
                  <option value="exp-realty">eXp Realty</option>
                  <option value="fillmore-real-estate">Fillmore Real Estate</option>
                  <option value="halstead-real-estate">Halstead Real Estate</option>
                  <option value="homeservices-of-america">HomeServices of America</option>
                  <option value="keller-williams-nyc">Keller Williams NYC</option>
                  <option value="keller-williams-realty">Keller Williams Realty</option>
                  <option value="laffey">Laffey Real Estate</option>
                  <option value="leslie-j-garfield-co">Leslie J. Garfield &amp; Co.</option>
                  <option value="mns">MNS</option>
                  <option value="modern-spaces">Modern Spaces</option>
                  <option value="momentum-real-estate">Momentum Real Estate</option>
                  <option value="nest-seekers-international">Nest Seekers International</option>
                  <option value="oxford-property-group">Oxford Property Group</option>
                  <option value="r-new-york">R New York</option>
                  <option value="re-max">RE/MAX</option>
                  <option value="re-max-edge">RE/MAX Edge</option>
                  <option value="re-max-real-estate-professionals">RE/MAX Real Estate Professionals</option>
                  <option value="sothebys-international-realty">Sotheby's International Realty</option>
                  <option value="triplemint">Triplemint</option>
                  <option value="the-modlin-group">The Modlin Group</option>
                  <option value="warburg-realty">Warburg Realty</option>
                  <option value="weichert">Weichert</option>
                </select>
              </p>
              <p className="brokerage-logo-container">
                <img src="https://honely-files-public.s3.amazonaws.com/report/logo_honely_report_default.png" id="logo-display" alt="Report logo"></img>
              </p>
            </div>
            <div className="form-row margin-top-sm">
              <label>Or use custom logo</label>
              <div className="file-input-container">
                <input type="file" name="agent-logo" id="agent-logo"></input>
              </div>
            </div>
                    </div>
                    <div className="form-section">
                    <p className="form-section-title"><span><i className="fas fa-dollar-sign"></i> Honely Estimated Value</span></p>
            <div className="report-honely-value-container">
              <div className="report-honely-value">
                <p className="report-honely-value-label">Before</p>
                {/* <p>{ () => { getHonelyAppraisal() }}</p> */}
                <p><GetHonelyAppraisal /></p>
              </div>
              <div className="report-honely-value">
                <p className="report-honely-value-label">After *</p>
                <p id="report-honey-value-after">--</p>
              </div>
            </div>
                    </div>
                <div className="form-section">
                <p className="form-section-title"><span><i className="fas fa-home"></i> Property Information</span></p>
                <div className="form-row-flex-2cols">
                <p><GetFullAddress /></p>
                <p><span className="font-bold">APN:</span><GetAPN /></p>
                </div>
                <div className="form-row-flex-4cols">
                <p>
                <label>Year built</label>
                <input type="text" name="year-built" id="year-built" readOnly></input>
              </p>
              <p>
                <label>County</label>
                <input type="text" name="county" id="county" readOnly></input>
              </p>
              <p>
                <label>Stories</label>
                <Stories />
              </p>
              <p>
                <label>SQ Ft.</label>
                <input type="text" name="sqft" id="sqft"></input>
              </p>
                </div>
                <div className="form-row-flex-4cols">
              <p>
                <label># of bedrooms</label>
                <input type="text" name="num-beds" id="num-beds"></input>
              </p>
              <p>
                <label># of bathrooms</label>
                <input type="text" name="num-baths" id="num-baths"></input>
              </p>
              <p>
                <label># of partial bathrooms</label>
                <input type="text" name="num-partial-bath" id="num-partial-bath"></input>
              </p>
              <p>
                <label>Room count</label>
                <input type="text" name="room-count" id="room-count"></input>
              </p>
            </div>
            <div className="form-row-flex-4cols">
              <p className="wide">
                <label>Other Rooms</label>
                <OtherRoomCodes />
              </p>
              <p>
                <label>Parking spaces</label>
                <input type="text" name="parking-spaces" id="parking-spaces"></input>
              </p>
              <p>
                <label>Plumbing Fixtures #</label>
                <input type="text" name="plumbing-count" id="plumbing-count"></input>
              </p>
            </div>
            <div className="form-row-flex-2cols">
              <p>
                <label>Parking type</label>
                <input type="text" name="parking-type" id="parking-type"></input>
              </p>
              <p>
                <label>Air conditioning type</label>
                <AirConditionCodes />
              </p>
            </div>
            <div className="form-row-flex-2cols">
              <p>
                <label>Heating type</label>
                <HeatingTypeCodes />
              </p>
              <p>
                <label>Heating fuel type</label>
                <HeatingFuelCodes />
              </p>
            </div>
            <div className="form-row-flex-2cols">
              <p>
                <label>Pool</label>
                <PoolCodes />
              </p>
              <p>
                <label>Amenities</label>
                <AmenitiesCodes />
              </p>
            </div>
            <div className="form-row-flex-2cols">
              <p>
                <label>Most recent sale date (YYYY-MM-DD)</label>
                <input type="text" name="sale-date" id="sale-date"></input>
              </p>
              <p>
                <label>Most recent sale price ($)</label>
                <input type="text" name="sale-price" id="sale-price"></input>
              </p>
            </div>
                </div>
            <div className="form-section">
            <p className="form-section-title"><span><i className="fas fa-drafting-compass"></i> Construction Information</span></p>
            <div className="form-row-flex-2cols">
              <p>
                <label>Condition</label>
                <BuildingConditionCodes />
              </p>
              <p>
                <label>Architecture type</label>
                <StyleCodes />
              </p>
            </div>
            <div className="form-row-flex-2cols">
              <p>
                <label>Construction type</label>
                <ConstructionTypeCodes />
              </p>
              <p>
                <label>Basement type</label>
                <BasementCodes />
              </p>
            </div>
            <div className="form-row-flex-2cols">
              <p>
                <label>Roof style</label>
                <RoofTypeCodes />
              </p>
              <p>
                <label>Roof material</label>
                <RoofCoverCodes />
              </p>
            </div>
            <div className="form-row-flex-2cols">
              <p>
                <label>Exterior walls</label>
                <ExteriorWallsCodes />
              </p>
              <p>
                <label>Interior walls</label>
                <InteriorWallsCodes />
              </p>
            </div>
            <div className="form-row-flex-2cols">
              <p>
                <label>Flooring</label>
                <FloorCoverCodes />
              </p>
              <p>
                <label>Water type</label>
                <WaterCodes />
              </p>
            </div>
            <div className="form-row-flex-2cols">
              <p>
                <label>Sewer type</label>
                <SewerCodes />
              </p>
            </div>
            </div>
            <div class="form-section" style={{display: 'none'}}>
            <p class="form-section-title"><span><i class="fas fa-chart-line"></i> Rental Trends</span></p>
            <div class="charts-row">
              <div class="chart-container chart-col-25">
                <Chart
                  ref={chartMedianRentx}
                  type="bar"
                  height="300"
                  width="100%"
                  options={reportChartOptionsMedianRent()}
                  series={chartMedianRent()}
                />
                <p>Media Rent</p>
              </div>
              <div class="chart-container chart-col-25">
                <Chart
                  ref={chartCashFlowx}
                  type="bar"
                  height="300"
                  width="100%"
                  options={reportChartOptionsCashFlow()}
                  series={chartCashFlow()}
                />
                <p>Cash Flow</p>
              </div>
              <div class="chart-container chart-col-50">
                <Chart
                  ref={chartRentalGrowthx}
                  type="bar"
                  height="300"
                  width="100%"
                  options={reportChartOptionsGrowth()}
                  series={chartRentalGrowth()}
                />
                <p>Rental Growth</p>
              </div>
            </div>
          </div>
            <div class="form-section share-area noborder-nomargin">
            {/* <p class="form-section-title"><i class="fas fa-share-alt"></i> <span>Share Honely Report (Optional)</span></p> */}
            {/* <div class="form-row">
              <p>
                <label>Emails (use commas " , " to separate multiple emails)</label>
                <div class="input-text-multi" id="share-emails-input-container">
                  <div class="input-text-multi-display" id="input-text-multi-display"></div>
                  <input type="text" name="share-emails-temp" id="share-emails-temp"></input>
                  <input type="hidden" name="share-emails" id="share-emails"></input>
                </div>
              </p>
              <p>
                <label>Message</label>
                <textarea name="share-message" id="share-message" placeholder="enter your message"></textarea>
              </p>
            </div> */}
            <div>
          <p class="report-disclaimer">Honely provides the Honely AI, data, website and brand &amp; links &ldquo;as is,&rdquo; &ldquo;with all faults&rdquo; and &ldquo;as available.&rdquo; <br></br>* The Honely revaluation currenty takes into account only valid changes to inputs such as property size, number of bedrooms, and number of bathrooms.</p>
          </div>
          {/* <div class="form-action-row-mobile">
            <button onClick={() => {
                var pika = null
                if (creditsFlag) {
                    pika = {
                        creditAmount: 1
                    }
                } else {
                    pika = {
                        dollarAmount: 0.50
                    }
                }
                window.sessionStorage.removeItem('PaymentPopup')
                window.sessionStorage.setItem('PaymentPopup', JSON.stringify(pika))
                setShowPaymentPopup(true)
            }} id="btn_doDownloadReport_mobile">Generate Report</button>
            <button onClick={() => {doCMAAction()}} id="btn_doDownloadReport_mobileCMA">Add to CMA Report</button>
          </div> */}
          </div>
                </div>
            </div>
            {/* <div class="form-action-row" style={{backgroundColor:'white'}}>
        <button onClick={() => {
            var pika = null
            if (creditsFlag) {
                pika = {
                    creditAmount: 1
                }
            } else {
                pika = {
                    dollarAmount: 0.50
                }
            }
            window.sessionStorage.removeItem('PaymentPopup')
            window.sessionStorage.setItem('PaymentPopup', JSON.stringify(pika))
            setShowPaymentPopup(true)
        }} id="btn_doDownloadReport">Generate Report</button>
        <button onClick={() => {doCMAAction()}} id="btn_doDownloadReportCMA">Add to CMA Report</button>
      </div> */}
            </div>
            {
                !inCMA && 
                <div className="report-form-final-action">
                    <div className="report-form-final-action-element">
                        <div className="report-form-final-action-element-inner">
                        <img src={File} className="file" /> 
                        <p>Generate Single Report</p>
                        </div>
                        <p>1 credit per download</p>
                        <button onClick={() => {
                            doDownloadReport()
                        }}>Continue</button>
                    </div>
                    <div className="report-form-final-action-element">
                        <div className="report-form-final-action-element-inner">
                        <img src={Files} className="file" />
                        <p>Generate CMA Report</p>
                        </div>
                        <p>2 credits per download</p>
                        <button onClick={() => {
                            doCMAAction()
                        }}>Continue</button>
                    </div>
                </div>
            }
            {
                inCMA &&
                <div className="report-form-final-action" style={{textAlign: 'center'}}>
                    <button onClick={() => {
                        doCMAAction()
                    }}>Add to CMA</button>
                </div>
            }
        </div>
    )
}
export default ReportFormV2;