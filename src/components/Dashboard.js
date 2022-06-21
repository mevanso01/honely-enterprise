import '../styles/Dashboard.css';
import '../styles/Subscription.css'
import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from 'axios';

function Dashboard(props) {
    const [data, setData] = useState({
        externalApiStats: [],
        userProfile: null,
      });
    var externalApiStats = [
        // {
        //     "date": "April 2022",
        //     "endpoints": {
        //         "property_forecast": "2",
        //         "zip_code_statistic": "1",
        //         "state_statistic": "8",
        //         "property_forecast_per_call": "0",
        //         "zip_code_statistic_per_call": "0",
        //         "state_statistic_per_call": "0"
        //     }
        // },
        // {
        //     "date": "March 2022",
        //     "endpoints": {
        //         "property_forecast": "3",
        //         "zip_code_statistic": "2",
        //         "state_statistic": "6",
        //         "property_forecast_per_call": "0",
        //         "zip_code_statistic_per_call": "0",
        //         "state_statistic_per_call": "0"
        //     }
        // },
        // {
        //     "date": "October 2021",
        //     "endpoints": {
        //         "property_forecast": "1",
        //         "zip_code_statistic": "0",
        //         "state_statistic": "6",
        //         "property_forecast_per_call": "0",
        //         "zip_code_statistic_per_call": "0",
        //         "state_statistic_per_call": "0"
        //     }
        // }
    ]
        // console.log('vx: jwt from dashboard', props.jwt)
      function getStats() {
        let config = {
            headers: {
              'Authorization': 'Bearer ' + props.jwt
            }
          }
          axios.get('https://developers.honely.com/dashboard/statistics?date_range=one_year', config)
          .then((response) => {
            externalApiStats = response.data.data
            console.log('vx: crocodile', externalApiStats)
            setData((prevValue)=>{
                return {
                externalApiStats : response.data.data,
                userProfile: prevValue.userProfile
                }
            })
          })
          .catch((error) => {
            if (error.message === 'Request failed with status code 401') {
              props.doSignOut()
            }
          })
      }
    //   getStats()
      useEffect(() => {
        getStats()
        setData((prevValue)=>{
            return {
            externalApiStats : prevValue.externalApiStats,
            userProfile: props.userProfile
            }
        })
      }, []);
      var optionsLine = {
        chart: {
          height: 328,
          type: 'line',
          zoom: {
            enabled: false
          },
          dropShadow: {
            enabled: false,
            top: 3,
            left: 2,
            blur: 4,
            opacity: 1,
          }
        },
        stroke: {
          curve: 'smooth',
          width: 2
        },
        //colors: ["#3F51B5", '#2196F3'],
        series: [{
            name: "Property Calls",
            // data: [1, 15, 26, 20, 33, 27],
            // data: [1, 15, 26, 20, 33, 27, 1, 15, 26, 20, 33, 27]
            data: []
          },
          {
            name: "Zip Code Calls",
            // data: [3, 33, 21, 42, 19, 32],
            // data: [3, 33, 21, 42, 19, 32, 3, 33, 21, 42, 19, 32]
            data: []
          },
          {
            name: "State Calls",
            // data: [0, 39, 52, 11, 29, 43],
            // data: [0, 39, 52, 11, 29, 43, 0, 39, 52, 11, 29, 43]
            data: []
          }
        ],
        // title: {
        //   text: 'API Calls',
        //   align: 'left',
        //   offsetY: 25,
        //   offsetX: 20
        // },
        // subtitle: {
        //   text: 'Statistics',
        //   offsetY: 55,
        //   offsetX: 20
        // },
        markers: {
          size: 6,
          strokeWidth: 0,
          hover: {
            size: 9
          }
        },
        grid: {
          show: true,
          padding: {
            bottom: 0,
          }
        },
        // labels: ['01/15/2002', '01/16/2002', '01/17/2002', '01/18/2002', '01/19/2002', '01/20/2002'],
        labels: [],
        xaxis: {
          tooltip: {
            enabled: false
          },
          offsetX: 5,
        },
        responsive: [
            {
                breakpoint: 595,
                options: {
                    chart: {
                        width: 310,
                        height: 400,
                    }
                },
            },
            {
                breakpoint: 393,
                options: {
                    chart: {
                        width: 280,
                    }
                },
            },
        ],
      }
      var optionsBar = {
        chart: {
          height: 380,
          type: 'bar',
          stacked: true,
        },
        plotOptions: {
          bar: {
            columnWidth: '30%',
            horizontal: false,
          },
        },
        series: [{
          name: 'Property Calls',
        //   data: [14, 25, 21, 17, 12, 13, 11, 19, 0, 0, 0, 0]
            data: []
        }, {
          name: 'Zip Code Calls',
        //   data: [13, 23, 20, 8, 13, 27, 33, 12, 0, 0, 0, 0]
        data: []
        }, {
          name: 'State Calls',
        //   data: [11, 17, 15, 15, 21, 14, 15, 13, 0, 0, 0, 0]
        data: []
        }],
        xaxis: {
          categories: [],
        },
        fill: {
          opacity: 1
        },
        responsive: [
            {
                breakpoint: 595,
                options: {
                    chart: {
                        width: 310,
                        height: 400,
                    }
                },
            },
            {
                breakpoint: 393,
                options: {
                    chart: {
                        width: 280,
                    }
                },
            },
        ],
      }
      var property_forecast_per_call = 0
      var zip_code_statistic_per_call = 0
      var state_statistic_per_call = 0
      function setChartData () {
        var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        var now = new Date()
        // console.log(now.getFullYear())
        var monthPtr = now.getMonth()
        var year = now.getFullYear()
        var statPtr = 0
        for (let x=0;x<12;x++) {
        var currTimeElement = monthNames[monthPtr] + ' ' + year
        optionsLine.labels.push(currTimeElement)
        optionsBar.xaxis.categories.push(currTimeElement)
        if (statPtr < data.externalApiStats.length && currTimeElement === data.externalApiStats[statPtr].date) {
            if (x===0) {
                property_forecast_per_call = data.externalApiStats[0].endpoints.property_forecast_per_call
                zip_code_statistic_per_call = data.externalApiStats[0].endpoints.zip_code_statistic_per_call
                state_statistic_per_call = data.externalApiStats[0].endpoints.state_statistic_per_call
            }
            optionsLine.series[0].data.push(data.externalApiStats[statPtr].endpoints.property_forecast)
            optionsLine.series[1].data.push(data.externalApiStats[statPtr].endpoints.zip_code_statistic)
            optionsLine.series[2].data.push(data.externalApiStats[statPtr].endpoints.state_statistic)
            optionsBar.series[0].data.push(data.externalApiStats[statPtr].endpoints.property_forecast)
            optionsBar.series[1].data.push(data.externalApiStats[statPtr].endpoints.zip_code_statistic)
            optionsBar.series[2].data.push(data.externalApiStats[statPtr].endpoints.state_statistic)
            statPtr++
        } else {
            optionsLine.series[0].data.push(0)
            optionsLine.series[1].data.push(0)
            optionsLine.series[2].data.push(0)
            optionsBar.series[0].data.push(0)
            optionsBar.series[1].data.push(0)
            optionsBar.series[2].data.push(0)
        }
        if(monthPtr === 0) {
            monthPtr = 11
            year--
        } else {
            monthPtr--
        }
        }
        optionsLine.labels.reverse()
        optionsBar.xaxis.categories.reverse()
        optionsLine.series[0].data.reverse()
        optionsLine.series[1].data.reverse()
        optionsLine.series[2].data.reverse()
        optionsBar.series[0].data.reverse()
        optionsBar.series[1].data.reverse()
        optionsBar.series[2].data.reverse()
        console.log('vx: optionsLine.series', optionsLine.series)
        console.log('vx: optionsBar.series', optionsBar.series)
      }
      setChartData()
      function DashboardApiKeySection () {
          console.log('props.userProfile from dashboard', props.userProfile)
        if (typeof props !== 'undefined' && props!== null && typeof props.userProfile !== 'undefined' && props.userProfile !== null && props.userProfile.api_key !== null) {
            return (
                <div key={props.userProfile.api_key}>
        <h3>API key</h3>
        <div className="subscription-apikey">
            <span>{props.userProfile.api_key}</span>
            <div className='subscription-apikey-logos'>
            <span className="mdi mdi-content-copy" />
            <span className="mdi mdi-refresh" />
            </div>
        </div>
        </div>
            )
        }
      }
    // function DashboardApiKeySection () {
    //     console.log('props.userProfile from dashboard', props.userProfile)
    //   if (typeof data.userProfile !== 'undefined' && data.userProfile !== null) {
    //       return (
    //           <div id={props.}>
    //   <h3>API key</h3>
    //   <div className="subscription-apikey">
    //       <span>{data.userProfile.api_key}</span>
    //       <div className='subscription-apikey-logos'>
    //       <span className="mdi mdi-content-copy" />
    //       <span className="mdi mdi-refresh" />
    //       </div>
    //   </div>
    //   </div>
    //       )
    //   }
    // }
      return (
        <div className="dashboard-container">
            {/* <h3 className="dashboard-title">Dashboard</h3> */}
        {/* <div className='dashboard-api-docs'>
        <a>API Documentation</a>
        </div> */}
        <div className='dashboard-month-stats'>
            <div className='dashboard-month-subitem'>
                <h3>Current Month Stats</h3>
                <div className='dashboard-month-subitem-interior'>
                    <div className='dashboard-month-subitem-interior-list'>
                        <div>
                            Property Calls: <span>{ optionsLine.series[0].data[11] }</span>
                        </div>
                        <div>
                            Zip Code Calls: <span>{ optionsLine.series[1].data[11] }</span>
                        </div>
                        <div>
                            State Calls: <span>{ optionsLine.series[2].data[11] }</span>
                        </div>
                    </div>
                    <div className='dashboard-month-subitem-interior-summary'>
                        <h6>Total Calls</h6>
                        <div className='dashboard-month-subitem-interior-bignum'>
                            {parseInt(optionsLine.series[0].data[11]) + parseInt(optionsLine.series[1].data[11]) + parseInt(optionsLine.series[2].data[11])}
                        </div>
                    </div>
                </div>
            </div>
            <div className='dashboard-month-subitem'>
            <h4>Unbilled Calls</h4>
                <div className='dashboard-month-subitem-interior'>
                    <div className='dashboard-month-subitem-interior-list'>
                        <div>
                            Property Calls: <span>{property_forecast_per_call}</span>
                        </div>
                        <div>
                            Zip Code Calls: <span>{zip_code_statistic_per_call}</span>
                        </div>
                        <div>
                            State Calls: <span>{state_statistic_per_call}</span>
                        </div>
                    </div>
                    <div className='dashboard-month-subitem-interior-summary'>
                        <h6>Billable amount</h6>
                        <div className='dashboard-month-subitem-interior-bignum'>
                            ${parseInt(property_forecast_per_call) + parseInt(zip_code_statistic_per_call) + parseInt(state_statistic_per_call)} <span className='dasboard-month-subitem-interior-callrate'>@ $1 per call</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br></br>
        <h3>Past calls summary</h3>
        <div className="dashboard-charts">
          <div className='dashboard-chart'>
        <Chart
              options={optionsLine}
              series={optionsLine.series}
              type="line"
              width="500"
            />
            </div>
            {/* <div className='dashboard-chart'>
        <Chart
              options={chartData.options}
              series={chartData.series}
              type="bar"
              width="500"
            />
            </div> */}
            <div className='dashboard-chart'>
        <Chart
              options={optionsBar}
              series={optionsBar.series}
              type="bar"
              width="500"
            />
            </div>
        </div>
        <br></br>
        {/* <DashboardApiKeySection /> */}
        </div>
      )
}

export default Dashboard;