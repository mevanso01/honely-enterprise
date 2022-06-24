import React from 'react'
import { LogoIcon } from './Icons'

const WidgetIconPreview = (props) => {
  const {
    widgetConfig
  } = props
  return (
    <div className='widget-icon-preview-container'>
      <span
        className='widget-logo-text'
        style={{
          color: widgetConfig.colors.highlight_color
        }}
      >
        {widgetConfig['logo-text']}
      </span>
      <div
        className='widget-logo-wrapper'
        style={{
          backgroundColor: widgetConfig.colors.highlight_color
        }}
      >
        <LogoIcon
          color={widgetConfig.colors.logo_color}
        />
      </div>
    </div>
  )
}

export default WidgetIconPreview