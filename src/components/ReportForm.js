import React, { useState, useEffect, useRef } from "react";
import '../styles/ReportForm.css'
import axios from 'axios';
import Chart from "react-apexcharts";
import PaymentConfirmationPopup from "./PaymentConfirmationPopup"
function ReportForm(props) {
    const [showPaymentPopup, setShowPaymentPopup] = useState(false)
    useEffect(() => {
        populateFields()
    })
    function removeReportForm() {
        document.getElementById('report-form-overlay').classList.remove('active')
    }
    const chart3monthx = useRef()
    const chart1yearx = useRef()
    const chart2yearsx = useRef()
    const chart3yearsx = useRef()
    const chartMedianRentx = useRef()
    const chartCashFlowx = useRef()
    const chartRentalGrowthx = useRef()
    function lalala () {
        console.log('vx: mankey', chart3monthx.dataURI)
        // const chartExportOptions = {
        //     width: '300',
        //   }
        // chart3monthx.chart.dataURI(chartExportOptions).then(uri => {
        //     console.log('vx: mankey', uri)
        //   })
    }
    function populateField(id, value) {
       var x  = document.getElementById(id)
       x.value = value
    }
    function setCMAProps(body) {
        var cmaPayload = props.cmaPayload
        var propertyList = props.propertyList
        propertyList.push({
            address: body.ADDRESS_1.data + body.ADDRESS_2.data + body.CITY.data + ' ' +body.STATE.data + ' ' + body.ZIP.data,
            sqft: body.SQFT.data,
            brba: body.NUM_BEDS.data + '/' + body.NUM_BATHS.data,
            yrBuilt: body.YEAR_BUILT.data,
            listPrice: body.LIST_PRICE.data,
        })
        
        props.setPropertyList(...propertyList)
        cmaPayload.report_data_list.push(body)
        console.log('vx: giraffe', propertyList)
        console.log('vx: giraffe2', cmaPayload)
        props.setCmaPayload(cmaPayload)
    }
    function populateFields() {
        populateField("agent-name", props.user.name)
        populateField("agent-email", props.user.email)
        populateField("agent-phone", props.user.phone)
        populateField("year-built", getYearBuilt())
        populateField("county", getCounty())
        populateField("sqft", getSqft())
        populateField("num-beds", getNumBeds())
        populateField("num-baths", getNumBaths())
        populateField("num-partial-bath", getNumPartialBaths())
        populateField("room-count", getRoomCount())
        populateField("parking-spaces", getParkingSpaces())
        populateField("plumbing-count", getPlumbingCount())
        populateField("parking-type", getParkingType())
        populateField("sale-date", getMostRecentSaleDate())
        populateField("sale-price", getMostRecentSalePrice())
    }
    function readFile (file) {
        if (file) {
          return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = res => {
              resolve(res.target.result)
            }
            reader.onerror = err => reject(err)
            reader.readAsDataURL(file)
          })
        } else {
          // create custom promise resolve if file does not exist
          return new Promise((resolve, reject) => {
            resolve(0)
          })
        }
      }
    function doCMAAction () {
        doGenerateReport(false, true)
    }
    function doDownloadReport () {
        doGenerateReport(false, false)
      }
    function doGenerateReport (shareMode, cmaMode) {
        console.log('vx: props.forCMA', props.forCMA)
        // constants
        const chartExportOptions = {
          width: '300',
        }
        const chartExportOptionsLarge = {
          width: '400',
        }

        const timeFrame3lvls = ['current', '3 months', '1 year', '2 years', '3 years']
        const timeFrame4lvls = ['present', '3 months', '1 year', '2 years', '3 years']

        let chart3monthImg = null
        let chart1yearImg = null
        let chart2yearsImg = null
        let chart3yearsImg = null
        let chartMedianRentImg = null
        let chartCashFlowImg = null
        let chartGrowthImg = null
        let customLogoData = null

        // read custom logo file
        const customLogoFile = document.getElementById('agent-logo').files[0]
        Promise.all([
          // get chart image data
          chart3monthx.current.chart.dataURI(chartExportOptions).then(uri => {
            // console.log(uri)
            chart3monthImg = uri.imgURI
          }),
          chart1yearx.current.chart.dataURI(chartExportOptions).then(uri => {
            // console.log(uri)
            chart1yearImg = uri.imgURI
          }),
          chart2yearsx.current.chart.dataURI(chartExportOptions).then(uri => {
            // console.log(uri)
            chart2yearsImg = uri.imgURI
          }),
          chart3yearsx.current.chart.dataURI(chartExportOptions).then(uri => {
            // console.log(uri)
            chart3yearsImg = uri.imgURI
          }),
          chartMedianRentx.current.chart.dataURI(chartExportOptions).then(uri => {
            // console.log(uri)
            chartMedianRentImg = uri.imgURI
          }),
          chartCashFlowx.current.chart.dataURI(chartExportOptions).then(uri => {
            // console.log(uri)
            chartCashFlowImg = uri.imgURI
          }),
          chartRentalGrowthx.current.chart.dataURI(chartExportOptionsLarge).then(uri => {
            // console.log(uri)
            chartGrowthImg = uri.imgURI
          }),
          readFile(customLogoFile).then(data => {
            customLogoData = data
          }),
        ]).then(data => {
          // console.log(chart3monthImg)
          // console.log(chart1yearImg)
          // console.log(chart2yearsImg)
          // console.log(chart3yearsImg)
          // console.log(customLogoData)

          // get property image
          const propertyImg = 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location=' + props.property.address.latitude + '' + ',' + props.property.address.longitude + '+&fov=90&source=outdoor&key=AIzaSyClIFG-ONBwyXrn4_kaA4yMYHGpZD5EEko'

          // get all the inputs from user
          const agentName = document.getElementById('agent-name').value
          const agentEmail = document.getElementById('agent-email').value
          const agentPhone = document.getElementById('agent-phone').value
        //   let shareEmails = document.getElementById('share-emails').value
          let shareEmails = null
        //   let shareMessage = document.getElementById('share-message').value
          let shareMessage = null
          let appraisal = formatCurrency(props.property.valuation.appraisal)
          const appraisalAfter = document.getElementById('report-honey-value-after').innerText
          let apn = getAPN()
          let address1 = getAddress1()
          let address2 = getAddress2()
          let city = getCity()
          let state = getState()
          let zip = getZip()
          let county = getCounty()
          let yearBuilt = getYearBuilt()
          const stories = document.getElementById('stories').value
          const sqft = document.getElementById('sqft').value
          const numBeds = document.getElementById('num-beds').value
          const numBaths = document.getElementById('num-baths').value
          const numPartialBaths = document.getElementById('num-partial-bath').value
          const roomCount = document.getElementById('room-count').value
          let otherRooms = document.getElementById('other-rooms').value
          let acType = document.getElementById('ac-type').value
          let parkingSpaces = document.getElementById('parking-spaces').value
          let plumbingCount = document.getElementById('plumbing-count').value
          let parkingType = document.getElementById('parking-type').value
          let heatType = document.getElementById('heat-type').value
          let heatFuelType = document.getElementById('heat-fuel-type').value
          let pool = document.getElementById('pool').value
          let amenities = document.getElementById('amenities').value
          let condition = document.getElementById('condition').value
          let architecture = document.getElementById('architecture').value
          let construction = document.getElementById('construction').value
          let basementType = document.getElementById('basement-type').value
          let roofStyle = document.getElementById('roof-style').value
          let roofMaterial = document.getElementById('roof-material').value
          let exteriorWalls = document.getElementById('exterior-walls').value
          let interiorWalls = document.getElementById('interior-walls').value
          let flooring = document.getElementById('flooring').value
          let waterType = document.getElementById('water-type').value
          let sewerType = document.getElementById('sewer-type').value
          const brokerageLogo = document.getElementById('brokerage-logo').value
          let saleDate = document.getElementById('sale-date').value
          let salePrice = document.getElementById('sale-price').value

          // update data to default -----------------------------
          if (appraisalAfter && appraisalAfter !== '' && appraisalAfter !== '--') {
            appraisal = appraisalAfter
          }
          // check custom logo, if 0, use default
          if (customLogoData === 0) {
            if (brokerageLogo !== '--') {
              customLogoData = 'https://honely-files-public.s3.amazonaws.com/report/brokerages/logo-' + brokerageLogo + '.png'
            } else {
              customLogoData = 'https://honely-files-public.s3.amazonaws.com/report/logo_honely_report_default.png'
            }
          }
          // update null data
          if (apn || apn === '') {
            apn = ' '
          }
          if (address1 === null || address1 === '') {
            address1 = ' '
          }
          if (address2 === null || address2 === '') {
            address2 = ' '
          }
          if (city === null || city === '') {
            city = ' '
          }
          if (state === null || state === '') {
            state = ' '
          }
          if (zip === null || zip === '') {
            zip = ' '
          }
          if (county === null || county === '') {
            county = ' '
          }
          if (yearBuilt === null || yearBuilt === '') {
            yearBuilt = ' '
          } else {
            yearBuilt = yearBuilt.toString()
          }
          if (parkingSpaces === '') {
            parkingSpaces = ' '
          }
          if (plumbingCount === '') {
            plumbingCount = ' '
          }
          // update drop-down list default value
          if (otherRooms === '--') {
            otherRooms = ' '
          }
          if (acType === '--') {
            acType = ' '
          }
          if (parkingType && parkingType !== '') {
            parkingType = doTextConversionnHTML4(parkingType)
          } else {
            parkingType = ' '
          }
          if (heatType === '--') {
            heatType = ' '
          }
          if (heatFuelType === '--') {
            heatFuelType = ' '
          }
          if (pool === '--') {
            pool = ' '
          } else {
            pool = doTextConversionnHTML4(pool)
          }
          if (amenities === '--') {
            amenities = ' '
          }
          if (condition === '--') {
            condition = ' '
          }
          if (architecture === '--') {
            architecture = ' '
          }
          if (construction === '--') {
            construction = ' '
          }
          if (basementType === '--') {
            basementType = ' '
          }
          if (roofStyle === '--') {
            roofStyle = ' '
          }
          if (roofMaterial === '--') {
            roofMaterial = ' '
          } else {
            roofMaterial = doTextConversionnHTML4(roofMaterial)
          }
          if (exteriorWalls === '--') {
            exteriorWalls = ' '
          }
          if (interiorWalls === '--') {
            interiorWalls = ' '
          }
          if (flooring === '--') {
            flooring = ' '
          }
          if (waterType === '--') {
            waterType = ' '
          }
          if (sewerType === '--') {
            sewerType = ' '
          }

          // get additional data ---------------------------------
          // schools
          const schoolList = []
          // vx: todo: schools part...
        //   if (props.schools) {
        //     if (props.schools.length > 3) {
        //       for (let i = 0; i < 3; i++) {
        //         let rating = ''
        //         if (props.schools[i].rating !== null) {
        //           rating = props.schools[i].rating + '/10'
        //         } else {
        //           rating = 'N/R'
        //         }
        //         schoolList.push([rating, props.schools[i].name, props.schools[i].type, props.schools[i].level_short, props.schools[i].distance + props.schools[i].distanceText])
        //       }
        //     } else {
        //       for (let i = 0; i < props.schools.length; i++) {
        //         let rating = ''
        //         if (props.schools[i].rating !== null) {
        //           rating = props.schools[i].rating + '/10'
        //         } else {
        //           rating = 'N/R'
        //         }
        //         schoolList.push([rating, props.schools[i].name, props.schools[i].type, props.schools[i].level_short, props.schools[i].distance + props.schools[i].distanceText])
        //       }
        //     }
        //   }

          // walkscore
          const walkscoreList = []
          // vx: todo: walkscore part...
        //   if (props.walkscore) {
        //     if (props.walkscore.walkscore) {
        //       walkscoreList.push([props.walkscore.walkscore.toString(), 'Walk Score', props.walkscore.description])
        //     }
        //     if (props.walkscore.bike) {
        //       walkscoreList.push([props.walkscore.bike.score.toString(), 'Bike Score', props.walkscore.bike.description])
        //     }
        //     if (props.walkscore.transit) {
        //       walkscoreList.push([props.walkscore.transit.score.toString(), 'Transit Score', props.walkscore.transit.description])
        //     }
        //   }

          // honely forecast
          const honelyForecast = []
          if (props.forecast && props.forecast.property_forecast.percentage_change_forecasts && props.forecast.property_forecast.value_change_forecasts) {
            let change = ''
            for (let i = 1; i < props.forecast.property_forecast.percentage_change_forecasts.length; i++) {
              if (props.forecast.property_forecast.percentage_change_forecasts[i].change >= 0) {
                change = '<span style="color: #07871c;">increase ' + props.forecast.property_forecast.percentage_change_forecasts[i].change + '%</span>'
              } else {
                change = '<span style="color: red;">decrease ' + props.forecast.property_forecast.percentage_change_forecasts[i].change + '%</span>'
              }
              honelyForecast.push([timeFrame4lvls[i], change, formatCurrency(props.forecast.property_forecast.value_change_forecasts[i].change)])
            }
          }

          // home value change zip
          const homeValueChangeZip = []
          if (props.forecast && props.forecast.neighborhood.percentage_change_forecasts) {
            let change = ''
            for (let i = 1; i < props.forecast.neighborhood.percentage_change_forecasts.length; i++) {
              if (props.forecast.neighborhood.percentage_change_forecasts[i].change >= 0) {
                change = '<span style="color: #07871c;">increase ' + props.forecast.neighborhood.percentage_change_forecasts[i].change + '%</span>'
              } else {
                change = '<span style="color: red;">decrease ' + props.forecast.neighborhood.percentage_change_forecasts[i].change + '%</span>'
              }
              homeValueChangeZip.push([timeFrame3lvls[i], change])
            }
          }

          // migration trends
          const migrationTrends = []
          if (props.forecast && props.forecast.moving_trends && props.forecast.moving_trends.move_in_percentage_change_forecast && props.forecast.moving_trends.move_out_percentage_change_forecast && props.forecast.moving_trends.net_in && props.forecast.moving_trends.state_rankings && props.forecast.moving_trends.country_rankings) {
            let inRateChange = ''
            let outRateChange = ''
            let migrationChange = ''

            for (let i = 0; i < props.forecast.moving_trends.move_in_percentage_change_forecast.length; i++) {
              if (props.forecast.moving_trends.move_in_percentage_change_forecast[i].change >= 0) {
                inRateChange = '<span style="color: #07871c;">' + props.forecast.moving_trends.move_in_percentage_change_forecast[i].change + '%</span>'
              } else {
                inRateChange = '<span style="color: red;">' + props.forecast.moving_trends.move_in_percentage_change_forecast[i].change + '%</span>'
              }
              if (props.forecast.moving_trends.move_out_percentage_change_forecast[i].change >= 0) {
                outRateChange = '<span style="color: #07871c;">' + props.forecast.moving_trends.move_out_percentage_change_forecast[i].change + '%</span>'
              } else {
                outRateChange = '<span style="color: red;">' + props.forecast.moving_trends.move_out_percentage_change_forecast[i].change + '%</span>'
              }
              if (props.forecast.moving_trends.net_in[i].change >= 0) {
                migrationChange = '<span style="color: #07871c;">' + props.forecast.moving_trends.net_in[i].change + '%</span>'
              } else {
                migrationChange = '<span style="color: red;">' + props.forecast.moving_trends.net_in[i].change + '%</span>'
              }
              migrationTrends.push([timeFrame4lvls[i], inRateChange, outRateChange, migrationChange, '#' + props.forecast.moving_trends.state_rankings[i].rank, '#' + props.forecast.moving_trends.country_rankings[i].rank])
            }
          }

          // comparsion to zip
          let propertyValueForecast = ''
          if (props.forecast && props.forecast.property_forecast.property_valued_compared_to_zipcode) {
            if (props.forecast.property_forecast.property_valued_compared_to_zipcode >= 0) {
              propertyValueForecast = '<span style="color: #07871c;">' + props.forecast.property_forecast.property_valued_compared_to_zipcode + '% higher</span>'
            } else {
              propertyValueForecast = '<span style="color: red;">' + props.forecast.property_forecast.property_valued_compared_to_zipcode + '% lower</span>'
            }
          }

          // check property status, only show list price if active
          // console.log(props.property)
          let listPrice = ' '
          if (props.property && props.property.status && props.property.status !== null) {
            if (props.property.status.toLowerCase() === 'active' || props.property.status.toLowerCase() === 'for sale') {
              if (props.property.valuation.list_price && props.property.valuation.list_price !== null) {
                listPrice = '<p style="font-size: 16px;">List Price: ' + formatCurrency(props.property.valuation.list_price) + '</p>'
              }
            }
          }
          // console.log(listPrice)
          // sale history
          if (saleDate === '') {
            saleDate = ' '
          }

          if (salePrice === '') {
            salePrice = ' '
          }

          /* if (props.property.sale_history && props.property.sale_history.length > 0) {
            saleDate = props.property.sale_history[0].date
            salePrice = formatCurrency(props.property.sale_history[0].price)
          } */

          // get rental trend data
          const rentalTrendss = []
          // console.log(props.rentalTrends)

        //   if (props.rentalTrends) {
        //     // do zip codes
        //     if (props.rentalTrends.zip) {
        //       let medianRent = props.rentalTrends.zip.median_rent
        //       let population = props.rentalTrends.zip.population
        //       let cashFlow = props.rentalTrends.zip.cash_flow
        //       let cagr1y = props.rentalTrends.zip.cagr1y
        //       let cagr3y = props.rentalTrends.zip.cagr3y
        //       let cagr5y = props.rentalTrends.zip.cagr5y

        //       if (medianRent && medianRent != null) {
        //         medianRent = formatCurrency(medianRent)
        //       } else {
        //         medianRent = 'N/A'
        //       }
        //       if (population && population != null) {
        //         population = formatNumberWithComma(population)
        //       } else {
        //         population = 'N/A'
        //       }
        //       if (cashFlow && cashFlow != null) {
        //         cashFlow = doReportTextColorCode(cashFlow, null, '%')
        //       } else {
        //         cashFlow = 'N/A'
        //       }
        //       if (cagr1y && cagr1y != null) {
        //         cagr1y = doReportTextColorCode(cagr1y, null, '%')
        //       } else {
        //         cagr1y = 'N/A'
        //       }
        //       if (cagr3y && cagr3y != null) {
        //         cagr3y = doReportTextColorCode(cagr3y, null, '%')
        //       } else {
        //         cagr3y = 'N/A'
        //       }
        //       if (cagr5y && cagr5y != null) {
        //         cagr5y = doReportTextColorCode(cagr5y, null, '%')
        //       } else {
        //         cagr5y = 'N/A'
        //       }

        //       rentalTrendss.push(
        //         [
        //           'Zip Code',
        //           medianRent,
        //           population,
        //           cashFlow,
        //           cagr1y,
        //           cagr3y,
        //           cagr5y,
        //         ],
        //       )
        //     } else {
        //       rentalTrendss.push(
        //         [
        //           'Zip Code',
        //           'N/A',
        //           'N/A',
        //           'N/A',
        //           'N/A',
        //           'N/A',
        //           'N/A',
        //         ],
        //       )
        //     }

        //     // do state data
        //     if (props.rentalTrends.state) {
        //       let medianRent = props.rentalTrends.state.median_rent
        //       let population = props.rentalTrends.state.population
        //       let cashFlow = props.rentalTrends.state.cash_flow
        //       let cagr1y = props.rentalTrends.state.cagr1y
        //       let cagr3y = props.rentalTrends.state.cagr3y
        //       let cagr5y = props.rentalTrends.state.cagr5y

        //       if (medianRent && medianRent != null) {
        //         medianRent = formatCurrency(medianRent)
        //       } else {
        //         medianRent = 'N/A'
        //       }
        //       if (population && population != null) {
        //         population = formatNumberWithComma(population)
        //       } else {
        //         population = 'N/A'
        //       }
        //       if (cashFlow && cashFlow != null) {
        //         cashFlow = doReportTextColorCode(cashFlow, null, '%')
        //       } else {
        //         cashFlow = 'N/A'
        //       }
        //       if (cagr1y && cagr1y != null) {
        //         cagr1y = doReportTextColorCode(cagr1y, null, '%')
        //       } else {
        //         cagr1y = 'N/A'
        //       }
        //       if (cagr3y && cagr3y != null) {
        //         cagr3y = doReportTextColorCode(cagr3y, null, '%')
        //       } else {
        //         cagr3y = 'N/A'
        //       }
        //       if (cagr5y && cagr5y != null) {
        //         cagr5y = doReportTextColorCode(cagr5y, null, '%')
        //       } else {
        //         cagr5y = 'N/A'
        //       }

        //       rentalTrendss.push(
        //         [
        //           'State',
        //           medianRent,
        //           population,
        //           cashFlow,
        //           cagr1y,
        //           cagr3y,
        //           cagr5y,
        //         ],
        //       )
        //     } else {
        //       rentalTrendss.push(
        //         [
        //           'State',
        //           'N/A',
        //           'N/A',
        //           'N/A',
        //           'N/A',
        //           'N/A',
        //           'N/A',
        //         ],
        //       )
        //     }

        //     // do metro data
        //     if (props.rentalTrends.metro) {
        //       let medianRent = props.rentalTrends.metro.median_rent
        //       let population = props.rentalTrends.metro.population
        //       let cashFlow = props.rentalTrends.metro.cash_flow
        //       let cagr1y = props.rentalTrends.metro.cagr1y
        //       let cagr3y = props.rentalTrends.metro.cagr3y
        //       let cagr5y = props.rentalTrends.metro.cagr5y

        //       if (medianRent && medianRent != null) {
        //         medianRent = formatCurrency(medianRent)
        //       } else {
        //         medianRent = 'N/A'
        //       }
        //       if (population && population != null) {
        //         population = formatNumberWithComma(population)
        //       } else {
        //         population = 'N/A'
        //       }
        //       if (cashFlow && cashFlow != null) {
        //         cashFlow = doReportTextColorCode(cashFlow, null, '%')
        //       } else {
        //         cashFlow = 'N/A'
        //       }
        //       if (cagr1y && cagr1y != null) {
        //         cagr1y = doReportTextColorCode(cagr1y, null, '%')
        //       } else {
        //         cagr1y = 'N/A'
        //       }
        //       if (cagr3y && cagr3y != null) {
        //         cagr3y = doReportTextColorCode(cagr3y, null, '%')
        //       } else {
        //         cagr3y = 'N/A'
        //       }
        //       if (cagr5y && cagr5y != null) {
        //         cagr5y = doReportTextColorCode(cagr5y, null, '%')
        //       } else {
        //         cagr5y = 'N/A'
        //       }

        //       rentalTrendss.push(
        //         [
        //           'Metro',
        //           medianRent,
        //           population,
        //           cashFlow,
        //           cagr1y,
        //           cagr3y,
        //           cagr5y,
        //         ],
        //       )
        //     } else {
        //       rentalTrendss.push(
        //         [
        //           'Metro',
        //           'N/A',
        //           'N/A',
        //           'N/A',
        //           'N/A',
        //           'N/A',
        //           'N/A',
        //         ],
        //       )
        //     }
        //   } else {
            rentalTrendss.push(
              [
                'Zip Code',
                'N/A',
                'N/A',
                'N/A',
                'N/A',
                'N/A',
                'N/A',
              ],
            )
            rentalTrendss.push(
              [
                'State',
                'N/A',
                'N/A',
                'N/A',
                'N/A',
                'N/A',
                'N/A',
              ],
            )
            rentalTrendss.push(
              [
                'Metro',
                'N/A',
                'N/A',
                'N/A',
                'N/A',
                'N/A',
                'N/A',
              ],
            )
        //   }

          // prepare report request body
          const templateTest = 'template_honely_basic_test.html'
          const templateProd = 'template_honely_basic.html'

          const body = {
            user_id: props.user.user_id,
            // property_id: props.forecast.property_forecast.property_id,
            template: templateProd,
            DATE: {
              type: 'text',
              data: getToday(),
            },
            PROPERTY_URL: {
              type: 'text',
              data: 'https://www.honely.com/forecast/' + props.property.address.property_id,
            },
            IMG_LOCATION: {
              type: 'image',
              data: propertyImg,
            },
            ADDRESS_1: {
              type: 'text',
              data: address1,
            },
            ADDRESS_2: {
              type: 'text',
              data: address2,
            },
            CITY: {
              type: 'text',
              data: city,
            },
            STATE: {
              type: 'text',
              data: state,
            },
            ZIP: {
              type: 'text',
              data: zip,
            },
            AGENT_NAME: {
              type: 'text',
              data: agentName,
            },
            EMAIL: {
              type: 'text',
              data: agentEmail,
            },
            PHONE: {
              type: 'text',
              data: agentPhone,
            },
            CUSTOM_LOGO: {
              type: 'text',
              data: customLogoData,
            },
            LIST_PRICE: {
              type: 'text',
              data: listPrice,
            },
            VALUATION_PRICE: {
              type: 'text',
              data: appraisal,
            },
            NUM_BEDS: {
              type: 'text',
              data: numBeds,
            },
            NUM_BATHS: {
              type: 'text',
              data: numBaths,
            },
            SQFT: {
              type: 'text',
              data: sqft,
            },
            STORIES: {
              type: 'text',
              data: stories,
            },
            STYLE: {
              type: 'text',
              data: architecture,
            },
            YEAR_BUILT: {
              type: 'text',
              data: yearBuilt,
            },
            COUNTY: {
              type: 'text',
              data: county,
            },
            APN: {
              type: 'text',
              data: apn,
            },
            SALE_DATE: {
              type: 'text',
              data: saleDate,
            },
            SALE_PRICE: {
              type: 'text',
              data: salePrice,
            },
            LAND: {
              type: 'text',
              data: formatCurrency(props.property.tax[0].land),
            },
            ADDITIONS: {
              type: 'text',
              data: formatCurrency(props.property.tax[0].additions),
            },
            ASSESSED_VALUE: {
              type: 'text',
              data: formatCurrency(props.property.tax[0].assessed_value),
            },
            TAX_YEAR: {
              type: 'text',
              data: props.property.tax[0].year.toString(),
            },
            PROPERTY_TAX: {
              type: 'text',
              data: formatCurrency(props.property.tax[0].property_tax),
            },
            NUM_PART_BATHS: {
              type: 'text',
              data: numPartialBaths,
            },
            ROOM_COUNT: {
              type: 'text',
              data: roomCount,
            },
            OTHER_ROOMS: {
              type: 'text',
              data: otherRooms,
            },
            AC_TYPE: {
              type: 'text',
              data: acType,
            },
            HEATING_TYPE: {
              type: 'text',
              data: heatType,
            },
            HEATING_FUEL: {
              type: 'text',
              data: heatFuelType,
            },
            AMENITIES: {
              type: 'text',
              data: amenities,
            },
            PARKING_TYPE: {
              type: 'text',
              data: parkingType,
            },
            PARKING_COUNT: {
              type: 'text',
              data: parkingSpaces,
            },
            PLUMBING_COUNT: {
              type: 'text',
              data: plumbingCount,
            },
            POOL: {
              type: 'text',
              data: pool,
            },
            SCHOOLS: {
              type: 'array',
              data: {
                row_class: null,
                array: schoolList,
              },
            },
            WALKSCORE: {
              type: 'array',
              data: {
                row_class: null,
                array: walkscoreList,
              },
            },
            UNIT_COUNT: {
              type: 'text',
              data: roomCount,
            },
            ARCHITECTURE_TYPE: {
              type: 'text',
              data: architecture,
            },
            CONDITION: {
              type: 'text',
              data: condition,
            },
            EXTERIOR_WALLS: {
              type: 'text',
              data: exteriorWalls,
            },
            SEWER_TYPE: {
              type: 'text',
              data: sewerType,
            },
            WATER_TYPE: {
              type: 'text',
              data: waterType,
            },
            CONSTRUCTION_TYPE: {
              type: 'text',
              data: construction,
            },
            ROOF_STYLE: {
              type: 'text',
              data: roofStyle,
            },
            ROOF_MATERIAL: {
              type: 'text',
              data: roofMaterial,
            },
            INTERIOR_WALLS: {
              type: 'text',
              data: interiorWalls,
            },
            FLOORING: {
              type: 'text',
              data: flooring,
            },
            BASEMENT_TYPE: {
              type: 'text',
              data: basementType,
            },
            PROPERTY_VALUE_FORECAST: {
              type: 'text',
              data: propertyValueForecast,
            },
            HONELY_FORECAST: {
              type: 'array',
              data: {
                row_class: null,
                array: honelyForecast,
              },
            },
            HOME_VALUE_CHANGE_ZIP: {
              type: 'array',
              data: {
                row_class: null,
                array: homeValueChangeZip,
              },
            },
            STATE_RANKING_TOTAL: {
              type: 'text',
              data: props.forecast.moving_trends.total_state_rank,
            },
            NATIONAL_RANKING_TOTAL: {
              type: 'text',
              data: props.forecast.moving_trends.total_country_rank,
            },
            MONTH3_ZIP_STATE_RANK: {
              type: 'text',
              data: props.forecast.neighborhood.zipcode_growth_state_ranking_forecasts[1].change,
            },
            MONTH3_ZIP_NATIONAL_RANK: {
              type: 'text',
              data: props.forecast.neighborhood.zipcode_growth_national_ranking_forecasts[1].change,
            },
            MONTH3_VALUE_STATE_RANK: {
              type: 'text',
              data: props.forecast.neighborhood.avg_value_state_ranking_forecasts[1].change,
            },
            MONTH3_VALUE_NATIONAL_RANK: {
              type: 'text',
              data: props.forecast.neighborhood.avg_value_national_ranking_forecasts[1].change,
            },
            YEAR1_ZIP_STATE_RANK: {
              type: 'text',
              data: props.forecast.neighborhood.zipcode_growth_state_ranking_forecasts[2].change,
            },
            YEAR1_ZIP_NATIONAL_RANK: {
              type: 'text',
              data: props.forecast.neighborhood.zipcode_growth_national_ranking_forecasts[2].change,
            },
            YEAR1_VALUE_STATE_RANK: {
              type: 'text',
              data: props.forecast.neighborhood.avg_value_state_ranking_forecasts[2].change,
            },
            YEAR1_VALUE_NATIONAL_RANK: {
              type: 'text',
              data: props.forecast.neighborhood.avg_value_national_ranking_forecasts[2].change,
            },
            YEAR2_ZIP_STATE_RANK: {
              type: 'text',
              data: props.forecast.neighborhood.zipcode_growth_state_ranking_forecasts[3].change,
            },
            YEAR2_ZIP_NATIONAL_RANK: {
              type: 'text',
              data: props.forecast.neighborhood.zipcode_growth_national_ranking_forecasts[3].change,
            },
            YEAR2_VALUE_STATE_RANK: {
              type: 'text',
              data: props.forecast.neighborhood.avg_value_state_ranking_forecasts[3].change,
            },
            YEAR2_VALUE_NATIONAL_RANK: {
              type: 'text',
              data: props.forecast.neighborhood.avg_value_national_ranking_forecasts[3].change,
            },
            YEAR3_ZIP_STATE_RANK: {
              type: 'text',
              data: props.forecast.neighborhood.zipcode_growth_state_ranking_forecasts[4].change,
            },
            YEAR3_ZIP_NATIONAL_RANK: {
              type: 'text',
              data: props.forecast.neighborhood.zipcode_growth_national_ranking_forecasts[4].change,
            },
            YEAR3_VALUE_STATE_RANK: {
              type: 'text',
              data: props.forecast.neighborhood.avg_value_state_ranking_forecasts[4].change,
            },
            YEAR3_VALUE_NATIONAL_RANK: {
              type: 'text',
              data: props.forecast.neighborhood.avg_value_national_ranking_forecasts[4].change,
            },
            CHART_3MONTH: {
              type: 'text',
              data: chart3monthImg,
            },
            CHART_1YEAR: {
              type: 'text',
              data: chart1yearImg,
            },
            CHART_2YEAR: {
              type: 'text',
              data: chart2yearsImg,
            },
            CHART_3YEAR: {
              type: 'text',
              data: chart3yearsImg,
            },
            CHART_RENT: {
              type: 'text',
              data: chartMedianRentImg,
            },
            CHART_CASHFLOW: {
              type: 'text',
              data: chartCashFlowImg,
            },
            CHART_GROWTH: {
              type: 'text',
              data: chartGrowthImg,
            },
            MIGRATION_STATE_RANK: {
              type: 'text',
              data: props.forecast.moving_trends.total_state_rank,
            },
            MIGRATION_COUNTRY_RANK: {
              type: 'text',
              data: props.forecast.moving_trends.total_country_rank,
            },
            MIGRATION_TRENDS: {
              type: 'array',
              data: {
                row_class: null,
                array: migrationTrends,
              },
            },
            RENTAL_TRENDS: {
              type: 'array',
              data: {
                row_class: null,
                array: rentalTrendss,
              },
            },
          }

          // add share properties if share mode is true
          if (shareMode) {
            if (shareEmails) {
              shareEmails = shareEmails.trim().replace(' ', '')
              if (shareEmails !== '') {
                if (shareMessage) {
                  shareMessage = doTextConversionnHTML4(shareMessage.trim())

                  if (shareMessage === '') {
                    shareMessage = ' '
                  }
                }
                body.share = {
                  sender: agentName,
                  to: shareEmails,
                  message: shareMessage,
                }
              } else {
                shareMode = false
              }
            } else {
              shareMode = false
            }
          }

          // console.log(JSON.stringify(body))

          // send request
          let prodUrl = ''
          let localUrl = ''

          if (shareMode) {
            prodUrl = 'https://api.honely.com/util/reports/pdf/share'
            localUrl = 'http://localhost:8080/reports/pdf/share'
          } else {
            if (!cmaMode) {
              prodUrl = 'https://api.honely.com/util/reports/pdf'
              localUrl = 'http://localhost:8080/reports/pdf'
            } else {
                var pika = {array : []}
                var pika2 = {array : []}
                if (!props.inCMA) {
                    // vx: generate cma button from reportintro page
                    window.sessionStorage.removeItem('CMA')
                    window.sessionStorage.removeItem('CMASubjectPropertyId')
                    pika.array.push(body)
                    window.sessionStorage.setItem('CMA', JSON.stringify(pika))
                    pika2.array.push(props.forecast.property_forecast.property_id)
                    window.sessionStorage.setItem('CMASubjectPropertyId',  JSON.stringify(pika2))
                    // vx: todo: redirect to cma page
                    window.location.href = '/cma'
                } else {
                    // vx: generate cma button from cma page
                    /*
                    add to the table
                    add to the cma payload
                    */
                    pika = JSON.parse(window.sessionStorage.getItem('CMA'))
                    pika.array.push(body)
                    window.sessionStorage.setItem('CMA', JSON.stringify(pika))
                    var pika2 = JSON.parse(window.sessionStorage.getItem('CMASubjectPropertyId'))
                    pika2.array.push(props.forecast.property_forecast.property_id)
                    window.sessionStorage.setItem('CMASubjectPropertyId', JSON.stringify(pika2))
                    // removeReportForm()
                    window.location.reload()
                }
                // if (!props.inCMA) {
                //     var pika = {}
                //     pika['0'] = body
                //     window.sessionStorage.setItem('CMA', JSON.stringify(pika))
                // } else {
                //     var pika = JSON.parse(window.sessionStorage.getItem('CMA'))
                //     pika[Object.keys(pika).length.toString()] = body
                //     window.sessionStorage.setItem('CMA', JSON.stringify(pika))
                //     window.location.reload()
                // }
                return
            }
          }

          // display loader and disable button
          // loading = true
          displayLoader()
          disableSubmitButton()
        //   const self = this

          console.log('[INFO] Start generating PDF report......')
          fetch(prodUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          }).then(function (response) {
            // console.log(response)
            return response.blob()
          }).then(function (blob) {
            if (!shareMode) {
              var url = window.URL.createObjectURL(blob)
              var a = document.createElement('a')
              a.href = url
              a.download = 'honely_report.pdf'
              document.body.appendChild(a)
              a.click()
              a.remove()
            }
            // self.loading = false
            hideLoder()
            enableSubmitButton()
            console.log('[INFO] Finished generating PDF report......')
            // freeReportsLeft--
            let config = {
                headers: {
                  'Authorization': 'Bearer ' + props.jwt
                }
              }
            var payload = null
            if (props.creditsFlag) {
                payload = {
                    'credit-amount': 1
                }
            } else {
                payload = {
                    'dollar-amount': 0.5
                }
            }
            axios.post('https://developers.honely.com/user/buy-report', payload, config)
            .then(() => {
                // console.log('vx: props.updateAuthState()', props.updateAuthState)
                // props.updateAuthState()
                window.sessionStorage.removeItem('PaymentPopup')
                window.location.reload()
            })
          }).catch((err) => {
            // self.loading = false
            hideLoder()
            enableSubmitButton()
            console.log('PDF Request Failed', err)
          })
        })
      }
    function doConvertDropdownToCode (dropdown, option) {
        if (dropdown && option) {
          if (dropdown === 'stories') {
            const temp = option.replace('Stories', '').replace('Story', '').replace(' ', '')
            if (!isNaN(temp)) {
              return parseInt(parseFloat(temp) * 100)
            }
          } else {
            return null
          }
        } else {
          return null
        }
      }
    function validateNumericalInput (value) {
        if (value) {
          value = value.trim()

          if (value !== '') {
            if (isNaN(value)) {
              return false
            } else {
              if (parseFloat(value) < 0) {
                return false
              } else {
                return true
              }
            }
          } else {
            return false
          }
        } else {
          return false
        }
      }
    function displayLoader () {
        document.getElementById('report-loader').classList.add('active')
      }
    function doUpdateHonelyEstimate () {
        // TO DO WHEN API is ready
        // get all the inputs from user
        // console.log(props.property)
        if (props.property) {
          const propertyId = props.property.address.property_id
          const fips = props.property.address.fips
          let zip = props.property.address.zip_code
          let yearBuilt = props.property.structure.year_built
          // let stories = document.getElementById('stories').value
          let stories = props.property.structure.stories
          const sqft = document.getElementById('sqft').value
          const numBeds = document.getElementById('num-beds').value
          const numBaths = document.getElementById('num-baths').value
          let numPartialBaths = document.getElementById('num-partial-bath').value
          let roomCount = document.getElementById('room-count').value
          let parkingSpaces = document.getElementById('parking-spaces').value
          let plumbingCount = document.getElementById('plumbing-count').value

          // check numerical inputs
          if (!validateNumericalInput(sqft)) {
            document.getElementById('sqft').classList.add('error-input')
            alert('Please enter a valid number')
            return
          } else {
            document.getElementById('sqft').classList.remove('error-input')
          }
          if (!validateNumericalInput(numBeds)) {
            document.getElementById('num-beds').classList.add('error-input')
            alert('Please enter a valid number')
            return
          } else {
            document.getElementById('num-beds').classList.remove('error-input')
          }
          if (!validateNumericalInput(numBaths)) {
            document.getElementById('num-baths').classList.add('error-input')
            alert('Please enter a valid number')
            return
          } else {
            document.getElementById('num-baths').classList.remove('error-input')
          }
          if (!validateNumericalInput(numPartialBaths)) {
            numPartialBaths = 0
          }
          if (!validateNumericalInput(roomCount)) {
            roomCount = 0
          }
          if (!validateNumericalInput(parkingSpaces)) {
            parkingSpaces = 0
          }
          if (!validateNumericalInput(plumbingCount)) {
            plumbingCount = 0
          }

          // update null data
          if (zip === null || zip === '') {
            zip = null
          }
          if (yearBuilt !== null || yearBuilt !== '') {
            yearBuilt = yearBuilt.toString()
          }
          if (stories === '--') {
            stories = 0
          } else {
            stories = doConvertDropdownToCode('stories', stories)
          }

          const body = {
            basic_info: {
              property_id: propertyId,
              fips: fips,
              zip: zip,
              year_build: yearBuilt,
            },
            numerical: {
              sqft: sqft,
              num_beds: numBeds,
              num_baths: numBaths,
              num_partial_baths: numPartialBaths,
              room_count: roomCount,
              parking_spaces: parkingSpaces,
              plumbing_count: plumbingCount,
            },
            category: {
              stories: stories,
              other_rooms: null,
              air_condition: null,
              heat_type: null,
              heat_fuel_type: null,
              pool_type: null,
              building_condition: null,
              architecture: null,
              construction: null,
              basement_type: null,
              roof_style: null,
              roof_material_type: null,
              exterior_walls: null,
              interior_walls: null,
              flooring: null,
              garage_type: null,
              water_type: null,
              sewer_type: null,
            },
          }

          // console.log(JSON.stringify(body))

          // display loader and disable button
          // loading = true
          displayLoader()
          const self = this
          const apiURL = 'https://api.honely.com/calculator/honely_calculator'
          console.log('[INFO] Start Honely calculator......')

          fetch(apiURL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          }).then(function (response) {
            // console.log(response)
            return response.json()
          }).then(function (data) {
            // console.log(data)
            // self.loading = false
            self.hideLoder()

            // update component
            if (data) {
              // console.log(data.current_value)
              // document.getElementById('forecast-result-after').innerHTML = self.formatCurrency(self.doGetForecastResult(data))
              if (self.doGetForecastResult(data) && self.doGetForecastResult(data) != null) {
                self.doUpdateCalculatorResult(data)
              } else {
                self.doUpdateCalculatorResult(null)
              }
            }
            console.log('[INFO] Finished processing Honely calculator......')
          }).catch((err) => {
            // self.loading = false
            self.hideLoder()
            console.log('[ERROR] Honely calculator API failed =>', err)
          })
        }
      }
    function reportChartOptionsGrowth () {
        return {
          plotOptions: {
            bar: {
              distributed: false,
              dataLabels: {
                position: 'top',
              },
            },
          },
          xaxis: {
            categories: ['1 Year', '3 Years', '5 Years'],
            labels: {
              show: true,
            },
          },
          legend: {
            horizontalAlign: 'left',
          },
          chart: {
            toolbar: {
              show: false,
            },
          },
          colors: [
            '#24cb43', '#ff7d1f', '#f5da0f',
          ],
          dataLabels: {
            offsetY: -20,
            style: {
              colors: ['#434544'],
            },
            formatter: function (val, opts) {
              return val + '%'
            },
          },
        }
      }
    function reportChartOptionsCashFlow () {
        return {
          plotOptions: {
            bar: {
              distributed: true,
              dataLabels: {
                position: 'top',
              },
            },
          },
          xaxis: {
            categories: ['Zip', 'State', 'Metro'],
            labels: {
              show: false,
            },
          },
          legend: {
            horizontalAlign: 'left',
          },
          chart: {
            toolbar: {
              show: false,
            },
          },
          colors: [
            '#24cb43', '#ff7d1f', '#f5da0f',
          ],
          dataLabels: {
            offsetY: -20,
            style: {
              colors: ['#434544'],
            },
            formatter: function (val, opts) {
              return val + '%'
            },
          },
        }
      }
    function reportChartOptionsMedianRent () {
        return {
          plotOptions: {
            bar: {
              distributed: true,
              dataLabels: {
                position: 'top',
              },
            },
          },
          xaxis: {
            categories: ['Zip', 'State', 'Metro'],
            labels: {
              show: false,
            },
          },
          legend: {
            horizontalAlign: 'left',
          },
          chart: {
            toolbar: {
              show: false,
            },
          },
          colors: [
            '#24cb43', '#ff7d1f', '#f5da0f',
          ],
          dataLabels: {
            offsetY: -20,
            style: {
              colors: ['#434544'],
            },
            formatter: function (val, opts) {
              return '$' + val
            },
          },
        }
      }
    function reportChartOptions () {
        return {
          plotOptions: {
            bar: {
              distributed: true,
              dataLabels: {
                position: 'top',
              },
            },
          },
          xaxis: {
            categories: [props.forecast.zipcode, 'Surrounding 10 zip codes', 'State'],
            labels: {
              show: false,
            },
          },
          legend: {
            horizontalAlign: 'left',
          },
          chart: {
            toolbar: {
              show: false,
            },
          },
          colors: [
            '#24cb43', '#ff7d1f', '#f5da0f',
          ],
          dataLabels: {
            offsetY: -20,
            style: {
              colors: ['#434544'],
            },
            formatter: function (val, opts) {
              return val + '%'
            },
          },
        }
      }
    function chartMedianRent () {
        if (validaterentalTrendsValues()) {
          return [{
            name: 'Median Rent',
            data: [
              props.rentalTrends.zip.median_rent,
              props.rentalTrends.state.median_rent,
              props.rentalTrends.metro.median_rent,
            ],
          }]
        } else {
          return [{
            name: 'Median Rent',
            data: [],
          }]
        }
      }
    function chartCashFlow () {
        if (validaterentalTrendsValues()) {
          return [{
            name: 'Cash Flow',
            data: [
              props.rentalTrends.zip.cash_flow,
              props.rentalTrends.state.cash_flow,
              props.rentalTrends.metro.cash_flow,
            ],
          }]
        } else {
          return [{
            name: 'Cash Flow',
            data: [],
          }]
        }
      }
    function hideLoder () {
        document.getElementById('report-loader').classList.remove('active')
      }
    function validaterentalTrendsValues () {
        // console.log(props.rentalTrends)
        if (props.rentalTrends) {
          if (props.rentalTrends.zip && props.rentalTrends.state && props.rentalTrends.metro) {
            if (props.rentalTrends.zip.cagr1y && props.rentalTrends.zip.cagr3y && props.rentalTrends.zip.cagr5y && props.rentalTrends.zip.median_rent && props.rentalTrends.zip.cash_flow &&
              props.rentalTrends.state.cagr1y && props.rentalTrends.state.cagr3y && props.rentalTrends.state.cagr5y && props.rentalTrends.state.median_rent && props.rentalTrends.state.cash_flow &&
              props.rentalTrends.metro.cagr1y && props.rentalTrends.metro.cagr3y && props.rentalTrends.metro.cagr5y && props.rentalTrends.metro.median_rent && props.rentalTrends.metro.cash_flow) {
              return true
            } else {
              return false
            }
          } else {
            return false
          }
        } else {
          return false
        }
      }
    function chartRentalGrowth () {
        if (validaterentalTrendsValues()) {
          return [
            {
              name: 'Zip',
              data: [props.rentalTrends.zip.cagr1y, props.rentalTrends.zip.cagr3y, props.rentalTrends.zip.cagr5y],
            },
            {
              name: 'State',
              data: [props.rentalTrends.state.cagr1y, props.rentalTrends.state.cagr3y, props.rentalTrends.state.cagr5y],
            },
            {
              name: 'Metro',
              data: [props.rentalTrends.metro.cagr1y, props.rentalTrends.metro.cagr3y, props.rentalTrends.metro.cagr5y],
            },
          ]
        } else {
          return [
            {
              name: 'Zip',
              data: [],
            },
            {
              name: 'State',
              data: [],
            },
            {
              name: 'Metro',
              data: [],
            },
          ]
        }
      }
    function chart3month () {
        console.log('vx: chart3month run, props.forecast', props.forecast)
        if (props.forecast) {
          if (props.forecast.neighborhood.percentage_change_forecasts && props.forecast.surrounding_zipcode.percentage_change_forecasts && props.forecast.state_statistics.percentage_change_forecasts) {
              console.log('vx: 111111', [{
                name: 'Percent Change',
                data: [
                  props.forecast.neighborhood.percentage_change_forecasts[1].change,
                  props.forecast.surrounding_zipcode.percentage_change_forecasts[1].change,
                  props.forecast.state_statistics.percentage_change_forecasts[1].change,
                ],
              }])
            return [{
              name: 'Percent Change',
              data: [
                props.forecast.neighborhood.percentage_change_forecasts[1].change,
                props.forecast.surrounding_zipcode.percentage_change_forecasts[1].change,
                props.forecast.state_statistics.percentage_change_forecasts[1].change,
              ],
            }]
          } else {
            console.log('vx: 222222')
            return [{
              name: 'Percent Change',
              data: [],
            }]
          }
        } else {
            console.log('vx: 333333')
          return [{
            name: 'Percent Change',
            data: [],
          }]
        }
      }
    function chart1year () {
        if (props.forecast) {
          if (props.forecast.neighborhood.percentage_change_forecasts && props.forecast.surrounding_zipcode.percentage_change_forecasts && props.forecast.state_statistics.percentage_change_forecasts) {
            return [{
              name: 'Percent Change',
              data: [
                props.forecast.neighborhood.percentage_change_forecasts[2].change,
                props.forecast.surrounding_zipcode.percentage_change_forecasts[2].change,
                props.forecast.state_statistics.percentage_change_forecasts[2].change,
              ],
            }]
          } else {
            return [{
              name: 'Percent Change',
              data: [],
            }]
          }
        } else {
          return [{
            name: 'Percent Change',
            data: [],
          }]
        }
      }
    function chart2years () {
        if (props.forecast) {
          if (props.forecast.neighborhood.percentage_change_forecasts && props.forecast.surrounding_zipcode.percentage_change_forecasts && props.forecast.state_statistics.percentage_change_forecasts) {
            return [{
              name: 'Percent Change',
              data: [
                props.forecast.neighborhood.percentage_change_forecasts[3].change,
                props.forecast.surrounding_zipcode.percentage_change_forecasts[3].change,
                props.forecast.state_statistics.percentage_change_forecasts[3].change,
              ],
            }]
          } else {
            return [{
              name: 'Percent Change',
              data: [],
            }]
          }
        } else {
          return [{
            name: 'Percent Change',
            data: [],
          }]
        }
      }
    function chart3years () {
        if (props.forecast) {
          if (props.forecast.neighborhood.percentage_change_forecasts && props.forecast.surrounding_zipcode.percentage_change_forecasts && props.forecast.state_statistics.percentage_change_forecasts) {
            return [{
              name: 'Percent Change',
              data: [
                props.forecast.neighborhood.percentage_change_forecasts[3].change,
                props.forecast.surrounding_zipcode.percentage_change_forecasts[3].change,
                props.forecast.state_statistics.percentage_change_forecasts[3].change,
              ],
            }]
          } else {
            return [{
              name: 'Percent Change',
              data: [],
            }]
          }
        } else {
          return [{
            name: 'Percent Change',
            data: [],
          }]
        }
      }
    function GetHonelyAppraisal () {
        // console.log(props.property)
        if (props.property && props.property.valuation.appraisal) {
          return formatCurrency(props.property.valuation.appraisal)
        } else {
          return '--'
        }
      }
    function getMostRecentSaleDate () {
        if (props.property && props.property.sale_history) {
          if (props.property.sale_history != null && props.property.sale_history.length > 0) {
            if (props.property.sale_history[0].date && props.property.sale_history[0].date != null) {
              return props.property.sale_history[0].date
            } else {
              return ''
            }
          } else {
            return ''
          }
        } else {
          return ''
        }
      }
    function getMostRecentSalePrice () {
        if (props.property && props.property.sale_history) {
          if (props.property.sale_history != null && props.property.sale_history.length > 0) {
            if (props.property.sale_history[0].price && props.property.sale_history[0].price != null) {
              return props.property.sale_history[0].price
            } else {
              return ''
            }
          } else {
            return ''
          }
        } else {
          return ''
        }
      }
    function getParkingType () {
        if (props.property && props.property.structure) {
          if (props.property.structure.parking_type && props.property.structure.parking_type !== null) {
            return props.property.structure.parking_type
          } else {
            return ''
          }
        } else {
          return ''
        }
      }
    function getAirConditionCodes () {
        if (props.optionLists && props.optionLists.air_condition_code) {
          const options = []
          for (const key in props.optionLists.air_condition_code) {
            options.push(
              {
                id: key,
                name: props.optionLists.air_condition_code[key],
              },
            )
          }
          return options
        } else {
          return []
        }
      }
    function getACType () {
        if (props.property && props.property.structure) {
          if (props.property.structure.air_conditioning_type && props.property.structure.air_conditioning_type !== null) {
            return props.property.structure.air_conditioning_type
          } else {
            return '--'
          }
        } else {
          return '--'
        }
      }
    function AirConditionCodes() {
        var ans = []
        ans.push(<option value="--">--</option>)
        var pika = getAirConditionCodes()
        for (let x=0; x<pika.length; x++) {
            ans.push(
                <option
                    value={pika[x].name}
                    selected={getACType()==pika[x].name}
                  >
                  {pika[x].name}
                </option>
            )
        }
        return (
            <select name="ac-type" id="ac-type">
                {ans}
            </select>
        )
    }
    function getBuildingConditionCodes () {
        if (props.optionLists && props.optionLists.building_condition_code) {
          const options = []
          for (const key in props.optionLists.building_condition_code) {
            options.push(
              {
                id: key,
                name: props.optionLists.building_condition_code[key],
              },
            )
          }
          return options
        } else {
          return []
        }
      }
    function getCondition () {
        if (props.property && props.property.structure) {
          if (props.property.structure.condition && props.property.structure.condition !== null) {
            return props.property.structure.condition
          } else {
            return '--'
          }
        } else {
          return '--'
        }
      }
    function BuildingConditionCodes() {
        var ans = []
        ans.push(<option value="--">--</option>)
        var pika = getBuildingConditionCodes()
        for (let x=0; x<pika.length; x++) {
            ans.push(
                <option
                    value={pika[x].name}
                    selected={getCondition()==pika[x].name}
                  >
                  {pika[x].name}
                </option>
            )
        }
        return (
            <select name="condition" id="condition">
                {ans}
            </select>
        )
    }
    function getStyleCodes () {
        if (props.optionLists && props.optionLists.style_code) {
          const options = []
          for (const key in props.optionLists.style_code) {
            options.push(
              {
                id: key,
                name: props.optionLists.style_code[key],
              },
            )
          }
          return options
        } else {
          return []
        }
      }
    function getArchitecture () {
        if (props.property && props.property.structure) {
          if (props.property.structure.architecture_type && props.property.structure.architecture_type !== null) {
            return props.property.structure.architecture_type
          } else {
            return '--'
          }
        } else {
          return '--'
        }
      }
    function StyleCodes() {
        var ans = []
        ans.push(<option value="--">--</option>)
        var pika = getStyleCodes()
        for (let x=0; x<pika.length; x++) {
            ans.push(
                <option
                    value={pika[x].name}
                    selected={getArchitecture()==pika[x].name}
                  >
                  {pika[x].name}
                </option>
            )
        }
        return (
            <select name="architecture" id="architecture">
                {ans}
            </select>
        )
    }
    function getConstructionTypeCodes () {
        if (props.optionLists && props.optionLists.construction_type_code) {
          const options = []
          for (const key in props.optionLists.construction_type_code) {
            options.push(
              {
                id: key,
                name: props.optionLists.construction_type_code[key],
              },
            )
          }
          return options
        } else {
          return []
        }
      }
    function getConstructionType () {
        if (props.property && props.property.structure) {
          if (props.property.structure.construction_type && props.property.structure.construction_type !== null) {
            return props.property.structure.construction_type
          } else {
            return '--'
          }
        } else {
          return '--'
        }
      }
    function ConstructionTypeCodes() {
        var ans = []
        ans.push(<option value="--">--</option>)
        var pika = getConstructionTypeCodes()
        for (let x=0; x<pika.length; x++) {
            ans.push(
                <option
                    value={pika[x].name}
                    selected={getConstructionType()==pika[x].name}
                  >
                  {pika[x].name}
                </option>
            )
        }
        return (
            <select name="construction" id="construction">
                {ans}
            </select>
        )
    }
    function getBasementCodes () {
        if (props.optionLists && props.optionLists.basement_code) {
          const options = []
          for (const key in props.optionLists.basement_code) {
            options.push(
              {
                id: key,
                name: props.optionLists.basement_code[key],
              },
            )
          }
          return options
        } else {
          return []
        }
      }
    function getBasement () {
        if (props.property && props.property.structure) {
          if (props.property.structure.basement_type && props.property.structure.basement_type !== null) {
            return props.property.structure.basement_type
          } else {
            return '--'
          }
        } else {
          return '--'
        }
      }
    function BasementCodes() {
        var ans = []
        ans.push(<option value="--">--</option>)
        var pika = getBasementCodes()
        for (let x=0; x<pika.length; x++) {
            ans.push(
                <option
                    value={pika[x].name}
                    selected={getBasement()==pika[x].name}
                  >
                  {pika[x].name}
                </option>
            )
        }
        return (
            <select name="basement-type" id="basement-type">
                {ans}
            </select>
        )
    }
    function getRoofTypeCodes () {
        if (props.optionLists && props.optionLists.roof_type_code) {
          const options = []
          for (const key in props.optionLists.roof_type_code) {
            options.push(
              {
                id: key,
                name: props.optionLists.roof_type_code[key],
              },
            )
          }
          return options
        } else {
          return []
        }
      }
    function getRoofStyle () {
        if (props.property && props.property.structure) {
          if (props.property.structure.roof_style_type && props.property.structure.roof_style_type !== null) {
            return props.property.structure.roof_style_type
          } else {
            return '--'
          }
        } else {
          return '--'
        }
      }
    function RoofTypeCodes() {
        var ans = []
        ans.push(<option value="--">--</option>)
        var pika = getRoofTypeCodes()
        for (let x=0; x<pika.length; x++) {
            ans.push(
                <option
                    value={pika[x].name}
                    selected={getRoofStyle()==pika[x].name}
                  >
                  {pika[x].name}
                </option>
            )
        }
        return (
            <select name="roof-style" id="roof-style">
                {ans}
            </select>
        )
    }
    function getRoofCoverCodes () {
        if (props.optionLists && props.optionLists.roof_cover_code) {
          const options = []
          for (const key in props.optionLists.roof_cover_code) {
            options.push(
              {
                id: key,
                name: props.optionLists.roof_cover_code[key],
              },
            )
          }
          return options
        } else {
          return []
        }
      }
    function getRoofMaterial () {
        if (props.property && props.property.structure) {
          if (props.property.structure.roof_material_type && props.property.structure.roof_material_type !== null) {
            return props.property.structure.roof_material_type
          } else {
            return '--'
          }
        } else {
          return '--'
        }
      }
    function RoofCoverCodes() {
        var ans = []
        ans.push(<option value="--">--</option>)
        var pika = getRoofCoverCodes()
        for (let x=0; x<pika.length; x++) {
            ans.push(
                <option
                    value={pika[x].name}
                    selected={getRoofMaterial()==pika[x].name}
                  >
                  {pika[x].name}
                </option>
            )
        }
        return (
            <select name="roof-material" id="roof-material">
                {ans}
            </select>
        )
    }
    function getExteriorWallsCodes () {
        if (props.optionLists && props.optionLists.exterior_walls_code) {
          const options = []
          for (const key in props.optionLists.exterior_walls_code) {
            options.push(
              {
                id: key,
                name: props.optionLists.exterior_walls_code[key],
              },
            )
          }
          return options
        } else {
          return []
        }
      }
    function getExteriorWalls () {
        if (props.property && props.property.structure) {
          if (props.property.structure.exterior_wall_type && props.property.structure.exterior_wall_type !== null) {
            return props.property.structure.exterior_wall_type
          } else {
            return '--'
          }
        } else {
          return '--'
        }
      }
    function ExteriorWallsCodes() {
        var ans = []
        ans.push(<option value="--">--</option>)
        var pika = getExteriorWallsCodes()
        for (let x=0; x<pika.length; x++) {
            ans.push(
                <option
                    value={pika[x].name}
                    selected={getExteriorWalls()==pika[x].name}
                  >
                  {pika[x].name}
                </option>
            )
        }
        return (
            <select name="exterior-walls" id="exterior-walls">
                {ans}
            </select>
        )
    }
    function getInteriorWallsCodes () {
        if (props.optionLists && props.optionLists.interior_walls_code) {
          const options = []
          for (const key in props.optionLists.interior_walls_code) {
            options.push(
              {
                id: key,
                name: props.optionLists.interior_walls_code[key],
              },
            )
          }
          return options
        } else {
          return []
        }
      }
    function getInteriorWalls () {
        if (props.property && props.property.structure) {
          if (props.property.structure.interior_wall_type && props.property.structure.interior_wall_type !== null) {
            return props.property.structure.interior_wall_type
          } else {
            return '--'
          }
        } else {
          return '--'
        }
      }
    function InteriorWallsCodes() {
        var ans = []
        ans.push(<option value="--">--</option>)
        var pika = getInteriorWallsCodes()
        for (let x=0; x<pika.length; x++) {
            ans.push(
                <option
                    value={pika[x].name}
                    selected={getInteriorWalls()==pika[x].name}
                  >
                  {pika[x].name}
                </option>
            )
        }
        return (
            <select name="interior-walls" id="interior-walls">
                {ans}
            </select>
        )
    }
    function getFloorCoverCodes () {
        if (props.optionLists && props.optionLists.floor_cover_code) {
          const options = []
          for (const key in props.optionLists.floor_cover_code) {
            options.push(
              {
                id: key,
                name: props.optionLists.floor_cover_code[key],
              },
            )
          }
          return options
        } else {
          return []
        }
      }
    function getFlooring () {
        if (props.property && props.property.structure) {
          if (props.property.structure.flooring_types && props.property.structure.flooring_types !== null) {
            return props.property.structure.flooring_types
          } else {
            return '--'
          }
        } else {
          return '--'
        }
      }
    function FloorCoverCodes() {
        var ans = []
        ans.push(<option value="--">--</option>)
        var pika = getFloorCoverCodes()
        for (let x=0; x<pika.length; x++) {
            ans.push(
                <option
                    value={pika[x].name}
                    selected={getFlooring()==pika[x].name}
                  >
                  {pika[x].name}
                </option>
            )
        }
        return (
            <select name="flooring" id="flooring">
                {ans}
            </select>
        )
    }
    function getWaterCodes () {
        if (props.optionLists && props.optionLists.water_code) {
          const options = []
          for (const key in props.optionLists.water_code) {
            options.push(
              {
                id: key,
                name: props.optionLists.water_code[key],
              },
            )
          }
          return options
        } else {
          return []
        }
      }
    function getWaterType () {
        if (props.property && props.property.structure) {
          if (props.property.structure.water_type && props.property.structure.water_type !== null) {
            return props.property.structure.water_type
          } else {
            return '--'
          }
        } else {
          return '--'
        }
      }
    function WaterCodes() {
        var ans = []
        ans.push(<option value="--">--</option>)
        var pika = getWaterCodes()
        for (let x=0; x<pika.length; x++) {
            ans.push(
                <option
                    value={pika[x].name}
                    selected={getWaterType()==pika[x].name}
                  >
                  {pika[x].name}
                </option>
            )
        }
        return (
            <select name="water-type" id="water-type">
                {ans}
            </select>
        )
    }
    function getSewerCodes () {
        if (props.optionLists && props.optionLists.sewer_code) {
          const options = []
          for (const key in props.optionLists.sewer_code) {
            options.push(
              {
                id: key,
                name: props.optionLists.sewer_code[key],
              },
            )
          }
          return options
        } else {
          return []
        }
      }
    function getSewerType () {
        if (props.property && props.property.structure) {
          if (props.property.structure.sewer_type && props.property.structure.sewer_type !== null) {
            return props.property.structure.sewer_type
          } else {
            return '--'
          }
        } else {
          return '--'
        }
      }
    function SewerCodes() {
        var ans = []
        ans.push(<option value="--">--</option>)
        var pika = getSewerCodes()
        for (let x=0; x<pika.length; x++) {
            ans.push(
                <option
                    value={pika[x].name}
                    selected={getSewerType()==pika[x].name}
                  >
                  {pika[x].name}
                </option>
            )
        }
        return (
            <select name="sewer-type" id="sewer-type">
                {ans}
            </select>
        )
    }
    function getHeatType () {
        if (props.property && props.property.structure) {
          if (props.property.structure.heating_type && props.property.structure.heating_type !== null) {
            return props.property.structure.heating_type
          } else {
            return '--'
          }
        } else {
          return '--'
        }
      }
    function getHeatingTypeCodes () {
        if (props.optionLists && props.optionLists.heating_type) {
          const options = []
          for (const key in props.optionLists.heating_type) {
            options.push(
              {
                id: key,
                name: props.optionLists.heating_type[key],
              },
            )
          }
          return options
        } else {
          return []
        }
      }
    function HeatingTypeCodes() {
        var ans = []
        ans.push(<option value="--">--</option>)
        var pika = getHeatingTypeCodes()
        for (let x=0; x<pika.length; x++) {
            ans.push(
                <option
                    value={pika[x].name}
                    selected={getHeatType()==pika[x].name}
                  >
                  {pika[x].name}
                </option>
            )
        }
        return (
            <select name="heat-type" id="heat-type">
                {ans}
            </select>
        )
    }
    function getHeatFuelType () {
        if (props.property && props.property.structure) {
          if (props.property.structure.heating_fuel_type && props.property.structure.heating_fuel_type !== null) {
            return props.property.structure.heating_fuel_type
          } else {
            return '--'
          }
        } else {
          return '--'
        }
      }
    function getHeatingFuelCodes () {
        if (props.optionLists && props.optionLists.heating_fuel_code) {
          const options = []
          for (const key in props.optionLists.heating_fuel_code) {
            options.push(
              {
                id: key,
                name: props.optionLists.heating_fuel_code[key],
              },
            )
          }
          return options
        } else {
          return []
        }
      }
    function HeatingFuelCodes() {
        var ans = []
        ans.push(<option value="--">--</option>)
        var pika = getHeatingFuelCodes()
        for (let x=0; x<pika.length; x++) {
            ans.push(
                <option
                    value={pika[x].name}
                    selected={getHeatFuelType()==pika[x].name}
                  >
                  {pika[x].name}
                </option>
            )
        }
        return (
            <select name="heat-fuel-type" id="heat-fuel-type">
                {ans}
            </select>
        )
    }
    function getPool () {
        if (props.property && props.property.structure) {
          if (props.property.structure.pool_type && props.property.structure.pool_type !== null) {
            return props.property.structure.pool_type
          } else {
            return '--'
          }
        } else {
          return '--'
        }
      }
    function getPoolCodes () {
        if (props.optionLists && props.optionLists.pool) {
          const options = []
          for (const key in props.optionLists.pool) {
            options.push(
              {
                id: key,
                name: props.optionLists.pool[key],
              },
            )
          }
          return options
        } else {
          return []
        }
      }
    function PoolCodes() {
        var ans = []
        ans.push(<option value="--">--</option>)
        var pika = getPoolCodes()
        for (let x=0; x<pika.length; x++) {
            ans.push(
                <option
                    value={pika[x].name}
                    selected={getPool()==pika[x].name}
                  >
                  {pika[x].name}
                </option>
            )
        }
        return (
            <select name="pool" id="pool">
                {ans}
            </select>
        )
    }
    function getAmenities () {
        if (props.property && props.property.structure) {
          if (props.property.structure.amenities && props.property.structure.amenities !== null) {
            return props.property.structure.amenities
          } else {
            return '--'
          }
        } else {
          return '--'
        }
      }
    function getAmenitiesCodes () {
        if (props.optionLists && props.optionLists.amenities) {
          const options = []
          for (const key in props.optionLists.amenities) {
            options.push(
              {
                id: key,
                name: props.optionLists.amenities[key],
              },
            )
          }
          return options
        } else {
          return []
        }
      }
    function AmenitiesCodes() {
        var ans = []
        ans.push(<option value="--">--</option>)
        var pika = getAmenitiesCodes()
        for (let x=0; x<pika.length; x++) {
            ans.push(
                <option
                    value={pika[x].name}
                    selected={getAmenities()==pika[x].name}
                  >
                  {pika[x].name}
                </option>
            )
        }
        return (
            <select name="amenities" id="amenities">
                {ans}
            </select>
        )
    }
    function getParkingSpaces () {
        if (props.property && props.property.structure) {
          if (props.property.structure.parking_spaces_count && props.property.structure.parking_spaces_count !== null) {
            return props.property.structure.parking_spaces_count
          } else {
            return ''
          }
        } else {
          return ''
        }
      }
      function getPlumbingCount () {
        if (props.property && props.property.structure) {
          if (props.property.structure.plumbing_fixtures && props.property.structure.plumbing_fixtures !== null) {
            return props.property.structure.plumbing_fixtures
          } else {
            return ''
          }
        } else {
          return ''
        }
      }
    function formatCurrency (num) {
        // console.log(typeof (num))
        if (num && num !== null) {
            if (typeof (num) === 'number') {
              num = Math.round(num / 100) * 100
              return num.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })
            } else if (typeof (num) === 'string') {
              num = Math.round(parseFloat(num) / 100) * 100
              return parseInt(num).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 })
            }
          } else {
            return ' '
          }
    }
    function GetFullAddress () {
        if (props.property && props.property.address) {
          return props.property.address.full_address
        } else {
          return ''
        }
      }
    function GetAPN () {
        if (props.property && props.property.address) {
          return props.property.address.apn
        } else {
          return ''
        }
    }
    function getAPN () {
        if (props.property && props.property.address) {
          return props.property.address.apn
        } else {
          return ''
        }
    }
    function getAddress1 () {
        if (props.property && props.property.address) {
          return props.property.address.street_number + ' ' + props.property.address.street_name + ' ' + props.property.address.street_suffix
        } else {
          return ''
        }
      }
    function getAddress2 () {
        if (props.property && props.property.address) {
          if (props.property.address.unit_type !== null && props.property.address.unit_number !== null) {
            return props.property.address.unit_type + ' ' + props.property.address.unit_number
          } else {
            return ''
          }
        } else {
          return ''
        }
      }
    function getCity () {
        if (props.property && props.property.address) {
          return props.property.address.city
        } else {
          return ''
        }
      }
    function getState () {
        if (props.property && props.property.address) {
          return props.property.address.state
        } else {
          return ''
        }
      }
    function getZip () {
        if (props.property && props.property.address) {
          return props.property.address.zip_code
        } else {
          return ''
        }
      }
    function getCounty () {
        if (props.property && props.property.address) {
          return props.property.address.fips
        } else {
          return ''
        }
      }
    function doTextConversionnHTML4 (text) {
        if (text !== null && text !== '') {
          // process HTML 4 entities conversion
          text = text.trim().replace('&Tab;', '&Tab;').replace('&NewLine;', '&NewLine;').replace('&excl;', '&excl;').replace('&quot;', '&quot;').replace('&num;', '&#35;').replace('&dollar;', '&#36;').replace('&percnt;', '&#37;')
            .replace('&amp;', '&#38;').replace('&', '&#38;').replace('&apos;', '&#39;').replace('&lpar;', '&#40;').replace('&rpar;', '&#41;').replace('&ast;', '&#42;').replace('&plus;', '&#43;').replace('&comma;', '&#44;')
            .replace('&period;', '&#46;').replace('&sol;', '&#47;').replace('/', '&#47;').replace('&lt;', '&#60;').replace('<', '&#60;').replace('&equals;', '&#61;').replace('=', '&#61;').replace('&gt;', '&#62;').replace('>', '&#62;')
            .replace('&quest;', '&#63;').replace('&commat;', '&#64;').replace('@', '&#64;').replace('&lsqb;', '&#91;').replace('[', '&#91;').replace('&bsol;', '&#92;').replace('\\', '&#92;').replace('&rsqb;', '&#93;')
            .replace(']', '&#93;').replace('&Hat;', '&#94;').replace('^', '&#94;').replace('&grave;', '&#96;').replace('`', '&#96;').replace('&lcub;', '&#123;').replace('{', '&#123;').replace('&verbar;', '&#124;').replace('|', '&#124;')
            .replace('&rcub;', '&#125;').replace('}', '&#125;').replace('&nbsp;', '&nbsp;').replace('&iexcl;', '&iexcl;').replace('¡', '&iexcl;').replace('&cent;', '&#162;').replace('¢', '&#162;').replace('&pound;', '&#163;')
            .replace('£', '&#163;').replace('&curren;', '&#164;').replace('¤', '&#164;').replace('&yen;', '&#165;').replace('¥', '&#165;').replace('&sect;', '&#167;').replace('§', '&#167;').replace('&copy;', '&#169;').replace('©', '&#169;')
            .replace('&reg;', '&#174;').replace('®', '&#174;').replace('&deg;', '&#176;').replace('°', '&#176;').replace('&acute;', '&#180;').replace('´', '&#180;').replace('&micro;', '&#181;').replace('µ', '&#181;').replace('&para;', '&#182;')
            .replace('¶', '&#182;').replace('&middot;', '&#183;').replace('·', '&#183;').replace('&iquest;', '&#191;').replace('¿', '&#191;').replace('&Agrave;', '&#192;').replace('À', '&#192;').replace('&Aacute;', '&#193;').replace('Á', '&#193;')
            .replace('&Acirc;', '&#194;').replace('Â', '&#194;').replace('&Atilde;', '&#195;').replace('Ã', '&#195;').replace('&Auml;', '&#196;').replace('Ä', '&#196;').replace('&Aring;', '&#197;').replace('Å', '&#197;').replace('&AElig;', '&#198')
            .replace('Æ', '&#198').replace('&Ccedil;', '&#199;').replace('Ç', '&#199;').replace('&Egrave;', '&#200;').replace('È', '&#200;').replace('&Eacute;', '&#201;').replace('É', '&#201;').replace('&Ecirc;', '&#202;').replace('Ê', '&#202;')
            .replace('Ë', '&#203;').replace('&Euml;', '&#203;').replace('Ì', '&#204;').replace('&Igrave;', '&#204;').replace('Í', '&#205;').replace('&Iacute;', '&#205;').replace('Î', '&#206;').replace('&Icirc;', '&#206;').replace('Ï', '&#207;').replace('&Iuml;', '&#207;')
            .replace('Ð', '&#208;').replace('&ETH;', '&#208;').replace('Ñ', '&#209;').replace('&Ntilde;', '&#209;').replace('Ò', '&#210;').replace('&Ograve;', '&#210;').replace('Ó', '&#211;').replace('&Oacute;', '&#211;').replace('Ô', '&#212;').replace('&Ocirc;', '&#212;')
            .replace('Õ', '&#213;').replace('&Otilde;', '&#213;').replace('Ö', '&#214;').replace('&Ouml;', '&#214;').replace('×', '&#215;').replace('&times;', '&#215;').replace('Ø', '&#216;').replace('&Oslash;', '&#216;').replace('Ù', '&#217;').replace('&Ugrave;', '&#217;')
            .replace('Ú', '&#218;').replace('&Uacute;', '&#218;').replace('Û', '&#219;').replace('&Ucirc;', '&#219;').replace('Ü', '&#220;').replace('&Uuml;', '&#220;').replace('Ý', '&#221;').replace('&Yacute;', '&#221;').replace('Þ', '&#222;').replace('&THORN;', '&#222;')
            .replace('ß', '&#223;').replace('&szlig;', '&#223;').replace('à', '&#224;').replace('&agrave;', '&#224;').replace('á', '&#225;').replace('&aacute;', '&#225;').replace('â', '&#226;').replace('&acirc;', '&#226;').replace('ã', '&#227;').replace('&atilde;', '&#227;')
            .replace('ä', '&#228;').replace('&auml;', '&#228;').replace('å', '&#229;').replace('&aring;', '&#229;').replace('æ', '&#230;').replace('&aelig;', '&#230;').replace('ç', '&#231;').replace('&ccedil;', '&#231;').replace('è', '&#232;').replace('&egrave;', '&#232;')
            .replace('é', '&#233;').replace('&eacute;', '&#233;').replace('ê', '&#234;').replace('&ecirc;', '&#234;').replace('ë', '&#235;').replace('&euml;', '&#235;').replace('ì', '&#236;').replace('&igrave;', '&#236;').replace('í', '&#237;').replace('&iacute;', '&#237;')
            .replace('î', '&#238;').replace('&icirc;', '&#238;').replace('ï', '&#239;').replace('&iuml;', '&#239;').replace('ð', '&#240;').replace('&eth;', '&#240;').replace('ñ', '&#241;').replace('&ntilde;', '&#241;').replace('ò', '&#242;').replace('&ograve;', '&#242;')
            .replace('ó', '&#243;').replace('&oacute;', '&#243;').replace('ô', '&#244;').replace('&ocirc;', '&#244;').replace('õ', '&#245;').replace('&otilde;', '&#245;').replace('ö', '&#246;').replace('&ouml;', '&#246;').replace('÷', '&#247;').replace('&divide; &div;', '&#247;')
            .replace('ø', '&#248;').replace('&oslash;', '&#248;').replace('ù', '&#249;').replace('&ugrave;', '&#249;').replace('ú', '&#250;').replace('&uacute;', '&#250;').replace('û', '&#251;').replace('&ucirc;', '&#251;').replace('ü', '&#252;').replace('&uuml;', '&#252;')
            .replace('ý', '&#253;').replace('&yacute;', '&#253;').replace('þ', '&#254;').replace('&thorn;', '&#254;').replace('ÿ', '&#255;').replace('&yuml;', '&#255;').replace('Ā', '&#256;').replace('&Amacr;', '&#256;').replace('ā', '&#257;').replace('&amacr;', '&#257;')
            .replace('Ă', '&#258;').replace('&Abreve;', '&#258;').replace('ă', '&#259;').replace('&abreve;', '&#259;').replace('Ą', '&#260;').replace('&Aogon;', '&#260;').replace('ą', '&#261;').replace('&aogon;', '&#261;').replace('Ć', '&#262;').replace('&Cacute;', '&#262;')
            .replace('ć', '&#263;').replace('&cacute;', '&#263;').replace('Ĉ', '&#264;').replace('&Ccirc;', '&#264;').replace('ĉ', '&#265;').replace('&ccirc;', '&#265;').replace('Ċ', '&#266;').replace('&Cdot;', '&#266;').replace('ċ', '&#267;').replace('&cdot;', '&#267;')
            .replace('Č', '&#268;').replace('&Ccaron;', '&#268;').replace('č', '&#269;').replace('&ccaron;', '&#269;').replace('Ď', '&#270;').replace('&Dcaron;', '&#270;').replace('ď', '&#271;').replace('&dcaron;', '&#271;').replace('Đ', '&#272;').replace('&Dstrok;', '&#272;')
            .replace('đ', '&#273;').replace('&dstrok;', '&#273;').replace('Ē', '&#274;').replace('&Emacr;', '&#274;').replace('ē', '&#275;').replace('&emacr;', '&#275;').replace('Ė', '&#278;').replace('&Edot;', '&#278;').replace('ė', '&#279;').replace('&edot;', '&#279;')
            .replace('Ę', '&#280;').replace('&Eogon;', '&#280;').replace('ę', '&#281;').replace('&eogon;', '&#281;').replace('Ě', '&#282;').replace('&Ecaron;', '&#282;').replace('ě', '&#283;').replace('&ecaron;', '&#283;').replace('Ĝ', '&#284;').replace('&Gcirc;', '&#284;')
            .replace('ĝ', '&#285;').replace('&gcirc;', '&#285;').replace('Ğ', '&#286;').replace('&Gbreve;', '&#286;').replace('ğ', '&#287;').replace('&gbreve;', '&#287;').replace('Ġ', '&#288;').replace('&Gdot;', '&#288;').replace('ġ', '&#289;').replace('&gdot;', '&#289;')
            .replace('Ģ', '&#290;').replace('&Gcedil;', '&#290;').replace('Ĥ', '&#292;').replace('&Hcirc;', '&#292;').replace('ĥ', '&#293;').replace('&hcirc;', '&#293;').replace('Ħ', '&#294;').replace('&Hstrok;', '&#294;').replace('ħ', '&#295;').replace('&hstrok;', '&#295;')
            .replace('Ĩ', '&#296;').replace('&Itilde;', '&#296;').replace('ĩ', '&#297;').replace('&itilde;', '&#297;').replace('Ī', '&#298;').replace('&Imacr;', '&#298;').replace('ī', '&#299;').replace('&imacr;', '&#299;').replace('Į', '&#302;').replace('&Iogon;', '&#302;')
            .replace('į', '&#303;').replace('&iogon;', '&#303;').replace('İ', '&#304;').replace('&Idot;', '&#304;').replace('ı', '&#305;').replace('&imath; &inodot;', '&#305;').replace('Ĳ', '&#306;').replace('&IJlig;', '&#306;').replace('ĳ', '&#307;').replace('&ijlig;', '&#307;')
            .replace('Ĵ', '&#308;').replace('&Jcirc;', '&#308;').replace('ĵ', '&#309;').replace('&jcirc;', '&#309;').replace('Ķ', '&#310;').replace('&Kcedil;', '&#310;').replace('ķ', '&#311;').replace('&kcedil;', '&#311;').replace('ĸ', '&#312;').replace('&kgreen;', '&#312;')
            .replace('Ĺ', '&#313;').replace('&Lacute;', '&#313;').replace('ĺ', '&#314;').replace('&lacute;', '&#314;').replace('Ļ', '&#315;').replace('&Lcedil;', '&#315;').replace('ļ', '&#316;').replace('&lcedil;', '&#316;').replace('Ľ', '&#317;').replace('&Lcaron;', '&#317;')
            .replace('ľ', '&#318;').replace('&lcaron;', '&#318;').replace('Ŀ', '&#319;').replace('&Lmidot;', '&#319;').replace('ŀ', '&#320;').replace('&lmidot;', '&#320;').replace('Ł', '&#321;').replace('&Lstrok;', '&#321;').replace('ł', '&#322;').replace('&lstrok;', '&#322;')
            .replace('Ń', '&#323;').replace('&Nacute;', '&#323;').replace('ń', '&#324;').replace('&nacute;', '&#324;').replace('Ņ', '&#325;').replace('&Ncedil;', '&#325;').replace('ņ', '&#326;').replace('&ncedil;', '&#326;').replace('Ň', '&#327;').replace('&Ncaron;', '&#327;')
            .replace('ň', '&#328;').replace('&ncaron;', '&#328;').replace('ŉ', '&#329;').replace('&napos;', '&#329;').replace('Ŋ', '&#330;').replace('&ENG;', '&#330;').replace('ŋ', '&#331;').replace('&eng;', '&#331;').replace('Ō', '&#332;').replace('&Omacr;', '&#332;')
            .replace('ō', '&#333;').replace('&omacr;', '&#333;').replace('Ő', '&#336;').replace('&Odblac;', '&#336;').replace('ő', '&#337;').replace('&odblac;', '&#337;').replace('Œ', '&#338;').replace('&OElig;', '&#338;').replace('œ', '&#339;').replace('&oelig;', '&#339;')
            .replace('Ŕ', '&#340;').replace('&Racute;', '&#340;').replace('ŕ', '&#341;').replace('&racute;', '&#341;').replace('Ŗ', '&#342;').replace('&Rcedil;', '&#342;').replace('ŗ', '&#343;').replace('&rcedil;', '&#343;').replace('Ř', '&#344;').replace('&Rcaron;', '&#344;')
            .replace('ř', '&#345;').replace('&rcaron;', '&#345;').replace('Ś', '&#346;').replace('&Sacute;', '&#346;').replace('ś', '&#347;').replace('&sacute;', '&#347;').replace('Ŝ', '&#348;').replace('&Scirc;', '&#348;').replace('ŝ', '&#349;').replace('&scirc;', '&#349;')
            .replace('Ş', '&#350;').replace('&Scedil;', '&#350;').replace('ş', '&#351;').replace('&scedil;', '&#351;').replace('Š', '&#352;').replace('&Scaron;', '&#352;').replace('š', '&#353;').replace('&scaron;', '&#353;').replace('Ţ', '&#354;').replace('&Tcedil;', '&#354;')
            .replace('ţ', '&#355;').replace('&tcedil;', '&#355;').replace('Ť', '&#356;').replace('&Tcaron;', '&#356;').replace('ť', '&#357;').replace('&tcaron;', '&#357;').replace('Ŧ', '&#358;').replace('&Tstrok;', '&#358;').replace('ŧ', '&#359;').replace('&tstrok;', '&#359;')
            .replace('Ũ', '&#360;').replace('&Utilde;', '&#360;').replace('ũ', '&#361;').replace('&utilde;', '&#361;').replace('Ū', '&#362;').replace('&Umacr;', '&#362;').replace('ū', '&#363;').replace('&umacr;', '&#363;').replace('Ŭ', '&#364;').replace('&Ubreve;', '&#364;')
            .replace('ŭ', '&#365;').replace('&ubreve;', '&#365;').replace('Ů', '&#366;').replace('&Uring;', '&#366;').replace('ů', '&#367;').replace('&uring;', '&#367;').replace('Ű', '&#368;').replace('&Udblac;', '&#368;').replace('ű', '&#369;').replace('&udblac;', '&#369;')
            .replace('Ų', '&#370;').replace('&Uogon;', '&#370;').replace('ų', '&#371;').replace('&uogon;', '&#371;').replace('Ŵ', '&#372;').replace('&Wcirc;', '&#372;').replace('ŵ', '&#373;').replace('&wcirc;', '&#373;').replace('Ŷ', '&#374;').replace('&Ycirc;', '&#374;')
            .replace('ŷ', '&#375;').replace('&ycirc;', '&#375;').replace('Ÿ', '&#376;').replace('&Yuml;', '&#376;').replace('Ź', '&#377;').replace('&Zacute;', '&#377;').replace('ź', '&#378;').replace('&zacute;', '&#378;').replace('Ż', '&#379;').replace('&Zdot;', '&#379;')
            .replace('ż', '&#380;').replace('&zdot;', '&#380;').replace('Ž', '&#381;').replace('&Zcaron;', '&#381;').replace('ž', '&#382;').replace('&zcaron;', '&#382;').replace('ƒ', '&#402;').replace('&fnof;', '&#402;').replace('Ƶ', '&#437;').replace('&imped;', '&#437;')
            .replace('ǵ', '&#501;').replace('&gacute;', '&#501;').replace('&lsquo;', '&#8216;').replace('‘', '&#8216;').replace('&rsquo;', '&#8217;').replace('’', '&#8217;').replace('&ldquo;', '&#8220;').replace('“', '&#8220;').replace('&rdquo;', '&#8221;').replace('”', '&#8221;')

          // console.log(text)
          return text
        } else {
          return ''
        }
      }
    function getToday () {
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        const today = new Date()
        const todayString = monthNames[today.getMonth()] + ' ' + today.getDate() + ', ' + today.getFullYear()
        return todayString
      }
    function displayLoader () {
        document.getElementById('report-loader').classList.add('active')
      }
    function disableSubmitButton () {
        // document.getElementById('btn_doShareReport').disabled = true
        // document.getElementById('btn_doShareReport_mobile').disabled = true
        document.getElementById('btn_doDownloadReport').disabled = true
        document.getElementById('btn_doDownloadReport_mobile').disabled = true
        document.getElementById('btn_doUpdateEstimate').disabled = true
        document.getElementById('btn_doUpdateEstimate_mobile').disabled = true
      }
    function enableSubmitButton () {
        // document.getElementById('btn_doShareReport').disabled = false
        // document.getElementById('btn_doShareReport_mobile').disabled = false
        document.getElementById('btn_doDownloadReport').disabled = false
        document.getElementById('btn_doDownloadReport_mobile').disabled = false
        document.getElementById('btn_doUpdateEstimate').disabled = false
        document.getElementById('btn_doUpdateEstimate_mobile').disabled = false
      }
    function doReportTextColorCode (num, before, after) {
        if (num) {
          if (num != null && num !== '') {
            if (!isNaN(num)) {
              const temp = parseFloat(num)
              if (temp >= 0) {
                if (before != null && after === null) {
                  return '<span style="color: #07871c;">' + before + num + '</span>'
                } else if (before === null && after !== null) {
                  return '<span style="color: #07871c;">' + num + after + '</span>'
                } else {
                  return '<span style="color: #07871c;">' + num + '</span>'
                }
              } else {
                if (before !== null && after === null) {
                  return '<span style="color: red;">' + before + num + '</span>'
                } else if (before === null && after !== null) {
                  return '<span style="color: red;">' + num + after + '</span>'
                } else {
                  return '<span style="color: red;">' + num + '</span>'
                }
              }
            } else {
              return num
            }
          } else {
            return num
          }
        } else {
          return num
        }
      }
    function formatNumberWithComma (num) {
        if (num && num !== null) {
          if (typeof (num) === 'number') {
            return parseInt(num).toLocaleString('en-US')
          } else if (typeof (num) === 'string') {
            return parseInt(num).toLocaleString('en-US')
          }
        } else {
          return '--'
        }
      }
    function getYearBuilt () {
        if (props.property && props.property.structure) {
          if (props.property.structure.year_built && props.property.structure.year_built !== null) {
            return props.property.structure.year_built
          } else {
            return ''
          }
        } else {
          return ''
        }
      }
      function getCounty () {
        if (props.property && props.property.address) {
          return props.property.address.fips
        } else {
          return ''
        }
      }
      function getStoriesCodes () {
        if (props.optionLists && props.optionLists.stories_code) {
          const options = []
          for (const key in props.optionLists.stories_code) {
            options.push(
              {
                id: key,
                name: props.optionLists.stories_code[key],
              },
            )
          }
          return options
        } else {
          return []
        }
      }
      function getStories () {
        if (props.property && props.property.structure) {
            if (props.property.structure.stories && props.property.structure.stories != null) {
              return props.property.structure.stories
            } else {
              return ''
            }
          } else {
            return ''
          }
      }
      function Stories () {
          var pika = getStoriesCodes()
          var ans = []
          ans.push(<option value="--">--</option>)
          for (let x = 0; x<pika.length; x++) {
            ans.push(
                <option
                    value={pika[x].name}
                    selected={getStories()==pika[x].name}
                  >
                  {pika[x].name}
                </option>
            )
          }
          return (
            <select name="stories" id="stories">
                {ans}
            </select>
          )
      }
      function formatNumber (num) {
        if (num && num !== null) {
            if (typeof (num) === 'number') {
              return parseInt(num)
            } else if (typeof (num) === 'string') {
              return parseInt(num)
            }
          } else {
            return '0'
          } 
      }
      function getSqft () {
        if (props.property && props.property.structure) {
          if (props.property.structure.total_area_sq_ft && props.property.structure.total_area_sq_ft !== null) {
            return formatNumber(props.property.structure.total_area_sq_ft)
          } else {
            return ''
          }
        } else {
          return ''
        }
      }
      function getNumBeds () {
        if (props.property && props.property.structure) {
          if (props.property.structure.beds_count && props.property.structure.beds_count !== null) {
            return props.property.structure.beds_count
          } else {
            return ''
          }
        } else {
          return ''
        }
      }
      function getNumBaths () {
        if (props.property && props.property.structure) {
          if (props.property.structure.baths && props.property.structure.baths !== null) {
            return props.property.structure.baths
          } else {
            return ''
          }
        } else {
          return ''
        }
      }
      function getNumPartialBaths () {
        if (props.property && props.property.structure) {
          if (props.property.structure.partial_baths_count && props.property.structure.partial_baths_count !== null) {
            return props.property.structure.partial_baths_count
          } else {
            return ''
          }
        } else {
          return ''
        }
      }
      function getRoomCount () {
        if (props.property && props.property.structure) {
          if (props.property.structure.rooms_count && props.property.structure.rooms_count !== null) {
            return props.property.structure.rooms_count
          } else {
            return ''
          }
        } else {
          return ''
        }
      }
      function doShowBrokerageLogo () {
        const brokerageSelect = document.getElementById('brokerage-logo')
        if (brokerageSelect) {
          const selected = brokerageSelect.value
          const img = document.getElementById('logo-display')
          let logoURI = ''
          if (selected !== '--') {
            logoURI = 'https://honely-files-public.s3.amazonaws.com/report/brokerages/logo-' + selected + '.png'
          } else {
            // hide
            logoURI = 'https://honely-files-public.s3.amazonaws.com/report/logo_honely_report_default.png'
          }
          img.src = logoURI
        }
      }
      function getOtherRoomCodes () {
        if (props.optionLists && props.optionLists.other_rooms) {
          const options = []
          for (const key in props.optionLists.other_rooms) {
            options.push(
              {
                id: key,
                name: props.optionLists.other_rooms[key],
              },
            )
          }
          return options
        } else {
          return []
        }
      }
      function getOtherRooms () {
        if (props.property && props.property.structure) {
          if (props.property.structure.other_rooms && props.property.structure.other_rooms !== null) {
            return props.property.structure.other_rooms
          } else {
            return '--'
          }
        } else {
          return '--'
        }
      }
      function OtherRoomCodes() {
          var ans = []
          ans.push(<option value="--">--</option>)
          var pika = getOtherRoomCodes()
          for (let x=0;x<pika.length;x++) {
            ans.push(
                <option
                    value={pika[x].name}
                    selected={getOtherRooms()==pika[x].name}
                  >
                  {pika[x].name}
                </option>
            )
          }
          return (
            <select name="other-rooms" id="other-rooms">
                {ans}
            </select>
          )
      }
    return (
        <div className="form-overlay" id="report-form-overlay">
            {
                showPaymentPopup && 
                <PaymentConfirmationPopup setShowPaymentPopup ={setShowPaymentPopup} confirmAction={doDownloadReport} creditsFlag={props.creditsFlag}/>
            }
            <div className="forecast-form-container">
            <div className="forecast-form-title-bar">
                <span>Property Report</span>
                <i className="fa fa-times-thin fa-2x" aria-hidden="true" onClick={() => {removeReportForm()}}></i>
            </div>
            <div className="forecast-form-wrapper custom-scrollbar">

            <div className="section-loader-overlay manual withBackground" id="report-loader">
            <div className="section-loader-wrapper">
                <span className='mdi mdi-loading mdi-spin spin'></span>
            </div>
            </div>

                <div className="forecast-form">

                    <div className="form-section">
                    <p className="form-section-title"><span><i className="fas fa-user-circle"></i> Agent Information</span></p>
                    <div className="form-row-flex-3cols">
                    <p>
                        <label>Name</label>
                        <input type="text" name="agent-name" id="agent-name"></input>
                    </p>
                    <p>
                        <label>Email</label>
                        <input type="text" name="agent-email" id="agent-email"></input>
                    </p>
                    <p>
                        <label>Phone</label>
                        <input type="text" name="agent-phone" id="agent-phone"></input>
                    </p>
                    </div>
                    <div className="form-row-flex-2cols">
              <p>
                <label>Brokerage Logo</label>
                <select name="brokerage-logo" id="brokerage-logo" onChange={ () => { doShowBrokerageLogo() }}>
                  <option value="--">Default</option>
                  <option value="ben-bay-realty">Ben Bay Realty</option>
                  <option value="berkshire-hathaway-homeservices">Berkshire Hathaway HomeServices</option>
                  <option value="brown-harris-stevens">Brown Harris Stevens</option>
                  <option value="century-21">Century 21</option>
                  <option value="christies-international-real-estate">Christie's International Real Estate</option>
                  <option value="coldwell-banker-real-estate">Coldwell Banker Real Estate</option>
                  <option value="compass">Compass</option>
                  <option value="corcoran-group">Corcoran Group</option>
                  <option value="core">Core</option>
                  <option value="douglas-elliman">Douglas Elliman</option>
                  <option value="elegran-real-estate-and-development">Elegran Real Estate and Development</option>
                  <option value="engel-volkers">Engel &amp; V&#214;lkers</option>
                  <option value="exit-realty">EXIT Realty</option>
                  <option value="exp-realty">eXp Realty</option>
                  <option value="fillmore-real-estate">Fillmore Real Estate</option>
                  <option value="halstead-real-estate">Halstead Real Estate</option>
                  <option value="homeservices-of-america">HomeServices of America</option>
                  <option value="keller-williams-nyc">Keller Williams NYC</option>
                  <option value="keller-williams-realty">Keller Williams Realty</option>
                  <option value="laffey">Laffey Real Estate</option>
                  <option value="leslie-j-garfield-co">Leslie J. Garfield &amp; Co.</option>
                  <option value="mns">MNS</option>
                  <option value="modern-spaces">Modern Spaces</option>
                  <option value="momentum-real-estate">Momentum Real Estate</option>
                  <option value="nest-seekers-international">Nest Seekers International</option>
                  <option value="oxford-property-group">Oxford Property Group</option>
                  <option value="r-new-york">R New York</option>
                  <option value="re-max">RE/MAX</option>
                  <option value="re-max-edge">RE/MAX Edge</option>
                  <option value="re-max-real-estate-professionals">RE/MAX Real Estate Professionals</option>
                  <option value="sothebys-international-realty">Sotheby's International Realty</option>
                  <option value="triplemint">Triplemint</option>
                  <option value="the-modlin-group">The Modlin Group</option>
                  <option value="warburg-realty">Warburg Realty</option>
                  <option value="weichert">Weichert</option>
                </select>
              </p>
              <p className="brokerage-logo-container">
                <img src="https://honely-files-public.s3.amazonaws.com/report/logo_honely_report_default.png" id="logo-display" alt="Report logo"></img>
              </p>
            </div>
            <div className="form-row margin-top-sm">
              <label>Or use custom logo</label>
              <div className="file-input-container">
                <input type="file" name="agent-logo" id="agent-logo"></input>
              </div>
            </div>
                    </div>
                    <div className="form-section">
                    <p className="form-section-title"><span><i className="fas fa-dollar-sign"></i> Honely Estimated Value</span></p>
            <div className="report-honely-value-container">
              <div className="report-honely-value">
                <p className="report-honely-value-label">Before</p>
                {/* <p>{ () => { getHonelyAppraisal() }}</p> */}
                <p><GetHonelyAppraisal /></p>
              </div>
              <div className="report-honely-value">
                <p className="report-honely-value-label">After *</p>
                <p id="report-honey-value-after">--</p>
              </div>
            </div>
                    </div>
                <div className="form-section">
                <p className="form-section-title"><span><i className="fas fa-home"></i> Property Information</span></p>
                <div className="form-row-flex-2cols">
                <p><GetFullAddress /></p>
                <p><span className="font-bold">APN:</span><GetAPN /></p>
                </div>
                <div className="form-row-flex-4cols">
                <p>
                <label>Year built</label>
                <input type="text" name="year-built" id="year-built" readOnly></input>
              </p>
              <p>
                <label>County</label>
                <input type="text" name="county" id="county" readOnly></input>
              </p>
              <p>
                <label>Stories</label>
                <Stories />
              </p>
              <p>
                <label>SQ Ft.</label>
                <input type="text" name="sqft" id="sqft"></input>
              </p>
                </div>
                <div className="form-row-flex-4cols">
              <p>
                <label># of bedrooms</label>
                <input type="text" name="num-beds" id="num-beds"></input>
              </p>
              <p>
                <label># of bathrooms</label>
                <input type="text" name="num-baths" id="num-baths"></input>
              </p>
              <p>
                <label># of partial bathrooms</label>
                <input type="text" name="num-partial-bath" id="num-partial-bath"></input>
              </p>
              <p>
                <label>Room count</label>
                <input type="text" name="room-count" id="room-count"></input>
              </p>
            </div>
            <div className="form-row-flex-4cols">
              <p className="wide">
                <label>Other Rooms</label>
                <OtherRoomCodes />
              </p>
              <p>
                <label>Parking spaces</label>
                <input type="text" name="parking-spaces" id="parking-spaces"></input>
              </p>
              <p>
                <label>Plumbing Fixtures #</label>
                <input type="text" name="plumbing-count" id="plumbing-count"></input>
              </p>
            </div>
            <div className="form-row-flex-2cols">
              <p>
                <label>Parking type</label>
                <input type="text" name="parking-type" id="parking-type"></input>
              </p>
              <p>
                <label>Air conditioning type</label>
                <AirConditionCodes />
              </p>
            </div>
            <div className="form-row-flex-2cols">
              <p>
                <label>Heating type</label>
                <HeatingTypeCodes />
              </p>
              <p>
                <label>Heating fuel type</label>
                <HeatingFuelCodes />
              </p>
            </div>
            <div className="form-row-flex-2cols">
              <p>
                <label>Pool</label>
                <PoolCodes />
              </p>
              <p>
                <label>Amenities</label>
                <AmenitiesCodes />
              </p>
            </div>
            <div className="form-row-flex-2cols">
              <p>
                <label>Most recent sale date (YYYY-MM-DD)</label>
                <input type="text" name="sale-date" id="sale-date"></input>
              </p>
              <p>
                <label>Most recent sale price ($)</label>
                <input type="text" name="sale-price" id="sale-price"></input>
              </p>
            </div>
                </div>
            <div className="form-section">
            <p className="form-section-title"><span><i className="fas fa-drafting-compass"></i> Construction Information</span></p>
            <div className="form-row-flex-2cols">
              <p>
                <label>Condition</label>
                <BuildingConditionCodes />
              </p>
              <p>
                <label>Architecture type</label>
                <StyleCodes />
              </p>
            </div>
            <div className="form-row-flex-2cols">
              <p>
                <label>Construction type</label>
                <ConstructionTypeCodes />
              </p>
              <p>
                <label>Basement type</label>
                <BasementCodes />
              </p>
            </div>
            <div className="form-row-flex-2cols">
              <p>
                <label>Roof style</label>
                <RoofTypeCodes />
              </p>
              <p>
                <label>Roof material</label>
                <RoofCoverCodes />
              </p>
            </div>
            <div className="form-row-flex-2cols">
              <p>
                <label>Exterior walls</label>
                <ExteriorWallsCodes />
              </p>
              <p>
                <label>Interior walls</label>
                <InteriorWallsCodes />
              </p>
            </div>
            <div className="form-row-flex-2cols">
              <p>
                <label>Flooring</label>
                <FloorCoverCodes />
              </p>
              <p>
                <label>Water type</label>
                <WaterCodes />
              </p>
            </div>
            <div className="form-row-flex-2cols">
              <p>
                <label>Sewer type</label>
                <SewerCodes />
              </p>
            </div>
            </div>
            <div className="form-section">
            <p className="form-section-title"><span><i className="fas fa-chart-line"></i> Neighborhood Forecast</span></p>
            <div className="charts-row">
            <div className="chart-container">
                <Chart
                  ref={chart3monthx}
                  type="bar"
                  height="300"
                  width="100%"
                  options={reportChartOptions()}
                  series={chart3month()}
                />
                <p>3 Months</p>
              </div>
              <div className="chart-container">
                <Chart
                  ref={chart1yearx}
                  type="bar"
                  height="300"
                  width="100%"
                  options={reportChartOptions()}
                  series={chart1year()}
                />
                <p>1 Year</p>
              </div>
              <div className="chart-container">
                <Chart
                  ref={chart2yearsx}
                  type="bar"
                  height="300"
                  width="100%"
                  options={reportChartOptions()}
                  series={chart2years()}
                />
                <p>2 Years</p>
              </div>
              <div className="chart-container">
                <Chart
                  ref={chart3yearsx}
                  type="bar"
                  height="300"
                  width="100%"
                  options={reportChartOptions()}
                  series={chart3years()}
                />
                <p>3 Years</p>
              </div>
            </div>
            </div>
            <div class="form-section" style={{display: 'none'}}>
            <p class="form-section-title"><span><i class="fas fa-chart-line"></i> Rental Trends</span></p>
            <div class="charts-row">
              <div class="chart-container chart-col-25">
                <Chart
                  ref={chartMedianRentx}
                  type="bar"
                  height="300"
                  width="100%"
                  options={reportChartOptionsMedianRent()}
                  series={chartMedianRent()}
                />
                <p>Media Rent</p>
              </div>
              <div class="chart-container chart-col-25">
                <Chart
                  ref={chartCashFlowx}
                  type="bar"
                  height="300"
                  width="100%"
                  options={reportChartOptionsCashFlow()}
                  series={chartCashFlow()}
                />
                <p>Cash Flow</p>
              </div>
              <div class="chart-container chart-col-50">
                <Chart
                  ref={chartRentalGrowthx}
                  type="bar"
                  height="300"
                  width="100%"
                  options={reportChartOptionsGrowth()}
                  series={chartRentalGrowth()}
                />
                <p>Rental Growth</p>
              </div>
            </div>
          </div>
            <div class="form-section share-area noborder-nomargin">
            {/* <p class="form-section-title"><i class="fas fa-share-alt"></i> <span>Share Honely Report (Optional)</span></p> */}
            {/* <div class="form-row">
              <p>
                <label>Emails (use commas " , " to separate multiple emails)</label>
                <div class="input-text-multi" id="share-emails-input-container">
                  <div class="input-text-multi-display" id="input-text-multi-display"></div>
                  <input type="text" name="share-emails-temp" id="share-emails-temp"></input>
                  <input type="hidden" name="share-emails" id="share-emails"></input>
                </div>
              </p>
              <p>
                <label>Message</label>
                <textarea name="share-message" id="share-message" placeholder="enter your message"></textarea>
              </p>
            </div> */}
            <div>
          <p class="report-disclaimer">Honely provides the Honely AI, data, website and brand &amp; links &ldquo;as is,&rdquo; &ldquo;with all faults&rdquo; and &ldquo;as available.&rdquo; <br></br>* The Honely revaluation currenty takes into account only valid changes to inputs such as property size, number of bedrooms, and number of bathrooms.</p>
          </div>
          <div class="form-action-row-mobile">
            <button onClick={() => {doUpdateHonelyEstimate()}} id="btn_doUpdateEstimate_mobile">Update Estimate</button>
            {/* <button onClick={() => {doGenerateReport()}} id="btn_doShareReport_mobile">Share Report</button> */}
            <button onClick={() => {
                var pika = null
                if (props.creditsFlag) {
                    pika = {
                        creditAmount: 1
                    }
                } else {
                    pika = {
                        dollarAmount: 0.50
                    }
                }
                window.sessionStorage.removeItem('PaymentPopup')
                window.sessionStorage.setItem('PaymentPopup', JSON.stringify(pika))
                setShowPaymentPopup(true)
            }} id="btn_doDownloadReport_mobile">Generate Report</button>
            <button onClick={() => {doCMAAction()}} id="btn_doDownloadReport_mobileCMA">Add to CMA Report</button>
            {/* <button @click="doGenerateCMA" id="btn_generateCma_mobile">Generate CMA</button> */}
          </div>
          </div>
          <div class="form-action-row">
        <button onClick={() => {doUpdateHonelyEstimate()}} id="btn_doUpdateEstimate">Update Estimate</button>
        {/* <button onClick={() => {doGenerateReport()}} id="btn_doShareReport">Share Report</button> */}
        <button onClick={() => {
            var pika = null
            if (props.creditsFlag) {
                pika = {
                    creditAmount: 1
                }
            } else {
                pika = {
                    dollarAmount: 0.50
                }
            }
            window.sessionStorage.removeItem('PaymentPopup')
            window.sessionStorage.setItem('PaymentPopup', JSON.stringify(pika))
            setShowPaymentPopup(true)
        }} id="btn_doDownloadReport">Generate Report</button>
        <button onClick={() => {doCMAAction()}} id="btn_doDownloadReportCMA">Add to CMA Report</button>
      </div>
                </div>
            </div>
            </div>
        </div>
    )
}
export default ReportForm;