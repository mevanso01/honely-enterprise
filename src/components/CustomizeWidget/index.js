import React, { useState } from 'react'
import '../../styles/customizeWidget.css'
import ColorPickerItem from './ColorPickerItem'
import AccordionItem from './AccordionItem'
import lightThemeColors from './Json/lightTheme.json'
import darkThemeColors from './Json/darkTheme.json'
import AdditionalInputFields from './AdditionalInputFields'
import PollQuestion from './PollQuestion'

const CustomizeWidget = (props) => {
  const [widgetConfig, setWidgetConfig] = useState({
    ...lightThemeColors,
    text: 'Get a free home value forecast',
    title: 'Find the Futurve Values of Any Property',
    additionalInputs: [],
    additionalPolls: []
  })
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
              {widgetConfig?.theme === 'light' ? (
                <span className='mdi mdi-radiobox-marked' />
              ) : (
                <span className='mdi mdi-radiobox-blank' />
              )}
              <label>Light theme</label>
            </div>
            <div className='widget-radio-item' onClick={() => handleUpdateWidgetConfig(darkThemeColors)}>
              {widgetConfig?.theme === 'dark' ? (
                <span className='mdi mdi-radiobox-marked' />
              ) : (
                <span className='mdi mdi-radiobox-blank' />
              )}
              <label>Dark theme</label>
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
                {widgetConfig?.font === font ? (
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
            key={widgetConfig.theme + 'highligt'}
            label='Highlight Color'
            defaultColor={widgetConfig?.colors?.highLightColor}
            handleUpdateColor={color => handleUpdateColor({ highLightColor: color })}
          />
          <div className='widget-block-divider' />
          <ColorPickerItem
            label='Logo Color'
            defaultColor={widgetConfig?.colors?.logoColor}
            handleUpdateColor={color => handleUpdateColor({ logoColor: color })}
          />
          <div className='widget-block-divider' />
        </section>
        <section className='widget-block-section'>
          <h3>Text <span>(optional)</span></h3>
          <input
            className='widget-input'
            defaultValue={widgetConfig.text}
            onChange={e => handleUpdateWidgetConfig({ text: e.target.value })}
          />
        </section>
        <section className='widget-block-section'>
          <h2>INPUT FORM</h2>
          <h3>Title</h3>
          <input
            className='widget-input'
            defaultValue={widgetConfig.title}
            onChange={e => handleUpdateWidgetConfig({ title: e.target.value })}
          />
        </section>
        <section className='widget-block-section'>
          <AccordionItem
            isForceOpen={true}
            header={<h3 style={{ marginBottom: '0px' }}>Modify colors</h3>}
          >
            <ColorPickerItem
              key={widgetConfig.theme + 'text'}
              label='Text Color'
              defaultColor={widgetConfig?.colors?.textColor}
              handleUpdateColor={color => handleUpdateColor({ textColor: color })}
            />
            <ColorPickerItem
              key={widgetConfig.theme + 'background'}
              label='Background Color'
              defaultColor={widgetConfig?.colors?.backgroundColor}
              handleUpdateColor={color => handleUpdateColor({ backgroundColor: color })}
            />
            <ColorPickerItem
              key={widgetConfig.theme + 'inputBG'}
              label='Input Fields BG'
              defaultColor={widgetConfig?.colors?.inputBgColor}
              handleUpdateColor={color => handleUpdateColor({ inputBgColor: color })}
            />
            <ColorPickerItem
              key={widgetConfig.theme + 'inactive'}
              label='Inactive Color'
              defaultColor={widgetConfig?.colors?.inactiveColor}
              handleUpdateColor={color => handleUpdateColor({ inactiveColor: color })}
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
            key={widgetConfig.theme + 'inc'}
            label='Increase Color'
            defaultColor={widgetConfig?.colors?.increaseColor}
            handleUpdateColor={color => handleUpdateColor({ increaseColor: color })}
          />
          <div className='widget-block-divider' />
          <ColorPickerItem
            key={widgetConfig.theme + 'dec'}
            label='Decrease Color'
            defaultColor={widgetConfig?.colors?.decreaseColor}
            handleUpdateColor={color => handleUpdateColor({ decreaseColor: color })}
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
