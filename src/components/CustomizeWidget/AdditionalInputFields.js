import React, { useState } from 'react'

const AdditionalInputFields = (props) => {
  const {
    widgetConfig,
    setWidgetConfig
  } = props

  const [addInputState, setAddInputState] = useState({ label: '', placeholder: '' })

  const handleAddInputField = () => {
    const ids = widgetConfig.additionalInputs.reduce((ids, item) => [...ids, item.id], [])
    const maxId = ids.length ? Math.max(...ids) : 0
    setWidgetConfig({
      ...widgetConfig,
      additionalInputs: [
        ...widgetConfig.additionalInputs,
        { ...addInputState, id: maxId + 1 }
      ]
    })
    setAddInputState({ label: '', placeholder: '' })
  }

  const handleDeleteInput = (id) => {
    setWidgetConfig({
      ...widgetConfig,
      additionalInputs: widgetConfig.additionalInputs.filter(item => item.id !== id )
    })
  }

  const handleInputChange = (id, updatedValue) => {
    const updatedInputs = widgetConfig.additionalInputs.map(item => {
      if (item.id === id) {
        return { ...item, ...updatedValue }
      }
      return item
    })
    setWidgetConfig({
      ...widgetConfig,
      additionalInputs: updatedInputs
    })
  }

  const handleAddInputChange = (e) => {
    setAddInputState({
      ...addInputState,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section className='widget-block-section'>
      <h3>Add Input Fields</h3>
      {widgetConfig.additionalInputs.map(inputField => (
        <React.Fragment key={inputField.id}>
          <div className='add-input-fields-container'>
            <span className='mdi mdi-view-headline' />
            <div className='add-input-fields-wrapper'>
              <input
                className='widget-input'
                placeholder='Title'
                defaultValue={inputField.label}
                onChange={e => handleInputChange(inputField.id, { label: e.target.value })}
              />
              <input
                className='widget-input'
                placeholder='placeholder'
                defaultValue={inputField.placeholder}
                onChange={e => handleInputChange(inputField.id, { placeholder: e.target.value })}
              />
            </div>
            <span
              className='mdi mdi-close additional-input-delete'
              onClick={() => handleDeleteInput(inputField.id)}
            />
          </div>
          <div className='add-input-fields-divider'>
            <div className='widget-block-divider' />
          </div>
        </React.Fragment>
      ))}
  
      <div className='add-input-fields-container'>
        <span className='mdi mdi-view-headline' />
        <div className='add-input-fields-wrapper'>
          <input
            className='widget-input'
            placeholder='Title'
            name='label'
            value={addInputState.label}
            onChange={handleAddInputChange}
          />
          <input
            className='widget-input'
            placeholder='placeholder'
            name='placeholder'
            value={addInputState.placeholder}
            onChange={handleAddInputChange}
          />
        </div>
      </div>
      <div className='add-item-containter'>
        <div className='widget-block-divider' />
        <span
          className='mdi mdi-plus-circle-outline'
          onClick={handleAddInputField}
        />
      </div>
    </section>
  )
}

export default AdditionalInputFields