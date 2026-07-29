import React from 'react'

function Button(props) {
  return (
    <div>
      <button className={props.style} onClick={props.onClick}>{props.icon}{props.name}</button>
    </div>
  )
}

export default Button
