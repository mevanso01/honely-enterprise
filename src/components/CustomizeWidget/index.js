import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { TrinitySpinner } from 'loading-animations-react'
import '../../styles/customizeWidget.css'
import ColorPickerItem from './ColorPickerItem'
import AccordionItem from './AccordionItem'
import AdditionalInputFields from './AdditionalInputFields'
import PollQuestion from './PollQuestion'
import WidgetIconPreview from './WidgetIconPreview'
import InputFormPreview from './InputFormPreview'
import { ResultPagePreview } from './ResultPagePreview'

const CustomizeWidget = (props) => {
  const [widgetSettings, setWidgetSettings] = useState({ loading: true, loadingText: 'Loading...', settings: {}, error: null })
  const [widgetConfig, setWidgetConfig] = useState({})
  const fonts = ['Poppins', 'Times New Roman', 'Arial']
 
  const handleUpdateWidgetConfig = (updatedChange) => {
    setWidgetConfig({
      ...widgetConfig,
      ...updatedChange,
      mode: 'CUSTOM',
      extended: widgetConfig?.extended ?? widgetConfig.mode
    })
  }
  const handleUpdateColor = (updatedColor) => {
    setWidgetConfig({
      ...widgetConfig,
      mode: 'CUSTOM',
      extended: widgetConfig?.extended ?? widgetConfig.mode,
      colors: { ...widgetConfig.colors, ...updatedColor }
    })
  }

  const handleUpdateWidget = () => {
    const config = {
      headers: {
        'Authorization': 'Bearer ' + props.jwt
      }
    }
    setWidgetSettings({
      ...widgetSettings,
      loading: true,
      loadingText: 'Saving...'
    })
    axios.post('https://developers.honely.com/widget/settings', widgetConfig, config)
    .then(() => {
      setWidgetSettings({
        loading: false,
        settings: {
          ...widgetSettings.settings,
          current: widgetConfig
        },
        error: null
      })
    })
    .catch(error => {
      if (error.message === 'Request failed with status code 401') {
        props.doSignOut()
      } else {
        setWidgetSettings({
          ...widgetSettings,
          loading: false,
          error: error.message
        })
      }
    })
  }

  const filterResponse = (defaultData) => {
    if (defaultData.input_fields) {
      defaultData['input-fields'] = defaultData.input_fields
      delete defaultData.input_fields
    }
    if (defaultData.polls_fields) {
      defaultData['polls-fields'] = defaultData.polls_fields
      delete defaultData.polls_fields
    }
    if (defaultData.logo_text) {
      defaultData['logo-text'] = defaultData.logo_text
      delete defaultData.logo_text
    }
    if (defaultData.title_text) {
      defaultData['title-text'] = defaultData.title_text
      delete defaultData.title_text
    }
    return defaultData
  }

  useEffect(() => {
    const config = {
      headers: {
        'Authorization': 'Bearer ' + props.jwt
      }
    }
    axios.get('https://developers.honely.com/widget/settings', config)
    .then(response => {
      setWidgetConfig(response.data.data.current)
      setWidgetSettings({
        ...widgetSettings,
        loading: false,
        settings: {
          current: response.data.data.current,
          'default-light': filterResponse(response.data.data['default-light']),
          'default-dark': filterResponse(response.data.data['default-dark'])
        }
      })
    })
    .catch(error => {
      if (error.message === 'Request failed with status code 401') {
        props.doSignOut()
      } else {
        setWidgetSettings({
          ...widgetSettings,
          loading: false,
          error: error.message
        })
      }
    })
  }, [])

  return (
    <div className='widget-container'>
      {widgetSettings.loading && (
        <div className='widget-loading-container'>
          <div className="loading-animation">
            <TrinitySpinner color="#24cb43" text={widgetSettings?.loadingText} />
          </div>
        </div>
      )}
      {Object.keys(widgetSettings.settings).length > 0 && !widgetSettings.error && (
        <>
          {(widgetConfig?.extended || widgetConfig?.mode !== widgetSettings.settings?.current?.mode) ? (
            <div className='widget-header-container'>
              <button
                className='widget-header-btn'
                onClick={() => handleUpdateWidget()}
              >
                Save
              </button>
              <button
                className='widget-header-btn'
                onClick={() => setWidgetConfig(widgetSettings.settings.current)}
              >
                Cancel
              </button>
            </div>
          ) : (
            <div className='widget-header-container empty' />
          )}
          <div className='widget-content-wrapper'>
            <div className='widget-side-bar'>
              <section className='widget-block-section'>
                <h2>WIDGET ICON</h2>
                <h3>Style</h3>
                <AccordionItem
                  header={<p>Presets</p>}
                >
                  <div className='widget-radio-item' onClick={() => setWidgetConfig(widgetSettings.settings['default-light'])}>
                    {widgetConfig?.mode === 'LIGHT' ? (
                      <span className='mdi mdi-radiobox-marked' />
                    ) : (
                      <span className='mdi mdi-radiobox-blank' />
                    )}
                    <label>Light mode</label>
                  </div>
                  <div className='widget-radio-item' onClick={() => setWidgetConfig(widgetSettings.settings['default-dark'])}>
                    {widgetConfig?.mode === 'DARK' ? (
                      <span className='mdi mdi-radiobox-marked' />
                    ) : (
                      <span className='mdi mdi-radiobox-blank' />
                    )}
                    <label>Dark mode</label>
                  </div>
                  {(widgetSettings.settings.current.mode === 'CUSTOM' || widgetConfig.mode === 'CUSTOM') && (
                    <div className='widget-radio-item' onClick={() => setWidgetConfig(widgetSettings.settings.current)}>
                      {widgetConfig?.mode === 'CUSTOM' ? (
                        <span className='mdi mdi-radiobox-marked' />
                      ) : (
                        <span className='mdi mdi-radiobox-blank' />
                      )}
                      <label>Custom mode</label>
                    </div>
                  )}
                </AccordionItem>
                <AccordionItem
                  header={<p>Choose Font</p>}
                >
                  {fonts.map((font, i) => (
                    <div
                      key={i}
                      className='widget-radio-item'
                      onClick={() => handleUpdateWidgetConfig({ font: font })}
                    >
                      {widgetConfig?.fonts === font ? (
                        <span className='mdi mdi-radiobox-marked' />
                      ) : (
                        <span className='mdi mdi-radiobox-blank' />
                      )}
                      <label>{font}</label>
                    </div>
                  ))}
                </AccordionItem>
                <div className='widget-block-divider' />
                <ColorPickerItem
                  key={widgetConfig.mode + 'highligt'}
                  label='Highlight Color'
                  defaultColor={widgetConfig?.colors?.highlight_color}
                  handleUpdateColor={color => handleUpdateColor({ highlight_color: color })}
                />
                <div className='widget-block-divider' />
                <ColorPickerItem
                  label='Logo Color'
                  defaultColor={widgetConfig?.colors?.logo_color}
                  handleUpdateColor={color => handleUpdateColor({ logo_color: color })}
                />
                <div className='widget-block-divider' />
              </section>
              <section className='widget-block-section'>
                <h3>Text <span>(optional)</span></h3>
                <input
                  className='widget-input'
                  defaultValue={widgetConfig['logo-text']}
                  onChange={e => handleUpdateWidgetConfig({ 'logo-text': e.target.value })}
                />
              </section>
              <section className='widget-block-section'>
                <h2>INPUT FORM</h2>
                <h3>Title</h3>
                <input
                  className='widget-input'
                  defaultValue={widgetConfig['title-text']}
                  onChange={e => handleUpdateWidgetConfig({ 'title-text': e.target.value })}
                />
              </section>
              <section className='widget-block-section'>
                <AccordionItem
                  isForceOpen={true}
                  header={<h3 style={{ marginBottom: '0px' }}>Modify colors</h3>}
                >
                  <ColorPickerItem
                    key={widgetConfig.mode + 'text'}
                    label='Text Color'
                    defaultColor={widgetConfig?.colors?.text_color}
                    handleUpdateColor={color => handleUpdateColor({ text_color: color })}
                  />
                  <ColorPickerItem
                    key={widgetConfig.mode + 'background'}
                    label='Background Color'
                    defaultColor={widgetConfig?.colors?.background_color}
                    handleUpdateColor={color => handleUpdateColor({ background_color: color })}
                  />
                  <ColorPickerItem
                    key={widgetConfig.mode + 'inputBG'}
                    label='Input Fields BG'
                    defaultColor={widgetConfig?.colors?.input_fields_bg}
                    handleUpdateColor={color => handleUpdateColor({ input_fields_bg: color })}
                  />
                  <ColorPickerItem
                    key={widgetConfig.mode + 'inactive'}
                    label='Inactive Color'
                    defaultColor={widgetConfig?.colors?.inactive_color}
                    handleUpdateColor={color => handleUpdateColor({ inactive_color: color })}
                  />
                </AccordionItem>
              </section>
    
              <AdditionalInputFields
                widgetConfig={widgetConfig}
                setWidgetConfig={setWidgetConfig}
              />
            
              <PollQuestion
                widgetConfig={widgetConfig}
                setWidgetConfig={setWidgetConfig}
              />
    
              <section className='widget-block-section'>
                <h2>RESULTS PAGE</h2>
                <ColorPickerItem
                  key={widgetConfig.mode + 'inc'}
                  label='Increase Color'
                  defaultColor={widgetConfig?.colors?.increase_color}
                  handleUpdateColor={color => handleUpdateColor({ increase_color: color })}
                />
                <div className='widget-block-divider' />
                <ColorPickerItem
                  key={widgetConfig.mode + 'dec'}
                  label='Decrease Color'
                  defaultColor={widgetConfig?.colors?.decrease_color}
                  handleUpdateColor={color => handleUpdateColor({ decrease_color: color })}
                />
              </section>
            </div>
        
            <div className='widget-preview-container'>
              <section className='widget-preview-item'>
                <p>Widget Icon Preview</p>
                <WidgetIconPreview widgetConfig={widgetConfig} />
              </section>
              <section className='widget-preview-item'>
                <p>Input Form Preview</p>
                <InputFormPreview widgetConfig={widgetConfig} />
              </section>
              <section className='widget-preview-item'>
                <p>Results Page Preview</p>
                <ResultPagePreview widgetConfig={widgetConfig} />
              </section>
            </div>
          </div>
        </>
      )}
      {!widgetSettings.loading && widgetSettings.error && (
        <p className='widet-error-text'>{widgetSettings.error}</p>
      )}
    </div>
  )
}

export default CustomizeWidget
