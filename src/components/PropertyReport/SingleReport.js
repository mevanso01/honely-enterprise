import React from 'react'
import '../../styles/PropertyReport.css'
import SingleReportScreen from '../../assets/images/single-report.png'

const SingleReport = () => {
  return (
    <div className='property-report-container'>
      <h1>Generate a Property Report</h1>
      <div className='property-report-wrapper'>
        <span class="mdi mdi-close"></span>
        <p className='title'>Purchase a single report</p>
        <p className='address'>10905 Caminito Arcada, San Diego, CA. 92131</p>
        <div className='report-screen'>
          <img src={SingleReportScreen} alt='' />
        </div>
        <button className='continue-btn'>
          Continue with payment
        </button>
        <button className='continue-btn'>
          Continue with credit
        </button>
      </div>
    </div>
  )
}

export default SingleReport
