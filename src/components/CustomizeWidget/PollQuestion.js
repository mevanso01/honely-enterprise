import React, { useState } from 'react'

const PollQuestion = (props) => {
  const {
    widgetConfig,
    setWidgetConfig
  } = props

  const [isSteoRequirement, setIsSteoRequirement] = useState(false)
  const [addPollLabel, setAddPollLabel] = useState('')

  const handleAddPoll = () => {
    const ids = widgetConfig.additionalPolls.reduce((ids, item) => [...ids, item.id], [])
    const maxId = ids.length ? Math.max(...ids) : 0
    setWidgetConfig({
      ...widgetConfig,
      additionalPolls: [
        ...widgetConfig.additionalPolls,
        { label: addPollLabel, id: maxId + 1 }
      ]
    })
    setAddPollLabel('')
  }

  const handleDeletePoll = (id) => {
    setWidgetConfig({
      ...widgetConfig,
      additionalPolls: widgetConfig.additionalPolls.filter(item => item.id !== id )
    })
  }

  const handleInputChange = (id, updatedValue) => {
    const updatedPolls = widgetConfig.additionalPolls.map(item => {
      if (item.id === id) {
        return { ...item, ...updatedValue }
      }
      return item
    })
    setWidgetConfig({
      ...widgetConfig,
      additionalPolls: updatedPolls
    })
  }

  return (
      <section className='widget-block-section'>
      <h3>Poll Question</h3>
      <div className='add-input-fields-container'>
        <span className='mdi mdi-view-headline' />
        <input
          readOnly
          className='widget-input'
          defaultValue={'Select your purpose'}
        />
      </div>
      <div className='poll-inputs-container'>
        {widgetConfig.additionalPolls.map(poll => (
          <div
            key={poll.id}
            className='poll-question-input-wrapper'
          >
            <input
              className='widget-input'
              defaultValue={poll.label}
              onChange={e => handleInputChange(poll.id, { label: e.target.value })}
            />
            <span
              className='mdi mdi-close'
              onClick={() => handleDeletePoll(poll.id)}
            />
          </div>
        ))}
        <div className='poll-question-input-wrapper'>
          <input
            className='widget-input'
            value={addPollLabel}
            onChange={e => setAddPollLabel(e.target.value)}
          />
        </div>
      </div>
      <div className='requirement-checkbox' onClick={() => setIsSteoRequirement(!isSteoRequirement)}>
        {isSteoRequirement ? (
          <span className='mdi mdi-checkbox-marked-outline active' />
        ) : (
          <span className='mdi mdi-checkbox-blank-outline' />
        )}
        <p>Make this steo a requirement</p>
      </div>
      <div className='add-item-containter'>
        <div className='widget-block-divider' />
        <span
          className='mdi mdi-plus-circle-outline'
          onClick={() => handleAddPoll()}
        />
      </div>
    </section>
  )
}

export default PollQuestion
