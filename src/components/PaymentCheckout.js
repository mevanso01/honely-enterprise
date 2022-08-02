import React, { useState, useEffect} from "react";
import "../styles/PaymentCheckout.css";
import axios from 'axios';
import generateSideBySidePayload from "../functionalities/CMAPayloadGenerator";

function PaymentCheckout(props) {
    const [mode, setMode] = useState(null)
    const [bulkCredits, setBulkCredits] = useState(0)
    const [bulkCreditsCharge, setBulkCreditsCharge] = useState(0)
    const [errMsg, setErrMsg] = useState('')
    function generateCMA() {
        var sideBySidePayload = generateSideBySidePayload();
        console.log("vx: tralalala1", sideBySidePayload);
        var pika = JSON.parse(window.sessionStorage.getItem("CMA")).array;
        var cmaPayloadVar = {};
        cmaPayloadVar.user_id = "512";
        cmaPayloadVar.mode = "multiple";
        //   cmaPayloadVar.report_data_list = []
        cmaPayloadVar.report_data_list = sideBySidePayload.slice();
        //   cmaPayloadVar.report_data_list.concat(sideBySidePayload)
        console.log("vx: tralalala2", cmaPayloadVar.report_data_list);
        for (let x = 0; x < pika.length; x++) {
          delete pika[x].user_id;
          cmaPayloadVar.report_data_list.push(pika[x]);
        }
        console.log("vx: tralalala3", cmaPayloadVar.report_data_list);
        console.log("[INFO] Start generating PDF report......");
        fetch("https://api.honely.com/util/reports/pdf", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cmaPayloadVar),
          // body: JSON.stringify(raichu),
        })
          .then(function (response) {
            // console.log(response)
            return response.blob();
          })
          .then(function (blob) {
            var url = window.URL.createObjectURL(blob);
            var a = document.createElement("a");
            a.href = url;
            a.download = "honely_report.pdf";
            document.body.appendChild(a);
            a.click();
            a.remove();
            console.log("[INFO] Finished generating PDF report......");
            setTimeout(() => {
                window.location.href = '/reports'
            }, 1000)
          })
          .catch((err) => {
            console.log("PDF Request Failed", err);
          });
      }
    useEffect(() => {
        const urlSearchParams = new URLSearchParams(window.location.search)
        const params = Object.fromEntries(urlSearchParams.entries())
        const pika = params.mode
        if (pika === '1-credit-purchase') {
            setMode(1)
        } else if (pika === '2-credit-purchase') {
            setMode(2)
        } else if (pika === 'bulk-credit-purchase') {
            setMode(3)
        } else if (pika === 'single-property-report-purchase') {
            setMode(4)
        } else if (pika === 'cma-purchase') {
            setMode(5)
        } else {
            // window.location.href = '/'
        }
    })
    function buyCredits(credits, dollars) {
        let config = {
            headers: {
              'Authorization': 'Bearer ' + props.jwt
            }
          }
          var body = {
            "credit-amount": credits,
            "dollar-amount": dollars,
          }
          axios.post('https://developers.honely.com/user/dollar-exchange', body, config)
          .then((response) => {
            window.location.href = '/reports'
          })
          .catch((error) => {
            if (error.message === 'Request failed with status code 401') {
              props.doSignOut()
            } else {
              console.log('vx: error purchasing credits', error.message)
            }
          })
    }
    function buyReport (dollars) {
        let config = {
            headers: {
                'Authorization': 'Bearer ' + props.jwt
            }
        }
        var payload = {
            'dollar-amount': dollars
        }
        axios.post('https://developers.honely.com/user/buy-report', payload, config)
        .then(() => {
            if (mode == 4) {
                // vx: download single property report and redirect to /reports
                var pika = JSON.parse(window.sessionStorage.getItem("SinglePropertyReport")).array;
                console.log("[INFO] Start generating PDF report......");
                fetch("https://api.honely.com/util/reports/pdf", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(pika[0]),
                // body: JSON.stringify(raichu),
                })
                .then(function (response) {
                    // console.log(response)
                    return response.blob();
                })
                .then(function (blob) {
                    var url = window.URL.createObjectURL(blob);
                    var a = document.createElement("a");
                    a.href = url;
                    a.download = "honely_report.pdf";
                    document.body.appendChild(a);
                    a.click();
                    a.remove();
                    console.log("[INFO] Finished generating PDF report......");
                    window.sessionStorage.removeItem("SinglePropertyReport")
                    setTimeout(() => {
                        window.location.href = '/reports'
                    }, 1000)
                })
                .catch((err) => {
                    console.log("PDF Request Failed", err);
                });
            }
            if (mode == 5) {
                generateCMA()
            }
        }).catch((error) => {
            if (error.message === 'Request failed with status code 401') {
              props.doSignOut()
            } else {
              console.log('vx: error purchasing credits', error.message)
            }
        })
    }
    /*
    the thing u're buying:
    1 credit
    2 credit
    x credits
    1 single property report
    1 cma report
    */
    return (
        <div className='section'>
            {
                mode == 1 && 
                <div className='paymentcheckout-container'>
                    <p className="paymentcheckout-title">Place your order</p>
                    <div className="paymentcheckout-purchase-details">
                        <p>1 credit</p>
                        <p>Total $0.50</p>
                    </div>
                    <button onClick={
                        () => {
                            if (!props.userProfile.default_payment_method) {
                                setErrMsg('No payment method present. Please add a payment method in the account management section')
                            } else {
                                setErrMsg('')
                                buyCredits(1, 0.50)
                            }
                        }
                    }>Place Order</button>
                    <br></br><br></br>
                    <p style={{color: 'red', fontWeight: '600'}}>{errMsg}</p>
                </div>
            }
            {
                mode == 2 && 
                <div className='paymentcheckout-container'>
                    <p className="paymentcheckout-title">Place your order</p>
                    <div className="paymentcheckout-purchase-details">
                        <p>2 credits</p>
                        <p>Total $1.00</p>
                    </div>
                    <button onClick={
                        () => {
                            if (!props.userProfile.default_payment_method) {
                                setErrMsg('No payment method present. Please add a payment method in the account management section')
                            } else {
                                setErrMsg('')
                                buyCredits(2, 1)
                            }
                        }
                    }>Place Order</button>
                    <br></br><br></br>
                    <p style={{color: 'red', fontWeight: '600'}}>{errMsg}</p>
                </div>
            }
            {
                mode == 4 && 
                <div className='paymentcheckout-container'>
                    <p className="paymentcheckout-title">Place your order</p>
                    <div className="paymentcheckout-purchase-details-2">
                        <p>1 Single Property Report</p>
                        <p>Total $0.50</p>
                    </div>
                    <button onClick={
                        () => {
                            if (!props.userProfile.default_payment_method) {
                                setErrMsg('No payment method present. Please add a payment method in the account management section')
                            } else {
                                setErrMsg('')
                                buyReport(0.50)
                            }
                        }
                    }>Place Order</button>
                    <br></br><br></br>
                    <p style={{color: 'red', fontWeight: '600'}}>{errMsg}</p>
                </div>
            }
            {
                mode == 5 && 
                <div className='paymentcheckout-container'>
                    <p className="paymentcheckout-title">Place your order</p>
                    <div className="paymentcheckout-purchase-details-2">
                        <p>1 CMA Report</p>
                        <p>Total $1.00</p>
                    </div>
                    <button onClick={
                        () => {
                            if (!props.userProfile.default_payment_method) {
                                setErrMsg('No payment method present. Please add a payment method in the account management section')
                            } else {
                                setErrMsg('')
                                buyReport(1)
                            }
                        }
                    }>Place Order</button>
                    <br></br><br></br>
                    <p style={{color: 'red', fontWeight: '600'}}>{errMsg}</p>
                </div>
            }
            {
                mode == 3 && 
                <div className='paymentcheckout-container'>
                <p className="paymentcheckout-title">Place your order</p>
            <div className="paymentcheckout-bulk-credits">
            <input type="radio" id={20} value={20} name="noOfCreditsToBuy" onChange={() => {
                setBulkCredits(20)
                setBulkCreditsCharge(9.99)
            }}></input><label>20 credits for $9.99</label>
            <br></br><br></br><br></br>
            <input type="radio" id={50} value={50} name="noOfCreditsToBuy" onChange={() => {
                setBulkCredits(50)
                setBulkCreditsCharge(22.49)
            }}></input><label>50 credits for $22.49</label>
            <br></br><br></br><br></br>
            <input type="radio" id={100} value={100} name="noOfCreditsToBuy" onChange={() => {
                setBulkCredits(100)
                setBulkCreditsCharge(39.99)
            }}></input><label>100 credits for $39.99</label>
            <br></br><br></br><br></br>
            <input type="radio" id={200} value={200} name="noOfCreditsToBuy" onChange={() => {
                setBulkCredits(200)
                setBulkCreditsCharge(74.99)
            }}></input><label>200 credits for $74.99</label>
            <br></br><br></br><br></br>
            </div>
                <div className="paymentcheckout-purchase-details">
                    <p>{bulkCredits} Credits</p>
                    <p>Total ${bulkCreditsCharge}</p>
                </div>
                <button onClick={
                    () => {
                        if (!props.userProfile.default_payment_method) {
                            setErrMsg('No payment method present. Please add a payment method in the account management section')
                        } else {
                            setErrMsg('')
                            buyCredits(bulkCredits, bulkCreditsCharge)
                        }
                    }
                }>Place Order</button>
                <br></br><br></br>
                    <p style={{color: 'red', fontWeight: '600'}}>{errMsg}</p>
            </div>
            }
        </div>
    )
}

export default PaymentCheckout;