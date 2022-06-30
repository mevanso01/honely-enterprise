import React from 'react'
import { ArrowDownIcon } from './Icons'
import { LocationIcon, UserIcon, MessageIcon, PhoneIcon } from './Icons'

const InputFormPreview = (props) => {
  const {
    widgetConfig
  } = props
  return (
    <div
      className='input-form-preview-container'
      style={{
        backgroundColor: widgetConfig.colors.background_color
      }}
    >
      <div className='input-form-preview-close-icon-container'>
        <ArrowDownIcon color={widgetConfig.colors.text_color} />
      </div>
      {widgetConfig['title-text'] === 'Find the Futurve Values of Any Property' ? (
      <p
        className='title-text'
        style={{
          color: widgetConfig.colors.text_color
        }}
      >
        Find the <span style={{ color: widgetConfig.colors.highlight_color }}>Futurve Values</span> of Any Property
      </p>
      ) : (
        <p
          className='title-text'
          style={{
            color: widgetConfig.colors.text_color
          }}
        >
          {widgetConfig['title-text']}
        </p>
      )}
      <div className='widget-form-controller'>
        <label style={{ color: widgetConfig.colors.text_color }}>Search Address</label>
        <div className='widget-input-wrapper'>
          <LocationIcon />
          <input
            placeholder='e.g 123 Main St, FL, 44444'
            style={{
              backgroundColor: widgetConfig.colors.input_fields_bg,
              borderColor: widgetConfig.colors.inactive_color,
              color: widgetConfig.colors.text_color
            }}
          />
        </div>
      </div>
      <div className='widget-form-controller'>
        <label style={{ color: widgetConfig.colors.text_color }}>Name</label>
        <div className='widget-input-wrapper'>
          <UserIcon />
          <input
            placeholder='e.g John Doe'
            style={{
              backgroundColor: widgetConfig.colors.input_fields_bg,
              borderColor: widgetConfig.colors.inactive_color,
              color: widgetConfig.colors.text_color
            }}
          />
        </div>
      </div>
      <div className='widget-form-controller'>
        <label style={{ color: widgetConfig.colors.text_color }}>Email</label>
        <div className='widget-input-wrapper'>
          <MessageIcon />
          <input
            placeholder='Email'
            style={{
              backgroundColor: widgetConfig.colors.input_fields_bg,
              borderColor: widgetConfig.colors.inactive_color,
              color: widgetConfig.colors.text_color
            }}
          />
        </div>
      </div>
      {Array.isArray(widgetConfig['input-fields']) && widgetConfig['input-fields'].map(field => (
        <div key={field.order} className='widget-form-controller'>
          <label style={{ color: widgetConfig.colors.text_color }}>{field.label}</label>
          <div className='widget-input-wrapper'>
            <PhoneIcon />
            <input
              name={field.field_key}
              placeholder={field.placeholder}
              style={{
                backgroundColor: widgetConfig.colors.input_fields_bg,
                borderColor: widgetConfig.colors.inactive_color,
                color: widgetConfig.colors.text_color
              }}
            />
          </div>
        </div>
      ))}
      {Array.isArray(widgetConfig['polls-fields']) && widgetConfig['polls-fields'].map(poll => (
        <div key={poll.order} className='poll-field-container'>
          <label style={{ color: widgetConfig.colors.text_color }}>{poll.label}</label>
          <div>
            {poll.options.map((option, index) => (
              <button
                key={index}
                type='button'
                style={{
                  borderColor: poll['field-value']?.includes(option) ? widgetConfig.colors.highlight_color : widgetConfig.colors.inactive_color,
                  color: poll['field-value']?.includes(option) ? widgetConfig.colors.text_color : widgetConfig.colors.inactive_color,
                  background: widgetConfig.colors.background_color
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}
      <div className='widget-bottom-btn-container'>
        <button
          style={{
            background: widgetConfig.colors.highlight_color,
            color: widgetConfig.colors.logo_color
          }}>
            Get Free Forecast Report
        </button>
      </div>
    </div>
  )
}

export default InputFormPreview
