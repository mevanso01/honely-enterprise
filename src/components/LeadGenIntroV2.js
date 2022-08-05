/*
if status is either ACTIVE or INACTIVE, redirect to /leads
*/
//REACT
import React, { useState, useEffect } from "react";
import axios from "axios";
import PromoCodePrompt from "./PromoCodePrompt"

//STYLES
import "../styles/LeadGenIntroV2.css";

//IMAGES
import ComputerScreen from "../assets/images/computer-screen-with-arrow.png";
import SearchForm from "../assets/images/search-form.png";
import ResultsForm from "../assets/images/results-form.png";
import Customize from "../assets/images/customize.png";
import GirlDesk from "../assets/images/girl-desk.png";

export default function LeadGenIntroV2(props) {
  const [stripeUrl, setStripeUrl] = useState(null)
  const [promoCodeFlag, setPromoCodeFlag] = useState(false)
  const [promoCodeErrMsg, setPromoCodeErrMsg] = useState('')
  function getStripeUrl() {
    let config = {
      headers: {
        Authorization: "Bearer " + props.jwt,
      },
    };
    axios
      .post(
        "https://developers.honely.com/create-stripe-session?source=SUBSCRIPTION",
        {},
        config
      )
      .then((response) => {
        setStripeUrl(response.data.data.url)
      })
      .catch((error) => {
        if (error.message === "Request failed with status code 401") {
          props.doSignOut();
        }
      });
  }
  function promoCodeContinueAction() {
    var promoCode = document.getElementById('promo-code').value
    if (promoCode !== null && promoCode !== '' && promoCode !== 'HONELY20') {
        setPromoCodeErrMsg('Invalid Promo Code')
    } else {
        setPromoCodeErrMsg('')
        if (props.userProfile.default_payment_method) {
            generateApiKey()
        } else {
            if (stripeUrl !== null) {
                var pcObject = {
                    promoCode: promoCode
                }
                window.sessionStorage.setItem(
                    "PromoCode",
                    JSON.stringify(pcObject)
                  );
                setTimeout(() => {
                    window.location.href = stripeUrl
                }, 500)
            }
        }
    }
  }
  function generateApiKey() {
    if (props.userProfile.default_payment_type !== null) {
      var promoCode = JSON.parse(window.sessionStorage.getItem('PromoCode')).promoCode
      if (document.getElementById('promo-code') !== null) {
        promoCode = document.getElementById('promo-code').value
      }
      let config = {
        headers: {
          Authorization: "Bearer " + props.jwt,
        },
      };
      axios
        .post(
          "https://developers.honely.com/dashboard/api-key",
          {
            payment_type: "HONELY_API_BASIC_PLAN",
            promo_code: promoCode
          },
          config
        )
        .then((response) => {
          console.log("vx: generate api key wala response", response);
          window.sessionStorage.removeItem('PromoCode')
          setTimeout(() => {
            window.location.href = '/account-management/subscription'
          }, 500)
        })
        .catch((error) => {
          if (error.message === "Request failed with status code 401") {
            window.sessionStorage.removeItem('PromoCode')
            setTimeout(() => {
                props.doSignOut();
            }, 500)
          }
        });
    } else {
      window.location.href = stripeUrl;
    }
  }
  useEffect(() => {
    if (props.authFlag) {
      if (typeof props !== 'undefined' && props!== null && typeof props.userProfile !== 'undefined' && props.userProfile !== null && (props.userProfile.status === 'ACTIVE' || props.userProfile.status === 'INACTIVE')) {
        window.location.href = '/account-management/leads'
      } else {
        getStripeUrl();
      }
    }
}, [])
  return (
    <div className="section">
      <div className="lead-intro-v2-white-container">
        <div className="section-wrapper">
          <div className="lead-intro-v2-section-column lead-intro-v2-section-column-start">
            <p className="text-exlarge lead-intro-v2-header">
              Increase lead capture with our future value widget
            </p>
            <p className="text-medium lead-intro-v2-subheader">
              Generate more leads and improve your site engagement by
              integrating Honely’s predictive analytics onto your website!
            </p>
          </div>
        </div>
      </div>

      <div className="lead-intro-v2-grey-container">
        <div className="section-wrapper">
          <div className="lead-intro-v2-scrollable">
            <div className="lead-intro-v2-computer-img-container">
              <img
                src={ComputerScreen}
                className="lead-intro-v2-computer-img"
              />
            </div>
            <div className="lead-intro-v2-form-img-container">
              <div className="lead-intro-v2-single-form-container">
                <p className="lead-intro-v2-form-label">
                  Clients can enter their own custom search
                </p>
                <div className="lead-intro-v2-form-container">
                  <img src={SearchForm} className="lead-intro-v2-form" />
                </div>
              </div>
              <div className="lead-intro-v2-single-form-container">
                <p className="lead-intro-v2-form-label">
                  Results page has 3 years of forecasts
                </p>
                <div className="lead-intro-v2-form-container">
                  <img src={ResultsForm} className="lead-intro-v2-form" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lead-intro-v2-white-container">
        <div className="section-wrapper">
          <div className="lead-intro-v2-section-column">
            <p className="text-exlarge lead-intro-v2-header">Pricing</p>
            <p className="text-medium lead-intro-v2-subheader lead-intro-v2-grey">
              This montly rate equips your website with a premier lead capture
              tool and a competitive advantage.
            </p>
            <p className="lead-intro-v2-price">
              $19.99/mo*{" "}
              <span className="lead-intro-v2-price-crossout">$24.99/mo</span>
            </p>
            <p className="lead-intro-v2-small-text">
              Save 30% by taking advantage of this special offer.
            </p>
            <div className="lead-intro-v2-btn-container">
            {
                promoCodeFlag && 
                <PromoCodePrompt promoCodeContinueAction={promoCodeContinueAction}/>
            }
            {
                promoCodeFlag && 
                <p style={{color: 'red', fontWeight: '600'}}>{promoCodeErrMsg}</p>
            }
            {
              !promoCodeFlag && 
              <button className="lead-intro-v2-orange-btn" onClick={() => { 
                if (props.authFlag === false  || typeof props.authFlag === 'undefined') {
                  window.location.href = '/signin'
              } else {
                  setPromoCodeFlag(true)
                  // if (props.userProfile.default_payment_method) {
                  //   generateApiKey()
                  // } else {
                  //   if (stripeUrl !== null) {
                  //     window.location.href = stripeUrl
                  //   }
                  // }
              }
                }}>Buy now</button>
            }
            </div>
          </div>
        </div>
      </div>

      <div className="lead-intro-v2-grey-container">
        <div className="section-wrapper">
          <div className="lead-intro-v2-section-column">
            <p className="lead-intro-v2-big-text">
              Easily add to it to your website and start receiving leads.
            </p>
            <div className="lead-intro-v2-lead-cards">
              <div className="lead-intro-v2-card">
                <div className="lead-intro-v2-circle">
                  <p className="lead-intro-v2-number">1</p>
                </div>
                <p className="lead-intro-v2-card-header">Add widget code</p>
                <p className="lead-intro-v2-card-content">
                  Enter the widget code to your Wordpress or Wix website. If you
                  used an agent website builder, simply send them the code and
                  ask them to add it to the site’s code.
                </p>
              </div>
              <div className="lead-intro-v2-card">
                <div className="lead-intro-v2-circle">
                  <p className="lead-intro-v2-number">2</p>
                </div>
                <p className="lead-intro-v2-card-header">Style your widget</p>
                <p className="lead-intro-v2-card-content">
                  Customize your color scheme, font attributes, and choose the
                  lead form questions that you wish to include.
                </p>
              </div>
              <div className="lead-intro-v2-card">
                <div className="lead-intro-v2-circle">
                  <p className="lead-intro-v2-number">3</p>
                </div>
                <p className="lead-intro-v2-card-header">Receive leads</p>
                <p className="lead-intro-v2-card-content">
                  Begin receiving quality leads! Honely’s Lead Gen is proven to
                  drive site traffic, bring in more leads, and serve as an
                  effective marketing tool.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="lead-intro-v2-white-container">
        <div className="section-wrapper">
          <div className="lead-intro-v2-section-left">
            <div className="lead-intro-v2-customize-left">
              <p className="lead-intro-v2-big-text-left">Customize with ease</p>
              <p className="lead-intro-v2-small-text-left">
                Realtors and brokerages can place our widget ont in minutes
                using our simple code structure.
              </p>
              <img src={Customize} className="lead-intro-v2-customize" />
            </div>
            <div className="lead-intro-v2-customize-right">
              <img src={GirlDesk} className="lead-intro-v2-girl-desk" />
            </div>
          </div>
        </div>
      </div>

      <div className="lead-intro-v2-footer">
        <div className="lead-intro-v2-footer-content">
          <div className="lead-intro-v2-footer-top">
            <div className="lead-intro-v2-footer-left">
              <p className="lead-intro-v2-footer-header">
                Easy to access widget code
              </p>
              <p className="lead-intro-v2-footer-subheader">
                Generate more leads and improve your site engagement by
                integrating Honely’s predictive analytics onto your website!
              </p>
            </div>
            <div className="lead-intro-v2-footer-right">
              <p className="lead-intro-v2-footer-big">{"</>"}</p>
            </div>
          </div>
          <p className="lead-intro-v2-footer-url">
            {
              "<script src='https://developers.honely.com/widget/load-script?api-key=test-601sdwce-c24f-16hd-a9w0-0hsdfgeqfaf5085'></script>"
            }
          </p>
        </div>
      </div>
    </div>
  );
}
