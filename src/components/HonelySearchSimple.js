import React, { useState, useEffect } from "react";
import '../styles/HonelySearch.css';

function HonelySearchSimple() {
    return (
        <div className="search-container simple">
            <div className="search-input-wrapper">
            <input
                type="text"
                id="search-input-simple"
                className="search-input"
                placeholder="Add another property address"
                autocomplete="off"
                onKeyUp="doSearch"
            ></input>
            <span v-if="loading" className='mdi mdi-loading mdi-spin spin search-loader'></span>
            <span v-if="!loading" className='search-loader-placeholder'></span>
            {/* <span className="mdi mdi-magnify search-icon"></span> */}
            </div>
            {/* <div className="search-message">{{ message }}</div> */}
            <div
            v-if="results && results.length > 0"
            className="search-result-container"
            >
            <ul v-if="level === 'zip'">
                <li
                v-for="result in results"
                onClick="appendSearch(result)"
                >
                <div className="search-result-col">
                    <span className="mdi mdi-map-marker"></span>
                    {/* <span> {{ result }} </span> */}
                </div>
                </li>
            </ul>
            <ul v-else-if="level === 'street'">
                <li
                v-for="result in results"
                onClick="appendSearch(result)"
                >
                <div className="search-result-col">
                    <span className="mdi mdi-home"></span>
                    {/* <span className="search-result-street"> {{ (splitAddress(result)).pre }} </span> */}
                </div>
                <div className="search-result-col">
                    {/* <span className="search-result-state"> {{ (splitAddress(result)).state }} </span>
                    <span className="search-result-zip"> {{ (splitAddress(result)).zip }} </span> */}
                </div>
                </li>
            </ul>
            </div>
        </div>
    )
}

export default HonelySearchSimple;