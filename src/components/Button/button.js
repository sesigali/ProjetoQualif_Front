import React from 'react'
import '../Button/button.css'

export default function button({Text, onClick, Type = "button"}) {
  return (
    <button type={Type} onClick={onClick} >
        {Text}
    </button>
  )
}


