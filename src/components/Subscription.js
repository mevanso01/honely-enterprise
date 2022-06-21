import React, { useState, useEffect } from "react";
import '../styles/Subscription.css'
import axios from 'axios';

function Subscription(props) {
    const [data, setData] = useState({
        stripeUrl: null
      });
    const [paymentMethodList, setPaymentMethodList] = useState([])
    const [paymentMethodStatusMsg, setPaymentMethodStatusMsg] = useState({
      successMessage: '',
      errorMessage: '',
    })
    // const [chosenPaymentMethod, setChosenPaymentMethod] = useState(null)
    // console.log('vx: jwt from subscription', props.jwt)
    function getStripeUrl() {
        let config = {
            headers: {
              'Authorization': 'Bearer ' + props.jwt
            }
          }
          axios.post( 
              'https://developers.honely.com/create-stripe-session', {},
              config
            )
            .then( ( response ) => {
              console.log( 'vx: stripe url from subscription', response.data.data.url )
              setData((prevValue) => {
                return {
                  stripeUrl: response.data.data.url,
                }
              })
              console.log('vx: url set to state', data.stripeUrl)
            } )
            .catch((error) => {
              if (error.message === 'Request failed with status code 401') {
                props.doSignOut()
              }
            })
    }
    function getPaymentMethodList() {
      let config = {
        headers: {
          'Authorization': 'Bearer ' + props.jwt
        }
      }
      axios.get('https://developers.honely.com/user/payment-method', config)
      .then((response) => {
        if (response.data.data !== null && response.data.data.length > 0) {
          setPaymentMethodList(() => {
            return response.data.data
          })
        }
      })
      .catch((error) => {
        if (error.message === 'Request failed with status code 401') {
          props.doSignOut()
        }
      })
    }
    useEffect(() => {
        // console.log('vx: user default card', props.userProfile.default_payment_method)
        getStripeUrl()
        getPaymentMethodList()
      },[]);
    function regenerateApiKey() {
        let config = {
            headers: {
              'Authorization': 'Bearer ' + props.jwt
            }
          }
        axios.patch('https://developers.honely.com/dashboard/api-key', {}, config)
        .then((response) => {
            console.log('vx: regenerate apikey response', response.data.data.user_api_key)
            window.location.reload()
        })
        .catch((error) => {
          if (error.message === 'Request failed with status code 401') {
            props.doSignOut()
          }
        })
    }
    // function setSelectedPaymentMethod (value) {
    //   console.log('vx: setting payment method to state', value)
    //   setChosenPaymentMethod(() => {
    //     return value
    //   })
    // }
    function submitPaymentMethod () {
      var ans = null
      var radioElements =  document.getElementsByName('currentPaymentMethod')
      for (let x=0; x< radioElements.length; x++) {
        if(radioElements[x].checked === true) {
          ans = radioElements[x].value
          break
        }
      }
      console.log('vx: submitted payment method', ans)
      let config = {
        headers: {
          'Authorization': 'Bearer ' + props.jwt
        }
      }
      var body = {
        "payment_method": ans,
      }
      axios.post('https://developers.honely.com/user/payment-method', body, config)
      .then((response) => {
        if(response.data.data.message === 'Payment method successfully updated') {
          var newUserProfile = props.userProfile
          newUserProfile.default_payment_method = ans
          props.updateUserProfile(newUserProfile)
          setPaymentMethodStatusMsg(() => {
            return {
                errorMessage: '',
                successMessage: 'Successfully updated',
            }
          })
          setTimeout(() => {
            setPaymentMethodStatusMsg(() => {
              return {
                  errorMessage: '',
                  successMessage: '',
              }
            })
          }, 3000)
        }
      })
      .catch(() => {
        setData(() => {
          return {
              errorMessage: 'Something went wrong. Please refresh the page and try again',
              successMessage: '',
          }
        })
      })
    }
    function ApiKeySection () {
        if (typeof props !== 'undefined' && props!== null && typeof props.userProfile !== 'undefined' && props.userProfile !== null && props.userProfile.api_key !== null) {
        return (
            <div key={props.userProfile.api_key}>
            <h3>API Key</h3>
            <div className="subscription-apikey">
            <span>{props.userProfile.api_key}</span>
            <div className='subscription-apikey-logos'>
            <span onClick={()=>{navigator.clipboard.writeText(props.userProfile.api_key)}}className="mdi mdi-content-copy" />
            <span onClick={regenerateApiKey} className="mdi mdi-refresh" />
            </div>
            </div>
            </div>
        )
        }
    }
    function PaymentMethodList () {
      var ans = []
      for (let i=0; i< paymentMethodList.length; i++) {
        if (paymentMethodList[i].id === props.userProfile.default_payment_method) {
          ans.push(
            <div className="subscription-payment-method-item">
              <input type="radio" id={paymentMethodList[i].id} name="currentPaymentMethod" defaultChecked value={paymentMethodList[i].id} /><label for={paymentMethodList[i].id}>{paymentMethodList[i].brand.toUpperCase()} ****{paymentMethodList[i].last4}</label>
              <br></br>
            </div>
          )
        } else {
          ans.push(
            <div className="subscription-payment-method-item">
              <input type="radio" id={paymentMethodList[i].id} name="currentPaymentMethod" value={paymentMethodList[i].id} /><label for={paymentMethodList[i].id}>{paymentMethodList[i].brand.toUpperCase()} ****{paymentMethodList[i].last4}</label>
              <br></br>
            </div>
          )
        }
      }
      return (
        <div className="subscription-payment-method-list">
          {ans}
        </div>
      )
    }
    function SelectPaymentMethod () {
      if (paymentMethodList.length > 0) {
        return (
          <div className="subscription-payment-method-select">
            <span>Select a payment method:</span>
            {/* <br></br> */}
            <PaymentMethodList />
            <button className="subscription-payment-method-submit-btn" onClick={submitPaymentMethod}>Submit</button>
            </div>
        )
      }
    }
    function generateApiKey () {
        let config = {
          headers: {
            'Authorization': 'Bearer ' + props.jwt
          }
        }
        axios.post( 
            'https://developers.honely.com/dashboard/api-key', {
              payment_type: 'HONELY_API_BASIC_PLAN'
            },
            config
          )
          .then( ( response ) => {
            console.log('vx: generate api key wala response', response)
            window.location.reload()
          } )
          .catch((error) => {
            if (error.message === 'Request failed with status code 401') {
              props.doSignOut()
            }
          })
      }
    if (typeof props !== 'undefined' && props!== null && typeof props.userProfile !== 'undefined' && props.userProfile !== null && props.userProfile.status === 'ACTIVE') {
        if (props.userProfile.subscription_start_data !== null) {
    return(
        <div className="subscription-wrapper">
            <h3>Subscription Details</h3>
            <ul>
                {/* <li><i className="fas fa-arrow-right subscription-logo" />Current Pay Cycle Start Date: <span className="newsitem-date mdi mdi-calendar-month-outline user-sub-color-primary">Sat, 02 Apr 2022</span></li> */}
                <li><div className="subscription-col-flex"><i className="fas fa-arrow-right subscription-logo" /> Current Pay Cycle Start Date: <span className="newsitem-date mdi mdi-calendar-month-outline user-sub-color-primary">{props.userProfile.subscription_start_data.substring(0,11)}</span></div></li>
                {/* <li><i className="fas fa-arrow-right subscription-logo" />Current Pay Cycle Renewal Date: <span className="newsitem-date mdi mdi-calendar-month-outline">Mon, 02 May 2022</span></li> */}
                <li><div className="subscription-col-flex"><i className="fas fa-arrow-right subscription-logo" />Current Pay Cycle Renewal Date: <span className="newsitem-date mdi mdi-calendar-month-outline">{props.userProfile.subscription_end_data.substring(0,11)}</span></div></li>
                {/* <li><i className="fas fa-arrow-right subscription-logo" />Projected Bill Amount: <span>$100.00</span></li> */}
            </ul>
            <ApiKeySection />
            <div className="subscription-payment-method">
            <h3>Payment Method</h3>
            <div className="subscription-payment-method-select">
            <span className="mdi mdi-plus subscription-change-payment-method" onClick={() => {window.location.href=data.stripeUrl}}/><span className="subscription-change-payment-method" onClick={() => {window.location.href=data.stripeUrl}}>Add a new payment method</span>
            </div>
            <SelectPaymentMethod />
            <p className="subscription-payment-method-success-message">{paymentMethodStatusMsg.successMessage}</p>
            <p className="subscription-payment-method-error-message">{paymentMethodStatusMsg.errorMessage}</p>
            </div>
            {/* <h3>Subscription</h3>
            <br></br><br></br>
            <button onClick={() => {window.location.href=data.stripeUrl}}>Subscribe now</button> */}
        </div>
    )
        } else {
            return (
                <div className="subscription-wrapper">
                    <ApiKeySection />
                </div>
            )
        }
        }
        if (typeof props !== 'undefined' && props!== null && typeof props.userProfile !== 'undefined' && props.userProfile !== null && props.userProfile.status === 'CONFIRMED') {
            return(
                <div className="subscription-wrapper">
                     <h3>Subscription</h3>
                    <br></br><br></br>
                    <button onClick={() => {window.location.href=data.stripeUrl}}>Subscribe now</button>
                </div>
            )
        }
        if (typeof props !== 'undefined' && props!== null && typeof props.userProfile !== 'undefined' && props.userProfile !== null && ( props.userProfile.status === 'INACTIVE' || props.userProfile.status === 'COMPLETED')) {
            return(
                <div className="subscription-wrapper">
                     <h3>Subscription</h3>
                    <br></br><br></br>
                    <button onClick={generateApiKey}>Generate API Key</button>
                </div>
            )
        }
}

export default Subscription;