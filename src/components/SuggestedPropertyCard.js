import { prototype } from "apexcharts";
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import '../styles/SuggestedPropertyCard.css'
import { parsePrice } from '../utils'
import ProgressRing from './ProgressRing'
import axios from 'axios'

const SuggestedPropertyCard = (props) => {
  useEffect(() => {
    
  })
  function getForecast(value) {
    axios.get('https://api.honely.com/searches/forecast?address=' + value + '&user_id=512')
    .then((response) => {
        var lala = JSON.parse(window.sessionStorage.getItem('CMASubjectPropertyId'))
        var pika = null
        if (lala !== null) {
            pika = lala.array
        }
        // var pika = JSON.parse(window.sessionStorage.getItem('CMASubjectPropertyId')).array
        if (!props.inCma || !pika.includes(response.data.property_forecast.property_id)) {
            props.setForecast(response.data)
            console.log('vx: forecast state set as...', response.data)
            if (props.inCma) {
                props.setErrMsg('')
            }
            getPropertyData(response.data.property_forecast.property_id)
        } else {
            props.setErrMsg('Cannot add a property that has already been added.')
        }
    })
}
function getPropertyData(propertyId) {
  if(propertyId) {
      axios.get('https://api.honely.com/lookup/listing?property_id=' + propertyId)
      .then((response) => {
          props.setProperty(response.data)
          props.showReportForm()
      })
  }
}
  return (
    <div className='suggested-property-card-container'>
      <div className='card-bage-icon-container'>
        {
          JSON.parse(window.sessionStorage.getItem('CMASubjectPropertyId')).array.includes(props.property.property_id) &&
          <button className='check-btn'>
          <span className='mdi mdi-check' />
        </button>
        }
        {
          !JSON.parse(window.sessionStorage.getItem('CMASubjectPropertyId')).array.includes(props.property.property_id) &&
          <button onClick={
            () => {
              getForecast(props.property.full_address)
            }
          } className='plus-btn'>
            <span className='mdi mdi-plus' />
          </button>
        }
        {/* <button className='check-btn'>
          <span className='mdi mdi-check' />
        </button> */}
        {/* <button className='plus-btn'>
          <span className='mdi mdi-plus' />
        </button> */}
      </div>
      <div className='square-box-65'>
        <div className='dummy'/>
        <div className='property-image-container'>
          {/* <img src='./homepage-top-right.png' alt='' /> */}
          <img src={"https://maps.googleapis.com/maps/api/streetview?size=600x400&location=" + props.property.situslatitude + "," + props.property.situslongitude + "+&fov=90&source=outdoor&key=AIzaSyClIFG-ONBwyXrn4_kaA4yMYHGpZD5EEko"} alt='' />
          <div className='progress-bar'>
            <ProgressRing
              isShowPercent
              percent={Math.floor(props.property.comparable_score)}
              size={70}
              lineWidth={8}
              progressColor={'#82CA96'}
              trackColor={'transparent'}
              caps='round'
              children
              spin={false}
              transitionDuration={200}
            />
          </div>
        </div>
      </div>
      <div className='card-content'>
        <div className='estimate-value-containier'>
          <p className='price'>{parsePrice(props.property.current_value)}</p>
          <p className='text'>
            <span>Honely Estimate</span>
            {/* <span className='mdi mdi-information-outline' /> */}
          </p>
        </div>
        <div className='property-info'>
          <span>{props.property.bedrooms} bds</span>
          <span className='dot'>·</span>
          <span>{props.property.bathrooms} bdr</span>
          <span className='dot'>·</span>
          <span>{props.property.homesize} sqft</span>
        </div>
        {/* <p className='full-address'>10905 Caminito Arcada,  San Diego CA 92131</p> */}
        <p className='full-address'>{props.property.full_address}</p>
        {/* <a href='/' className='view-details-link'>View Full Forecast</a> */}
      </div>
    </div>
  )
}

export default SuggestedPropertyCard
