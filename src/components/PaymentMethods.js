import React, { useState, useEffect } from "react";
import axios from 'axios'
import "../styles/Subscription.css";

function PaymentMethods (props) {
    const [data, setData] = useState({
        stripeUrl: null,
      });
    const [paymentMethodStatusMsg, setPaymentMethodStatusMsg] = useState({
        successMessage: "",
        errorMessage: "",
    });
    const [paymentMethodList, setPaymentMethodList] = useState([]);
    function getStripeUrl() {
        let config = {
          headers: {
            Authorization: "Bearer " + props.jwt,
          },
        };
        axios
          .post(
            "https://developers.honely.com/create-stripe-session?source=LEADGEN",
            {},
            config
          )
          .then((response) => {
            console.log("vx: stripe url from subscription", response.data.data.url);
            setData((prevValue) => {
              return {
                stripeUrl: response.data.data.url,
              };
            });
            console.log("vx: url set to state", data.stripeUrl);
          })
          .catch((error) => {
            if (error.message === "Request failed with status code 401") {
              props.doSignOut();
            }
          });
      }
      function getPaymentMethodList() {
        let config = {
          headers: {
            Authorization: "Bearer " + props.jwt,
          },
        };
        axios
          .get("https://developers.honely.com/user/payment-method", config)
          .then((response) => {
            if (response.data.data !== null && response.data.data.length > 0) {
              setPaymentMethodList(() => {
                return response.data.data;
              });
            }
          })
          .catch((error) => {
            if (error.message === "Request failed with status code 401") {
              props.doSignOut();
            }
          });
      }
    useEffect(() => {
        getStripeUrl();
        getPaymentMethodList();
    }, [])
    function submitPaymentMethod() {
        var ans = null;
        var radioElements = document.getElementsByName("currentPaymentMethod");
        for (let x = 0; x < radioElements.length; x++) {
          if (radioElements[x].checked === true) {
            ans = radioElements[x].value;
            break;
          }
        }
        console.log("vx: submitted payment method", ans);
        let config = {
          headers: {
            Authorization: "Bearer " + props.jwt,
          },
        };
        var body = {
          payment_method: ans,
        };
        axios
          .post("https://developers.honely.com/user/payment-method", body, config)
          .then((response) => {
            if (
              response.data.data.message === "Payment method successfully updated"
            ) {
              var newUserProfile = props.userProfile;
              newUserProfile.default_payment_method = ans;
              props.updateUserProfile(newUserProfile);
              setPaymentMethodStatusMsg(() => {
                return {
                  errorMessage: "",
                  successMessage: "Successfully updated",
                };
              });
              setTimeout(() => {
                setPaymentMethodStatusMsg(() => {
                  return {
                    errorMessage: "",
                    successMessage: "",
                  };
                });
              }, 3000);
            }
          })
          .catch(() => {
            setData(() => {
              return {
                errorMessage:
                  "Something went wrong. Please refresh the page and try again",
                successMessage: "",
              };
            });
          });
      }
      function PaymentMethodList() {
        var ans = [];
        for (let i = 0; i < paymentMethodList.length; i++) {
          if (
            paymentMethodList[i].id === props.userProfile.default_payment_method
          ) {
            ans.push(
              <div className="subscription-payment-method-item">
                <input
                  type="radio"
                  id={paymentMethodList[i].id}
                  name="currentPaymentMethod"
                  defaultChecked
                  value={paymentMethodList[i].id}
                />
                <label key={paymentMethodList[i].id}>
                  {paymentMethodList[i].brand.toUpperCase()} ****
                  {paymentMethodList[i].last4}
                </label>
                <br></br>
              </div>
            );
          } else {
            ans.push(
              <div className="subscription-payment-method-item">
                <input
                  type="radio"
                  id={paymentMethodList[i].id}
                  name="currentPaymentMethod"
                  value={paymentMethodList[i].id}
                />
                <label key={paymentMethodList[i].id}>
                  {paymentMethodList[i].brand.toUpperCase()} ****
                  {paymentMethodList[i].last4}
                </label>
                <br></br>
              </div>
            );
          }
        }
        return <div className="subscription-payment-method-list">{ans}</div>;
      }
      function SelectPaymentMethod() {
        if (paymentMethodList.length > 0) {
          return (
            <div className="subscription-payment-method-select">
              <span>Change payment method:</span>
              {/* <br></br> */}
              <PaymentMethodList />
              <button
                className="subscription-payment-method-submit-btn"
                onClick={submitPaymentMethod}
              >
                Submit
              </button>
            </div>
          );
        }
      }
    return (
        <div className="section">
            <div className="subscription-payment-method">
              <h3>Payment Methods</h3>
              <div className="subscription-payment-method-select">
                <span
                  className="mdi mdi-plus subscription-change-payment-method"
                  onClick={() => {
                    window.location.href = data.stripeUrl;
                  }}
                />
                <span
                  className="subscription-change-payment-method"
                  onClick={() => {
                    window.location.href = data.stripeUrl;
                  }}
                >
                  Add a new payment method
                </span>
              </div>
              <SelectPaymentMethod />
              <p className="subscription-payment-method-success-message">
                {paymentMethodStatusMsg.successMessage}
              </p>
              <p className="subscription-payment-method-error-message">
                {paymentMethodStatusMsg.errorMessage}
              </p>
            </div>
        </div>
    )
}

export default PaymentMethods