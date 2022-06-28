import React from 'react'
import { ArrowDownIcon, ArrowUpIcon, ContactIcon } from './Icons'

export const ResultPagePreview = (props) => {
  const {
    widgetConfig
  } = props
  return (
    <div
      className='result-page-preview-container'
      style={{
        backgroundColor: widgetConfig.colors.background_color
      }}
    >
      <div className='result-header-item' style={{ borderColor: widgetConfig.colors.inactive_color }}>
        <p style={{ color: widgetConfig.colors.inactive_color }}>Showing result for:</p>
        <h3 style={{ color: widgetConfig.colors.text_color }}>1234 Street st. City, ST 00011</h3>
      </div>
      <div className='result-header-item' style={{ borderColor: widgetConfig.colors.inactive_color }}>
        <p style={{ color: widgetConfig.colors.inactive_color }}>Current Value Estimate</p>
        <h3 style={{ color: widgetConfig.colors.text_color }}>$500,000</h3>
      </div>
      <div className='result-main-item'>
        <p style={{ color: widgetConfig.colors.inactive_color }}>1 Year Forecast</p>
        <div>
          <h3 style={{ color: widgetConfig.colors.text_color }}>$500,000</h3>
          <div><ArrowUpIcon color={widgetConfig.colors.increase_color} /></div>
          <span style={{ color: widgetConfig.colors.increase_color }}>10%</span>
        </div>
      </div>
      <div className='result-main-item'>
        <p style={{ color: widgetConfig.colors.inactive_color }}>2 Year Forecast</p>
        <div>
          <h3 style={{ color: widgetConfig.colors.text_color }}>$600,000</h3>
          <div><ArrowUpIcon color={widgetConfig.colors.increase_color} /></div>
          <span style={{ color: widgetConfig.colors.increase_color }}>20%</span>
        </div>
      </div>
      <div className='result-main-item'>
        <p style={{ color: widgetConfig.colors.inactive_color }}>3 Year Forecast</p>
        <div>
          <h3 style={{ color: widgetConfig.colors.text_color }}>$400,000</h3>
          <div><ArrowDownIcon color={widgetConfig.colors.decrease_color} /></div>
          <span style={{ color: widgetConfig.colors.decrease_color }}>5%</span>
        </div>
      </div>

      <div className="widget-powered-by-container" style={{ borderColor: widgetConfig.colors.inactive_color }}>
        <a
          href="https://www.honely.com/"
          target="_blank" rel="noreferrer"
          style={{ color: widgetConfig.colors.inactive_color }}
        >
            Powered by Honely
        </a>
      </div>
      <div className='contact-broker-container'>
        <a href="mailto:honelyTest1@mailinator.com">
          <ContactIcon color={widgetConfig.colors.inactive_color} />
          <span style={{ color: widgetConfig.colors.inactive_color }}>Contact Broker</span>
        </a>
      </div>
      <div className='widget-bottom-btn-container'>
        <button
          style={{
            background: widgetConfig.colors.highlight_color,
            color: widgetConfig.colors.logo_color
          }}>
            Search another property address
        </button>
      </div>
    </div>
  )
}
