
import React from 'react'
import style from '../button/btnStyle.module.scss'

const Button = ({text, handleClick, onChange, currentVal, key}) => {

    const handleClicked = (text) => {
        handleClick(text);  // filter data that is passed 
        onChange(text)  // add class to indicate selected 
    }

    let selected = currentVal === text? (style.active): (style.inactive)

    return (
        <button className={`${style.btn} ${selected}`} onClick={() => (handleClicked(text)) }>
            {text}
        </button>
    )
}

export default Button