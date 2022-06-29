import React, { useState, useEffect } from "react";
import '../styles/PaymentHistory.css'
import axios from 'axios';

function PaymentHistory(props) {
    // var transactionHistory= {
    //     "charges": [
    //         {
    //             "charge_id": "ch_3KrRppLl2bJMxhP40G4v8xL7",
    //             "amount": "39.99",
    //             "created": "2022-04-22 19:08:05",
    //             "currency": "usd",
    //             "payment_method_details": {
    //                 "type": "card",
    //                 "network": "visa",
    //                 "last4": "6586"
    //             },
    //             "receipt_url": "https://pay.stripe.com/receipts/acct_1KmNxjLl2bJMxhP4/ch_3KrRppLl2bJMxhP40G4v8xL7/rcpt_LYYxiTmwIoMC1iMTEl6ScM60lZ8XohS",
    //             "refunded": true,
    //             "status": "succeeded"
    //         },
    //         {
    //             "charge_id": "ch_3KrRmhLl2bJMxhP40j8JVB4I",
    //             "amount": "3.00",
    //             "created": "2022-04-22 19:04:51",
    //             "currency": "usd",
    //             "payment_method_details": {
    //                 "type": "card",
    //                 "network": "visa",
    //                 "last4": "6586"
    //             },
    //             "receipt_url": "https://pay.stripe.com/receipts/acct_1KmNxjLl2bJMxhP4/ch_3KrRmhLl2bJMxhP40j8JVB4I/rcpt_LYYu4E3MGwW9vabVgzIGCgYwULPpWpx",
    //             "refunded": true,
    //             "status": "succeeded"
    //         },
    //         {
    //             "charge_id": "ch_3KrRjqLl2bJMxhP40RPceP8B",
    //             "amount": "39.99",
    //             "created": "2022-04-22 19:01:54",
    //             "currency": "usd",
    //             "payment_method_details": {
    //                 "type": "card",
    //                 "network": "visa",
    //                 "last4": "6586"
    //             },
    //             "receipt_url": "https://pay.stripe.com/receipts/acct_1KmNxjLl2bJMxhP4/ch_3KrRjqLl2bJMxhP40RPceP8B/rcpt_LYYrpxHBG9ADL88w8uZBuoUrs4oXANc",
    //             "refunded": true,
    //             "status": "succeeded"
    //         }
    //     ]
    // }
    const [transactionHistory, setTransactionHistory] = useState({
        charges: []
    });
    const [dataLoadingFlag, setDataLoadingFlag] = useState(false);
    const [transactionHistoryErrMsg, setTransactionHistoryErrMsg] = useState('');
    useEffect(() => {
        let config = {
            headers: {
              'Authorization': 'Bearer ' + props.jwt
            }
          }
        axios.get('https://developers.honely.com/user/charges', config)
        .then((response) => {
            if (response.data.data.charges.length > 0) {
                setTransactionHistoryErrMsg(() => {
                    return ''
                })
                setTransactionHistory(() => {
                    return response.data.data
                })
            } else {
                setTransactionHistoryErrMsg(() => {
                    return 'No Payment History Found'
                })
            }
            setDataLoadingFlag(() => {
                return true
            })
        })
        .catch((error) => {
          if (error.message === 'Request failed with status code 401') {
            props.doSignOut()
          } else {
            setTransactionHistoryErrMsg(() => {
                return 'Error while fetching payment history.'
            })
            setDataLoadingFlag(() => {
                return true
            })
          }
        })
    }, [])
    function PaymentData () {
        var ans = []
        for (let i=0;i<transactionHistory.charges.length;i++) {
            var data = []
            var status = null
            if (transactionHistory.charges[i].refunded === true) {
                if (transactionHistory.charges[i].status === 'succeeded') {
                    status = 'Refunded'
                } else {
                    status = 'Refund Failed'
                }
            } else {
                if (transactionHistory.charges[i].status === 'succeeded') {
                    status = 'Paid'
                } else {
                    status = 'Payment Failed'
                }
            }
            data.push(<td> { transactionHistory.charges[i].created } </td>)
            data.push(<td>${ transactionHistory.charges[i].amount } </td>)
            data.push(<td>{transactionHistory.charges[i].payment_method_details.network.toUpperCase() + ' ****' + transactionHistory.charges[i].payment_method_details.last4}</td>)
            data.push(<td><a href={transactionHistory.charges[i].receipt_url}>Link</a></td>)
            data.push(<td>{status}</td>)
            ans.push(<tr>{data}</tr>)
        }
        return (
            <tbody>
                {ans}
            </tbody>
        )
    }
    function PaymentDataMobile () {
        var ans = []
        for (let i=0;i<transactionHistory.charges.length;i++) {
            var data = []
            var status = null
            if (transactionHistory.charges[i].refunded === true) {
                if (transactionHistory.charges[i].status === 'succeeded') {
                    status = 'Refunded'
                } else {
                    status = 'Refund Failed'
                }
            } else {
                if (transactionHistory.charges[i].status === 'succeeded') {
                    status = 'Paid'
                } else {
                    status = 'Payment Failed'
                }
            }
            data.push(
                <div>
                    <div className="paymenthistory-mobile-data-block">
                    <div className="paymenthistory-mobile-data-row">
                        <div>Date:</div>
                        <div>{ transactionHistory.charges[i].created }</div>
                    </div>
                    <div className="paymenthistory-mobile-data-row">
                        <div>Amount:</div>
                        <div>${ transactionHistory.charges[i].amount }</div>
                    </div>
                    <div className="paymenthistory-mobile-data-row">
                        <div>Card:</div>
                        <div>{transactionHistory.charges[i].payment_method_details.network.toUpperCase() + ' ****' + transactionHistory.charges[i].payment_method_details.last4}</div>
                    </div>
                    <div className="paymenthistory-mobile-data-row">
                        <div>Receipt:</div>
                        <div><a href={transactionHistory.charges[i].receipt_url}>Link</a></div>
                    </div>
                    <div className="paymenthistory-mobile-data-row">
                        <div>Status:</div>
                        <div>{status}</div>
                    </div>
                    </div>
                </div>
            )
            ans.push(<div>{data}</div>)
        }
        return (
            <div className="paymenthistory-mobile-data">
                {ans}
            </div>
        )
    }
    if (transactionHistoryErrMsg !== '') {
        return (
            <div className="paymenthistory-wrapper">
                <h3>Payment History</h3>
                <br></br>
                <p>{transactionHistoryErrMsg}</p>
            </div>
        )
    } else {
        if (dataLoadingFlag === true) {
            return(
                <div className="paymenthistory-wrapper">
                    <h3>Payment History</h3>
                    <div className='paymenthistory-table-section'>
                    <table className="paymenthistory-table">
                    <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Card</th>
                        <th>Receipt</th>
                        <th>Status</th>
                    </tr>
                    {/* <tr>
                        <td>Alfreds Futterkiste</td>
                        <td>Maria Anders</td>
                        <td>Germany</td>
                        <td>Germany</td>
                        <td>Germany</td>
                    </tr>
                    <tr>
                        <td>Centro comercial Moctezuma</td>
                        <td>Francisco Chang</td>
                        <td>Mexico</td>
                        <td>Mexico</td>
                        <td>Mexico</td>
                    </tr> */}
                    { PaymentData() }
                    </table>
                    </div>
                    <div className="paymenthistory-mobile-section">
                        {/* <div className="paymenthistory-mobile-data">
                            <div className="paymenthistory-mobile-data-block">
                            <div className="paymenthistory-mobile-data-row">
                                <div>Date:</div>
                                <div>2022-04-22 19:08:05</div>
                            </div>
                            <div className="paymenthistory-mobile-data-row">
                                <div>Amount:</div>
                                <div>2022-04-22 19:08:05</div>
                            </div>
                            <div className="paymenthistory-mobile-data-row">
                                <div>Card:</div>
                                <div>2022-04-22 19:08:05</div>
                            </div>
                            <div className="paymenthistory-mobile-data-row">
                                <div>Receipt:</div>
                                <div>2022-04-22 19:08:05</div>
                            </div>
                            <div className="paymenthistory-mobile-data-row">
                                <div>Status:</div>
                                <div>2022-04-22 19:08:05</div>
                            </div>
                            </div>
                        </div> */}
                        { PaymentDataMobile() }
                    </div>
                </div>
            )
        }
    }
}

export default PaymentHistory;