import React from 'react'
import '../Input/input.css'

export default function input({type, placeholder, value, onChange}) {
  return (
    <input
        className='input'
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
    />
  )
}
