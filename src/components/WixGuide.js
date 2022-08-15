//REACT
import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

//REACT LIBRARIES
import { HashLink } from "react-router-hash-link";

//IMAGES
import CopyIcon from "../assets/images/copy-icon.png";
import ComputerScreen from "../assets/images/computer-screen-with-arrow.png";
import SearchForm from "../assets/images/search-form.png";

export default function WixGuide() {
  const navigate = useNavigate();
  const { userProfile } = useOutletContext();
  const [scriptCopied, setScriptCopied] = useState(false)

  return (
    <div className="wordpress-content">
      <div className="wordpress-guide-section">
        <p className="leads-title">Installation guide for Wix</p>
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
              Step 1: Follow Instructions to paste the Honely code on your
              wordpress page.
            </HashLink>
            <HashLink smooth to="#step2" className="wordpress-guide-step">
              Step 2: Test the Honely Widget to connect your site.
            </HashLink>
          </div>
        </div>
      </div>

      <div className="wordpress-guide-section" id="step1">
        <p className="wordpress-guide-header">Step 1</p>
        <p className="leads-text">
          Follow instructions for pasting the Honely Widget code into your Wix
          page.
        </p>
        <p className="wordpress-guide-detail-step">
          1. Go to Settings in your site's dashboard.
        </p>
        <p className="wordpress-guide-detail-step">
          2. Click the Custom Code tab in the Advanced section.
        </p>
        <p className="wordpress-guide-detail-step">
          3. Click + Add Custom Code at the top right.
        </p>
        <p className="wordpress-guide-detail-step">
          4. <span className="wordpress-guide-orange">Copy</span> the following
          code.
        </p>
        <div
          className="wordpress-guide-api-key-container space-bottom"
          onClick={() => {
            navigator.clipboard.writeText(
              "<script src='https://developers.honely.com/widget/load-script?api-key=${userProfile?.api_key}'></script>"
            );
            setScriptCopied(true);
            setTimeout(() => {
              setScriptCopied(false);
            }, 3000);
          }}
        >
          <p className="wordpress-guide-api-key">{`<script src="https://developers.honely.com/widget/load-script?api-key=${userProfile?.api_key}"></script>`}</p>
          <img src={CopyIcon} className="wordpress-guide-copy-icon" />
          {scriptCopied && (
            <div className="copied-notification">Copied to clipboard!</div>
          )}
        </div>

        <p className="wordpress-guide-detail-step">
          5. Paste the code snippet in the text box.
        </p>
        <p className="wordpress-guide-detail-step">
          6. Enter a name for your code.
        </p>
        <p className="wordpress-guide-detail-step">
          7. Tip: Give it a name that is easy to recognize so you can quickly
          identify it later.
        </p>
        <p className="wordpress-guide-detail-step">
          8. Select an option under Add Code to Pages:
        </p>
        <p className="wordpress-guide-detail-step">
          9. All pages: This adds the code to all of your site's pages,
          including any new pages that you create in the future. Choose whether
          to load the code only once per visit, or on each page your visitor
          opens.
        </p>
        <p className="wordpress-guide-detail-step">
          10. Choose specific pages: Use the drop-down menu to select the
          relevant pages.
        </p>
        <p className="wordpress-guide-detail-step">
          11. Choose where to place your code under Place Code in:.
        </p>

        <p className="wordpress-guide-detail-step">12. Head</p>

        <p className="wordpress-guide-detail-step">13. Body - start</p>

        <p className="wordpress-guide-detail-step">14. Body - end</p>

        <p className="wordpress-guide-detail-step">15. Click Apply.</p>
      </div>

      <div className="wordpress-guide-section no-underline" id="step2">
        <p className="wordpress-guide-header">Step 2</p>
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

      {/* <button
        className="wordpress-guide-complte-btn"
        onClick={() => {
          navigate("/account-management/customize-widget");
        }}
      >
        Finish Setup
      </button> */}
    </div>
  );
}
