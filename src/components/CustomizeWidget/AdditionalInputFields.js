import React, { useState } from 'react'
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

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

  let timeout = null
  const handleInputChange = (id, updatedValue) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
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
    }, 750)
  }

  const handleAddInputChange = (e) => {
    setAddInputState({
      ...addInputState,
      [e.target.name]: e.target.value
    })
  }

  const SortableItem = SortableElement(({ value, handleDeleteInput, handleInputChange }) => {
    return (
      <>
        <div className='add-input-fields-container'>
          <span className='mdi mdi-view-headline' />
          <div className='add-input-fields-wrapper'>
            <input
              className='widget-input'
              placeholder='Title'
              defaultValue={value.label}
              onChange={e => handleInputChange(value.id, { label: e.target.value })}
            />
            <input
              className='widget-input'
              placeholder='placeholder'
              defaultValue={value.placeholder}
              onChange={e => handleInputChange(value.id, { placeholder: e.target.value })}
            />
          </div>
          <button
            className='additional-input-delete-btn'
            onClick={() => handleDeleteInput(value.id)}
          >
            X
          </button>
        </div>
        <div className='add-input-fields-divider'>
          <div className='widget-block-divider' />
        </div>
      </>
    )
  });

  const SortableList = SortableContainer(({ items, handleDeleteInput, handleInputChange }) => {
    return (
      <div>
        {items.map((item, index) => (
          <SortableItem
            key={item.id}
            index={index}
            value={item}
            handleDeleteInput={handleDeleteInput}
            handleInputChange={handleInputChange}
          />
        ))}
      </div>
    );
  });

  const onSortEnd = ({oldIndex, newIndex}) => {
    const copyListItems = [...widgetConfig.additionalInputs];
    const dragItemContent = copyListItems[oldIndex];
    copyListItems.splice(oldIndex, 1);
    copyListItems.splice(newIndex, 0, dragItemContent);

    setWidgetConfig({
      ...widgetConfig,
      additionalInputs: copyListItems
    })
  };

  return (
    <section className='widget-block-section'>
      <h3>Add Input Fields</h3>
      <SortableList
        items={widgetConfig.additionalInputs}
        onSortEnd={onSortEnd}
        handleDeleteInput={handleDeleteInput}
        handleInputChange={handleInputChange}
      />

      <div className='add-input-fields-container'>
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