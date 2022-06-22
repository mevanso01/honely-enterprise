import React, { useState, useEffect } from 'react'
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";

const ColorPickerItem = (props) => {
  const {
    label,
    defaultColor,
    handleUpdateColor
  } = props

  const [color, setColor] = useColor("hex", defaultColor);
  const [open, setOpen] = useState(false)

  const closeColorPicker = (e) => {
    if (open) {
      const valid = !e.target.closest('.color-picker-wrapper')
      if (valid) {
        setOpen(false)
      }
    }
  }

  useEffect(() => {
    if (!open) return
    document.addEventListener('mouseup', closeColorPicker)
    return () => {
      document.removeEventListener('mouseup', closeColorPicker)
    }
  }, [open])

  return (
    <div className='color-picker-container'>
      <label>{label}</label>
      <span style={{ backgroundColor: color.hex }} onClick={() => setOpen(!open)} />
      {open && (
        <div className='color-picker-wrapper'>
          <ColorPicker
            width={310}
            height={150} 
            color={color}
            onChange={setColor}
            onChangeComplete={val => handleUpdateColor(val.hex)}
            hideHSV
            dark
          />
        </div>
      )}
    </div>
  )
}

export default ColorPickerItem
