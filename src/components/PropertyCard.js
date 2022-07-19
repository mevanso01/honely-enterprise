//REACT
import React from "react";

//STYLES
import "../styles/PropertyCard.css";

//UTILS
import { parsePrice } from "../utils";

var data = null;

const PropertyCard = ({ children, property }) => {
  data = property;
  return <div className="property-card">{children}</div>;
};

const Image = () => {
  if (data?.IMG_LOCATION?.data) {
    return (
      <div className="square-box-65">
        <div className="dummy" />
        <div className="property-image-container">
          <img src={data?.IMG_LOCATION?.data} alt="" />
        </div>
      </div>
    );
  } else return null;
};

const Info = () => {
  if (data) {
    return (
      <div className="card-content">
        <div className="estimate-value-containier">
          <p className="price">{data?.VALUATION_PRICE?.data}</p>
          <p className="text">
            <span>Honely Estimate</span>
            {/* <span className='mdi mdi-information-outline' /> */}
          </p>
        </div>
        <div className="property-info">
          <span>{data?.NUM_BEDS?.data} bds</span>
          <span className="dot">·</span>
          <span>{data?.NUM_BATHS?.data} ba</span>
          <span className="dot">·</span>
          <span>{data?.SQFT?.data} sqft</span>
        </div>
        {/* <p className='full-address'>10905 Caminito Arcada,  San Diego CA 92131</p> */}
        <p className="full-address">
          {data?.ADDRESS_1?.data} {data?.ADDRESS_2?.data} {data?.CITY?.data}{" "}
          {data?.STATE?.data} {data?.ZIP?.data}
        </p>
        {/* <a href='/' className='view-details-link'>View Full Forecast</a> */}
      </div>
    );
  } else {
    return null;
  }
};

const CheckIcon = ({ action }) => {
  return (
    <div className="card-bage-icon-container">
      <button className="check-btn" onClick={action}>
        <span className="mdi mdi-check" />
      </button>
    </div>
  );
};

const CloseIcon = ({ action }) => {
  return (
    <div className="card-bage-icon-container">
      <button className="check-btn" onClick={action}>
        <span className="mdi mdi-close" />
      </button>
    </div>
  );
};

PropertyCard.Image = Image;
PropertyCard.Info = Info;
PropertyCard.CheckIcon = CheckIcon;
PropertyCard.CloseIcon = CloseIcon;

export default PropertyCard;
