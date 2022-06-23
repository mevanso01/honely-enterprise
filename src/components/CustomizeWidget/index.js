import React, { useState, useEffect } from 'react'
import axios from 'axios'
import '../../styles/customizeWidget.css'
import ColorPickerItem from './ColorPickerItem'
import AccordionItem from './AccordionItem'
import lightThemeColors from './Json/lightTheme.json'
import darkThemeColors from './Json/darkTheme.json'
import AdditionalInputFields from './AdditionalInputFields'
import PollQuestion from './PollQuestion'

const CustomizeWidget = (props) => {
  const [widgetConfig, setWidgetConfig] = useState(lightThemeColors)
  const fonts = ['Poppins', 'Times New Roman', 'Arial']
 
  const handleUpdateWidgetConfig = (updatedChange) => {
    setWidgetConfig({ ...widgetConfig, ...updatedChange })
  }
  const handleUpdateColor = (updatedColor) => {
    setWidgetConfig({
      ...widgetConfig,
      colors: { ...widgetConfig.colors, ...updatedColor }
    })
  }

  useEffect(() => {
    const config = {
      headers: {
        'Authorization': 'Bearer ' + props.jwt
      }
    }
    axios.get('https://developers.honely.com/widget/settings', config)
    .then(response => {
      console.log(response.data.data)
    })
    .catch(error => {
      if (error.message === 'Request failed with status code 401') {
        props.doSignOut()
      } else {
        console.log(error)
      }
    })
  }, [])

  console.log(widgetConfig)

  return (
    <div className='widget-container'>
      <div className='widget-side-bar'>
        <section className='widget-block-section'>
          <h2>WIDGET ICON</h2>
          <h3>Style</h3>
          <AccordionItem
            header={<p>Presets</p>}
          >
            <div className='widget-radio-item' onClick={() => handleUpdateWidgetConfig(lightThemeColors)}>
              {widgetConfig?.mode === 'LIGHT' ? (
                <span className='mdi mdi-radiobox-marked' />
              ) : (
                <span className='mdi mdi-radiobox-blank' />
              )}
              <label>Light mode</label>
            </div>
            <div className='widget-radio-item' onClick={() => handleUpdateWidgetConfig(darkThemeColors)}>
              {widgetConfig?.mode === 'DARK' ? (
                <span className='mdi mdi-radiobox-marked' />
              ) : (
                <span className='mdi mdi-radiobox-blank' />
              )}
              <label>Dark mode</label>
            </div>
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
            defaultValue={widgetConfig.logo_text}
            onChange={e => handleUpdateWidgetConfig({ logo_text: e.target.value })}
          />
        </section>
        <section className='widget-block-section'>
          <h2>INPUT FORM</h2>
          <h3>Title</h3>
          <input
            className='widget-input'
            defaultValue={widgetConfig.title_text}
            onChange={e => handleUpdateWidgetConfig({ title_text: e.target.value })}
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
          <h1>Widget Preview</h1>
        </section>
      </div>
    </div>
  )
}

export default CustomizeWidget
