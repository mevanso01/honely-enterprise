import React, { useState, useEffect } from "react";
import {
  Link,
  useNavigate,
  Outlet,
  useLocation,
  useOutletContext,
} from "react-router-dom";
import "../styles/Leads.css";

export default function Leads() {
  const [type, setType] = useState("wordpress");
  const [selected, setSelected] = useState(false);
  const { userProfile } = useOutletContext();

  const navigate = useNavigate();
  var path = useLocation();

  useEffect(() => {
    if (path?.pathname === "/account-management/leads") setSelected(false);
    else setSelected(true);
  }, [path]);

  return (
    <div className="section">
      <div className="leads-content">
        {!selected ? (
          <>
            <div className="leads-top">
              <p className="leads-title">Leads widget setup</p>
              <div className="leads-notes">
                <p className="leads-bold">Important Note</p>
                <p className="leads-text">
                  Our support team is happy to show you the tools available
                  within the website admin, and we can run through the steps
                  that are detailed in this article. However, any further
                  troubleshooting or assistance with custom code would be
                  considered "custom design assistance" which is a service that
                  we do not offer. You will need to seek a third-party solution
                  for that service, as we are not web designers/developers.
                </p>
                <p className="leads-text">
                  Please contact us if you have a custom wesite or need any help
                  setting up.
                </p>
              </div>
              {/* <button className="contact-support-btn">Contact Support</button> */}
            </div>
            <div className="leads-bottom">
              <p className="leads-title">Continue with Manual Setup</p>
              <div className="leads-options">
                <p className="leads-regular">
                  Please select your website platform.
                </p>
                <div className="radio-btn-container space-bottom">
                  <input
                    type="radio"
                    id="wordpress"
                    name="wordpress"
                    value="wordpress"
                    className="leads-radio-btn"
                    checked={type === "wordpress"}
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                  />
                  <label for="wordpress" className="leads-radio-label">
                    Wordpress
                  </label>
                </div>
                <div className="radio-btn-container">
                  <input
                    type="radio"
                    id="wix"
                    name="wix"
                    value="wix"
                    className="leads-radio-btn"
                    checked={type === "wix"}
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                  />
                  <label for="wix" className="leads-radio-label">
                    Wix
                  </label>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelected(true);
                  if (type === "wordpress") {
                    navigate("wordpress-guide");
                  } else {
                    navigate("wix-guide");
                  }
                }}
                className="leads-get-instructions-btn"
              >
                Get Instructions
              </button>
            </div>
          </>
        ) : (
          <Outlet context={{ userProfile }} />
        )}
      </div>
    </div>
  );
}
