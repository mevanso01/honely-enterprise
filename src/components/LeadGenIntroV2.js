//REACT
import React, { useState, useEffect } from "react";
import axios from "axios";

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
        setStripeUrl(response.data.data.url)
      })
      .catch((error) => {
        if (error.message === "Request failed with status code 401") {
          props.doSignOut();
        }
      });
  }
  useEffect(() => {
    if (props.authFlag) {
        getStripeUrl();
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
              <button className="lead-intro-v2-orange-btn" onClick={() => { 
                    if (props.authFlag === false  || typeof props.authFlag === 'undefined') {
                      window.location.href = '/signin'
                  } else {
                      if (stripeUrl !== null) {
                          window.location.href = stripeUrl
                      }
                  }
                    }}>Buy now</button>
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
