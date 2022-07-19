import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import "../styles/CMA.css";
import HonelySearchSimple from "./HonelySearchSimple";
import ReportForm from "./ReportForm";
import axios from "axios";
import generateSideBySidePayload from "../functionalities/CMAPayloadGenerator";
import PaymentConfirmationPopup from "./PaymentConfirmationPopup";
import SuggestedPropertyCard from "./SuggestedPropertyCard";
import CreditsBanner from "./CreditsBanner";
import PropertyCard from "./PropertyCard";

//ICONS
import ListView from "../assets/images/list-view.png";
import ListViewSelected from "../assets/images/list-view-selected.png";
import GridView from "../assets/images/grid-view.png";
import GridViewSelected from "../assets/images/grid-view-selected.png";

function CMA(props) {
  // const [cmaPayload, setCmaPayload] = useState(null)
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [propertyList, setPropertyList] = useState([]);
  const [forecast, setForecast] = useState(null);
  const [property, setProperty] = useState(null);
  const [cmaPayload, setCmaPayload] = useState({});
  const [comparablePropertyList, setComparablePropertyList] = useState({});
  const [listView, setListView] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const [comparablePropertiesIndex, setComparablePropertiesIndex] = useState(3);
  var user = {
    name: props.userProfile.full_name,
    email: props.userProfile.email,
    phone: props.userProfile.phone_number,
    user_id: "512",
  };
  function showReportForm() {
    // setForCMA(cmaflag)
    // forCMA = cmaflag
    document.getElementById("report-form-overlay").classList.add("active");
    document.getElementById("btn_doDownloadReport").style = "display : none";
    document.getElementById("btn_doDownloadReport_mobile").style =
      "display : none";
    document.getElementById("btn_doDownloadReportCMA").style =
      "display : inline-block";
    document.getElementById("btn_doDownloadReport_mobileCMA").style =
      "display : inline-block";
    // document.getElementById('report-form-overlay').classList.add('active')
    window.dispatchEvent(new Event("resize"));
  }
  useEffect(() => {
    console.log("vx: userprofile", props.userProfile);
    // var pika = JSON.parse(window.sessionStorage.getItem('CMASubjectPropertyId')).array
    // axios.get('https://api.honely.com/lookup/comparable_homes?property_id=' + pika[0])
    // .then((response) => {
    //     // setComparablePropertyList(response.data.rows)
    //     window.sessionStorage.removeItem('CMAComparableHomes')
    //     var pika = {
    //         array: response.data.rows
    //     }
    //     window.sessionStorage.setItem('CMAComparableHomes', JSON.stringify(pika))
    // })
    //vx: not needed anymore most probably...
    // var propertyListVar = []
    // var subjectPropertyPayloadVar =  JSON.parse(window.sessionStorage.getItem('subjectPropertyPayload'))
    // // console.log('vx: subjectPropertyPayloadVar', subjectPropertyPayloadVar)
    // propertyListVar.push({
    //     address: subjectPropertyPayloadVar.ADDRESS_1.data + subjectPropertyPayloadVar.ADDRESS_2.data + subjectPropertyPayloadVar.CITY.data + ' ' +subjectPropertyPayloadVar.STATE.data + ' ' + subjectPropertyPayloadVar.ZIP.data,
    //     sqft: subjectPropertyPayloadVar.SQFT.data,
    //     brba: subjectPropertyPayloadVar.NUM_BEDS.data + '/' + subjectPropertyPayloadVar.NUM_BATHS.data,
    //     yrBuilt: subjectPropertyPayloadVar.YEAR_BUILT.data,
    //     listPrice: subjectPropertyPayloadVar.LIST_PRICE.data,
    // })
    // setPropertyList(propertyListVar)

    // var cmaPayloadVar = {}
    // cmaPayloadVar.user_id = '512'
    // cmaPayloadVar.mode = 'multiple'
    // cmaPayloadVar.report_data_list = []
    // cmaPayloadVar.report_data_list.push(subjectPropertyPayloadVar)
    // console.log('vx: cmaPayloadVar is', cmaPayloadVar)
    // setCmaPayload(cmaPayloadVar)
    // console.log('vx: cmaPayload set as', cmaPayload)
  }, []);
  function CMAPropertyListTable(props) {
    console.log(
      "vx: CMAPropertyListTable beung called.. propertyList is",
      propertyList
    );
    var pika = null;
    if (typeof window.sessionStorage.getItem("CMA") !== "undefined") {
      pika = JSON.parse(window.sessionStorage.getItem("CMA")).array;
    }
    console.log("pika", pika);
    var ans = [];
    if (pika !== null) {
      for (let x = 0; x < pika.length; x++) {
        if (x === 0) {
          ans.push(
            <tr>
              <td>
                {`${x + 1}. `}
                {pika[x].ADDRESS_1.data +
                  pika[x].ADDRESS_2.data +
                  pika[x].CITY.data +
                  " " +
                  pika[x].STATE.data +
                  " " +
                  pika[x].ZIP.data}
              </td>
              <td>{pika[x].SQFT.data}</td>
              <td>{pika[x].NUM_BEDS.data + "/" + pika[x].NUM_BATHS.data}</td>
              <td>{pika[x].YEAR_BUILT.data}</td>
              <td>{pika[x].LIST_PRICE.data}</td>
              <i
                className="fa fa-times"
                style={{ color: "#EFEFEF", cursor: "pointer" }}
              />
            </tr>
          );
        } else {
          ans.push(
            <tr>
              <td>
                {`${x + 1}. `}
                {pika[x].ADDRESS_1.data +
                  pika[x].ADDRESS_2.data +
                  pika[x].CITY.data +
                  " " +
                  pika[x].STATE.data +
                  " " +
                  pika[x].ZIP.data}
              </td>
              <td>{pika[x].SQFT.data}</td>
              <td>{pika[x].NUM_BEDS.data + "/" + pika[x].NUM_BATHS.data}</td>
              <td>{pika[x].YEAR_BUILT.data}</td>
              <td>{pika[x].LIST_PRICE.data}</td>
              <i
                onClick={() => {
                  /*
                                get the arrays
                                remove the elements from the arrays
                                set to sessionstorage
                                reload
                                */
                  var lala1 = JSON.parse(
                    window.sessionStorage.getItem("CMA")
                  ).array;
                  var lala2 = JSON.parse(
                    window.sessionStorage.getItem("CMASubjectPropertyId")
                  ).array;
                  lala1.splice(x, 1);
                  lala2.splice(x, 1);
                  window.sessionStorage.setItem(
                    "CMA",
                    JSON.stringify({ array: lala1 })
                  );
                  window.sessionStorage.setItem(
                    "CMASubjectPropertyId",
                    JSON.stringify({ array: lala2 })
                  );
                  window.location.reload();
                }}
                className="fa fa-times"
                style={{ cursor: "pointer" }}
              />
            </tr>
          );
        }
      }
    }
    return (
      <table>
        <tr>
          <th>Address</th>
          <th>SQFT</th>
          <th>BR/BA</th>
          <th>YR Blt</th>
          <th>List Price</th>
        </tr>
        <br></br>
        {ans}
      </table>
    );
  }

  const CMAPropertyListCards = (propertyList) => {
    let propertyCards = null;
    if (typeof window.sessionStorage.getItem("CMA") !== "undefined") {
      propertyCards = JSON.parse(window.sessionStorage.getItem("CMA")).array;
    }
    console.log("prop", propertyCards);
    if (propertyCards) {
      return propertyCards?.map((property, index) => {
        if (index === 0) {
          return (
            <PropertyCard property={property} key={index}>
              <PropertyCard.Image />
              <PropertyCard.Info />
            </PropertyCard>
          );
        } else {
          return (
            <PropertyCard property={property} key={index}>
              <PropertyCard.Image />
              <PropertyCard.CloseIcon
                action={() => {
                  removeFromList(index);
                }}
              />
              <PropertyCard.Info />
            </PropertyCard>
          );
        }
      });
    } else {
      return null;
    }
  };

  const removeFromList = (index) => {
    var lala1 = JSON.parse(window.sessionStorage.getItem("CMA")).array;
    var lala2 = JSON.parse(
      window.sessionStorage.getItem("CMASubjectPropertyId")
    ).array;
    lala1.splice(index, 1);
    lala2.splice(index, 1);
    window.sessionStorage.setItem("CMA", JSON.stringify({ array: lala1 }));
    window.sessionStorage.setItem(
      "CMASubjectPropertyId",
      JSON.stringify({ array: lala2 })
    );
    window.location.reload();
  };

  function ReportFormContainer() {
    if (forecast !== null && property !== null) {
      return (
        <ReportForm
          user={user}
          optionLists={{}}
          forecast={forecast}
          property={property}
          inCMA={true}
          setPropertyList={setPropertyList}
          setCmaPayload={setCmaPayload}
          cmaPayload={cmaPayload}
          propertyList={propertyList}
        />
      );
    }
  }
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
        let config = {
          headers: {
            Authorization: "Bearer " + props.jwt,
          },
        };
        var payload = null;
        if (
          typeof JSON.parse(window.sessionStorage.getItem("PaymentPopup"))
            .dollarAmount !== "undefined"
        ) {
          payload = {
            "dollar-amount": 1,
          };
        }
        if (
          typeof JSON.parse(window.sessionStorage.getItem("PaymentPopup"))
            .creditAmount !== "undefined"
        ) {
          payload = {
            "credit-amount": 2,
          };
        }
        axios
          .post(
            "https://developers.honely.com/user/buy-report",
            payload,
            config
          )
          .then(() => {
            window.location.href = "/reports";
          });
      })
      .catch((err) => {
        console.log("PDF Request Failed", err);
      });
  }
  function ComparableProperties() {
    var ans = [];
    if (JSON.parse(window.sessionStorage.getItem("CMAComparableHomes"))) {
      var pika = JSON.parse(
        window.sessionStorage.getItem("CMAComparableHomes")
      ).array;
      console.log(pika);
      for (let x = 0; x < Math.min(comparablePropertiesIndex, pika.length); x++) {
        ans.push(
          <SuggestedPropertyCard
            property={pika[x]}
            setForecast={setForecast}
            setErrMsg={setErrMsg}
            setProperty={setProperty}
            showReportForm={showReportForm}
          />
        );
      }
    }
    return <div className="cma-comparable-properties">{ans}</div>;
  }

  return (
    <div>
      {showPaymentPopup && (
        <PaymentConfirmationPopup
          setShowPaymentPopup={setShowPaymentPopup}
          confirmAction={generateCMA}
          purchaseCreditsMode={false}
        />
      )}
      <br></br>
      <br></br>
      <CreditsBanner availableCredits={35} />
      <div className="section cma-section">
        <div className="cma-header">
          <div>
            <h1>Create a CMA report</h1>
            <p>
              Compare up to 10 different properties. Use suggested properties or
              add your own below.
            </p>
            {/* <button onClick={() => {console.log('vx: sbspayloadarray', generateSideBySidePayload())}}>lalala</button> */}
          </div>
          {/* <div className="cma-continue-btn">
            <button
              onClick={() => {
                var lala = JSON.parse(
                  window.sessionStorage.getItem("CMASubjectPropertyId")
                ).array;
                if (lala.length <= 1) {
                  setErrMsg(
                    "Please add at least one property to compare with."
                  );
                } else {
                  setShowPaymentPopup(true);
                }
              }}
            >
              Continue <i className="fa fa-arrow-right"></i>
            </button>
          </div> */}
        </div>
        <div className="view-icons">
          {listView ? (
            <>
              <img src={ListViewSelected} className="view-icon" />
              <img
                src={GridView}
                className="view-icon"
                onClick={() => {
                  setListView(false);
                }}
              />
            </>
          ) : (
            <>
              <img
                src={ListView}
                className="view-icon"
                onClick={() => {
                  setListView(true);
                }}
              />
              <img src={GridViewSelected} className="view-icon" />
            </>
          )}
        </div>
        {listView ? (
          <div className="cma-selected-properties">
            <CMAPropertyListTable propertyList={propertyList} />
            <br></br>
            <span style={{ color: "red", fontSize: "20px" }}>{errMsg}</span>
            <ReportFormContainer />
          </div>
        ) : (
          <div className="cma-comparable-properties">
            <CMAPropertyListCards propertyList={propertyList} />
            <span style={{ color: "red", fontSize: "20px" }}>{errMsg}</span>
            <ReportFormContainer />
          </div>
        )}
        <p className="cma-property-small-bold" style={{ cursor: "pointer" }}>
          Generate Report {">"}
        </p>
        <div className="cma-property-search-block">
          <div className="cma-property-search-sub-block">
            <h1>Search a property to compare</h1>
            <br></br>
            <HonelySearchSimple
              inCma={true}
              setForecast={setForecast}
              setProperty={setProperty}
              showReportForm={showReportForm}
              setErrMsg={setErrMsg}
            />
          </div>
          <div>
            {/* <v-icon style="font-size: 70px; font-weight: 100; top: 20%;">
                    mdi-plus-circle-outline
                </v-icon> */}
          </div>
        </div>
        <div className="comparable-properties-container">
          <div className="section-heading">
            Add Suggested Comparable Properties
          </div>
          {/* <div className="cma-comparable-properties">
          <SuggestedPropertyCard />
          <SuggestedPropertyCard />
          <SuggestedPropertyCard />
          <SuggestedPropertyCard />
        </div> */}
          <ComparableProperties />
        </div>
        {comparablePropertiesIndex <
          JSON.parse(window.sessionStorage.getItem("CMAComparableHomes")).array
            ?.length && (
          <p
            className="comparable-properties-semi-bold-text"
            onClick={() => {
              setComparablePropertiesIndex((prevState) => prevState + 3);
            }}
          >
            See more results
          </p>
        )}
        <div className="generate-report-container">
          <button className="generate-report-btn">Generate Report</button>
        </div>
      </div>
    </div>
  );
}

export default CMA;
