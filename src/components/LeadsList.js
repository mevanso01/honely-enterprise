import React, { useState, useEffect } from "react";
import "../styles/LeadsList.css";

function LeadsList () {
    return (
        <div className='section'>
            <div className='leads-list'>
                <p>Leads</p>
                <div className="leads-list-greybar">
                <span className="mdi mdi-download" style={{float: 'right', fontSize: '32px', color: '#000000CC'}}></span>
                </div>
                <div className="leads-list-table">
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Type</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Date</th>
                        </tr>
                        <tr>
                            <td>lalala</td>
                            <td>lalala</td>
                            <td>lalala</td>
                            <td>lalala</td>
                            <td>lalala</td>
                            <td>lalala</td>
                        </tr>
                    </table>
                </div>
                <br></br>
                <div className="leads-list-mobile-data-block">
                    <div className="leads-list-mobile-data-row">
                        <div>Date:</div><div>2022-07-14 14:38:06</div>
                    </div>
                    <div className="leads-list-mobile-data-row">
                        <div>Amount:</div><div>$.50</div>
                    </div>
                    <div className="leads-list-mobile-data-row">
                        <div>Card:</div>
                        <div>VISA ****7266</div>
                    </div>
                    <div className="leads-list-mobile-data-row">
                        <div>Receipt:</div><div><a href="https://pay.stripe.com/receipts/payment/CAcQARoXChVhY2N0XzFLbU54akxsMmJKTXhoUDQohOvBlgYyBvnO7DBn7DosFt9P1ujk2CfODxIummr_tXHNP4YlAjjN-jP4Gx6jqB7gzhRdThzIwF81DMs">Link</a></div>
                    </div>
                    <div className="leads-list-mobile-data-row">
                        <div>Status:</div><div>Paid</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeadsList;