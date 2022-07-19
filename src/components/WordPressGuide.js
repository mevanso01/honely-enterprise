//REACT
import React, { useEffect } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

//REACT LIBRARIES
import { HashLink } from 'react-router-hash-link';

//STYLES
import "../styles/WordPressGuide.css";

//IMAGES
import WordPressDropdown from "../assets/images/wordpress-dropdown.png";
import WordPressStep1 from "../assets/images/wordpress-step1.png";
import WordPressStep2 from "../assets/images/wordpress-step2.png";
import WordPressStep3 from "../assets/images/wordpress-step3.png";
import WordPressStep4 from "../assets/images/wordpress-step4.png";
import WordPressStep6 from "../assets/images/wordpress-step6.png";
import CopyIcon from "../assets/images/copy-icon.png";
import ComputerScreen from "../assets/images/computer-screen-with-arrow.png";
import SearchForm from "../assets/images/search-form.png";

export default function WordPressGuide() {
  const navigate = useNavigate();
  const { userProfile } = useOutletContext();

  return (
    <div className="wordpress-content">
      <div className="wordpress-guide-section">
        <p className="leads-title">Installation guide for Wordpress</p>
        <div className="leads-note">
          <p className="leads-bold">Important Note</p>
          <p className="leads-text">
            We encourage you to consult your IT team in order to complete the
            following steps with ease. Although, if you are familiar with
            wordpress this should be a breeze and should only take 10min to
            complete.
          </p>
          <div className="wordpress-guide-steps">
            <HashLink smooth to="#step1" className="wordpress-guide-step">
              Step 1: Select wordpress version
            </HashLink>
            <HashLink smooth to="#step2" className="wordpress-guide-step">
              Step 2: Follow Instructions to paste the Honely code on your
              wordpress page.
            </HashLink>
            <HashLink smooth to="#step3" className="wordpress-guide-step">
              Step 3: Test the Honely Widget to connect your site.
            </HashLink>
          </div>
        </div>
      </div>
      <div className="wordpress-guide-section" id="step1">
        <p className="wordpress-guide-header">Step 1</p>
        <p className="leads-text">
          Please select your Wordpress version for instructions.
        </p>
        <img
          src={WordPressDropdown}
          className="word-press-guide-dropdown-img"
        />
      </div>

      <div className="wordpress-guide-section" id="step2">
        <p className="wordpress-guide-header">Step 2</p>
        <p className="leads-text">
          Follow instructions for pasting the Honely Widget code into your
          Wordpress V [X.X]
        </p>
        <div className="wordpress-guide-details">
          <p className="wordpress-guide-detail-step">
            1. Log into your Agent Website Admin Center.
          </p>
          <img src={WordPressStep1} className="wordpress-guide-detail-img" />
        </div>
        <div className="wordpress-guide-details">
          <p className="wordpress-guide-detail-step">
            2. Navigate to Site Pages and click "Edit" under the page you'd like
            to add your code to.
          </p>
          <img src={WordPressStep2} className="wordpress-guide-detail-img" />
        </div>
        <div className="wordpress-guide-details">
          <p className="wordpress-guide-detail-step">3. Launch Page Builder</p>
          <img src={WordPressStep3} className="wordpress-guide-detail-img" />
        </div>
        <div className="wordpress-guide-details">
          <p className="wordpress-guide-detail-step">
            4. Locate the HTML module, and drag and drop it on the page where
            you want it.
          </p>
          <img src={WordPressStep4} className="wordpress-guide-detail-img" />
        </div>
        <div className="wordpress-guide-details">
          <p className="wordpress-guide-detail-step">
            5. <span className="wordpress-guide-orange">Copy</span> the
            following code.
          </p>
          <div
            className="wordpress-guide-api-key-container"
            onClick={() => {
              navigator.clipboard.writeText("<script src='https://developers.honely.com/widget/load-script?api-key=${userProfile?.api_key}'></script>");
            }}
          >
            <p className="wordpress-guide-api-key">{`<script src="https://developers.honely.com/widget/load-script?api-key=${userProfile?.api_key}"></script>`}</p>
            <img src={CopyIcon} className="wordpress-guide-copy-icon" />
          </div>
        </div>
        <div className="wordpress-guide-details">
          <p className="wordpress-guide-detail-step">
            6. Paste the copied code in the small window that pops up. Save your
            changes.
          </p>
          <img src={WordPressStep6} className="wordpress-guide-detail-img" />
        </div>
      </div>

      <div className="wordpress-guide-section no-underline" id="step3">
        <p className="wordpress-guide-header">Step 3</p>
        <p className="leads-text">
          Visit your website and complete all the required fields in the form
          that pops to generate your first lead.
        </p>
        <div className="wordpress-guide-last-step">
          <img
            src={ComputerScreen}
            className="wordpress-guide-computer-screen"
          />
          <img src={SearchForm} className="wordpress-guide-search-form" />
        </div>
      </div>

      <button
        className="wordpress-guide-complte-btn"
        onClick={() => {
          navigate("/account-management/customize-widget");
        }}
      >
        Finish Setup
      </button>
    </div>
  );
}
