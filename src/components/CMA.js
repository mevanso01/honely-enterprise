import React, { useState, useEffect } from "react";
import '../styles/CMA.css';
import HonelySearchSimple from "./HonelySearchSimple";

function CMA() {
    return (
        <div>
            <br></br><br></br>
            <div className="section cma-section">
        <div className="cma-header">
            <div>
            <h1>Generate a CMA report</h1>
            <p>Compare up to 10 different properties. Use suggested properties or add your own below.</p>
            </div>
            <div className="cma-continue-btn">
              <button>Continue <i className="fa fa-arrow-right"></i></button>
            </div>
        </div>
        <div className='cma-selected-properties'>
            <table>
                <tr>
                    <th>Address</th>
                    <th>Sqft</th>
                    <th>BR/BA</th>
                    <th>Yr built</th>
                    <th>ADM</th>
                    <th>List Price</th>
                </tr>
                <br></br>
                <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                    <td>Germany</td>
                    <td>Germany</td>
                    <td>Germany</td>
                    <i className="fa fa-times" />
                </tr>
                <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                    <td>Germany</td>
                    <td>Germany</td>
                    <td>Germany</td>
                    <i className="fa fa-times" />
                </tr>
                <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                    <td>Germany</td>
                    <td>Germany</td>
                    <td>Germany</td>
                    <i className="fa fa-times" />
                </tr>
                <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                    <td>Germany</td>
                    <td>Germany</td>
                    <td>Germany</td>
                    <i className="fa fa-times" />
                </tr>
                <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                    <td>Germany</td>
                    <td>Germany</td>
                    <td>Germany</td>
                    <i className="fa fa-times" />
                </tr>
                <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                    <td>Germany</td>
                    <td>Germany</td>
                    <td>Germany</td>
                    <i className="fa fa-times" />
                </tr>
                <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                    <td>Germany</td>
                    <td>Germany</td>
                    <td>Germany</td>
                    <i className="fa fa-times" />
                </tr>
                <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                    <td>Germany</td>
                    <td>Germany</td>
                    <td>Germany</td>
                    <i className="fa fa-times" />
                </tr>
                <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                    <td>Germany</td>
                    <td>Germany</td>
                    <td>Germany</td>
                    <i className="fa fa-times" />
                </tr>
                <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                    <td>Germany</td>
                    <td>Germany</td>
                    <td>Germany</td>
                    <i className="fa fa-times" />
                </tr>
                <tr>
                    <td>Alfreds Futterkiste</td>
                    <td>Maria Anders</td>
                    <td>Germany</td>
                    <td>Germany</td>
                    <td>Germany</td>
                    <td>Germany</td>
                    <i className="fa fa-times" />
                </tr>
            </table>
        </div>
        <div className="cma-property-search-block">
            <div className="cma-property-search-sub-block">
                <h1>Search a property to compare</h1>
                <HonelySearchSimple />
            </div>
            <div>
                {/* <v-icon style="font-size: 70px; font-weight: 100; top: 20%;">
                    mdi-plus-circle-outline
                </v-icon> */}
            </div>
        </div>
        <div className="comparable-properties-container">
        <div className="section-heading">Add Suggested Comparable Properties</div>
        <div className="comparable-properties">
          {/* <property-block
            :property-data="property"
            :comparable="true"
            :compact="false"
            :key="property.property_id"
          /> */}
        </div>
      </div>
    </div>
        </div>
    )
}

export default CMA;