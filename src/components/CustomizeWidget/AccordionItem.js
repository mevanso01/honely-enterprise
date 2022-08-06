import React, { useState, useEffect, useRef } from 'react'

const AccordionItem = (props) => {
  const {
    header,
    isForceOpen,
    mode
  } = props

  const [active, setActive] = useState(false);
  const [forceUpdate, setForceUpdte] = useState(false)
  const accordionContent = useRef()
  useEffect(() => {
    if (isForceOpen) {
      setActive(true)
    }
  }, [isForceOpen])

  useEffect(() => {
    setForceUpdte(!forceUpdate)
  }, [mode])
  
  
  return (
    <div className="accordion-item">
      <div
        className={`accordion-header ${active ? "active" : ""}`}
        onClick={() => setActive(!active)}
      >
        {header}
        <span className="mdi mdi-chevron-down" />
      </div>
      <div
        className={`accordion-content ${active ? "active" : ""}`}
        ref={accordionContent}
        style={
          active
            ? { height: accordionContent.current.scrollHeight }
            : { height: "0px" }
        }
      >
        {props.children}
      </div>
    </div>
  );
}


export default AccordionItem
