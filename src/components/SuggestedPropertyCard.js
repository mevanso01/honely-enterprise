import React from 'react'
import '../styles/SuggestedPropertyCard.css'
import { parsePrice } from '../utils'
import ProgressRing from './ProgressRing'

const SuggestedPropertyCard = (props) => {
  return (
    <div className='suggested-property-card-container'>
      <div className='card-bage-icon-container'>
        <button className='check-btn'>
          <span className='mdi mdi-check' />
        </button>
        {/* <button className='plus-btn'>
          <span className='mdi mdi-plus' />
        </button> */}
      </div>
      <div className='square-box-65'>
        <div className='dummy'/>
        <div className='property-image-container'>
          <img src='./homepage-top-right.png' alt='' />
          <div className='progress-bar'>
            <ProgressRing
              isShowPercent
              percent={40}
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
          <p className='price'>{parsePrice(826900)}</p>
          <p className='text'>
            <span>Honely Estimate</span>
            <span className='mdi mdi-information-outline' />
          </p>
        </div>
        <div className='property-info'>
          <span>2 bds</span>
          <span className='dot'>·</span>
          <span>2 bdr</span>
          <span className='dot'>·</span>
          <span>1320 sqft</span>
        </div>
        <p className='full-address'>10905 Caminito Arcada,  San Diego CA 92131</p>
        <a href='/' className='view-details-link'>View Full Forecast</a>
      </div>
    </div>
  )
}

export default SuggestedPropertyCard
