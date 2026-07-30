'use client'
import React from 'react'

function CheckBox(props) {
  return (
    <div>
        <input type="checkbox" checked={props.checked} onChange={props.onChange} className={props.style}/>
    </div>
  )
}

export default CheckBox
