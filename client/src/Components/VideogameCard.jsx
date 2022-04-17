import React from 'react'
import sty from "../styles/VideogameCard.model.css"

export default function VideogameCard({name, image, rating}) {
  return (
    <div >
        <h3>{name}</h3>
        {<img className={sty.img} src={image} alt='imagen'/>}
        <h4>Rating: {rating}</h4>
    </div>
  )
}
